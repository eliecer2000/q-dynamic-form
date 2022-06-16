<template>
	<div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
		<div class="col-12">
			<q-input ref="inputRef" v-model="inputValue" v-bind="inputProps">
			</q-input>
		</div>
	</div>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref } from 'vue';
export default defineComponent({
	name: 'TextElement',
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
		const inputValue = ref(props.initValue);

		/* Armado de atributos del campo */
		const inputProps = computed(() => {
			return { ...props.setProperties };
		});

		/* Se devuelve el valor del campo con cada cambio */
		watch(inputValue, newValue => {
			emit('data', newValue);
		});

		return {
			inputProps,
			inputValue,
		};
	},
});
</script>
