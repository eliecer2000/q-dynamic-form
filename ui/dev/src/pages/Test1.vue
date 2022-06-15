<template>
  <q-page>
    <QDynamicForm :valueComponent="fields" @input="input" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const fields = ref([]);
    const fieldData = ref([]);
    const input = (val) => {
      fields.value = val;
    };
    const getElement = (field) => {
      const nameParts = field.field_type.split("_");
      for (let i = 0; i < nameParts.length; i++) {
        nameParts[i] =
          nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1);
      }
      return nameParts.join("") + "Element";
    };
    return {
      fields,
      fieldData,
      getElement,
      input,
    };
  },
});
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
