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
          <q-checkbox v-model="option.checked" />
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
          <q-checkbox v-model="newItem.checked" />
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
      <q-item dense>
        <q-checkbox
          v-model="valueComponent.include_other_option"
          label='Include "Other" option'
        />
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
  name: 'EditableCheckboxesOptions',
  props: {
    valueComponent: {
      type: Object
    }
  },
  setup(props) {
    // PROPERTIES
    let newItem = defaultNewItem()

    // METHODS
    const addNewItem = () => {
      if (!props.valueComponent.options) props.valueComponent.options = []
      props.valueComponent.options.push({
        label: newItem.label,
        checked: newItem.checked
      })
      newItem = defaultNewItem()
    }

    const deleteItem = (index) => {
      props.valueComponent.options.splice(index, 1)
    }

    return {
      newItem,
      addNewItem,
      deleteItem
    }
  }
})
</script>
