<template>
	<q-form class="q-gutter-y-sm" @submit="onSubmit">
		<div class="text-h6 q-my-sm text-center">
			Editar Propiedades del campo input
		</div>

		<q-select
			v-model="attributes.type"
			label="Tipo de campo"
			outlined
			:options="[
				'text',
				'password',
				'textarea',
				'email',
				'file',
				'number',
				'url',
				'time',
				'date',
			]"
			behavior="menu"
			hint=""
		/>

		<q-input
			v-model="attributes.label"
			label="Etiqueta"
			placeholder="Nombre de la etiqueta."
			filled
			:rules="[val => val.length > 0 || 'Debes escribir una etiqueta.']"
		/>

		<q-input
			v-model="attributes.name"
			label="Nombre del campo con que contiene el valor"
			placeholder="Ej: total_ec2."
			filled
			:rules="[
				val =>
					val.length > 0 || 'Debes escribir un nombre para el campo.',
			]"
		/>

		<q-input
			v-model="attributes.hint"
			label="Descripción bajo el campo"
			placeholder="Ej: Utilice más de 8 caracteres e incluya al menos un: numero, mayúscula y minúscula."
			filled
			hint=""
		/>

		<q-input
			v-model="attributes.maxlength"
			label="Numero máximo de carácteres que se permite escribir en el campo"
			placeholder="Ej: 20."
			type="number"
			filled
			hint=""
		/>

		<div class="row">
			<div class="col-12 col-md-6">
				<q-toggle
					v-model="attributes.autofocus"
					label="Auto enfocar."
				/>
			</div>
			<div class="col-12 col-md-6">
				<q-toggle
					v-model="attributes.clearable"
					label="Que sea limpiable."
				/>
			</div>
			<div class="col-12 col-md-6">
				<q-toggle
					v-model="attributes.disable"
					label="Que se encuentre inactivo."
				/>
			</div>
			<div class="col-12 col-md-6">
				<q-toggle
					v-model="attributes.readonly"
					label="Que sea solo lectura."
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
				@click="cancelCreation"
			/>
		</div>
	</q-form>
</template>

<script>
import { defineComponent, onMounted, computed, ref, watch } from 'vue';

export default defineComponent({
	name: 'FormForInputs',
	props: {
		fieldConfiguration: {
			type: Object,
		},
	},
	emits: ['cancelCreation','processCreation'],
	setup(props, { emit }) {
		/* Todos los atributos que nos interesa por el momento del componente q-input */
		const attributes = ref({
			type: 'text', // Aceptados: text, password, textarea, email, search, tel, file, number, url, time y date
			label: '',
			name: '',
			hint: '',
			maxlength: '',
			autofocus: false,
			clearable: false,
			disable: false,
			readonly: false,
		});

		/* Si se edita el formulario se actualizan las keys del objeto recibido */
		watch(
			attributes,
			newValue => {
				/* Actualiza las key del campo que se está modificando */
				const keys = Object.keys(newValue);
				keys.forEach(
					key => (props.fieldConfiguration[key] = newValue[key])
				);
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
			if(validation) emit('processCreation')
		};

		const cancelCreation = () => {
			console.log(attributes.value);
			emit('cancelCreation')
		};

		onMounted(() => {
			/* Se cargan los datos recibidos en el formulario */
			attributes.value = {
				...attributes.value,
				...props.fieldConfiguration,
			};
		});

		return {
			attributes,
			validation,
			onSubmit,
			cancelCreation,
		};
	},
});
</script>