<template>
  <q-card style="height: calc(100% + 5px) !important" class="full-width">
    <q-card-section horizontal style="height: calc(100% - 1px) !important">
      <q-card-section
        class="no-padding no-margin q-pb-xl"
        style="height: calc(100% - 1px) !important; min-width: 525px"
      >
        <q-scroll-area visible style="height: 100% !important" class="q-mb-xl">
          <q-list class="q-ma-md" separator>
            <q-item v-for="item in localModelValues" :key="item">
              <q-item-section>
                <q-item-label class="text-body1 text-weight-bold">
                  <q-input
                    readonly
                    borderless
                    hide-bottom-space
                    dense
                    v-model="item.label"
                    label-color="primary"
                    input-class="text-weight-bold text-body1"
                    label="Label"
                  />
                  <q-input
                    readonly
                    borderless
                    hide-bottom-space
                    dense
                    label-color="primary"
                    v-model="item.name"
                    label="Name"
                  />
                  <q-input
                    borderless
                    readonly
                    hide-bottom-space
                    dense
                    label-color="primary"
                    v-model="item.field"
                    label="Field"
                  >
                    <template v-slot:append>
                      <q-radio
                        disable
                        v-model="item.typeField"
                        val="field"
                        color="primary"
                      />
                    </template>
                  </q-input>
                  <q-input
                    borderless
                    readonly
                    hide-bottom-space
                    dense
                    label-color="primary"
                    v-model="item.expression"
                    label="Expression"
                  >
                    <template v-slot:append>
                      <q-radio
                        disable
                        v-model="item.typeField"
                        val="expression"
                        color="primary"
                      />
                    </template>
                  </q-input>
                  <q-select
                    borderless
                    readonly
                    hide-bottom-space
                    hide-dropdown-icon
                    label-color="primary"
                    v-model="item.align"
                    :options="optionsAlign"
                    label="Align"
                  />

                  <q-list class="full-width no-margin no-padding">
                    <q-item class="no-padding">
                      <q-item-section class="q-pa-none q-ma-none">
                        <q-item-label class="text-subtitle2"
                          >Required</q-item-label
                        >
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.required"
                          color="primary"
                          readonly
                          dense
                        />
                      </q-item-section>
                    </q-item>

                    <q-item class="no-padding">
                      <q-item-section>
                        <q-item-label class="text-subtitle2"
                          >Sortable</q-item-label
                        >
                        <q-item-label caption>Allow notification</q-item-label>
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.sortable"
                          color="primary"
                          readonly
                          dense
                        />
                      </q-item-section>
                    </q-item>

                    <q-item class="no-padding">
                      <q-item-section>
                        <q-item-label class="text-subtitle2"
                          >Mutable</q-item-label
                        >
                        <q-item-label caption
                          >Allow notification when uploading
                          images</q-item-label
                        >
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          v-model="item.mutable"
                          color="primary"
                          readonly
                          dense
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-item-label>
              </q-item-section>

              <q-separator vertical class="q-mx-md"></q-separator>

              <q-item-section side top>
                <q-icon name="https" color="grey-6" v-if="item.no_editable" />
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <q-separator vertical />
      <q-card-section style="width: 100%" class="q-pa-xs">
        <q-table
          flat
          title="Example Table"
          :rows="rows"
          :columns="modelValue"
          row-key="name"
          hide-pagination
          hide-selected-banner
          separator="cell"
          hide-no-data
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
const nn = (a) => {
  return a["State"] || null;
};

import { defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  name: "QDynamicTable",
  props: {
    modelValue: {
      type: Array,
      default: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          format: (val) => `${val}`,
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true
        },
        {
          name: "InstanceId",
          required: true,
          label: "InstanceID",
          align: "left",
          field: "InstanceId",
          format: (val) => `${val}`,
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true
        },
        {
          name: "State",
          align: "center",
          label: "State",
          field: "State",
          format: (val) => `${val}`,
          expression: '(row) => row["State"]["Name"]',
          required: true,
          sortable: true,
          typeField: "expression",
          mutable: false,
          no_editable: true
        },
        {
          name: "VPC",
          align: "center",
          label: "vpc",
          format: (val) => `${val}`,
          expression: '(row) => row["VpcId"]',
          required: false,
          sortable: true,
          typeField: "expression",
          mutable: true,
          no_editable: false
        }
      ]
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const localModelValues = ref(props.modelValue);
    localModelValues.value.map((val) => {
      if (val.expression && val.typeField === "expression") {
        val.field = eval(val.expression);
      }
    });

    const rows = ref([
      {
        AmiLaunchIndex: 0,
        ImageId: "ami-0be2609ba883822ec" /* Este  -- Lista*/,
        InstanceId: "i-0002ab0fe5af46ab5" /* Este */,
        InstanceType: "t2.micro" /* Este -- Lista*/,
        KeyName: "ernestocrespo2" /* Este */,
        LaunchTime: 1654891708 /* Este */,
        Monitoring: {
          State: "disabled"
        },
        name: "Hola",
        Placement: {
          AvailabilityZone: "us-east-1e",
          GroupName: "",
          Tenancy: "default"
        },
        PrivateDnsName: "ip-172-31-61-55.ec2.internal",
        PrivateIpAddress: "172.31.61.55",
        ProductCodes: [],
        PublicDnsName: "",
        State: {
          /* Este */ Code: 80,
          Name: "stopped"
        },
        StateTransitionReason: "User initiated (2022-06-10 21:01:07 GMT)",
        SubnetId: "subnet-f9bf66c8" /* Este -- lista*/,
        VpcId: "vpc-aecf69d3" /* Este -- lista*/,
        Architecture: "x86_64" /* Este -- lista*/,
        BlockDeviceMappings: [
          {
            DeviceName: "/dev/xvda",
            Ebs: {
              AttachTime: 1611674537,
              DeleteOnTermination: true,
              Status: "attached",
              VolumeId: "vol-04e7eb85c14cdd738"
            }
          }
        ],
        ClientToken: "",
        EbsOptimized: false,
        EnaSupport: true,
        Hypervisor: "xen",
        IamInstanceProfile: {
          Arn: "arn:aws:iam::996443402123:instance-profile/EC2-SSMagent",
          Id: "AIPA6QAFHV6FRIGSUY5YW"
        },
        NetworkInterfaces: [
          {
            Attachment: {
              AttachTime: 1611674536,
              AttachmentId: "eni-attach-04eb83a715dab03cd",
              DeleteOnTermination: true,
              DeviceIndex: 0,
              Status: "attached",
              NetworkCardIndex: 0
            },
            Description: "",
            Groups: [
              {
                GroupName: "launch-wizard-1",
                GroupId: "sg-046872156683f4a93"
              }
            ],
            Ipv6Addresses: [],
            MacAddress: "06:71:aa:f6:ab:3b",
            NetworkInterfaceId: "eni-087cb6b19067158d6",
            OwnerId: "996443402123",
            PrivateDnsName: "ip-172-31-61-55.ec2.internal",
            PrivateIpAddress: "172.31.61.55",
            PrivateIpAddresses: [
              {
                Primary: true,
                PrivateDnsName: "ip-172-31-61-55.ec2.internal",
                PrivateIpAddress: "172.31.61.55"
              }
            ],
            SourceDestCheck: true,
            Status: "in-use",
            SubnetId: "subnet-f9bf66c8",
            VpcId: "vpc-aecf69d3",
            InterfaceType: "interface"
          }
        ],
        RootDeviceName: "/dev/xvda",
        RootDeviceType: "ebs",
        SecurityGroups: [
          {
            GroupName: "launch-wizard-1",
            GroupId: "sg-046872156683f4a93"
          }
        ],
        SourceDestCheck: true,
        StateReason: {
          Code: "Client.UserInitiatedShutdown",
          Message: "Client.UserInitiatedShutdown: User initiated shutdown"
        },
        /* Importante: valor nuevo a partir de la etiqueta Name */
        Name: "OrbisTest3",
        /*  -------------------- */

        /* Todas las etiquetas */
        Tags: [
          /* Importante */
          {
            Key: "Name",
            Value: "OrbisTest3"
          },
          /*  -------------------- */
          {
            Key: "Owner",
            Value: "EC"
          },
          {
            Key: "TestStop",
            Value: "2"
          },
          {
            Key: "OrbisStart",
            Value: "MON-SAT_0700"
          },
          {
            Key: "OrbisBackup",
            Value: "Daily_MON-SAT_0400_Ret7"
          },
          {
            Key: "awsAutoScalingGroupName",
            Value: "WebSiteAutoScalingTEST-ForDEMO"
          },
          {
            Key: "OrbisSchedule",
            Value: "True"
          },
          {
            Key: "OrbisStop",
            Value: "MON-SAT_1800"
          },
          {
            Key: "Environment",
            Value: "DEV"
          },
          {
            Key: "TestStop2",
            Value: "2"
          }
        ],
        VirtualizationType: "hvm",
        CpuOptions: {
          CoreCount: 1,
          ThreadsPerCore: 1
        },
        CapacityReservationSpecification: {
          CapacityReservationPreference: "open"
        },
        HibernationOptions: {
          Configured: false
        },
        MetadataOptions: {
          State: "applied",
          HttpTokens: "optional",
          HttpPutResponseHopLimit: 1,
          HttpEndpoint: "enabled",
          HttpProtocolIpv6: "disabled"
        },
        EnclaveOptions: {
          Enabled: false
        },
        BootMode: "legacy-bios",
        PlatformDetails: "Linux/UNIX",
        UsageOperation: "RunInstances",
        UsageOperationUpdateTime: 1611674536,
        PrivateDnsNameOptions: {},
        MaintenanceOptions: {
          AutoRecovery: "default"
        }
      }
    ]);
    return {
      localModelValues,
      rows,
      optionsAlign: ref(["left", "right", "center"])
    };
  }
});
</script>
