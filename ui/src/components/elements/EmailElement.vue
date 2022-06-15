<template>
  <div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
    <div class="col-12">
      <q-input
        v-model="value"
        filled
        :type="innerValue.field_type"
        :label="getLabel"
        :debounce="debounce"
        :rules="
          innerValue.required
            ? [(val) => !!val || 'Field is required', isValidEmail]
            : []
        "
        :hint="hint ? hint : ''"
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useFormElement } from "./../js/FormElement";
export default defineComponent({
  name: "EmailElement",
  props: {
    innerValue: {
      type: Object
    }
  },
  setup(props) {
    const { getLabel, hint, debounce, value, isValidEmail } = useFormElement(
      props.innerValue
    );

    return {
      value,
      debounce,
      getLabel,
      hint,
      isValidEmail
    };
  }
});
</script>
