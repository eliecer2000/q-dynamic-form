import {
  QDynamicForm,
  QDynamicRender,
  FieldDynamic,
} from "./components/Index";

const version = "0.0.3";

function install ( app ) {
  app.component( QDynamicForm.name, QDynamicForm );
  app.component( QDynamicRender.name, QDynamicRender );
  app.component( FieldDynamic.name, FieldDynamic );
}

export {
  QDynamicForm,
  QDynamicRender,
  TextElement,
  NumberElement,
  DropdownElement,
  BooleanElement,
  SectionBreakElement,
  EmailElement,
  install,
  version
};

export default {
  QDynamicForm,
  QDynamicRender,
  TextElement,
  NumberElement,
  DropdownElement,
  BooleanElement,
  SectionBreakElement,
  EmailElement,
  install,
  version,
};
