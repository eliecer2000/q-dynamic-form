<template>
	<div class="q-form-container q-pa-lg">
		<div class="row q-col-gutter-sm q-form-phone q-form-builder-element">
			<FieldDynamic
				v-for="(field, index) in fields"
				:key="`field-${index}`"
				:set-properties="field"
				:initValue="initValue[field.name]"
				:stateFields="stateFields"
				:optionsSelect="optionsSelect"
				@data="onData"
			/>
			<!-- <component
				class="q-py-xs"
				v-for="field in fields"
				:key="field.cid"
				:inner-value="field"
				:init-value="initValue"
				:state="stateFields"
				:is="getElement(field)"
				@data="onData"
			/> -->
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import FieldDynamic from './FieldDynamic.vue';

export default defineComponent({
	name: 'QDynamicRender',
	props: {
		fields: {
			type: Array,
		},
		initValue: {
			type: Object,
			default: {},
		},
		stateFields: {
			type: Object,
			default: {},
		},
		optionsSelect: {
			type: Object,
			default: {},
		},
	},
	emits: ['data'],
	setup(props, { emit }) {
		const responseData = ref(props.initValue);
		const getElement = field => {
			const nameParts = field.field_type.split('_');
			nameParts.forEach(element => {
				element = element.charAt(0).toUpperCase() + element.slice(1);
			});
			const result = nameParts.join('') + 'Element';
			console.log({ result });
			return result;
		};

		function onData(data) {
			Object.assign(responseData.value, data);

			if (
				props.fields.length === Object.keys(responseData.value).length
			) {
				emit('data', responseData.value);
			}
		}

		onMounted(() => {
			/* Se cargan los datos recibidos en el formulario */
			emit('data', responseData.value);
		});

		return {
			responseData,
			getElement,
			onData,
		};
	},
});
</script>
