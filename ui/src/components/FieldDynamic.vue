<template>
	<div :class="classCol">
		<q-input
			v-if="componentName === 'q-input'"
			v-model="fieldValue"
			v-bind="fieldProps"
			:onkeypress="addItem"
		>
			<template v-if="fieldProps['information']" v-slot:prepend>
				<q-btn round dense flat icon="info">
					<q-tooltip
						anchor="bottom right"
						self="top left"
						:offset="[0, -10]"
						class="text-body1"
						max-width="250px"	
					>
						{{fieldProps['information']}}
					</q-tooltip>
				</q-btn>
			</template>

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
import { defineComponent, onMounted, computed, watch, ref } from 'vue';
import {
	inputTypes,
	propertiesAvailableToModify as mutableProperties,
} from './utils';

export default defineComponent({
	name: 'FieldDynamic',
	props: {
		/* Propiedades que definen al campo y a los atributos del mismo */
		setProperties: {
			type: Object,
		},
		/* Valor que tendrá el campo en el formulario */
		initValue: {
			type: [String, Object, Boolean],
		},
		/* Modificar propiedades del campo como: disable, readonly */
		stateFields: {
			type: Object,
			default: {},
		},
		/* Modificar las opciones del campoo select */
		optionsSelect: {
			type: Object,
			default: {},
		},
		/* Clases para organizar los campos */
		columnClassField: {
			type: String,
			default: '',
		},
	},
	emits: ['data'],
	setup(props, { emit }) {
		/* Estilo de la columna que contiene al campo */
		const classCol = `col ${props.columnClassField}`;

		/* Valor inicial del campo */
		const fieldValue = ref(null);

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

		/* Se actualizan algunas propiedades */
		const fieldProps = computed(() => {
			const result = { ...fieldPropsDefault };

			/* Propiedades que se pueden modificar mutableProperties */
			mutableProperties.forEach(prop => {
				/* 
					Se valida si las keys estan entre las disponibles para modificar.
					Por ejemplo: error_username, siendo username el nombre definido 
					para campo. Si se cumple la condicion se devuelve el valor de la
					key recibida en la propiedades que le corresponde.
				*/
				if (props.stateFields[`${prop}_${fieldPropsDefault.name}`])
					result[prop] =
						props.stateFields[`${prop}_${fieldPropsDefault.name}`];
			});

			if (props.optionsSelect[fieldPropsDefault.name]) {
				result.options = props.optionsSelect[fieldPropsDefault.name];
			}

			return result;
		});

		/* Cual componente de quasar llamar */
		const componentName = computed(() => {
			/* Se evalua si el valor de la key type se encuentra en inputTypes */
			if (inputTypes.includes(fieldProps.value.type)) return 'q-input';

			if (fieldProps.value.type === 'select') return 'q-select';

			if (fieldProps.value.type === 'toggle') return 'q-toggle';

			if (fieldProps.value.type === 'separator') return 'q-separator';
		});

		/* Devuelve el valor del campo con cada cambio */
		watch(fieldValue, newValue => {
			/* 
				Se retorna el valor del campo con cada cambio que se hace.
				Pero si el campo se usa para crear un arregle de valores,
				no se emite su contenido.
			*/
			if (!fieldProps.value['createlist']) {
				emit('data', { [fieldPropsDefault['name']]: newValue });
			}
		});

		onMounted(() => {
			if(props.initValue) fieldValue.value = props.initValue
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
