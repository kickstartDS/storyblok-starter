export const onPreBuild = async ({ utils }) => {
  await utils.cache.restore("./cms/presets.123456.json");
};

export const onPostBuild = async ({ utils }) => {
  await utils.cache.save("./cms/presets.123456.json");
};
