const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/colors.scss";
          @import "@/assets/scss/fonts.scss";
          @import "@/assets/scss/global.scss";
          @import "@/assets/scss/list.scss";
          @import "@/assets/scss/form.scss";
          @import "@/assets/scss/popup.scss";
        `
      }
    }
  }
})
