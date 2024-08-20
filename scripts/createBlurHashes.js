const { Cache } = require("file-system-cache");
const { encode } = require("blurhash");
const { getPixels } = require("@unpic/pixels");
const { traverse } = require("object-traversal");
const StoryblokClient = require("storyblok-js-client");
const PromiseThrottle = require("promise-throttle");

require("@dotenvx/dotenvx").config({ path: ".env.local" });

if (!process.env.NEXT_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_STORYBLOK_OAUTH_TOKEN env variable");

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
});

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise,
});

const getStories = async () =>
  await Storyblok.get(`spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/`);

const getStory = async (storyId) =>
  await Storyblok.get(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/${storyId}`
  );

const isImgUrl = (string) => {
  return (
    string &&
    typeof string === "string" &&
    (string.startsWith("//a") || string.startsWith("http")) &&
    /\.(jpg|jpeg|png|webp|avif|gif)$/.test(string)
  );
};

const blur = async () => {
  try {
    const cache = new Cache({ basePath: "./public/blurhashes" });
    await cache.load();

    const storyImages = [];

    const stories = (await promiseThrottle.add(getStories.bind(this))).data
      ?.stories;

    for (const story of stories) {
      const fullStory = (
        await promiseThrottle.add(getStory.bind(this, story.id))
      ).data?.story;

      traverse(fullStory.content, ({ value }) => {
        if (isImgUrl(value)) {
          storyImages.push(value.startsWith("//a") ? `https:${value}` : value);
        }
      });
    }

    for (const imageUrl of storyImages) {
      if (cache.getSync(imageUrl)) continue;

      const fileUrl = !imageUrl.startsWith("http")
        ? `https:${imageUrl}`
        : imageUrl;
      const [width, height] = imageUrl.match(/\/(\d+)x(\d+)\//)?.slice(1) || [];
      const resizedUrl =
        width > 100
          ? `${imageUrl}/m/100x0`
          : height > 100
          ? `${imageUrl}/m/0x100`
          : fileUrl;

      const imgData = await getPixels(resizedUrl);
      const data = Uint8ClampedArray.from(imgData.data);
      const blurHash = encode(data, imgData.width, imgData.height, 4, 4);
      cache.setSync(imageUrl, blurHash);
    }
  } catch (error) {
    console.error(error);
  }
};

blur();
