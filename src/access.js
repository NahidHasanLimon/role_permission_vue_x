// import store from './store'
import { hasPermission } from "./brain/permission";
export default {
  install: (app, options) => {
            app.config.globalProperties.$italicHTML = function (text) {
              return "<i>" + text + "</i>";
            };
            app.config.globalProperties.$checkAccess = function (allowed) {
             return hasPermission(allowed)
              
            };
  },
};