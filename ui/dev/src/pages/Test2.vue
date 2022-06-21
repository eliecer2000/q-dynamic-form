<template>
	<q-page>
		<q-form class="q-gutter-y-sm" @submit="onSubmit">
			<QDynamicRender
				:fields="fields"
				:initValue="initValue"
				:stateFields="stateFields"
				:optionsSelect="optionsSelect"
				:columnClassField="columnClassField"
				@data="onData"
			></QDynamicRender>

			<div class="row">
				<div class="col-12">
					<q-btn type="submit" color="primary" label="Enviar"></q-btn>
				</div>
			</div>
		</q-form>
	</q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup() {
		/* Campos creado con el builder */
		const fields = ref([
			{
				type: 'text',
				ref: 'ref_username',
				label: 'Nombre de usuario',
				name: 'username',
				hint: '',
				maxlength: '',
				autofocus: false,
				clearable: false,
				outlined: true,
				createlist: false,
			},
			{
				type: 'toggle',
				label: 'Activar',
				name: 'active',
				'true-value': 'true',
				'false-value': 'false',
				disable: false,
				ref: 'ref_active',
			},
			{
				type: 'select',
				ref: 'ref_team',
				label: 'Equipo de beisbol',
				name: 'team',
				hint: '',
				multiple: false,
				'use-input': false,
				clearable: false,
				outlined: true,
				'emit-value': true,
				'option-value': 'code',
				'option-label': 'teamName',
			},
		]);

		/* Estilos para las columnas */
		const columnClassField = {
			team: "col-md-6",
			active:"col-md-6",
			username: "col-md-6",
		}

		/* Modificando el estado de los campos */
		const stateFields = ref({
			readonly_username: true,
		});

		/* Opciones del select */
		const optionsSelect = ref({
			team: [
				{
					teamName: 'Magallanes',
					code: 'MAG',
				},
				{
					teamName: 'Leones',
					code: 'LEO',
				},
				{
					teamName: 'Tigres',
					code: 'TIG',
				},
				{
					teamName: 'Tiburones',
					code: 'TIB',
				},
			],
		});

		/* Data del formulario que se modifica */
		const formData = ref({});

		/* Actualiza la data cargada en el formulario con cada cambio que recibe */
		const onData = data => {
			formData.value = data;
		};

		/* Se inicializa el formulario con valores */
		const initValue = { username: 'Eduardo', active: 'false' };

		const onSubmit = () => {
			console.log('data', formData.value);
		};

		return {
			fields,
			stateFields,
			columnClassField,
			optionsSelect,
			onData,
			initValue,
			onSubmit,
		};
	},
});
</script>

<style lang="sass" scoped>
.directive-target
	width: 50px
	height: 50px
</style>
