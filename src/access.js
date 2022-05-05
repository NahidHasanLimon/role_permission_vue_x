// import store from './store'
import { hasPermission } from "./brain/permission";
export default {
  install: (app, options) => {
            app.config.globalProperties.$canAccess = function (allowed) {
             return hasPermission(allowed)
              
            };
  },
};