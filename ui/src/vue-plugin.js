import { QDynamicForm, QDynamicRender, FieldDynamic } from './components/Index';

const version = '0.0.4';

function install(app) {
	app.component(QDynamicForm.name, QDynamicForm);
	app.component(QDynamicRender.name, QDynamicRender);
	app.component(FieldDynamic.name, FieldDynamic);
}

export { QDynamicForm, QDynamicRender, FieldDynamic, install, version };

export default {
	QDynamicForm,
	QDynamicRender,
	FieldDynamic,
	install,
	version,
};
