import {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender
} from "./components/Index";

const version = "0.0.7";

function install(app) {
  app.component(QDynamicForm.name, QDynamicForm);
  app.component(QDynamicRender.name, QDynamicRender);
  app.component(FieldDynamic.name, FieldDynamic);
  app.component(QDynamicTableRender.name, QDynamicTableRender);
}

export {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender,
  install,
  version
};

export default {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender,
  install,
  version
};
