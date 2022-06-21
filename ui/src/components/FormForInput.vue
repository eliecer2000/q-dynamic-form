<template>
	<q-form class="q-gutter-y-sm" @submit="onSubmit">
		<div class="text-h6 q-my-sm text-center">
			Editar Propiedades del campo input
		</div>

		<q-select
			v-model="attributes.type"
			label="Tipo de campo"
			outlined
			:options="inputOptions"
			behavior="menu"
			hint=""
		/>

		<q-input
			v-for="(option, index) in propsList"
			:key="`${index}-propsList`"
			v-model="attributes[option.propname]"
			v-bind="option"
		/>

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
import { inputTypes as inputOptions }  from './utils';

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
		propname: 'information',
		label: 'Informacion de ayuda',
		placeholder: 'Ej: La funcion de este campo es...',
		filled: true,
		hint: '',
	},
];

const toggleOptions = [
	{ prop: 'autofocus', label: 'Auto enfocar.' },
	{ prop: 'clearable', label: 'Que sea limpiable.' },
	{ prop: 'createlist', label: 'Crea un arreglo de respuesta.' },
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
		/* Todos los atributos que nos interesa por el momento del componente q-input */
		const attributes = ref({
			ref: '',
			type: 'text', // Aceptados: text, password, textarea, email, search, tel, file, number, url, time y date
			label: '',
			name: '',
			hint: '',
			maxlength: '',
			autofocus: false,
			clearable: false,
			outlined: true,
			createlist: false,
		});

		/* Para saber si es nuevo y elegir el evento correcto al cancelar  */
		const isNewField = ref(true);

		/* Si se edita el formulario se actualizan las keys del objeto recibido */
		watch(
			attributes,
			newValue => {
				/* Actualiza las key del campo que se está modificando */
				const keys = Object.keys(newValue);

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

			/* Se señala si es o no nuevo */
			if (props.fieldConfiguration.label) isNewField.value = false;
		});

		return {
			inputOptions,
			attributes,
			validation,
			toggleOptions,
			propsList,
			onSubmit,
			cancelProcess,
		};
	},
});
</script>