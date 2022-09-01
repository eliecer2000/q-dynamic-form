<template>
	<q-form class="q-gutter-y-sm" @submit="onSubmit">
		<div class="text-h6 q-my-sm text-center">
			Editar Propiedades del campo Booleano
		</div>

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
		propname: 'true-value',
		label: 'Valor que desea asignar si lo activan',
		placeholder: 'Ej: Agreed',
		filled: true,
		hint: 'Es opcional, por defecto es true',
	},
	{
		propname: 'false-value',
		label: 'Valor que desea asignar si lo desactivan',
		placeholder: 'Ej: Disagree',
		filled: true,
		hint: 'Es opcional, por defecto es false',
	},
];

const toggleOptions = [];

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
			type: 'toggle',
			label: '',
			name: '',
			'true-value': 'true',
			'false-value': 'false',
			disable: false,
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