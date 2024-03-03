module.exports = {
  onPreBuild: async ({ utils }) => {
    await utils.cache.restore("./cms/presets.123456.json");
  },
  onPostBuild: async ({ utils }) => {
    await utils.cache.save("./cms/presets.123456.json");
  },
};
