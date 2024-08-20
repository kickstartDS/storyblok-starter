const fs = require("node:fs");
const PromiseThrottle = require("promise-throttle");
const FormData = require("form-data");
const { traverse } = require("object-traversal");
const sizeOf = require("image-size");
const StoryblokClient = require("storyblok-js-client");
const { v4: uuidv4 } = require("uuid");
const jsonpointer = require("jsonpointer");
const designSystemPresets = require("@kickstartds/ds-agency-premium/presets.json");
const generatedComponents = require("../cms/components.123456.json");
const initialStory = require("../resources/story.json");
const ffprobe = require("ffprobe");
const ffprobeStatic = require("ffprobe-static");

require("@dotenvx/dotenvx").config({ path: ".env.local" });

if (!process.env.NEXT_STORYBLOK_SPACE_ID)
  throw new Error("Missing NEXT_STORYBLOK_SPACE_ID env variable");
if (!process.env.NEXT_STORYBLOK_OAUTH_TOKEN)
  throw new Error("Missing NEXT_STORYBLOK_OAUTH_TOKEN env variable");

/** Configuration */
const componentScreenshotAssetFolderName = "Component Screenshots";
const demoContentAssetFolderName = "Demo Content";

const Storyblok = new StoryblokClient({
  oauthToken: process.env.NEXT_STORYBLOK_OAUTH_TOKEN,
});

const presets = {};
const images = new Map();
const promiseThrottle = new PromiseThrottle({
  requestsPerSecond: 2,
  promiseImplementation: Promise,
});

const presetIdToComponentName = (id) =>
  id.split("--").shift().split("-").slice(1).join("-");

const groupToComponentName = (name) => name.split("/").pop().trim();

const upload = (signed_request, file) => {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    for (const key in signed_request.fields) {
      form.append(key, signed_request.fields[key]);
    }
    form.append("file", fs.createReadStream(file));
    form.submit(signed_request.post_url, (err, res) => {
      if (err) reject(err);
      return resolve(res);
    });
  });
};

const signedUpload = async (fileName, assetFolderId) => {
  return new Promise(async (resolve) => {
    const fullPath = `./node_modules/@kickstartds/ds-agency-premium/dist/static/${fileName}`;
    let size = "";
    if (fileName.includes("mp4")) {
      const probe = await ffprobe(fullPath, { path: ffprobeStatic.path });
      size = `${probe.streams[0].width}x${probe.streams[0].height}`;
    } else {
      const dimensions = sizeOf(fullPath);
      size = `${dimensions.width}x${dimensions.height}`;
    }

    const assetResponse = await Storyblok.post(
      `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/assets/`,
      {
        filename: fileName,
        size,
        asset_folder_id: assetFolderId || null,
      }
    );
    await upload(
      assetResponse.data,
      "./node_modules/@kickstartds/ds-agency-premium/dist/static/" + fileName
    );

    return resolve({
      id: assetResponse.data.id,
      url: assetResponse.data.pretty_url,
    });
  });
};

const createAssetFolder = async (folderName) =>
  Storyblok.post(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/asset_folders/`,
    {
      asset_folder: {
        name: folderName,
      },
    }
  );

const getAssetsForFolder = async (folderId) =>
  Storyblok.get(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/assets?per_page=100&page=1&in_folder=${folderId}`
  );

const deleteAsset = async (assetId) =>
  Storyblok.delete(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/assets/${assetId}`
  );

const deleteAssetFolder = async (folderId) =>
  Storyblok.delete(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/asset_folders/${folderId}`
  );

const deleteStory = async (storyId) =>
  Storyblok.delete(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/${storyId}`
  );

const deleteComponent = async (componentId) =>
  Storyblok.delete(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/components/${componentId}`
  );

const updateComponent = async (componentId, componentDefinition) =>
  Storyblok.put(
    `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/components/${componentId}`,
    componentDefinition
  );

const prepare = async () => {
  try {
    // Clean up default content in space
    const stories = (
      await Storyblok.get(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/`
      )
    ).data?.stories;
    const defaultStory = stories.find(
      (story) => story.name === "Home" && story.slug === "home"
    );
    if (defaultStory) {
      await promiseThrottle.add(deleteStory.bind(this, defaultStory.id));
    } else {
      process.exit(1);
    }

    const components = (
      await Storyblok.get(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/components/`
      )
    ).data?.components;

    const defaultComponents = components.filter((component) =>
      ["feature", "grid", "teaser"].includes(component.name)
    );
    const defaultPageComponent = components.filter(
      (component) => component.name === "page"
    );

    await promiseThrottle.add(
      updateComponent.bind(
        this,
        defaultPageComponent[0].id,
        generatedComponents.components.find(
          (component) => component.name === "page"
        )
      )
    );

    for (const defaultComponent of defaultComponents) {
      await promiseThrottle.add(
        deleteComponent.bind(this, defaultComponent.id)
      );
    }

    // Clean up already existing folders
    const assetFolders = (
      await Storyblok.get(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/asset_folders/`
      )
    ).data?.asset_folders;

    const componentScreenshotFolders = assetFolders.filter(
      (assetFolder) => assetFolder.name === componentScreenshotAssetFolderName
    );
    const demoContentFolders = assetFolders.filter(
      (assetFolder) => assetFolder.name === demoContentAssetFolderName
    );

    for (const componentScreenshotFolder of componentScreenshotFolders) {
      // Clean up assets currently in folder first
      const { assets } = (
        await promiseThrottle.add(
          getAssetsForFolder.bind(this, componentScreenshotFolder.id)
        )
      ).data;

      for (const asset of assets) {
        await promiseThrottle.add(deleteAsset.bind(this, asset.id));
      }

      // ... and then delete the asset folder itself
      await promiseThrottle.add(
        deleteAssetFolder.bind(this, componentScreenshotFolder.id)
      );
    }

    for (const demoContentFolder of demoContentFolders) {
      // Clean up assets currently in folder first
      const { assets } = (
        await promiseThrottle.add(
          getAssetsForFolder.bind(this, demoContentFolder.id)
        )
      ).data;

      for (const asset of assets) {
        await promiseThrottle.add(deleteAsset.bind(this, asset.id));
      }

      // ... and then delete the asset folder itself
      await promiseThrottle.add(
        deleteAssetFolder.bind(this, demoContentFolder.id)
      );
    }

    // Create new folders for assets to be uploaded
    const previewsFolderId = (
      await promiseThrottle.add(
        createAssetFolder.bind(this, componentScreenshotAssetFolderName)
      )
    ).data.asset_folder.id;
    const demoFolderId = (
      await promiseThrottle.add(
        createAssetFolder.bind(this, demoContentAssetFolderName)
      )
    ).data.asset_folder.id;

    // Create presets, and lazily load images for previews
    for (const preset of designSystemPresets) {
      const component_id = generatedComponents.components.find(
        (component) =>
          component.display_name.trim() === groupToComponentName(preset.group)
      )?.id;

      if (component_id) {
        const componentKey = presetIdToComponentName(preset.id);

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
          space_id: process.env.NEXT_STORYBLOK_SPACE_ID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          color: "",
          icon: "",
          description: "",
        };

        if (!images.has(preset.screenshot)) {
          const image = signedUpload.bind(
            this,
            preset.screenshot,
            previewsFolderId
          );
          images.set(preset.screenshot, (await promiseThrottle.add(image)).url);
        }
        presets[preset.id].image = images.get(preset.screenshot);
      }
    }

    // Add Storyblok component typing where needed
    const presetImages = [];
    for (const [presetId, preset] of Object.entries(presets)) {
      const component = generatedComponents.components.find(
        (component) => component.name === presetIdToComponentName(presetId)
      );
      traverse(
        preset.preset,
        ({ meta }) => {
          const config = jsonpointer.get(component.schema, `/${meta.nodePath}`);
          if (!config) return;
          if (config.type === "bloks") {
            jsonpointer.set(
              preset.preset,
              `/${meta.nodePath}`,
              jsonpointer
                .get(preset.preset, `/${meta.nodePath}`)
                .map((entry) => {
                  if (typeof entry !== "object") return entry;
                  return {
                    ...entry,
                    _uid: uuidv4(),
                    type: config.component_whitelist[0],
                    component: config.component_whitelist[0],
                  };
                })
            );
          }
        },
        { pathSeparator: "/" }
      );

      // ... also flatten some keys to be compatible with Storyblok config
      traverse(preset.preset, ({ parent, key, value }) => {
        if (typeof value === "object" && isNaN(key) && !Array.isArray(value)) {
          for (const [propKey, propValue] of Object.entries(value)) {
            parent[`${key}_${propKey}`] = propValue;
          }
          delete parent[key];
        }
      });
    }

    // Find all images used in presets...
    traverse(presets, ({ parent, key, value }) => {
      if (
        value &&
        typeof value === "string" &&
        (value.startsWith("img/") || value === "/logo.svg")
      ) {
        presetImages.push({ parent, key, value });
      }
    });

    // ... and lazily load them
    for (const presetImage of presetImages) {
      if (!images.has(presetImage.value)) {
        const image = signedUpload.bind(this, presetImage.value, demoFolderId);
        images.set(presetImage.value, (await promiseThrottle.add(image)).url);
      }

      presetImage.parent[presetImage.key] = images.get(presetImage.value);
    }

    // Add preview for first (default) preset to component, too
    for (const generatedComponent of generatedComponents.components) {
      generatedComponent.image = Object.values(presets).find(
        (preset) => preset.preset.type === generatedComponent.name
      )?.image;
    }

    // Find all images used in demo content...
    const initialImages = [];
    traverse(initialStory, ({ parent, key, value }) => {
      if (
        value &&
        typeof value === "string" &&
        (value.startsWith("img/") || value === "/logo.svg")
      ) {
        initialImages.push({ parent, key, value });
      }
    });

    // ... and lazily load them
    for (const initialImage of initialImages) {
      if (!images.has(initialImage.value)) {
        const image = signedUpload.bind(this, initialImage.value, demoFolderId);
        images.set(initialImage.value, (await promiseThrottle.add(image)).url);
      }

      initialImage.parent[initialImage.key] = images.get(initialImage.value);
    }

    // Add demo content to space
    if (
      !stories.some(
        (story) =>
          story.name === "Getting Started" && story.slug === "getting-started"
      )
    ) {
      await Storyblok.post(
        `spaces/${process.env.NEXT_STORYBLOK_SPACE_ID}/stories/`,
        {
          story: initialStory.story,
          publish: 1,
        }
      );
    }

    // Write preset configuration to disk
    fs.writeFileSync(
      "cms/presets.123456.json",
      JSON.stringify({ presets: [...Object.values(presets)] }, null, 2)
    );

    // Write updated component configuration to disk
    fs.writeFileSync(
      "cms/components.123456.json",
      JSON.stringify(generatedComponents, null, 2)
    );
  } catch (error) {
    console.error(
      "There was an error generating the presets",
      JSON.stringify(error, null, 2)
    );
  }
};

prepare();
