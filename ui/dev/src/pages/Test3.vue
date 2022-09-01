<template>
  <q-page>
    <div style="height: 80vh" class="q-pa-lg">
      <QDynamicTableRender
        :data-columns="columns"
        :data-rows="listInstances.items"
        :data-filters="listInstances.filters"
        :disable-selection="false"
        v-model="model"
        @refresh="refresh"
        :loading="loading"
        row-index="ResourceId"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  setup() {
    const model = ref({
      InstanceIds: [],
      Filters: [
        {
          Name: "tag:Name",
          Values: ["OrbisTest4", "OrbisTest8"],
        },
      ],
    });

    const listInstances = ref({
      filters: [
        {
          prefix: "tag:",
          label: "Tags",
          model: null,
          values: [
            {
              prefix: "tag:",
              label: "CloudEndure_Name",
              model: null,
              value: "CloudEndure_Name",
              items: ["Excluir"],
            },
            {
              prefix: "tag:",
              label: "Environment",
              model: null,
              value: "Environment",
              items: ["PROD", "QA", "DEV"],
            },
            {
              prefix: "tag:",
              label: "Name",
              model: null,
              value: "Name",
              items: [
                "NAT-Instance",
                "OrbisTest8",
                "Orbis-UsoEnPresentaciones",
                "Test",
                "OrbisTest4",
                "OrbisTest1",
              ],
            },
            {
              prefix: "tag:",
              label: "OrbisBackup",
              model: null,
              value: "OrbisBackup",
              items: ["Daily_MON-SAT_0400_Ret7", "Daily_MON-SUN_0300-Ret15"],
            },
            {
              prefix: "tag:",
              label: "OrbisBackup-Weekly",
              model: null,
              value: "OrbisBackup-Weekly",
              items: ["Weekly_SAT_0300_Ret15"],
            },
            {
              prefix: "tag:",
              label: "OrbisDEMO",
              model: null,
              value: "OrbisDEMO",
              items: ["True"],
            },
            {
              prefix: "tag:",
              label: "OrbisExcluded",
              model: null,
              value: "OrbisExcluded",
              items: ["For DEMO Purposes"],
            },
            {
              prefix: "tag:",
              label: "OrbisFantasia",
              model: null,
              value: "OrbisFantasia",
              items: ["LaVidaEsBella"],
            },
            {
              prefix: "tag:",
              label: "OrbisReboot",
              model: null,
              value: "OrbisReboot",
              items: ["OrbisTest1"],
            },
            {
              prefix: "tag:",
              label: "OrbisSchedule",
              model: null,
              value: "OrbisSchedule",
              items: ["True"],
            },
            {
              prefix: "tag:",
              label: "OrbisStart",
              model: null,
              value: "OrbisStart",
              items: [
                "Blank+++",
                "Daily_MON-FRI_0700",
                "MON-SAT_0700",
                "Daily_MON-SAT_0700",
              ],
            },
            {
              prefix: "tag:",
              label: "OrbisStop",
              model: null,
              value: "OrbisStop",
              items: [
                "MON-SAT_1800",
                "Daily_MON-SAT_1800*",
                "Daily_MON-FRI_1800",
                "Daily_MON-SAT_1800",
              ],
            },
            {
              prefix: "tag:",
              label: "OrbisStop2",
              model: null,
              value: "OrbisStop2",
              items: ["Daily_MON-FRI_1800_SAT_1500"],
            },
            {
              prefix: "tag:",
              label: "Owner",
              model: null,
              value: "Owner",
              items: ["EC"],
            },
            {
              prefix: "tag:",
              label: "Project",
              model: null,
              value: "Project",
              items: ["Orbis"],
            },
            {
              prefix: "tag:",
              label: "TestStop",
              model: null,
              value: "TestStop",
              items: ["2"],
            },
            {
              prefix: "tag:",
              label: "TestStop2",
              model: null,
              value: "TestStop2",
              items: ["2", "1"],
            },
            {
              prefix: "tag:",
              label: "awsAutoScalingGroupName",
              model: null,
              value: "awsAutoScalingGroupName",
              items: ["WebSiteAutoScalingTEST-ForDEMO"],
            },
            {
              prefix: "tag:",
              label: "et1",
              model: null,
              value: "et1",
              items: ["1"],
            },
            {
              prefix: "tag:",
              label: "et2",
              model: null,
              value: "et2",
              items: ["2"],
            },
            {
              prefix: "tag:",
              label: "et3",
              model: null,
              value: "et3",
              items: ["3"],
            },
          ],
        },
        {
          prefix: null,
          label: "Other Filters",
          model: null,
          values: [
            {
              prefix: null,
              model: null,
              items: ["t2.micro", "t2.nano"],
              label: "Instance type",
              value: "instance-type",
            },
            {
              prefix: null,
              model: null,
              items: [
                "ami-047a51fa27710816e",
                "ami-0be2609ba883822ec",
                "ami-0022f774911c1d690",
                "ami-01cc34ab2709337aa",
              ],
              label: "Image Id",
              value: "image-id",
            },
            {
              prefix: null,
              model: null,
              items: [
                "subnet-f9bf66c8",
                "subnet-c9abf184",
                "subnet-9afc6cbb",
                "subnet-0460f59e587aeecc0",
              ],
              label: "Subnet Id",
              value: "subnet-id",
            },
            {
              prefix: null,
              model: null,
              items: ["vpc-010d9ef6af77e3ca7", "vpc-aecf69d3"],
              label: "Vpc Id",
              value: "vpc-id",
            },
            {
              prefix: null,
              label: "Architecture",
              value: "architecture",
              items: ["i386", "x86_64", "arm64"],
              model: null,
            },
          ],
        },
      ],
      items: [
        {
          ResourceId: "i-0002ab0fe5af46ab5",
          ImageId: "ami-0be2609ba883822ec",
          InstanceId: "i-0002ab0fe5af46ab5",
          InstanceType: "t2.micro",
          State: {
            Code: 16,
            Name: "running",
          },
          SubnetId: "subnet-f9bf66c8",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "Owner",
              Value: "EC",
            },
            {
              Key: "TestStop",
              Value: "2",
            },
            {
              Key: "OrbisStart",
              Value: "MON-SAT_0700",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SAT_0400_Ret7",
            },
            {
              Key: "awsAutoScalingGroupName",
              Value: "WebSiteAutoScalingTEST-ForDEMO",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisStop",
              Value: "MON-SAT_1800",
            },
            {
              Key: "Name",
              Value: "",
            },
            {
              Key: "Environment",
              Value: "DEV",
            },
            {
              Key: "TestStop2",
              Value: "2",
            },
          ],
          Name: "",
          check: false,
        },
        {
          ResourceId: "i-0d3582ecee49a930b",
          ImageId: "ami-0be2609ba883822ec",
          InstanceId: "i-0d3582ecee49a930b",
          InstanceType: "t2.micro",
          State: {
            Code: 80,
            Name: "stopped",
          },
          SubnetId: "subnet-f9bf66c8",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "OrbisStop",
              Value: "Daily_MON-SAT_1800*",
            },
            {
              Key: "TestStop2",
              Value: "1",
            },
            {
              Key: "Name",
              Value: "OrbisTest4",
            },
            {
              Key: "OrbisStart",
              Value: "Blank+++",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "awsAutoScalingGroupName",
              Value: "WebSiteAutoScalingTEST-ForDEMO",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SAT_0400_Ret7",
            },
            {
              Key: "Environment",
              Value: "DEV",
            },
            {
              Key: "TestStop",
              Value: "2",
            },
            {
              Key: "Owner",
              Value: "EC",
            },
          ],
          Name: "OrbisTest4",
          check: false,
        },
        {
          ResourceId: "i-07d0f5532ba58fd35",
          ImageId: "ami-047a51fa27710816e",
          InstanceId: "i-07d0f5532ba58fd35",
          InstanceType: "t2.micro",
          State: {
            Code: 80,
            Name: "stopped",
          },
          SubnetId: "subnet-9afc6cbb",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "Project",
              Value: "Orbis",
            },
            {
              Key: "Environment",
              Value: "QA",
            },
            {
              Key: "et3",
              Value: "3",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-FRI_1800",
            },
            {
              Key: "et1",
              Value: "1",
            },
            {
              Key: "Owner",
              Value: "EC",
            },
            {
              Key: "OrbisStart",
              Value: "Daily_MON-FRI_0700",
            },
            {
              Key: "et2",
              Value: "2",
            },
            {
              Key: "Name",
              Value: "Test",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0300-Ret15",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
          ],
          Name: "Test",
          check: true,
        },
        {
          ResourceId: "i-058a70fc62057f7d6",
          ImageId: "ami-047a51fa27710816e",
          InstanceId: "i-058a70fc62057f7d6",
          InstanceType: "t2.micro",
          State: {
            Code: 80,
            Name: "stopped",
          },
          SubnetId: "subnet-9afc6cbb",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "Environment",
              Value: "PROD",
            },
            {
              Key: "OrbisFantasia",
              Value: "LaVidaEsBella",
            },
            {
              Key: "Project",
              Value: "Orbis",
            },
            {
              Key: "OrbisStart",
              Value: "Blank+++",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-FRI_1800",
            },
            {
              Key: "Owner",
              Value: "EC",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0300-Ret15",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "OrbisTest8",
            },
          ],
          Name: "OrbisTest8",
          check: true,
        },
        {
          ResourceId: "i-002e43a3aa16adc77",
          ImageId: "ami-01cc34ab2709337aa",
          InstanceId: "i-002e43a3aa16adc77",
          InstanceType: "t2.micro",
          State: {
            Code: 80,
            Name: "stopped",
          },
          SubnetId: "subnet-c9abf184",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "OrbisStart",
              Value: "Daily_MON-SAT_0700",
            },
            {
              Key: "OrbisStop2",
              Value: "Daily_MON-FRI_1800_SAT_1500",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-SAT_1800",
            },
            {
              Key: "Environment",
              Value: "QA",
            },
            {
              Key: "OrbisDEMO",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "Orbis-UsoEnPresentaciones",
            },
            {
              Key: "OrbisBackup-Weekly",
              Value: "Weekly_SAT_0300_Ret15",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SAT_0400_Ret7",
            },
          ],
          Name: "Orbis-UsoEnPresentaciones",
          check: false,
        },
        {
          ResourceId: "i-0cc36134c56360e07",
          ImageId: "ami-01cc34ab2709337aa",
          InstanceId: "i-0cc36134c56360e07",
          InstanceType: "t2.micro",
          State: {
            Code: 80,
            Name: "stopped",
          },
          SubnetId: "subnet-c9abf184",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "OrbisExcluded",
              Value: "For DEMO Purposes",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-SAT_1800",
            },
            {
              Key: "OrbisStop2",
              Value: "Daily_MON-FRI_1800_SAT_1500",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SAT_0400_Ret7",
            },
            {
              Key: "OrbisReboot",
              Value: "OrbisTest1",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisDEMO",
              Value: "True",
            },
            {
              Key: "Environment",
              Value: "QA",
            },
            {
              Key: "Name",
              Value: "OrbisTest1",
            },
            {
              Key: "CloudEndure_Name",
              Value: "Excluir",
            },
            {
              Key: "OrbisStart",
              Value: "Daily_MON-SAT_0700",
            },
          ],
          Name: "OrbisTest1",
          check: false,
        },
        {
          ResourceId: "i-0cf946c2eebc77930",
          ImageId: "ami-0022f774911c1d690",
          InstanceId: "i-0cf946c2eebc77930",
          InstanceType: "t2.nano",
          State: {
            Code: 16,
            Name: "running",
          },
          SubnetId: "subnet-0460f59e587aeecc0",
          VpcId: "vpc-010d9ef6af77e3ca7",
          Architecture: "x86_64",
          Tags: [
            {
              Key: "Environment",
              Value: "PROD",
            },
            {
              Key: "Name",
              Value: "NAT-Instance",
            },
          ],
          Name: "NAT-Instance",
          check: false,
        },
      ],
    });

    const columns = ref([
      {
        name: "InstanceId",
        required: true,
        label: "InstanceID",
        align: "left",
        field: (row) => row.InstanceId,
        format: (val) => `${val}`,
        sortable: true,
        mutable: false,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
      {
        name: "State",
        align: "center",
        label: "State",
        field: (row) => row.State.Name,
        required: true,
        sortable: true,
        mutable: false,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
      {
        name: "InstanceType",
        label: "InstanceType",
        field: "InstanceType",
        sortable: true,
        mutable: true,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
      {
        name: "Architecture",
        label: "Architecture",
        field: "Architecture",
        mutable: true,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
      {
        name: "ImageId",
        label: "ImageId",
        field: "ImageId",
        sortable: true,
        mutable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
      {
        name: "VpcId",
        label: "VpcId",
        field: "VpcId",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        mutable: true,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
    ]);

    const loading = ref(false);

    watch(
      () => model.value,
      (newValue) => {
        console.log(
          "🚀 ~ file: Test3.vue ~ line 1550 ~ setup ~ newValue",
          newValue
        );
      },
      { deep: true }
    );

    function refresh() {
      // loading.value = true;
      // setTimeout(() => {
      //   console.log("Refresca ", listInstances.value.items.length);
      //   listInstances.value.items.splice(0, 1);
      //   console.log("Final ", listInstances.value.items.length);
      //   loading.value = false;
      // }, 1000);
    }

    return {
      listInstances,
      model,
      columns,
      refresh,
      loading,
    };
  },
});
</script>

<style lang="sass">
.q-select__dialog
    width: 520px !important
</style>
