<template>
  <q-card style="height: calc(100% + 5px) !important" class="full-width">
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section style="width: 100%" class="q-pa-xs">
        <div class="row full-width full-height">
          <div class="col-12">
            <q-scroll-area
              visible
              style="height: 100% !important"
              class="q-mb-xl"
            >
              <q-table
                :rows="dataRows"
                :columns="dataColumns"
                :row-key="rowIndex"
                dense
                :loading="loading"
                flat
                separator="vertical"
                hide-pagination
                :pagination="initialPagination"
                style="height: 100%"
                :visible-columns="visibleColumns"
                v-model:expanded="expanded"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      {{ col.label }}
                    </q-th>
                  </q-tr>
                </template>
                <template v-slot:top>
                  <span class="text-weight-bold text-primary text-h6">
                    {{ titleQuery }}
                  </span>

                  <q-space />

                  <q-select
                    v-model="visibleColumns"
                    multiple
                    outlined
                    dense
                    options-dense
                    :display-value="$q.lang.table.columns"
                    emit-value
                    map-options
                    :options="dataColumns"
                    option-value="name"
                    options-cover
                    style="min-width: 250px"
                  >
                    <template
                      v-slot:option="{ itemProps, opt, selected, toggleOption }"
                    >
                      <q-item v-bind="itemProps" v-if="opt.mutable">
                        <q-item-section>
                          <q-item-label v-html="opt.label" />
                        </q-item-section>
                        <q-item-section side>
                          <q-toggle
                            :model-value="selected"
                            @update:model-value="toggleOption(opt)"
                          />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-btn
                        size="sm"
                        color="primary"
                        round
                        dense
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'remove' : 'add'"
                      />
                    </q-td>
                    <q-td
                      v-for="col in props.cols"
                      :key="col.name"
                      :props="props"
                    >
                      <div v-if="col.name == 'State'">
                        <q-badge outline :label="col.value" color="primary" />
                      </div>
                      <div v-else>
                        {{ col.value }}
                      </div>
                    </q-td>
                  </q-tr>
                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                      <q-scroll-area visible style="height: 350px">
                        <FieldsExpands :item-row="props.row"></FieldsExpands>
                      </q-scroll-area>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import FieldsExpands from "./fieldsExpands/index.vue";
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "QDynamicTableRenderSimple",
  components: { FieldsExpands },
  props: {
    rowIndex: { type: String, default: "ResourceId" },
    loading: { type: Boolean, default: false },
    modelValue: {
      type: Object,
      default: {
        Filters: [],
        InstanceIds: []
      }
    },
    dataColumns: {
      type: Array,
      default: [
        {
          name: "Name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
          mutable: false
        },
        {
          name: "InstanceId",
          required: true,
          label: "InstanceID",
          align: "left",
          field: (row) => row.InstanceId,
          format: (val) => `${val}`,
          sortable: true,
          mutable: false
        },
        {
          name: "State",
          align: "center",
          label: "State",
          field: (row) => row.State.Name,
          required: true,
          sortable: true,
          mutable: false
        }
      ]
    },
    titleQuery: {
      type: String,
      default: ""
    },
    dataRows: {
      type: Array,
      default: []
    },
    dataFilters: {
      type: Array,
      default: []
    },
    disableAll: {
      type: Boolean,
      default: false
    },
    disableSelection: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "refresh"],
  setup(props, { emit }) {
    const autoRefresh = ref(true);
    const visibleColumns = ref(
      []
      /* En caso de volver a este codigo*/
      // props.dataColumns
      //   .filter((e) => {
      //     return e.mutable;
      //   })
      //   .map((e) => {
      //     return e.name;
      //   })
    );

    const newLabelModel = ref(null);
    const newValueModel = ref(null);
    const expanded = ref([]);
    const data_filters = ref(props.dataFilters);
    let data_local = ref([]);

    onMounted(async () => {
      props.dataRows.map((e, i) => (e.item = i));
    });
    return {
      visibleColumns,
      expanded,
      data_filters,

      autoRefresh,
      newLabelModel,
      newValueModel,
      data_local,
      initialPagination: {
        page: 0,
        rowsPerPage: 0
      }
    };
  }
});
</script>
