module.exports = {
  onPreBuild: async ({ utils }) => {
    await utils.cache.restore("./.cache/blurhashes");
  },
  onPostBuild: async ({ utils }) => {
    await utils.cache.save("./.cache/blurhashes");
  },
};
