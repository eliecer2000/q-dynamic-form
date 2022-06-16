<template>
  <div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
    <div class="col-12">
      COMPORTAMIENTO DE COMPONENTE
      <q-input
        filled
        ref="variableRef"
        v-model="valueElement"
        :hint="hint ? hint : ''"
        :type="innerValue.fiel_type"
        :label="getLabel"
        :debounce="debounce"
        @blur="onBlur"
        :clearable="innerValue.clearable"
        :readonly="
          innerValue.readonly_name ? state[innerValue.readonly_name] : null
        "
        :disable="
          innerValue.disabled_name ? state[innerValue.disabled_name] : null
        "
        :rules="
          innerValue.required ? [(val) => !!val || 'Field is required'] : []
        "
      >
        <template v-slot:prepend>
          <q-icon name="font_download" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, watch, ref } from "vue";
import { useFormElement } from "./../js/FormElement";
export default defineComponent({
  name: "TextElement",
  props: {
    innerValue: {
      type: Object
    },
    state: {
      type: Object
    },
    initValue: {
      type: Object,
      default: {}
    }
  },
  emits: ["data"],
  setup(props, { emit }) {
    const { getLabel, hint, debounce, value, isValidString } = useFormElement(
      props.innerValue
    );
    let variableRef = ref(null);
    let valueElement = ref(
      props.initValue[props.innerValue.field_name]
        ? props.initValue[props.innerValue.field_name]
        : null
    );
    function onBlur() {
      variableRef.value.validate();
      setTimeout(() => {
        emitData();
      }, 100);
    }

    watch(
      () => valueElement.value,
      (newValue) => {
        variableRef.value.validate();
        setTimeout(() => {
          emitData(newValue);
        }, 100);
      },
      { deep: true }
    );

    watch(
      () => props.state,
      () => {
        variableRef.value.validate();
        setTimeout(() => {
          emitData();
        }, 100);
      },
      { deep: true }
    );

    function emitData(arg) {
      emit("data", {
        [props.innerValue.field_name]: {
          error: variableRef.value.hasError,
          value: arg ? arg : valueElement.value,
          readonly: props.innerValue.readonly_name
            ? props.state[props.innerValue.readonly_name] || false
            : false,
          disabled: props.innerValue.disabled_name
            ? props.state[props.innerValue.disabled_name] || false
            : false
        }
      });
    }

    onMounted(() => {
      emitData();
    });

    return {
      variableRef,
      value,
      debounce,
      getLabel,
      hint,
      isValidString,
      onBlur,
      valueElement
    };
  }
});
</script>
