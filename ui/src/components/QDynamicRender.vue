<template>
  <div class="q-form-container q-pa-lg">
    <component
      class="q-py-xs"
      v-for="field in fields"
      :key="field.cid"
      :inner-value="field"
      :init-value="initValue"
      :state="stateFields"
      :is="getElement(field)"
      @data="onData"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QDynamicRender",
  props: {
    fields: {
      type: Array
    },
    initValue: {
      type: Object,
      default: {}
    },
    stateFields: {
      type: Object,
      default: {}
    }
  },
  emits: ["data"],
  setup(props, { emit }) {
    const responseData = ref({});
    const getElement = (field) => {
      const nameParts = field.field_type.split("_");
      nameParts.forEach((element) => {
        element = element.charAt(0).toUpperCase() + element.slice(1);
      });
      return nameParts.join("") + "Element";
    };
    function onData(data) {
      Object.assign(responseData.value, data);
      if (props.fields.length === Object.keys(responseData.value).length) {
        emit("data", responseData.value);
      }
    }
    return {
      responseData,
      getElement,
      onData
    };
  }
});
</script>
