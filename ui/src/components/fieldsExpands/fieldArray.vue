<template>
  <div class="q-ml-md">
    <div v-for="item in itemRow" :key="item">
      <FieldObject
        :item-row="item"
        :label="label"
        v-if="typeItem(item, ['object'])"
      ></FieldObject>
      <q-separator />
      <FieldsText
        :data="item"
        v-if="typeItem(item, ['string', 'number', 'boolean'])"
      />
    </div>
  </div>
</template>

<script>
import FieldsText from "./fieldText.vue";
import FieldObject from "./fieldObject.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "fieldObject",
  components: { FieldsText, FieldObject },
  props: {
    label: { type: String, default: "" },
    itemRow: {
      default: []
    }
  },
  setup(props) {
    function typeItem(item, type) {
      return type.includes(typeof item);
    }
    return { typeItem };
  }
});
</script>
