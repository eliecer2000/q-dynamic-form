<template>
	<div :class="classCol">
		<q-input
			v-if="componentName === 'q-input'"
			v-model="fieldValue"
			v-bind="fieldProps"
			:onkeypress="addItem"
		>
			<template v-if="fieldProps['createlist']" v-slot:append>
				<q-btn round dense flat icon="add" @click="addItem" />
			</template>
		</q-input>

		<q-select
			v-if="componentName === 'q-select'"
			v-model="fieldValue"
			v-bind="fieldProps"
		/>

		<q-toggle
			v-if="componentName === 'q-toggle'"
			v-model="fieldValue"
			v-bind="fieldProps"
		/>

		<q-separator
			v-if="componentName === 'q-separator'"
			spaced
			color="accent"
		/>

		<template v-if="fieldProps['createlist']">
			<q-chip
				v-for="(item, index) in itemlist"
				:key="`${index}-itemlist`"
				removable
				color="red"
				text-color="white"
				@remove="() => deleteItem(index)"
			>
				<q-avatar>
					{{ index + 1 }}
				</q-avatar>
				{{ item }}
			</q-chip>
		</template>
	</div>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue';
export default defineComponent({
	name: 'FieldDynamic',
	props: {
		/* Propiedades que definen al campo y a los atributos del mismo */
		setProperties: {
			type: Object,
		},
		/* Valor que tendrá el campo en el formulario */
		initValue: {
			type: String,
			default: '',
		},
		/* Modificar propiedades del campo como: disable, readonly */
		stateFields: {
			type: Object,
			default: {},
		},
		/* Modificar propiedades del campo como: disable, readonly */
		optionsSelect: {
			type: Object,
			default: {},
		},
		/* Clases para organizar los campos */
		columnClassField: {
			type: String,
			default: "",
		}
	},
	emits: ['data'],
	setup(props, { emit }) {
		/* Estilo de la columna que contiene al campo */
		const classCol = `col-12 ${props.columnClassField}`

		/* Valor inicial del campo */
		const fieldValue = ref(props.initValue);

		/* En caso de definir al campo como una lista, se genera elementos en un arreglo que se devuelve como respuesta */
		const itemlist = ref([]);

		/* Crear item de la lista */
		const addItem = e => {
			if (
				(e.keyCode === undefined || e.keyCode === 13) &&
				fieldValue.value.length > 0
			) {
				itemlist.value.push(fieldValue.value.trim());
				fieldValue.value = '';

				emit('data', {
					[`${fieldPropsDefault['name']}`]: itemlist.value,
				});
			}
		};

		/* Eliminar elemento de la lista */
		const deleteItem = index => {
			itemlist.value.splice(index, 1);
		};

		/* Lista ordenada ASC */
		const orderedItemList = computed(() => {
			const list = [...itemlist.value];
			list.sort();
			return list;
		});

		/* Armado de atributos del campo */
		const fieldPropsDefault = props.setProperties;

		/* Se altualizar los estados */
		const fieldProps = computed(() => {
			const result = { ...fieldPropsDefault };

			if (props.stateFields[`disable_${fieldPropsDefault.name}`])
				result.disable =
					props.stateFields[`disable_${fieldPropsDefault.name}`];

			if (props.stateFields[`readonly_${fieldPropsDefault.name}`])
				result.readonly =
					props.stateFields[`readonly_${fieldPropsDefault.name}`];

			if (props.stateFields[`rules_${fieldPropsDefault.name}`])
				result.rules =
					props.stateFields[`rules_${fieldPropsDefault.name}`];

			if (props.optionsSelect[fieldPropsDefault.name]) {
				result.options = props.optionsSelect[fieldPropsDefault.name];
			}

			return result;
		});

		/* Cual componente de quasar llamar */
		const componentName = computed(() => {
			/* Usar variable global luego */
			if (
				[
					'text',
					'password',
					'textarea',
					'email',
					'file',
					'number',
					'url',
					'time',
					'date',
				].includes(fieldProps.value.type)
			)
				return 'q-input';

			if (fieldProps.value.type === 'select') return 'q-select';

			if (fieldProps.value.type === 'toggle') return 'q-toggle';

			if (fieldProps.value.type === 'separator') return 'q-separator';
		});

		/* Se devuelve el valor del campo con cada cambio */
		watch(fieldValue, newValue => {
			/* Si el campo no es para crear lista, se envia su contenido */
			if (!fieldProps.value['createlist']) {
				emit('data', { [fieldPropsDefault['name']]: newValue });
			}
		});

		return {
			classCol,
			fieldProps,
			fieldValue,
			componentName,

			addItem,
			deleteItem,
			itemlist,
			orderedItemList,
		};
	},
});
</script>
