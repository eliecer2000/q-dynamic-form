<template>
  <q-form v-if="value" @:submit.prevent class="q-gutter-y-sm">
    <div class="text-right">
      <q-chip square dense :icon="typeIcon" class="text-uppercase q-pa-md">{{
        typeName
      }}</q-chip>
    </div>

    <q-input
      v-model="value.element_ref"
      placeholder="Reference"
      label="Reference"
      borderless
      filled
      :rules="[(val) => CheckValid(val) || 'No puede tener espacios']"
    />

    <q-input
      ref="nameRef"
      v-model="value.field_name"
      placeholder="fieldValue"
      label="Field Value Name"
      borderless
      filled
      :rules="[
        (val) => !!val || 'Field is required',
        (val) => CheckValid(val) || 'No puede tener espacios'
      ]"
    />

    <q-input
      ref="labelRef"
      v-model="value.label"
      placeholder="Label"
      label="Label to display"
      borderless
      filled
      :rules="[
        (val) => val !== 'Untitled' || 'Debe colocar un nombre diferente'
      ]"
    />

    <q-input
      v-model="value.readonly_name"
      placeholder="readonlyValue"
      label="ReadOnly Value Name"
      borderless
      filled
      :rules="[(val) => CheckValid(val) || 'No puede tener espacios']"
    />

    <q-input
      v-model="value.disabled_name"
      placeholder="disabledValue"
      label="Disabled Value Name"
      borderless
      filled
      :rules="[(val) => CheckValid(val) || 'No puede tener espacios']"
    />

    <q-input
      v-model="value.field_options.description"
      type="textarea"
      autogrow
      label="A longer description to display"
      borderless
      filled
    />

    <q-toggle
      v-model="value.required"
      label="Required"
      v-if="ifNotTypes(['section_break', 'page_break'])"
    />

    <q-toggle
      v-model="value.clearable"
      label="Clearable"
      v-if="ifNotTypes(['section_break', 'page_break'])"
    />

    <editable-checkboxes-options
      v-model="value.field_options"
      v-if="ifType('checkboxes')"
    />
    <editable-radio-options
      v-model="value.field_options"
      v-if="ifType('radio')"
    />
    <editable-dropdown-options
      :value-component="value.field_options"
      v-if="ifType('dropdown')"
      @add-new-item="addNewItem"
    />
  </q-form>
</template>

<script>
import EditableCheckboxesOptions from "./EditableCheckboxesOptions.vue";
import EditableRadioOptions from "./EditableRadioOptions.vue";
import EditableDropdownOptions from "./EditableDropdownOptions.vue";
import { defineComponent, computed, onMounted, ref, watch } from "vue";
import { string } from "css-tree/lib/lexer/generic";

export default defineComponent({
  name: "EditableElementOptions",
  components: {
    EditableCheckboxesOptions,
    EditableRadioOptions,
    EditableDropdownOptions
  },
  props: {
    value: {
      type: Object
    },
    typeInfo: {
      type: Array
    }
  },
  emits: ["error"],
  setup(props, { emit }) {
    const nameRef = ref(null);
    const labelRef = ref(null);

    watch(
      () => props.value,
      () => {
        validateField();
      },
      { deep: true }
    );

    function validateField() {
      nameRef.value.validate();
      labelRef.value.validate();
      if (nameRef.value.hasError || labelRef.value.hasError) {
        emit("error", true);
      } else {
        emit("error", false);
      }
    }

    // COMPUTED
    const typeName = computed(() => {
      return getTypeInfo().label;
    });

    const typeIcon = computed(() => {
      return getTypeInfo().icon;
    });

    // METHODS
    const ifType = (type) => {
      return props.value.field_type === type;
    };

    const ifNotTypes = (types) => {
      if (!Array.isArray(types)) {
        types = [types];
      }
      return types.indexOf(props.value.field_type) < 0;
    };

    function CheckValid(str) {
      let re = /^\S+$/;
      return typeof str === "string" && str.length > 0 ? re.test(str) : true;
    }

    const getTypeInfo = () => {
      for (let index = 0; index < props.typeInfo.length; index++) {
        if (props.typeInfo[index].type === props.value.field_type) {
          return props.typeInfo[index];
        }
      }
      return false;
    };
    const addNewItem = (obj) => {
      props.value.field_options.options.push({
        label: obj.label,
        checked: obj.checked
      });
      obj.label = "";
    };

    onMounted(() => {
      validateField();
    });

    return {
      CheckValid,
      nameRef,
      labelRef,
      typeName,
      typeIcon,
      ifType,
      ifNotTypes,
      getTypeInfo,
      addNewItem
    };
  }
});
</script>
