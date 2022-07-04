<template>
  <q-page>
    <div style="height: 80vh" class="q-pa-lg">
      <QDynamicTable v-model="test" :data-rows="rows" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      rows: ref([
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0be2609ba883822ec" /* Este  -- Lista*/,
          InstanceId: "i-0002ab0fe5af46ab5" /* Este */,
          InstanceType: "t2.micro" /* Este -- Lista*/,
          KeyName: "ernestocrespo2" /* Este */,
          LaunchTime: 1654891708 /* Este */,
          Monitoring: {
            State: "disabled",
          },
          name: "Hola",
          Placement: {
            AvailabilityZone: "us-east-1e",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-61-55.ec2.internal",
          PrivateIpAddress: "172.31.61.55",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            /* Este */ Code: 80,
            Name: "stopped",
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
                VolumeId: "vol-04e7eb85c14cdd738",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: false,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::996443402123:instance-profile/EC2-SSMagent",
            Id: "AIPA6QAFHV6FRIGSUY5YW",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1611674536,
                AttachmentId: "eni-attach-04eb83a715dab03cd",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-1",
                  GroupId: "sg-046872156683f4a93",
                },
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
                  PrivateIpAddress: "172.31.61.55",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-f9bf66c8",
              VpcId: "vpc-aecf69d3",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "launch-wizard-1",
              GroupId: "sg-046872156683f4a93",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          /* Importante: valor nuevo a partir de la etiqueta Name */
          Name: "OrbisTest3",
          /*  -------------------- */

          /* Todas las etiquetas */
          Tags: [
            /* Importante */
            {
              Key: "Name",
              Value: "OrbisTest3",
            },
            /*  -------------------- */
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
              Key: "Environment",
              Value: "DEV",
            },
            {
              Key: "TestStop2",
              Value: "2",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 1,
          },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: {
            Configured: false,
          },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
            HttpProtocolIpv6: "disabled",
          },
          EnclaveOptions: {
            Enabled: false,
          },
          BootMode: "legacy-bios",
          PlatformDetails: "Linux/UNIX",
          UsageOperation: "RunInstances",
          UsageOperationUpdateTime: 1611674536,
          PrivateDnsNameOptions: {},
          MaintenanceOptions: {
            AutoRecovery: "default",
          },
        },
      ]),
      test: ref([
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          format: (val) => `${val}`,
          expression: "(row) => row.name",
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true,
        },
        {
          name: "InstanceId",
          required: true,
          label: "InstanceID",
          align: "left",
          expression: "(row) => row.InstanceId",
          format: (val) => `${val}`,
          sortable: true,
          typeField: null,
          mutable: false,
          no_editable: true,
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
          mutable: false,
          no_editable: true,
        },
        {
          name: "VPC",
          align: "center",
          label: "vpc",
          format: (val) => `${val}`,
          expression: '(row) => row["VpcId"]',
          required: false,
          sortable: true,
          mutable: true,
          no_editable: false,
        },
      ]),
    };
  },
});
</script>
