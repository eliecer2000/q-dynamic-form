<template>
  <div
    class="row q-col-gutter-sm q-form-dropdown q-form-builder-element"
    style="width: 215px"
  >
    <div class="col-12">
      <q-select
        v-model="value"
        filled
        :hint="hint ? hint : ''"
        :options="allOptions"
        :label="getLabel"
        :rules="
          innerValue.required ? [(val) => !!val || 'Field is required'] : []
        "
      >
        <template v-slot:prepend>
          <q-icon name="arrow_drop_down_circle" />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useFormElement } from "./../js/FormElement";
export default {
  name: "DropdownElement",
  props: {
    innerValue: {
      type: Object
    }
  },
  setup(props) {
    const { getLabel, hint, debounce, value } = useFormElement(
      props.innerValue
    );

    const allOptions = computed(() => {
      return props.innerValue.field_options.options.map((option) => ({
        label: option.label,
        value: option.label
      }));
    });
    return {
      value,
      debounce,
      getLabel,
      hint,
      allOptions
    };
  }
};
</script>
