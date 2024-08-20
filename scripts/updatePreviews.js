const fs = require("node:fs");
const glob = require("fast-glob");
const PromiseThrottle = require("promise-throttle");
const FormData = require("form-data");
const StoryblokClient = require("storyblok-js-client");
const { basename } = require("node:path");

require("@dotenvx/dotenvx").config({ path: ".env.local" });

if (!process.env.NEXT_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_STORYBLOK_OAUTH_TOKEN env variable");

/** Configuration */
const componentScreenshotAssetFolderName = "Component Screenshots";

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
});

const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise,
});

const updatedAssetPaths = glob.sync("public/img/screenshots/*");

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

const signedUpload = async (fileName, assetId) => {
  return new Promise(async (resolve) => {
    const assetResponse = await Storyblok.post(
      `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/assets/`,
      {
        filename: fileName.replace("--", "-"),
        id: assetId,
      }
    );

    await upload(assetResponse.data, `./public/img/screenshots/${fileName}`);

    return resolve({
      id: assetResponse.data.id,
      url: assetResponse.data.pretty_url,
    });
  });
};

const getAssetsForFolder = async (folderId) =>
  Storyblok.get(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/assets?per_page=100&page=1&in_folder=${folderId}`
  );

const prepare = async () => {
  try {
    const assetFolders = (
      await Storyblok.get(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/asset_folders/`
      )
    ).data?.asset_folders;

    const componentScreenshotFolders = assetFolders.filter(
      (assetFolder) => assetFolder.name === componentScreenshotAssetFolderName
    );

    for (const componentScreenshotFolder of componentScreenshotFolders) {
      const { assets } = (
        await promiseThrottle.add(
          getAssetsForFolder.bind(this, componentScreenshotFolder.id)
        )
      ).data;

      for (const updatedAssetPath of updatedAssetPaths) {
        const existingAsset = assets.find((asset) => {
          return (
            basename(asset.filename) ===
            basename(updatedAssetPath.replace("--", "-"))
          );
        });

        if (existingAsset) {
          await promiseThrottle.add(
            signedUpload.bind(
              this,
              basename(updatedAssetPath),
              existingAsset.id
            )
          );
        }
      }
    }
  } catch (error) {
    console.error(
      "There was an error updating the previews",
      JSON.stringify(error, null, 2)
    );
  }
};

prepare();
