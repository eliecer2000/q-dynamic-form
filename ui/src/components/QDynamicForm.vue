<template>
	<div class="q-pa-md">
		<q-dialog
			v-model="activateModaAddField"
			persistent
			position="bottom"
			transition-show="slide-up"
			transition-hide="slide-down"
		>
			<q-card class="bg-white text-primary">
				<q-bar>
					<q-space />
					<q-btn dense flat icon="close" v-close-popup>
						<q-tooltip class="bg-white text-primary"
							>Close</q-tooltip
						>
					</q-btn>
				</q-bar>
				<q-card-section class="row q-pa-lg">
					<div class="text-h6 col-12">Campos Disponibles</div>
					<div
						class="col-12 col-md-6 q-pa-sm"
						v-for="(sourceField, idx) in sourceFields"
						:key="idx"
					>
						<q-btn
							class="full-width"
							color="primary"
							outline
							no-caps
							v-close-popup
							:icon="sourceField.icon"
							:label="sourceField.label"
							@click="createInput(sourceField.type)"
						/>
					</div>
				</q-card-section>
			</q-card>
		</q-dialog>

		<q-card class="full-width">
			<q-card-section class="no-padding no-margin bg-primary text-white">
				<div class="text-h6 text-center">Generador de Formularios</div>
			</q-card-section>
			<q-separator />
			<q-card-section horizontal class="full-width">
				<q-card-section class="q-my-md col-6">
					<q-scroll-area style="height: calc(100vh - 220px)">
						<draggable :list="fields" group="elements">
							Codigo pausado 1
							<div v-for="(field, index) in fields" :key="`${index}-input`">
								<component :is="'FieldDynamic'" :setProperties="field" />
							</div>
							<!-- <div
                class="row editable-element-container q-my-none"
                v-for="(field, index) in fields"
                :key="index"
              >
                <div class="col">
                  <editable-element
                    :value="fields[index]"
                    @click="selectForEdit(field)"
                    :ref="fields[index].cid"
                  />
                </div>
                <div class="col-auto">
                  <q-btn
                    class="delete-button"
                    style="width: 30px; height: 30px"
                    @click="deleteField(index)"
                    color="accent"
                    round
                    icon="delete"
                    size="xs"
                    ><q-tooltip>Delete field</q-tooltip></q-btn
                  >
                </div>
              </div> -->
						</draggable>
					</q-scroll-area>
				</q-card-section>
				<q-separator vertical />

				<q-card-section class="col-6">
					<div
						class="
							row
							q-gutter-x-sm
							text-center
							q-mb-md
							absolute-top-right
							q-mt-lg q-mr-lg
						"
						style="z-index: 1"
					>
						<div class="col-auto">
							<q-btn
								fab
								icon="add"
								color="primary"
								@click="openModaAddField"
								><q-tooltip>Agregar campo</q-tooltip></q-btn
							>
						</div>
						<div class="col-auto">
							<q-btn
								fab
								icon="view_list"
								color="primary"
								@click="render = true"
								:disable="fields.length === 0"
								><q-tooltip>View Render Field</q-tooltip></q-btn
							>
						</div>
					</div>
					<q-scroll-area style="height: calc(100vh - 200px)">
						<div
							v-if="fields.length"
							class="text-caption bg-dark pre-format text-white"
						>
							<pre>{{ fields }}</pre>
						</div>
					</q-scroll-area>
				</q-card-section>
			</q-card-section>
		</q-card>
		<q-drawer
			v-model="render"
			:width="762"
			overlay
			bordered
			class="bg-grey-3"
		>
			<q-bar>
				<q-space />
				<q-btn dense flat icon="close" @click="render = false">
					<q-tooltip class="bg-white text-primary">Close</q-tooltip>
				</q-btn>
			</q-bar>
			<q-card
				v-if="render"
				flat
				class="bg-white text-primary no-margin no-padding"
				style="width: 760px; height: calc(100vh - 40px)"
			>
				<q-scroll-area style="height: calc(100% - 30px)">
					<q-card-section class="q-pt-sm text-center q-mb-lg">
						<div class="text-h6 q-my-sm">Ejemplo de la Vista</div>
						<div class="q-form-container">
							Codigo pausado 2
							<!-- <component
                v-for="(field, index) in fields"
                :key="index"
                :inner-value="field"
                :is="getElement(field)"
                :label="field.label"
                :required="field.required"
                :field_options="field.field_options"
                :id="field.cid"
                :cid="field.cid"
              /> -->
						</div>
					</q-card-section>
				</q-scroll-area>
			</q-card>
		</q-drawer>

		<q-dialog
			v-model="activateModalWithForm"
			persistent
			transition-show="slide-left"
			transition-hide="slide-right"
			position="right"
		>
			<q-card>
				<q-card-section class="q-pt-md">
					<FormForInputs
						v-if="currentField"
						:fieldConfiguration="currentField"
						@cancelCreation="cancelCreation"
						@processCreation="processCreation"
					/>
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import { uid, extend } from 'quasar';
import { ref, computed, defineComponent, onBeforeMount, watch } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import EditableElement from './editables/EditableElement.vue';
import EditableElementOptions from './editables/EditableElementOptions.vue';


/* NUEVO */
import FormForInputs from './FormForInputs';
import FieldDynamic from './FieldDynamic';

export default defineComponent({
	name: 'QDynamicForm',
	components: {
		FieldDynamic,
		FormForInputs,
		draggable: VueDraggableNext,
		EditableElement,
		EditableElementOptions,
	},
	props: {
		navPosition: {
			type: String,
			default: 'left',
		},
		fieldIdName: {
			type: String,
			default: '_id',
		},
		valueComponent: {
			required: true,
			type: Array,
		},
		sourceFields: {
			type: Array,
			required: false,
			default: () => [
				{ type: 'text', icon: 'font_download', label: 'Campo tipo input' },
				{ type: 'boolean', icon: 'edit_attributes', label: 'Boolean' },
				{
					type: 'dropdown',
					icon: 'arrow_drop_down_circle',
					label: 'Dropdown',
				},
				{
					type: 'section_break',
					icon: 'view_agenda',
					label: 'Section Break',
				},
			],
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		/* DATA */
		const activateModaAddField = ref(false);
		const activatedCloseForm = ref(false);
		console.log('primera carga',props.valueComponent)
		const fields = ref(props.valueComponent);
		const currentField = ref(null);

		let tab = ref('add');

		let render = ref(false);
		let activateModalWithForm = ref(false);

		// METHODS
		/* Modal */
		const formError = error => {
			activatedCloseForm.value = error;
		};

		/* Modal para el tipo de campo a agregar campo nuevo */
		function openModaAddField() {
			activateModaAddField.value = true;
		}

		/* Se crea un objeto para el input que se va a crear*/
		const createInput = () => {
			const newInput = {};
			/* Se registra el objeto del nuevo input */
			fields.value.push(newInput);
			/* Se envia la referencia del objeto creado para que sea editado */
			currentField.value = newInput;
			console.log('currentField.value',currentField.value)
			activateModalWithForm.value=true;
		};

		/* Al procesar la creacion, reseteamos para la proxima creacion */
		const processCreation = () => {
			activateModalWithForm.value = false;
			currentField.value = null;
		}

		/* Cancelar la creacion del campo */
		const cancelCreation = () => {
			activateModalWithForm.value = false;
			currentField.value = null;

			/* Eliminamos ultimo registro ya que canceló */
			fields.value.pop();
		};

		const selectForEdit = field => {
			activateModalWithForm.value = true;
			currentField.value = field;
			tab.value = 'edit';
		};

		const deleteField = index => {
			currentField.value = [];
			tab.value = 'add';
			fields.value.splice(index, 1);
		};

		const duplicateField = idx => {
			const newField = extend(true, {}, fields[idx]);
			newField.cid = uid();
			newField[props.fieldIdName] = null;
			delete newField[props.fieldIdName];
			fields.value.push(newField);
			selectForEdit(newField);
		};

		const onChange = evt => {
			if (evt.added) {
				selectForEdit(evt.added.element);
			}
		};

		function getFieldByCid(cid) {
			for (let index = 0; index < fields.length; index++) {
				const field = fields[index];
				if (field.cid === cid) return field;
			}
			return false;
		}

		// COMPUTED
		const sourceOptions = computed(() => {
			return {
				group: {
					name: 'q-form-builder',
					pull: 'clone',
					put: false,
				},
			};
		});

		const destinationOptions = computed(() => {
			return {
				group: {
					name: 'q-form-builder',
					pull: false,
					put: true,
				},
			};
		});

		watch(
			() => fields.value,
			newValue => {
				emit('input', newValue);
			},
			{ deep: true }
		);

		const getElement = field => {
			const nameParts = field.field_type.split('_');
			for (let i = 0; i < nameParts.length; i++) {
				nameParts[i] =
					nameParts[i].charAt(0).toUpperCase() +
					nameParts[i].slice(1);
			}
			console.log(nameParts.join('') + 'Element');
			return nameParts.join('') + 'Element';
		};

		onBeforeMount(() => {
			if (!fields.value || !(fields.value instanceof Array)) {
				fields.value = [];
			}
		});

		return {
			tab,
			deleteField,
			duplicateField,
			onChange,
			selectForEdit,
			getFieldByCid,
			sourceOptions,
			destinationOptions,
			// ----------------------
			render,
			getElement,
			activateModalWithForm,

			/* Utilizados */
			fields,
			currentField,
			activateModaAddField,
			activatedCloseForm,
			openModaAddField,
			createInput,
			cancelCreation,
			processCreation,
			formError,
		};
	},
});
</script>
