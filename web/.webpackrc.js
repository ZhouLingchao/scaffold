const path = require('path');

export default {
  "alias": {
    "components": path.resolve(__dirname, "./src/components"),
    "common": path.resolve(__dirname, "./src/common"),
    "layouts": path.resolve(__dirname, "./src/layouts"),
    "utils": path.resolve(__dirname, "./src/utils"),
  },
  "entry": "src/index.js",
  "extraBabelPlugins": [
    "transform-decorators-legacy",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "ignoreMomentLocale": true,
  "theme": "./src/theme.js",
  "html": {
    "template": "./src/index.ejs"
  },
  "devtool":"source-map",
  "publicPath": "/",
  "disableDynamicImport": true,
  "hash": true,
  "define":{
    "APIURL": "http://api.yunshu.com/",
    "DEFAULT_LOGIN": false,
    "WEB_TITLE": "管理平台",
    "JWT_TOKEN_KEY": "jwt-token",
    "DEFAULT_PAGE_INDEX": 1,
    "DEFAULT_PAGE_SIZE": 10
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ],
      "define":{
        "APIURL": "http://localhost:22840/",
        "DEFAULT_LOGIN": false
      }
    }
  }
}