<template>
  <q-page>
    <q-form class="q-gutter-y-sm" @submit="onSubmit">
      <QDynamicRender
        :fields="fields"
        :initValue="initValue"
        :stateFields="stateFields"
        :optionsSelect="optionsSelect"
        :columnClassField="columnClassField"
        v-model="formData"
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
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    /* Campos creado con el builder para armar el formulario */
    const fields = ref([
      {
        type: "toggle",
        label: "Activar",
        name: "active",
        "true-value": "true",
        "false-value": "false",
        disable: false,
        ref: "ref_active",
      },
      {
        type: "select",
        ref: "ref_team",
        label: "Equipo de beisbol",
        name: "team",
        hint: "",
        multiple: true,
        "use-input": false,
        clearable: false,
        outlined: true,
        // 'emit-value': true,
        "option-value": "code",
        "option-label": "teamName",
      },
      {
        type: "text",
        ref: "ref_username",
        label: "Nombre de usuario",
        name: "username",
        hint: "",
        maxlength: "",
        autofocus: false,
        clearable: false,
        outlined: true,
        createlist: false,
      },
      {
        type: "select",
        ref: "ref_fffffffffff",
        label: "ffffff",
        name: "fffffffffff",
        hint: "ggggggggggggggggggggggggggg",
        multiple: false,
        "use-input": false,
        clearable: true,
        outlined: true,
        options: [
          {
            label: "ffffffff",
            value: "ddfdfsd",
          },
          {
            label: "fdfsdfsdf",
            value: "fgsdfgsdg",
          },
        ],
        "emit-value": false,
      },
    ]);

    /*
			Se asignan valores a los campos del formulario creados en el builder.
			La key debe ser el nombre defenido para el campo.
		*/
    const initValue = {
      username: "Eduardo",
      active: "false",
      team: [
        {
          teamName: "Magallanes",
          code: "MAG",
        },
        {
          teamName: "Leones",
          code: "LEO",
        },
      ],
    };

    /*
			Cada campo se encuentra en columna col-12. Aca se puede establecer los
			anchos para los distintos breakpoint y organizar el formulario como se
			desee. La key debe ser el nombre defenidor para el campo.
		*/
    const columnClassField = {
      team: "col-md-6",
      active: "col-md-6",
      username: "col-md-6",
    };

    /*
			Modificando el estado de los campos. La key debe ser el nombre defenido
			para el campo, acompañado del prefijo readonly_ o disable_ o rules_
		*/
    const stateFields = ref({
      //readonly_username: true,
      //disable_username: true,
      rules_username: [
        (val) => !!val || "Este campo es requerido.",
        (val) => {
          const emailPattern =
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          return emailPattern.test(val) || "No es un email valido.";
        },
      ],
    });

    /*
			Definir opciones del campo select del formulario creados en el builder.
			La key debe ser el nombre defenidor para el campo.
		*/
    const optionsSelect = ref({
      team: [
        {
          teamName: "Magallanes",
          code: "MAG",
        },
        {
          teamName: "Leones",
          code: "LEO",
        },
        {
          teamName: "Tigres",
          code: "TIG",
        },
        {
          teamName: "Tiburones",
          code: "TIB",
        },
      ],
    });

    /*
			Almace de los datos que devuelve el formulario al ser enviado.
		*/
    const formData = ref({});

    /* Actualiza la data cargada en el formulario con cada cambio que recibe */

    const onSubmit = () => {
      console.log("data", formData.value);
    };

    return {
      fields,
      stateFields,
      columnClassField,
      optionsSelect,
      initValue,
      onSubmit,
      formData,
    };
  },
});
</script>

<style lang="sass" scoped>
.directive-target
	width: 50px
	height: 50px
</style>
