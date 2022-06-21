import { boot } from "quasar/wrappers";
import VuePlugin from "ui"; // "ui" is aliased in quasar.conf.js

export default boot(({ app }) => {
  console.log("🚀 ~ file: register.js ~ line 7 ~ boot ~ app", app);

  app.use(VuePlugin);
});
