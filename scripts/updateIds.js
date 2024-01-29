const fs = require("node:fs");
const convertedPresets = require("../storyblok/presets.123456.json");
const convertedComponents = require("../storyblok/components.123456.json");
const storyblokComponents = require("../types/components-schema.json");

const start = async () => {
  for (const convertedComponent of convertedComponents.components) {
    convertedComponent.id = storyblokComponents.components.find(
      (component) => component.name === convertedComponent.name
    )?.id;
    convertedComponent.image = convertedPresets.presets.find(
      (preset) => preset.preset.type === convertedComponent.name
    )?.image;
  }

  for (const convertedPreset of convertedPresets.presets) {
    convertedPreset.component_id = storyblokComponents.components.find(
      (component) => component.name === convertedPreset.preset.type
    )?.id;
  }

  fs.writeFileSync(
    "storyblok/components.123456.json",
    JSON.stringify(convertedComponents, null, 2)
  );

  fs.writeFileSync(
    "storyblok/presets.123456.json",
    JSON.stringify(convertedPresets, null, 2)
  );
};

start();
