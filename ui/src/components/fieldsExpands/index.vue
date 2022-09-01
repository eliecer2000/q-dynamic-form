<template>
  <div>
    <div v-for="item in Object.keys(itemRow)" :key="item">
      <FieldsText
        :label="item"
        :data="itemRow[item]"
        v-if="typeItem(item, ['string', 'number', 'boolean'])"
      />
      <fieldModule
        :label="item"
        :item-row="itemRow[item]"
        v-if="typeItem(item, ['object'])"
      />
    </div>
  </div>
</template>

<script>
import FieldsText from "./fieldText.vue";
import fieldModule from "./fieldModule.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "FieldsExpandedComponent",
  components: { FieldsText, fieldModule },
  props: {
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
