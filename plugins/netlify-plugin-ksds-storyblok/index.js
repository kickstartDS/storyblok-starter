module.exports = {
  onPreBuild: async ({ utils }) => {
    await utils.cache.restore("./public/blurhashes");
  },
  onPostBuild: async ({ utils }) => {
    await utils.cache.save("./public/blurhashes");
  },
};
