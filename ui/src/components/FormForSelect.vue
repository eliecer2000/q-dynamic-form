<template>
	<q-form class="q-gutter-y-sm" @submit="onSubmit">
		<div class="text-h6 q-my-sm text-center">
			Editar Propiedades del campo SELECT
		</div>

		<q-input
			v-for="(option, index) in propsList"
			:key="`${index}-propsList`"
			v-model="attributes[option.propname]"
			v-bind="option"
		/>

		<q-input
			v-model="selectOptions"
			type="textarea"
			label="Opciones"
			hint="Ingrese cada opción en una línea separada. Para diferenciar entre etiqueta y valor, sepárelos con un carácter pipe ( | ). Por ejemplo: Nombre | valor_opcion1"
			filled
		/>

		<div class="q-mt-lg">
			<q-chip
				v-for="(item, index) in listOptionsSelect"
				:key="`${index}-listOptionsSelect`"
				><q-avatar color="red" text-color="white">{{
					index + 1
				}}</q-avatar>
				<b>label:</b> {{ item.label }}, <b>value:</b>
				{{ item.value }}</q-chip
			>
		</div>

		<div class="row">
			<div
				v-for="(option, index) in toggleOptions"
				:key="`${index}-toggleOptions`"
				class="col-12 col-md-6"
			>
				<q-toggle
					v-model="attributes[option.prop]"
					:label="option.label"
				/>
			</div>

			<q-btn
				color="primary"
				label="Guardar"
				class="full-width q-mt-md"
				type="submit"
				unelevated
			/>
			<q-btn
				color="primary"
				label="Cancelar"
				class="full-width q-mt-md"
				unelevated
				outline
				@click="cancelProcess"
			/>
		</div>
	</q-form>
</template>

<script>
import { defineComponent, onMounted, computed, ref, watch } from 'vue';

/* 
	https://quasar.dev/vue-components/select
	Se define constante para imprimir q-input y q-toggle por lista de opciones para activar propiedades del booleanas de q-select
*/
const propsList = [
	{
		propname: 'label',
		label: 'Etiqueta',
		placeholder: 'Nombre de la etiqueta',
		filled: true,
		rules: [val => val.length > 0 || 'Debes escribir una etiqueta.'],
	},
	{
		propname: 'name',
		label: 'Nombre del campo con que contiene el valor',
		placeholder: 'Ej: total_ec2',
		filled: true,
		rules: [
			val => val.length > 0 || 'Debes escribir un nombre para el campo.',
		],
	},
	{
		propname: 'hint',
		label: 'Descripción bajo el campo.',
		placeholder:
			'Ej: Utilice más de 8 caracteres e incluya al menos un: numero, mayúscula y minúscula',
		filled: true,
		hint: '',
	},
	{
		propname: 'option-value',
		label: 'Compo se llama la key con el valor a enviar',
		placeholder: 'Ej: value',
		filled: true,
		hint: '',
	},
	{
		propname: 'option-label',
		label: 'Compo se llama la key que se quiere usar como label',
		placeholder: 'Ej: label',
		filled: true,
		hint: '',
	},
];

const toggleOptions = [
	{ prop: 'emit-value', label: 'Emitir el value' },
	{ prop: 'multiple', label: 'Seleccionar multiples items.' },
	{ prop: 'use-input', label: 'Habilitar input para escribir.' },
	{ prop: 'clearable', label: 'Que sea limpiable.' },
];

export default defineComponent({
	name: 'FormForInputs',
	props: {
		fieldConfiguration: {
			type: Object,
		},
	},
	emits: ['cancelCreation', 'cancelEdition', 'processCreation'],
	setup(props, { emit }) {
		/* Todos los atributos que nos interesa por el momento del componente q-select. El type: 'select' es solo un identificador, no pertener a q-select */
		const attributes = ref({
			ref: '',
			type: 'select',
			label: '',
			name: '',
			hint: '',
			multiple: false,
			'use-input': false,
			clearable: false,
			outlined: true,
		});

		const selectOptions = ref('');

		/* Para saber si es nuevo y elegir el evento correcto al cancelar  */
		const isNewField = ref(true);

		/* Si se edita el formulario se actualizan las keys del objeto recibido */
		watch(
			attributes,
			newValue => {
				/* Actualiza las key del campo que se está modificando */
				const keys = Object.keys(newValue).filter(
					item => item !== 'options'
				);
				keys.forEach(key => {
					props.fieldConfiguration[key] = newValue[key];
					if (key === 'name')
						props.fieldConfiguration[
							'ref'
						] = `ref_${newValue[key]}`;
				});
			},
			{ deep: true }
		);

		watch(selectOptions, () => {
			props.fieldConfiguration['options'] = listOptionsSelect;
		});

		/* Validar que esten los campos necesarios llenos */
		const validation = computed(() => {
			let invalid = false;
			if (
				attributes.value.label.length === 0 ||
				attributes.value.name.length === 0
			)
				invalid = true;

			return invalid;
		});

		const listOptionsSelect = computed(() => {
			/* Se convierte en array los saltos de linea */
			const arrayWithElementOptions = selectOptions.value
				.split(/\r\n|\r|\n/, -1)
				.reduce((resultArray, item) => {
					/* Se convierte en array el texto dividido por pipe */
					const option = item.split('|').map(item => item.trim());

					/* Se filran las opciones que no tienen 2 elementos, que son label y value. Al mismo tiempo se ingnora las opciones si sus 2 elementos no tiene contenido. */
					if (
						option.length === 2 &&
						option[0].length &&
						option[1].length
					)
						resultArray = [
							...resultArray,
							{ label: option[0], value: option[1] },
						];

					return resultArray;
				}, []);

			return arrayWithElementOptions;
		});

		const onSubmit = () => {
			if (validation) emit('processCreation');
		};

		const cancelProcess = () =>
			isNewField.value ? emit('cancelCreation') : emit('cancelEdition');

		onMounted(() => {
			/* Se cargan los datos recibidos en el formulario */
			attributes.value = {
				...attributes.value,
				...props.fieldConfiguration,
			};

			/* Se pasa a string las opciones */
			if (props.fieldConfiguration.options)
				selectOptions.value = props.fieldConfiguration.options.reduce(
					(text, item) => {
						return `${text} ${item.label} | ${item.value}\r\n`;
					},
					''
				);

			/* Se señala si es o no nuevo */
			if (props.fieldConfiguration.label) isNewField.value = false;
		});

		return {
			attributes,
			validation,
			toggleOptions,
			propsList,
			selectOptions,
			listOptionsSelect,
			onSubmit,
			cancelProcess,
		};
	},
});
</script>