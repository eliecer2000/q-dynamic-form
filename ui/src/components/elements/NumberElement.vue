<template>
  <div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
    <div class="col-12">
      <q-input
        v-model.number="value"
        filled
        type="number"
        :hint="hint ? hint : ''"
        :label="getLabel"
        :debounce="debounce"
        :rules="
          innerValue.required ? [(val) => !!val || 'Field is required'] : []
        "
      >
        <template v-slot:prepend>
          <q-icon name="pin" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useFormElement } from "./../js/FormElement";
export default defineComponent({
  name: "NumberElement",
  props: {
    innerValue: {
      type: Object
    }
  },
  setup(props) {
    const { getLabel, hint, debounce, value } = useFormElement(
      props.innerValue
    );

    return {
      value,
      debounce,
      getLabel,
      hint
    };
  }
});
</script>
