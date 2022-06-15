<template>
  <div class="q-editable-element">
    <div class="overlay" @click="onClick"></div>
    <component :is="element" :inner-value="value" />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import TextElement from "../elements/TextElement.vue";
import NumberElement from "../elements/NumberElement.vue";
import DropdownElement from "../elements/DropdownElement.vue";
import BooleanElement from "../elements/BooleanElement.vue";
import SectionBreakElement from "../elements/SectionBreakElement.vue";
import EmailElement from "../elements/EmailElement.vue";

export default defineComponent({
  name: "EditableElement",
  components: {
    TextElement,
    NumberElement,
    DropdownElement,
    BooleanElement,
    SectionBreakElement,
    EmailElement
  },
  props: {
    value: {
      type: Object
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    // METHODS
    const onClick = () => {
      emit("click", props.value);
    };

    // COMPUTED
    const element = computed(() => {
      const nameParts = props.value.field_type.split("_");
      for (let i = 0; i < nameParts.length; i++) {
        nameParts[i] =
          nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
      }
      return nameParts.join("") + "Element";
    });

    return {
      onClick,
      element
    };
  }
});
</script>
