<template>
	<div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
		<div class="col-12">
			<q-input v-if="componentName==='q-input'" v-model="fieldValue" v-bind="fieldProps">
			</q-input>

			<q-select v-if="componentName==='q-select'" v-model="fieldValue" v-bind="fieldProps" />

			<q-toggle v-if="componentName==='q-toggle'" v-model="fieldValue" v-bind="fieldProps" />
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue';
export default defineComponent({
	name: 'FieldDynamic',
	props: {
		setProperties: {
			type: Object,
		},
		initValue: {
			type: String,
			default: '',
		},
	},
	emits: ['data'],
	setup(props, { emit }) {
		/* Valor inicial del campo */
		const fieldValue = ref(props.initValue);

		/* Armado de atributos del campo */
		const fieldProps = ref(props.setProperties);

		/* Cual componente de quasar llamar */
		const componentName = computed(() => {
			/* Usar variable global luego */
			if([
				'text',
				'password',
				'textarea',
				'email',
				'file',
				'number',
				'url',
				'time',
				'date',
			].includes(fieldProps.value.type)) return 'q-input'

			if(fieldProps.value.type ==='select') return 'q-select'

			if(fieldProps.value.type ==='toggle') return 'q-toggle'
		})

		/* Se devuelve el valor del campo con cada cambio */
		watch(fieldValue, newValue => {
			emit('data', newValue);
		});

		return {
			fieldProps,
			fieldValue,
			componentName
		};
	},
});
</script>
