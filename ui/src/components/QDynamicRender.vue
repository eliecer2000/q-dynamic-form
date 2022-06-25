<template>
  <div class="q-form-container q-pa-lg">
    <div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
      <FieldDynamic
        v-for="(field, index) in fields"
        :key="`field-${index}`"
        :set-properties="field"
        :initValue="initValue[field.name]"
        :stateFields="stateFields"
        :optionsSelect="optionsSelect"
        :columnClassField="columnClassField[field.name]"
        @data="onData"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import FieldDynamic from "./FieldDynamic.vue";

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
    },
    optionsSelect: {
      type: Object,
      default: {}
    },
    columnClassField: {
      type: Object,
      default: {}
    },
    modelValue: {
      type: Object,
      default: {}
    }
  },

  //emits: ["data"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const responseData = ref(props.initValue);

    /* Se captura los datos recibidos de cada campo que está siendo modificado */
    function onData(data) {
      responseData.value = { ...responseData.value, ...data };
      emit("update:modelValue", responseData.value);
    }

    onMounted(() => {
      /* Se cargan los datos recibidos en el formulario */
      emit("update:modelValue", responseData.value);
    });

    return {
      onData
    };
  }
});
</script>
