import {
  QDynamicForm,
  QDynamicRender,
  TextElement,
  NumberElement,
  DropdownElement,
  BooleanElement,
  SectionBreakElement,
  EmailElement
} from "./components/Index";

const version = __UI_VERSION__;

function install(app) {
  app.component(QDynamicForm.name, QDynamicForm);
  app.component(QDynamicRender.name, QDynamicRender);
  app.component(TextElement.name, TextElement);
  app.component(NumberElement.name, NumberElement);
  app.component(DropdownElement.name, DropdownElement);
  app.component(BooleanElement.name, BooleanElement);
  app.component(SectionBreakElement.name, SectionBreakElement);
  app.component(EmailElement.name, EmailElement);
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
