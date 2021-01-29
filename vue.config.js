module.exports = {
  lintOnSave: false,
  devServer:{
    proxy:{
      "/api":{
        target:"http://www.chst.vip",
        pathRewrite:{
          "^/api":""
        }
      }
    }
  }
};
