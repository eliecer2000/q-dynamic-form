<template>
  <div class="q-form-section-break q-form-builder-element" style="width: 210px">
    <div class="col-12">
      <q-separator spaced color="accent" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useFormElement } from "../../js/FormElement";
export default defineComponent({
  name: "SectionBreakElement",
  props: {
    innerValue: {
      type: Object
    }
  },
  setup(props) {
    const { getLabel, hint, debounce } = useFormElement(props.innerValue);

    return {
      debounce,
      getLabel,
      hint
    };
  }
});
</script>
