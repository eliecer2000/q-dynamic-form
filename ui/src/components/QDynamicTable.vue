<template>
  <q-card style="height: calc(100% + 5px) !important" class="full-width" flat>
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section
        class="no-padding no-margin q-pb-xl"
        style="height: calc(100% - 1px) !important; min-width: 325px"
      >
        <q-scroll-area visible style="height: 100% !important" class="q-mb-xl">
          <q-list class="q-ma-sm" separator>
            <q-item v-for="item in localModelValues" :key="item">
              <q-item-section>
                <q-item-label class="text-body1 text-weight-bold">
                  <q-input
                    readonly
                    borderless
                    hide-bottom-space
                    dense
                    v-model="item.label"
                    label-color="primary"
                    input-class="text-weight-bold text-body1"
                    label="Label"
                  />
                  <q-input
                    readonly
                    borderless
                    hide-bottom-space
                    dense
                    label-color="primary"
                    v-model="item.name"
                    label="Name"
                  />

                  <q-input
                    borderless
                    readonly
                    hide-bottom-space
                    dense
                    label-color="primary"
                    v-model="item.expression"
                    label="Expression"
                  >
                  </q-input>
                  <q-select
                    borderless
                    readonly
                    hide-bottom-space
                    hide-dropdown-icon
                    label-color="primary"
                    v-model="item.align"
                    :options="optionsAlign"
                    label="Align"
                  />

                  <q-list class="full-width no-margin no-padding">
                    <q-item class="no-padding">
                      <q-item-section class="q-pa-none q-ma-none">
                        <q-item-label class="text-subtitle2"
                          >Required</q-item-label
                        >
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.required"
                          color="primary"
                          disable
                          dense
                        />
                      </q-item-section>
                    </q-item>

                    <q-item class="no-padding">
                      <q-item-section>
                        <q-item-label class="text-subtitle2"
                          >Sortable</q-item-label
                        >
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.sortable"
                          color="primary"
                          disable
                          dense
                        />
                      </q-item-section>
                    </q-item>

                    <q-item class="no-padding">
                      <q-item-section>
                        <q-item-label class="text-subtitle2"
                          >Mutable</q-item-label
                        >
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.mutable"
                          color="primary"
                          disable
                          dense
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <q-separator vertical />
      <q-card-section style="width: 100%" class="q-pa-xs">
        <q-table
          flat
          title="Example Table"
          :rows="dataRows"
          :columns="modelValue"
          row-key="name"
          dense
          hide-pagination
          hide-selected-banner
          separator="cell"
          hide-no-data
        >
          <template v-slot:body-cell-State="props">
            <q-td :props="props">
              <div>
                <q-badge outline :label="props.value" color="primary" />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
const nn = (a) => {
  return a["State"] || null;
};

import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "QDynamicTable",
  props: {
    dataRows: {
      type: Array,
      default: []
    },
    modelValue: {
      type: Array,
      default: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          format: (val) => `${val}`,
          expression: "(row) => row.name",
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true
        },
        {
          name: "InstanceId",
          required: true,
          label: "InstanceID",
          align: "left",
          expression: "(row) => row.InstanceId",
          format: (val) => `${val}`,
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true
        },
        {
          name: "State",
          align: "center",
          label: "State",
          field: "State",
          format: (val) => `${val}`,
          expression: '(row) => row["State"]["Name"]',
          required: true,
          sortable: true,
          mutable: false,
          no_editable: true
        }
      ]
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const localModelValues = ref(props.modelValue);
    localModelValues.value.map((val) => {
      if (val.expression) {
        val.field = eval(val.expression);
      }
    });

    return {
      localModelValues,
      optionsAlign: ref(["left", "right", "center"])
    };
  }
});
</script>
