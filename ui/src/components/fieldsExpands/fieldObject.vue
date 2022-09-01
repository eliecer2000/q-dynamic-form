<template>
  <div class="q-ml-md">
    <div v-for="item in Object.keys(itemRow)" :key="item">
      <FieldsText
        :label="item"
        :data="itemRow[item]"
        v-if="typeItem(item, ['string', 'number', 'boolean'])"
      />
    </div>
  </div>
</template>

<script>
import FieldsText from "./fieldText.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "fieldModule",
  components: { FieldsText },
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
