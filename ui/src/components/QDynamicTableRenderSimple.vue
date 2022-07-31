<template>
  <q-card style="height: calc(100% + 5px) !important" class="full-width">
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section style="width: 100%" class="q-pa-xs">
        <div class="row full-width full-height">
          <div class="col-12">
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
              <!-- <template v-slot:body-cell-State="props">
                <q-td :props="props">
                  <div>
                    <q-badge outline :label="props.value" color="primary" />
                  </div>
                </q-td>
              </template> -->

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
                  List Resources
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
                    <q-scroll-area style="height: 350px">
                      <div>
                        <div v-for="item in Object.keys(props.row)" :key="item">
                          <div
                            v-if="
                              typeof props.row[item] === 'object' &&
                              !Array.isArray(props.row[item]) &&
                              Object.keys(props.row[item]).length > 0
                            "
                          >
                            <span class="text-body2 q-pt-md text-weight-bold">{{
                              item
                            }}</span>
                            <div
                              v-for="item2 in Object.keys(props.row[item])"
                              :key="item2"
                            >
                              <q-input
                                class="col-6 q-ml-lg"
                                :label="item2"
                                dense
                                borderless
                                stack-label
                                readonly
                                v-model="props.row[item][item2]"
                              ></q-input>
                            </div>
                          </div>

                          <div
                            v-if="
                              typeof props.row[item] === 'object' &&
                              Array.isArray(props.row[item]) &&
                              props.row[item].length > 0
                            "
                          >
                            <span class="text-body2 q-mt-md text-weight-bold">{{
                              item
                            }}</span>
                            <div
                              v-for="item2 in props.row[item]"
                              :key="item2"
                              class="row"
                            >
                              <div
                                v-for="item3 in Object.keys(item2)"
                                :key="item3"
                              >
                                <q-input
                                  v-if="
                                    typeof item2[item3] === 'string' ||
                                    typeof item2[item3] === 'number'
                                  "
                                  class="col-auto q-ml-xl"
                                  :label="item3"
                                  stack-label
                                  dense
                                  borderless
                                  readonly
                                  v-model="item2[item3]"
                                ></q-input>
                              </div>
                            </div>
                          </div>
                          <q-input
                            v-if="
                              typeof props.row[item] === 'string' ||
                              typeof props.row[item] === 'number' ||
                              typeof props.row[item] === 'boolean'
                            "
                            class="col-auto bg-grey-4 text-white"
                            :label="item"
                            outlined
                            stack-label
                            dense
                            readonly
                            v-model="props.row[item]"
                          ></q-input>
                        </div>
                      </div>
                    </q-scroll-area>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "QDynamicTableRenderSimple",
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

    function onRefresh(params) {
      emit("refresh");
    }

    onMounted(async () => {
      props.dataRows.map((e, i) => (e.item = i));
    });
    return {
      visibleColumns,
      expanded,
      data_filters,
      onRefresh,
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
