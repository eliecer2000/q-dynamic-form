<template>
  <q-page>
    <div class="q-pa-md">
      <QDynamicForm
        style="min-height: calc(100vh - 410px); height: calc(100vh - 410px)"
        :valueComponent="fields"
        @input="input"
        show-button-copy
        :show-button-add="true"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const fields = ref([
      {
        type: "toggle",
        label: "Activar",
        name: "active",
        "true-value": "true",
        "false-value": "false",
        disable: false,
        ref: "ref_active",
      },
      {
        type: "select",
        ref: "ref_team",
        label: "Equipo de beisbol",
        name: "team",
        hint: "",
        multiple: true,
        "use-input": false,
        clearable: false,
        outlined: true,
        // 'emit-value': true,
        "option-value": "code",
        "option-label": "teamName",
      },
      {
        type: "text",
        ref: "ref_username",
        label: "Nombre de usuario",
        name: "username",
        hint: "",
        maxlength: "",
        autofocus: false,
        clearable: false,
        outlined: true,
        createlist: false,
      },
      {
        type: "select",
        ref: "ref_fffffffffff",
        label: "ffffff",
        name: "fffffffffff",
        hint: "ggggggggggggggggggggggggggg",
        multiple: false,
        "use-input": false,
        clearable: true,
        outlined: true,
        options: [
          {
            label: "ffffffff",
            value: "ddfdfsd",
          },
          {
            label: "fdfsdfsdf",
            value: "fgsdfgsdg",
          },
        ],
        "emit-value": false,
      },
    ]);
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
