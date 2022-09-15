<template>
  <q-card style="height: 510px !important" class="full-width" flat>
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section
        class="no-padding no-margin q-pb-xl"
        style="height: calc(100% - 1px) !important; min-width: 445px"
      >
        <q-scroll-area visible style="height: 100% !important" class="q-mb-xl">
          <div class="q-pa-sm" v-for="item in data_filters" :key="item.label">
            <div class="row">
              <div class="col-12">
                <q-select
                  color="primary"
                  dropdown-icon="add"
                  :prefix="item.label"
                  :disable="selected.length > 0 || disableAll"
                  :behavior="item.values.length > 0 ? 'dialog' : 'menu'"
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
                  <template v-slot:no-option>
                    <div class="q-pt-md bg-grey-3">
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          <q-input
                            outlined
                            ref="newLabel"
                            v-model="newLabelModel"
                            label="New Tag Name"
                            :rules="[
                              (val) => !!val || 'Required',
                              (val) =>
                                /^\S+$/.test(val) ||
                                'A string consisting only of non-whitespaces'
                            ]"
                          />
                        </q-item-section>
                        <q-item-section
                          class="justify-start"
                          avatar
                          style="justify-content: flex-start !important"
                        >
                          <q-btn
                            icon="bookmark_add"
                            fab
                            no-caps
                            color="primary"
                            v-close-popup
                            @click="addTag(item)"
                          >
                          </q-btn>
                        </q-item-section>
                      </q-item>
                    </div>
                  </template>
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
                      outlined
                      color="primary"
                      label-color="white"
                      bg-color="grey-5"
                      :behavior="i.items.length > 0 ? 'dialog' : 'menu'"
                      popup-content-class="my-dialog"
                      :prefix="i.label"
                      v-model="i.model"
                      :options="i.items"
                      @update:model-value="updateData"
                      :disable="selected.length > 0 || disableAll"
                      multiple
                      counter
                      :rules="[(val) => !!val || 'Required']"
                      :maxlength="i.items.length"
                      map-options
                    >
                      <template v-slot:no-option>
                        <div class="q-pt-md bg-grey-3">
                          <q-item>
                            <q-item-section class="text-italic text-grey">
                              <q-input
                                outlined
                                ref="newLabel"
                                v-model="newValueModel"
                                label="New Tag Value"
                                :rules="[
                                  (val) => !!val || 'Required',
                                  (val) =>
                                    /^\S+$/.test(val) ||
                                    'A string consisting only of non-whitespaces'
                                ]"
                              />
                            </q-item-section>
                            <q-item-section
                              class="justify-start"
                              avatar
                              style="justify-content: flex-start !important"
                            >
                              <q-btn
                                icon="sell"
                                fab
                                no-caps
                                color="primary"
                                v-close-popup
                                @click="addTagValue(i)"
                              >
                              </q-btn>
                            </q-item-section>
                          </q-item>
                        </div>
                      </template>
                      <template v-slot:before>
                        <q-btn
                          fab-mini
                          outline
                          icon="delete_outline"
                          color="negative"
                          :disable="disableAll"
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
        <div class="row full-width">
          <div class="col-12">
            <div style="display: none">
              {{ selected }}
            </div>
            <q-table
              :rows="dataRows"
              :columns="dataColumns"
              :row-key="rowIndex"
              dense
              :loading="loading"
              flat
              @selection="updateData"
              separator="vertical"
              v-model:selected="selected"
              :pagination="initialPagination"
              style="height: 100%; max-height: 500px"
              :visible-columns="visibleColumns"
              :selected-rows-label="getSelectedString"
              :selection="
                disableSelection || disableAll || getstateRow()
                  ? 'none'
                  : 'multiple'
              "
            >
              <template v-slot:body-cell-State="props">
                <q-td :props="props">
                  <div>
                    <q-badge outline :label="props.value" color="primary" />
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
    const selected = ref([]);
    const data_filters = ref(props.dataFilters);
    function deleteItem(index, item) {
      item[index].model = null;
      item.splice(index, 1);
      updateData();
    }
    let data_local = ref([]);

    function updateData() {
      data_local.value = [];
      setTimeout(() => {
        data_filters.value.forEach((element) => {
          element.values.forEach((element_1) => {
            if (element_1.model) {
              if (element_1.model.length > 0) {
                data_local.value.push({
                  Name: (element_1.prefix || "") + element_1.value,
                  Values: element_1.model
                });
              }
            }
          });
        });
        emit("update:modelValue", {
          InstanceIds: selected.value.map((e) => {
            return e[props.rowIndex];
          }),
          Filters: data_local.value
        });
      }, 500);
    }
    function getSelectedString() {
      return selected.value.length === 0
        ? ""
        : `${selected.value.length} record${
            selected.value.length > 1 ? "s" : ""
          } selected of ${props.dataRows.length}`;
    }
    function onRefresh(params) {
      updateData();
      emit("refresh");
    }
    function addTag(item) {
      let tag = {
        prefix: "tag:",
        label: newLabelModel.value,
        value: newLabelModel.value,
        model: null,
        items: []
      };

      item.values.push(tag);
      item.model = typeof item.models === "array" ? item.model : [];
      item.model.push(tag);

      newLabelModel.value = null;
    }

    function addTagValue(item) {
      item.items.push(newValueModel.value);
      item.model = typeof item.models === "array" ? item.model : [];
      item.model.push(newValueModel.value);
      newLabelModel.value = null;
      updateData();
    }

    function getstateRow() {
      if (data_local.value.length > 0) {
        return true;
      } else {
        setTimeout(() => {
          return false;
        }, 1000);
      }
    }

    watch(
      () => data_filters.value,
      async (newValue) => {
        let updateData = newValue.filter((e) => {
          if (e.model?.length > 0) {
            let ff = e.model.filter((element) => {
              return element.model?.length > 0 ? false : true;
            });
            return ff.length === 0 ? false : true;
          }
          return false;
        });
        if (
          autoRefresh.value &&
          updateData.length === 0 &&
          selected.value.length === 0
        ) {
          setTimeout(() => {
            onRefresh();
          }, 800);
        }
      },
      { deep: true }
    );

    watch(
      () => selected.value,
      async (newValue) => {
        if (newValue.length > 0) {
          props.dataFilters.map((e) => {
            e.model = null;
            e.values.map((a) => {
              a.model = null;
            });
          });
        } else {
          if (data_local.value.length === 0) {
            setTimeout(() => {
              onRefresh();
            }, 800);
          }
        }
      },
      { deep: true }
    );
    onMounted(async () => {
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
      props.modelValue.InstanceIds.forEach((element) => {
        props.dataRows.map((e) => {
          if (e[props.rowIndex] === element) {
            selected.value.push(e);
          }
        });
      });
    });
    return {
      visibleColumns,
      getSelectedString,
      selected,
      deleteItem,
      updateData,
      data_filters,
      onRefresh,
      autoRefresh,
      newLabelModel,
      addTag,
      addTagValue,
      newValueModel,
      getstateRow,
      data_local,
      initialPagination: {
        page: 0,
        rowsPerPage: 0
      }
    };
  }
});
</script>
