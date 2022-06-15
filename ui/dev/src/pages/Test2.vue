<template>
  <q-page>
    <QDynamicRender
      :fields="fieldsList"
      :init-value="initValue()"
      :stateFields="stateFields"
      @data="onData"
    ></QDynamicRender>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const fieldsList = ref([
      {
        label: "Campo 1",
        field_type: "text",
        clearable: true,
        field_name: "valor_campo_1",
        readonly_name: "readonly_campo_1",
        disabled_name: "disabled_campo_1",
        required: true,
        cid: "5a147464-a6ad-4930-a788-4b755d3dc2de",
        field_options: {
          description: "Este es el campo 1",
        },
        element_ref: "campo_1",
      },
      {
        label: "Campo 2",
        field_type: "text",
        clearable: true,
        field_name: "valor_campo_2",
        readonly_name: "readonly_campo_2",
        disabled_name: "disabled_campo_2",
        required: true,
        cid: "5a147464-a6ad-4930-a488-4b755d3dc2de",
        field_options: {
          description: "Este es el campo 2",
        },
        element_ref: "campo_2",
      },
    ]);

    let stateFields = ref({
      readonly_campo_1: true,
    });

    function onData(data) {
      console.log("data", data);
    }

    function initValue() {
      return { valor_campo_1: "hola", valor_campo_2: "hola1" };
    }

    return {
      fieldsList,
      stateFields,
      onData,
      initValue,
    };
  },
});
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
