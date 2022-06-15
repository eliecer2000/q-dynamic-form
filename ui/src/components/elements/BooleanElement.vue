<template>
  <div class="row q-col-gutter-sm q-form-text q-form-builder-element">
    <div style="width: 215px">
      <q-toggle
        :false-value="true"
        :true-value="false"
        :label="getLabel"
        color="grey"
        v-model="boolValue"
        :debounce="debounce"
        :type="innerValue.fiel_type"
      />
      <p v-if="hint" class="text-caption q-ml-md" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useFormElement } from "../../js/FormElement";
export default defineComponent({
  name: "BooleanElement",
  props: {
    innerValue: {
      type: Object
    }
  },
  setup(props) {
    const boolValue = ref(false);
    const { getLabel, hint, debounce } = useFormElement(props.innerValue);

    return {
      boolValue,
      debounce,
      getLabel,
      hint
    };
  }
});
</script>
