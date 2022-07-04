import {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender,
  QDynamicTable
} from "./components/Index";

const version = "0.0.8";

function install(app) {
  app.component(QDynamicForm.name, QDynamicForm);
  app.component(QDynamicRender.name, QDynamicRender);
  app.component(FieldDynamic.name, FieldDynamic);
  app.component(QDynamicTableRender.name, QDynamicTableRender);
  app.component(QDynamicTable.name, QDynamicTable);
}

export {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender,
  QDynamicTable,
  install,
  version
};

export default {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
  QDynamicTableRender,
  QDynamicTable,
  install,
  version
};
