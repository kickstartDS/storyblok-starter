const fs = require("node:fs");
const PromiseThrottle = require("promise-throttle");
const FormData = require("form-data");
const request = require("request");
const { traverse } = require("object-traversal");
const sizeOf = require("image-size");
const StoryblokClient = require("storyblok-js-client");
const { v4: uuidv4 } = require("uuid");
const designSystemPresets = require("@kickstartds/ds-agency/presets.json");
const storyblokComponents = require("../types/components-schema.json");

require("dotenv").config({ path: ".env.local" });

if (!process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_PUBLIC_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_PUBLIC_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_PUBLIC_STORYBLOK_OAUTH_TOKEN env variable");

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_PUBLIC_STORYBLOK_OAUTH_TOKEN,
});

const presets = {};
const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise,
});

const download = async (uri, fileName) => {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res, body) => {
      request(uri)
        .pipe(fs.createWriteStream("./tmp/images/" + fileName))
        .on("close", () => {
          return resolve(`${fileName} downloaded`);
        });
    });
  });
};

const upload = (signed_request, file) => {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    for (let key in signed_request.fields) {
      form.append(key, signed_request.fields[key]);
    }
    form.append("file", fs.createReadStream(file));
    form.submit(signed_request.post_url, (err, res) => {
      if (err) reject(err);
      return resolve(res);
    });
  });
};

const signedUpload = async (fileName) => {
  return new Promise(async (resolve, reject) => {
    let dimensions = sizeOf("./tmp/images/" + fileName);

    const assetResponse = await Storyblok.post(
      `spaces/${process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID}/assets/`,
      {
        filename: fileName,
        size: `${dimensions.width}x${dimensions.height}`,
      }
    );
    let uploadResponse = await upload(
      assetResponse.data,
      "./tmp/images/" + fileName
    );

    return resolve({
      id: assetResponse.data.id,
      url: assetResponse.data.pretty_url,
    });
  });
};

const handleFile = async (fileURL) => {
  let fileName = fileURL.split("/").pop();
  await download(fileURL, fileName);
  return signedUpload(fileName);
};

const start = async () => {
  for (const preset of designSystemPresets) {
    const component_id = storyblokComponents.components.find(
      (component) =>
        component.display_name.trim() === preset.group.split("/").pop().trim()
    )?.id;

    if (component_id) {
      const componentKey = preset.id
        .split("--")
        .shift()
        .split("-")
        .slice(1)
        .join("-");

      const image = handleFile.bind(
        this,
        `https://storybook.basic.design-system.agency/${preset.screenshot}`
      );

      presets[preset.id] = {
        id: 0,
        name: preset.name,
        preset: {
          _uid: uuidv4(),
          type: componentKey,
          component: componentKey,
          ...preset.args,
        },
        component_id,
        space_id: process.env.NEXT_PUBLIC_STORYBLOK_SPACE_ID,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        image: (await promiseThrottle.add(image)).url,
        color: "",
        icon: "",
        description: "",
      };
    }
  }

  const presetImages = [];

  traverse(presets, ({ parent, key, value }) => {
    if (value && typeof value === "string" && value.startsWith("img/")) {
      presetImages.push({ parent, key, value });
    }
  });

  for (const presetImage of presetImages) {
    const image = handleFile.bind(
      this,
      `https://storybook.basic.design-system.agency/${presetImage.value}`
    );

    presetImage.parent[presetImage.key] = await promiseThrottle.add(image).url;
  }

  fs.writeFileSync(
    "storyblok/presets.123456.json",
    JSON.stringify({ presets: [...Object.values(presets)] }, null, 2)
  );
};

start();
