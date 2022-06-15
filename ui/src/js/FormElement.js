import { ref, computed } from "vue";
import * as utils from "./utils";

export function useFormElement(field) {
  // PROPERTIES
  const debounce = ref(500);
  const value = ref("");
  let hasError = ref(false);
  let errors = ref([]);
  const rules = ref([]);

  // COMPUTED
  const getLabel = computed(() => {
    return field.required ? `${field.label} *` : field.label;
  });

  const hint = computed(() => {
    return field.field_options && field.field_options.description
      ? utils.nl2br(field.field_options.description)
      : "";
  });

  // METHODS

  const isValidEmail = (val) => {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "It´s not a valid email";
  };
  const isValidNumber = (val) => {
    const numPattern = /^-?\d*\.?\d*$/;
    // const numPattern = /^\d{5}$/
    return numPattern.test(val) || "Most be 5 digits (Only numbers)";
  };
  const isValidString = (val) => {
    const numPattern = new RegExp("/^[a-zA-Z0-9]+$/");
    return numPattern.test(val) || "It´s not a string";
  };

  return {
    value,
    hasError,
    errors,
    getLabel,
    hint,
    rules,
    debounce,
    isValidEmail,
    isValidNumber,
    isValidString
  };
}
