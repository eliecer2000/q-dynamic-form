<template>
  <div>
    <q-input
      class="col-auto bg-grey-4 text-white q-my-xs"
      :label="label"
      outlined
      :stack-label="label ? true : false"
      dense
      readonly
      v-model="data"
    ></q-input>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "FieldsText",
  props: {
    label: {
      type: String,
      default: null
    },
    data: {
      type: [String, Number, Boolean]
    }
  }
});
</script>

<style></style>
