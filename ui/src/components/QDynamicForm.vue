<template>
  <div class="full-width">
    <q-dialog
      v-model="activateModaAddField"
      persistent
      position="bottom"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white text-primary" v-if="activateModaAddField">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row q-pa-lg">
          <div class="text-h6 col-12">Campos Disponibles</div>
          <div
            class="col-12 col-md-6 q-pa-sm"
            v-for="(sourceField, idx) in sourceFields"
            :key="idx"
          >
            <q-btn
              class="full-width"
              color="primary"
              outline
              no-caps
              v-close-popup
              :icon="sourceField.icon"
              :label="sourceField.label"
              @click="createInput(sourceField.type)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-card flat class="full-width" style="min-height: 100% !important">
      <q-card-section class="no-padding no-margin bg-primary text-white">
        <div class="text-h6 text-center">Generador de Formularios</div>
      </q-card-section>
      <q-card-section
        horizontal
        class="full-width q-py-none"
        style="height: calc(100% - 35px) !important; position: absolute"
      >
        <q-card-section class="col-6">
          <q-scroll-area style="height: 100% !important">
            <draggable :list="fields" group="elements" @change="onChange">
              <div
                v-for="(field, index) in fields"
                :key="`${index}-input`"
                class="row"
              >
                <div class="col">
                  <component :is="'FieldDynamic'" :setProperties="field" />
                </div>
                <div class="col-auto q-mt-sm">
                  <q-btn
                    v-if="field.type !== 'separator'"
                    flat
                    round
                    color="blue-9"
                    icon="edit_note"
                    @click="() => selectForEdit(field)"
                  />
                  <q-btn
                    flat
                    round
                    color="negative"
                    icon="delete"
                    @click="() => deleteField(index)"
                  />
                  <q-btn
                    flat
                    round
                    color="grey-10"
                    icon="content_copy"
                    @click="() => duplicateField(index)"
                  />
                </div>
              </div>
            </draggable>
          </q-scroll-area>
        </q-card-section>
        <q-separator vertical />

        <q-card-section class="col-6 q-pa-none">
          <div
            class="row q-gutter-x-sm text-center q-mb-md absolute-top-right q-mt-md q-mr-md"
            style="z-index: 1"
          >
            <div class="col-auto">
              <q-btn
                v-if="!showButtonAdd ? showButtonAdd : true"
                fab-mini
                icon="add"
                color="primary"
                @click="openModaAddField"
                ><q-tooltip>Agregar campo</q-tooltip></q-btn
              >
            </div>
            <div class="col-auto">
              <q-btn
                fab-mini
                icon="view_list"
                color="primary"
                @click="render = true"
                :disable="fields.length === 0"
                ><q-tooltip>View Render Field</q-tooltip></q-btn
              >
            </div>

            <div v-if="showButtonCopy" class="col-auto">
              <q-btn
                fab-mini
                color="primary"
                @click="copyClipboard"
                icon="content_copy"
                ><q-tooltip>Copy Results</q-tooltip></q-btn
              >
            </div>
          </div>
          <q-scroll-area
            style="height: 100% !important"
            class="text-caption bg-dark pre-format text-white q-pl-md"
          >
            <div v-if="fields.length">
              <pre>{{ fields }}</pre>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-drawer v-model="render" :width="762" overlay bordered class="bg-grey-3">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" @click="render = false">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card
        v-if="render"
        flat
        class="no-margin no-padding"
        style="width: 760px; height: calc(100vh - 40px)"
      >
        <q-scroll-area style="height: calc(100% - 30px)">
          <q-card-section class="q-pt-sm q-mb-lg">
            <div class="text-h6 q-my-sm">Ejemplo de la Vista</div>
            <div class="q-form-container">
              <QDynamicRender :fields="fields" />
            </div>
          </q-card-section>
        </q-scroll-area>
      </q-card>
    </q-drawer>

    <q-dialog
      v-model="activateModalWithForm"
      persistent
      transition-show="slide-left"
      transition-hide="slide-right"
      position="right"
    >
      <q-card v-if="activateModalWithForm">
        <q-card-section class="q-pt-md">
          <FormForInput
            v-if="inputOptions.includes(currentField.type)"
            :fieldConfiguration="currentField"
            @cancelCreation="cancelCreation"
            @cancelEdition="cancelEdition"
            @processCreation="processCreation"
          />
          <FormForSelect
            v-if="currentField.type === 'select'"
            :fieldConfiguration="currentField"
            @cancelCreation="cancelCreation"
            @cancelEdition="cancelEdition"
            @processCreation="processCreation"
          />
          <FormForToggle
            v-if="currentField.type === 'toggle'"
            :fieldConfiguration="currentField"
            @cancelCreation="cancelCreation"
            @cancelEdition="cancelEdition"
            @processCreation="processCreation"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, defineComponent, onBeforeMount, watch } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

import FormForInput from "./FormForInput.vue";
import FormForSelect from "./FormForSelect.vue";
import FormForToggle from "./FormForToggle.vue";
import FieldDynamic from "./FieldDynamic.vue";
import QDynamicRender from "./QDynamicRender.vue";

import {
  inputTypes as inputOptions,
  propertiesAvailableToModify as mutableProperties
} from "./utils";

export default defineComponent({
  name: "QDynamicForm",
  components: {
    FieldDynamic,
    FormForInput,
    FormForSelect,
    FormForToggle,
    QDynamicRender,

    draggable: VueDraggableNext
  },
  props: {
    showButtonAdd: {
      type: Boolean,
      default: false
    },
    showButtonCopy: {
      type: Boolean,
      default: false
    },
    navPosition: {
      type: String,
      default: "left"
    },
    fieldIdName: {
      type: String,
      default: "_id"
    },
    valueComponent: {
      required: true,
      type: Array
    },
    sourceFields: {
      type: Array,
      required: false,
      default: () => [
        {
          type: "text",
          icon: "font_download",
          label: "Campo tipo input"
        },
        { type: "toggle", icon: "edit_attributes", label: "Toggle" },
        {
          type: "select",
          icon: "arrow_drop_down_circle",
          label: "Dropdown"
        },
        {
          type: "separator",
          icon: "view_agenda",
          label: "Section Break"
        }
      ]
    }
  },
  emits: ["input"],
  setup(props, { emit }) {
    /* DATA */
    const activateModaAddField = ref(false);
    const fields = ref(props.valueComponent);
    const currentField = ref(null);

    const showButtonCopy = ref(props.showButtonCopy);

    const showButtonAdd = ref(props.showButtonAdd);

    let render = ref(false);
    let activateModalWithForm = ref(false);

    /* Modal para el tipo de campo a agregar campo nuevo */
    function openModaAddField() {
      activateModaAddField.value = true;
    }

    /* Se crea un objeto para el input que se va a crear*/
    const createInput = (type) => {
      const newInput = { type };
      /* Se registra el objeto del nuevo input */
      fields.value.push(newInput);
      if (type !== "separator") {
        /* Se envia la referencia del objeto creado para que sea editado */
        currentField.value = newInput;

        activateModalWithForm.value = true;
      }
    };

    /* Editar campo existente */
    const selectForEdit = (field) => {
      /* Se envia la referencia del objeto para que sea editado */
      currentField.value = field;
      activateModalWithForm.value = true;
    };

    /* Al procesar la creacion, reseteamos para la proxima creacion */
    const processCreation = () => {
      activateModalWithForm.value = false;
      currentField.value = null;
    };

    /* Cancelar la creacion del campo */
    const cancelCreation = () => {
      activateModalWithForm.value = false;
      currentField.value = null;

      /* Eliminamos ultimo registro ya que canceló */
      fields.value.pop();
    };

    /* Cancelar la edicion del campo */
    const cancelEdition = () => {
      activateModalWithForm.value = false;
      currentField.value = null;
    };

    /* Borrar campo */
    const deleteField = (index) => {
      let newFields = [...fields.value];
      fields.value = [];
      newFields.splice(index, 1);
      /* Para refrescar el render del formulario */
      setTimeout(() => (fields.value = newFields), 5);
    };

    /* Duplicar campo y editar */
    const duplicateField = (index) => {
      let newFields = JSON.parse(
        JSON.stringify([...fields.value, fields.value[index]])
      );
      fields.value = [];
      /* Para refrescar el render del formulario */
      setTimeout(() => {
        fields.value = newFields;
        /* Se manda a editar */
        selectForEdit(newFields[newFields.length - 1]);
      }, 5);
    };

    /* Se refresca el array de campos para que se vea los cambios */
    const onChange = () => {
      let newFields = [...fields.value];
      fields.value = [];

      /* Para refrescar el render del formulario */
      setTimeout(() => (fields.value = newFields), 5);
    };

    /* Copiar en el portapapeles */
    const copyClipboard = () => {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(JSON.stringify(fields.value));
    };

    watch(
      () => fields.value,
      (newValue) => {
        emit("input", newValue);
      },
      { deep: true }
    );

    onBeforeMount(() => {
      if (!fields.value || !(fields.value instanceof Array)) {
        fields.value = [];
      }
    });

    return {
      showButtonCopy,
      showButtonAdd,
      mutableProperties,
      render,
      selectForEdit,
      onChange,
      duplicateField,
      deleteField,
      inputOptions,
      fields,
      currentField,
      activateModaAddField,
      activateModalWithForm,
      openModaAddField,
      createInput,
      cancelCreation,
      cancelEdition,
      processCreation,
      copyClipboard
    };
  }
});
</script>
