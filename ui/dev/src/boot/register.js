import { boot } from 'quasar/wrappers';
import VuePlugin from './../../../src/index.esm'; // "ui" is aliased in quasar.onf.js

export default boot(({ app }) => {
	app.use(VuePlugin);
});
