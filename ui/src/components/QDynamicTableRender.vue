<template>
  <q-card style="height: calc(100% + 5px) !important" class="full-width">
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section
        class="no-padding no-margin q-pb-xl"
        style="height: calc(100% - 1px) !important; min-width: 445px"
      >
        <q-scroll-area visible style="height: 100% !important" class="q-mb-xl">
          <div class="q-pa-sm" v-for="item in data_filters" :key="item">
            <div class="row">
              <div class="col-12">
                <q-select
                  color="primary"
                  dropdown-icon="add"
                  :prefix="item.label"
                  :disable="selected.length > 0"
                  clearable
                  behavior="dialog"
                  popup-content-class="q-select__dialog"
                  outlined
                  dense
                  @update:model-value="updateData"
                  hide-selected
                  v-model="item.model"
                  :options="item.values"
                  multiple
                  class="q-mb-md"
                  counter
                  :maxlength="item.values.length"
                  map-options
                >
                  <template
                    v-slot:option="{ itemProps, opt, selected, toggleOption }"
                  >
                    <q-item v-bind="itemProps">
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

                <div
                  class="row q-mt-sm"
                  v-for="(i, index) in item.model"
                  :key="i"
                >
                  <div class="col">
                    <q-select
                      clearable
                      outlined
                      color="primary"
                      label-color="white"
                      bg-color="grey-5"
                      behavior="dialog"
                      popup-content-class="my-dialog"
                      :prefix="i.label"
                      v-model="i.model"
                      :options="i.items"
                      @update:model-value="updateData"
                      multiple
                      counter
                      :rules="[(val) => !!val || 'Required']"
                      :maxlength="i.items.length"
                      map-options
                    >
                      <template v-slot:before>
                        <q-btn
                          fab-mini
                          outline
                          icon="delete_outline"
                          color="negative"
                          @click="deleteItem(index, item.model)"
                        >
                        </q-btn>
                      </template>
                      <template v-slot:selected-item="scope">
                        <q-chip
                          removable
                          square
                          @remove="scope.removeAtIndex(scope.index)"
                          :tabindex="scope.tabindex"
                          color="primary"
                          text-color="white"
                          style="width: 100%"
                          class="q-ma-xs q-py-md"
                        >
                          <span class="text-caption">{{ scope.opt }}</span>
                        </q-chip>
                      </template>
                      <template
                        v-slot:option="{
                          itemProps,
                          opt,
                          selected,
                          toggleOption
                        }"
                      >
                        <q-item v-bind="itemProps">
                          <q-item-section>
                            <q-item-label v-html="opt" />
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator vertical />
      <q-card-section style="width: 100%" class="q-pa-xs">
        <div class="row full-width full-height">
          <div class="col-12">
            <q-table
              :rows="dataRows"
              :columns="dataColumns"
              row-key="item"
              dense
              :loading="loading"
              flat
              @selection="updateData"
              separator="vertical"
              hide-pagination
              :pagination="initialPagination"
              style="height: 100%"
              :visible-columns="visibleColumns"
              :selected-rows-label="getSelectedString"
              selection="multiple"
              v-model:selected="selected"
            >
              <template v-slot:body-cell-State="props">
                <q-td :props="props">
                  <div>
                    <q-badge
                      outline
                      :label="props.value"
                      :color="
                        props.value === 'stopped' ? 'negative' : 'positive'
                      "
                    />
                  </div>
                </q-td>
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
                <div>
                  <q-chip square size="21px" class="text-right q-pa-xs">
                    <q-toggle v-model="autoRefresh">
                      <q-tooltip> Auto-Refresh </q-tooltip>
                    </q-toggle>

                    <q-btn
                      color="primary"
                      flat
                      fab-mini
                      :icon="autoRefresh ? 'autorenew' : 'rotate_right'"
                      @click="onRefresh"
                      class="q-ma-none q-pa-none"
                    >
                    </q-btn>
                  </q-chip>
                </div>
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
  name: "QDynamicTableRender",
  props: {
    loading: { type: Boolean, default: false },
    modelValue: {
      type: Object,
      default: {}
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
    }
  },
  emits: ["update:modelValue", "refresh"],
  setup(props, { emit }) {
    const autoRefresh = ref(false);
    const visibleColumns = ref(
      props.dataColumns
        .filter((e) => {
          return e.mutable;
        })
        .map((e) => {
          return e.name;
        })
    );
    const selected = ref([]);
    const data_filters = ref(props.dataFilters);
    function deleteItem(index, item) {
      item.splice(index, 1);
    }
    async function updateData() {
      const data_local = [];
      setTimeout(() => {
        data_filters.value.forEach((element) => {
          element.values.forEach((element_1) => {
            if (element_1.model) {
              if (element_1.model.length > 0) {
                data_local.push({
                  Name: (element_1.prefix || "") + element_1.value,
                  Values: element_1.model
                });
              }
            }
          });
        });
        emit("update:modelValue", {
          InstanceIds: selected.value.map((e) => {
            return e.InstanceId;
          }),
          Filters: data_local
        });
      }, 50);
    }
    function getSelectedString() {
      return selected.value.length === 0
        ? ""
        : `${selected.value.length} record${
            selected.value.length > 1 ? "s" : ""
          } selected of ${props.dataRows.length}`;
    }

    onMounted(() => {
      props.dataRows.map((e, i) => (e.item = i));
      props.modelValue.Filters.forEach((element) => {
        data_filters.value.forEach((element_1) => {
          if (!element_1.model) {
            element_1.model = [];
          }
          element_1.values.forEach((tags) => {
            if (tags.value === element.Name.replace("tag:", "")) {
              tags.model = element.Values;
              element_1.model.push(tags);
            }
          });
        });
      });
    });

    function onRefresh(params) {
      emit("refresh");
    }

    watch(
      () => data_filters.value,
      (newValue) => {
        let updateData = newValue.findIndex((e) => {
          let ff =
            e.model?.filter((element) => {
              return element.model
                ? element.model.length > 0
                  ? false
                  : true
                : false;
            }) || [];
          return ff.length === 0 ? false : true;
        });
        if (autoRefresh.value && updateData === -1) {
          onRefresh();
        }
      },
      { deep: true }
    );

    watch(
      () => selected.value,
      (newValue) => {
        if (newValue.length > 0) {
          props.dataFilters.map((e) => {
            e.model = null;
            e.values.map((a) => {
              a.model = null;
            });
          });
        }
      },
      { deep: true }
    );
    return {
      visibleColumns,
      getSelectedString,
      selected,
      deleteItem,
      updateData,
      data_filters,
      onRefresh,
      autoRefresh,
      initialPagination: {
        page: 0,
        rowsPerPage: 0
      }
    };
  }
});
</script>
