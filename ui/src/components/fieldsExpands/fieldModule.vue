<template>
  <div class="q-ml-md">
    <span class="text-body2 q-pt-md text-weight-bold">{{ label }}</span>
    <span class="text-caption">
      {{ Array.isArray(itemRow) ? " (List)" : " (Object)" }}
    </span>

    <FieldsArray
      :item-row="itemRow"
      :label="label"
      v-if="Array.isArray(itemRow)"
    ></FieldsArray>

    <FieldsObject
      :item-row="itemRow"
      :label="label"
      v-if="!Array.isArray(itemRow)"
    ></FieldsObject>
  </div>
</template>

<script>
import FieldsText from "./fieldText.vue";
import FieldsObject from "./fieldObject.vue";
import FieldsArray from "./fieldArray.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "fieldModule",
  components: { FieldsText, FieldsObject, FieldsArray },
  props: {
    label: { type: String, default: "" },
    itemRow: {
      default: []
    }
  },
  setup(props) {
    function typeItem(item, type) {
      return type.includes(typeof props.itemRow[item]);
    }
    return { typeItem };
  }
});
</script>
