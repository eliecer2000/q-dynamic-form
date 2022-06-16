<template>
	<q-form class="q-gutter-y-sm">
		<q-select
			label="Tipo de campo"
			outlined
			v-model="type"
			:options="['text', 'number', 'email']"
			behavior="menu"
		/>

		<q-input
			v-model="value.label"
			placeholder="Nombre de la etiqueta"
			label="Etiqueta"
			filled
		/>

		<q-input
			v-model="value.name"
			placeholder="Ej: total_ec2"
			label="Nombre del campo con que contiene el valor"
			filled
		/>
	</q-form>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from 'vue';

export default defineComponent({
	name: 'FormForInputs',
	props: {
		value: {
			type: Object,
		},
	},

	setup(props, { emit }) {
		/* DATOS */
		const type = ref(props.value.type);

		/* Watch */
		watch(type, newValue => {
			props.value.type = newValue;
		});

		return {
			type,
		};
	},
});
</script>

<style lang="scss" scoped>
</style>