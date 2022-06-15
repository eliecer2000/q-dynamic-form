<template>
  <div class="q-pa-md">
    <q-list>
      <q-item-label header>Options</q-item-label>
      <q-item
        v-for="(option, index) in valueComponent.options"
        :key="index"
        dense
      >
        <q-item-section side>
          <q-checkbox
            v-model="option.checked"
            :val="true"
            @input="changeSelected(option.label)"
          />
        </q-item-section>
        <q-item-section>
          <q-input dense v-model="option.label" />
        </q-item-section>
        <q-item-section side>
          <q-btn round flat size="xs" icon="delete" @click="deleteItem(index)"
            ><q-tooltip>Delete this option</q-tooltip></q-btn
          >
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section side>
          <q-checkbox
            v-model="newItem.checked"
            :val="true"
            @input="changeSelected(newItem.label)"
          />
        </q-item-section>
        <q-item-section>
          <q-input dense filled v-model="newItem.label" />
        </q-item-section>
        <q-item-section side>
          <q-btn round size="xs" icon="add" @click="addNewItem"
            ><q-tooltip>Add this option</q-tooltip></q-btn
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const defaultNewItem = () => ({
  checked: false,
  label: ''
})

export default defineComponent({
  name: 'EditableDropdownOptions',
  props: {
    valueComponent: {
      type: Object
    }
  },
  emits: ['addNewItem'],
  setup(props, { emit }) {
    // PROPERTIES
    let newItem = defaultNewItem()

    // METHODS
    const addNewItem = () => {
      emit('addNewItem', newItem)
    }

    const deleteItem = (index) => {
      props.valueComponent.options.splice(index, 1)
    }

    const changeSelected = (label) => {
      newItem.checked = newItem.label === label
      for (const option of props.valueComponent.options) {
        option.checked = option.label === label
      }
    }

    return {
      newItem,
      addNewItem,
      deleteItem,
      changeSelected
    }
  }
})
</script>
