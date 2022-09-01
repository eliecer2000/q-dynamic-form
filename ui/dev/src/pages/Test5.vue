<template>
  <q-page>
    <div style="height: 80vh" class="q-pa-lg">
      <QDynamicTableRenderSimple
        :data-columns="columns"
        :data-rows="listInstances.items"
        :disable-selection="true"
        v-model="model"
        @refresh="refresh"
        :loading="loading"
        row-index="InstanceId"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  setup() {
    const model = ref(null);

    const listInstances = ref({
      items: [
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0be2609ba883822ec",
          InstanceId: "i-0002ab0fe5af46ab5",
          InstanceType: "t2.micro",
          KeyName: "ernestocrespo2",
          LaunchTime: 1657112466,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1e",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-61-55.ec2.internal",
          PrivateIpAddress: "172.31.61.55",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-07-11 13:34:07 GMT)",
          SubnetId: "subnet-f9bf66c8",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
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
            { GroupName: "launch-wizard-1", GroupId: "sg-046872156683f4a93" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "Name", Value: "OrbisTest3" },
            { Key: "Owner", Value: "EC" },
            { Key: "TestStop", Value: "2" },
            { Key: "OrbisStart", Value: "MON-SAT_0700" },
            { Key: "OrbisBackup", Value: "Daily_MON-SAT_0400_Ret7" },
            {
              Key: "awsAutoScalingGroupName",
              Value: "WebSiteAutoScalingTEST-ForDEMO",
            },
            { Key: "OrbisSchedule", Value: "True" },
            { Key: "OrbisStop", Value: "MON-SAT_1800" },
            { Key: "Environment", Value: "DEV" },
            { Key: "TestStop2", Value: "2" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          BootMode: "legacy-bios",
          Name: ["OrbisTest3"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0be2609ba883822ec",
          InstanceId: "i-0d3582ecee49a930b",
          InstanceType: "t2.micro",
          KeyName: "ernestocrespo2",
          LaunchTime: 1652823393,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1e",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-62-169.ec2.internal",
          PrivateIpAddress: "172.31.62.169",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-05-17 21:40:11 GMT)",
          SubnetId: "subnet-f9bf66c8",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1611674635,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0f7e775aca93fa787",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: false,
          EnaSupport: true,
          Hypervisor: "xen",
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1611674634,
                AttachmentId: "eni-attach-0d73be0cc66d4b098",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-2",
                  GroupId: "sg-0f82a6d0dbd82f6c7",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "06:3f:a4:d0:93:fd",
              NetworkInterfaceId: "eni-03b1f65722576e085",
              OwnerId: "996443402123",
              PrivateDnsName: "ip-172-31-62-169.ec2.internal",
              PrivateIpAddress: "172.31.62.169",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-31-62-169.ec2.internal",
                  PrivateIpAddress: "172.31.62.169",
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
            { GroupName: "launch-wizard-2", GroupId: "sg-0f82a6d0dbd82f6c7" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "OrbisStop", Value: "Daily_MON-SAT_1800*" },
            { Key: "TestStop2", Value: "1" },
            { Key: "Name", Value: "OrbisTest4" },
            { Key: "OrbisStart", Value: "Blank+++" },
            { Key: "OrbisSchedule", Value: "True" },
            {
              Key: "awsAutoScalingGroupName",
              Value: "WebSiteAutoScalingTEST-ForDEMO",
            },
            { Key: "OrbisBackup", Value: "Daily_MON-SAT_0400_Ret7" },
            { Key: "Environment", Value: "DEV" },
            { Key: "TestStop", Value: "2" },
            { Key: "Owner", Value: "EC" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          BootMode: "legacy-bios",
          Name: ["OrbisTest4"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-047a51fa27710816e",
          InstanceId: "i-07d0f5532ba58fd35",
          InstanceType: "t2.micro",
          KeyName: "ernestocrespo2",
          LaunchTime: 1654891708,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-93-37.ec2.internal",
          PrivateIpAddress: "172.31.93.37",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-06-10 21:52:19 GMT)",
          SubnetId: "subnet-9afc6cbb",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1612880680,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-051ae818aa22af2dc",
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
                AttachTime: 1612880679,
                AttachmentId: "eni-attach-0f065a2bf1202935d",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-3",
                  GroupId: "sg-09dd1eaf2323fb8ff",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:d5:c9:b6:6b:b5",
              NetworkInterfaceId: "eni-031830a99950b5748",
              OwnerId: "996443402123",
              PrivateDnsName: "ip-172-31-93-37.ec2.internal",
              PrivateIpAddress: "172.31.93.37",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-31-93-37.ec2.internal",
                  PrivateIpAddress: "172.31.93.37",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-9afc6cbb",
              VpcId: "vpc-aecf69d3",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            { GroupName: "launch-wizard-3", GroupId: "sg-09dd1eaf2323fb8ff" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "Project", Value: "Orbis" },
            { Key: "Environment", Value: "QA" },
            { Key: "et3", Value: "3" },
            { Key: "OrbisStop", Value: "Daily_MON-FRI_1800" },
            { Key: "et1", Value: "1" },
            { Key: "Owner", Value: "EC" },
            { Key: "OrbisStart", Value: "Daily_MON-FRI_0700" },
            { Key: "et2", Value: "2" },
            { Key: "Name", Value: "Test" },
            { Key: "OrbisBackup", Value: "Daily_MON-SUN_0300-Ret15" },
            { Key: "OrbisSchedule", Value: "True" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          Name: ["Test"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-047a51fa27710816e",
          InstanceId: "i-058a70fc62057f7d6",
          InstanceType: "t2.micro",
          KeyName: "ernestocrespo2",
          LaunchTime: 1654892570,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-85-173.ec2.internal",
          PrivateIpAddress: "172.31.85.173",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-06-10 21:52:19 GMT)",
          SubnetId: "subnet-9afc6cbb",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1612881070,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0b57a56f24b361300",
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
                AttachTime: 1612881059,
                AttachmentId: "eni-attach-0c37bf45390df97ea",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-4",
                  GroupId: "sg-0b9dd5fcaad80f43e",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:46:aa:57:3e:45",
              NetworkInterfaceId: "eni-0f554c21ed6eabe91",
              OwnerId: "996443402123",
              PrivateDnsName: "ip-172-31-85-173.ec2.internal",
              PrivateIpAddress: "172.31.85.173",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-31-85-173.ec2.internal",
                  PrivateIpAddress: "172.31.85.173",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-9afc6cbb",
              VpcId: "vpc-aecf69d3",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            { GroupName: "launch-wizard-4", GroupId: "sg-0b9dd5fcaad80f43e" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "Environment", Value: "PROD" },
            { Key: "OrbisFantasia", Value: "LaVidaEsBella" },
            { Key: "Project", Value: "Orbis" },
            { Key: "OrbisStart", Value: "Blank+++" },
            { Key: "OrbisStop", Value: "Daily_MON-FRI_1800" },
            { Key: "Owner", Value: "EC" },
            { Key: "OrbisBackup", Value: "Daily_MON-SUN_0300-Ret15" },
            { Key: "OrbisSchedule", Value: "True" },
            { Key: "Name", Value: "OrbisTest8" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          Name: ["OrbisTest8"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-01cc34ab2709337aa",
          InstanceId: "i-002e43a3aa16adc77",
          InstanceType: "t2.micro",
          LaunchTime: 1656352088,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1d",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-22-44.ec2.internal",
          PrivateIpAddress: "172.31.22.44",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-07-11 13:34:07 GMT)",
          SubnetId: "subnet-c9abf184",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1636638711,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-02e317f31af98076c",
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
                AttachTime: 1636638710,
                AttachmentId: "eni-attach-040ec9913190510d9",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-6",
                  GroupId: "sg-0b4647cf04cd86365",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:a1:83:e4:40:97",
              NetworkInterfaceId: "eni-059be8c11b872f7ac",
              OwnerId: "996443402123",
              PrivateDnsName: "ip-172-31-22-44.ec2.internal",
              PrivateIpAddress: "172.31.22.44",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-31-22-44.ec2.internal",
                  PrivateIpAddress: "172.31.22.44",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-c9abf184",
              VpcId: "vpc-aecf69d3",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            { GroupName: "launch-wizard-6", GroupId: "sg-0b4647cf04cd86365" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "OrbisStart", Value: "Daily_MON-SAT_0700" },
            { Key: "OrbisStop2", Value: "Daily_MON-FRI_1800_SAT_1500" },
            { Key: "OrbisStop", Value: "Daily_MON-SAT_1800" },
            { Key: "Environment", Value: "QA" },
            { Key: "OrbisDEMO", Value: "True" },
            { Key: "Name", Value: "Orbis-UsoEnPresentaciones" },
            { Key: "OrbisBackup-Weekly", Value: "Weekly_SAT_0300_Ret15" },
            { Key: "OrbisSchedule", Value: "True" },
            { Key: "OrbisBackup", Value: "Daily_MON-SAT_0400_Ret7" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          Name: ["Orbis-UsoEnPresentaciones"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-01cc34ab2709337aa",
          InstanceId: "i-0cc36134c56360e07",
          InstanceType: "t2.micro",
          LaunchTime: 1657015267,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1d",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-31-22-172.ec2.internal",
          PrivateIpAddress: "172.31.22.172",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-07-11 13:34:07 GMT)",
          SubnetId: "subnet-c9abf184",
          VpcId: "vpc-aecf69d3",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1636638686,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-094b824d9c1121ec7",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: false,
          EnaSupport: true,
          Hypervisor: "xen",
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1636638685,
                AttachmentId: "eni-attach-08974caf5141f9bc9",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "launch-wizard-5",
                  GroupId: "sg-0bc04f192d77ae8be",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:93:1d:70:34:15",
              NetworkInterfaceId: "eni-006a03979b614c4d2",
              OwnerId: "996443402123",
              PrivateDnsName: "ip-172-31-22-172.ec2.internal",
              PrivateIpAddress: "172.31.22.172",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-31-22-172.ec2.internal",
                  PrivateIpAddress: "172.31.22.172",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-c9abf184",
              VpcId: "vpc-aecf69d3",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            { GroupName: "launch-wizard-5", GroupId: "sg-0bc04f192d77ae8be" },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "OrbisExcluded", Value: "For DEMO Purposes" },
            { Key: "OrbisStop", Value: "Daily_MON-SAT_1800" },
            { Key: "OrbisStop2", Value: "Daily_MON-FRI_1800_SAT_1500" },
            { Key: "OrbisBackup", Value: "Daily_MON-SAT_0400_Ret7" },
            { Key: "OrbisReboot", Value: "OrbisTest1" },
            { Key: "OrbisSchedule", Value: "True" },
            { Key: "OrbisDEMO", Value: "True" },
            { Key: "Environment", Value: "QA" },
            { Key: "Name", Value: "OrbisTest1" },
            { Key: "CloudEndure_Name", Value: "Excluir" },
            { Key: "OrbisStart", Value: "Daily_MON-SAT_0700" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          Name: ["OrbisTest1"],
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0022f774911c1d690",
          InstanceId: "i-0cf946c2eebc77930",
          InstanceType: "t2.nano",
          LaunchTime: 1654894293,
          Monitoring: { State: "disabled" },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-16-1-166.ec2.internal",
          PrivateIpAddress: "172.16.1.166",
          ProductCodes: [],
          PublicDnsName: "",
          State: { Code: 80, Name: "stopped" },
          StateTransitionReason: "User initiated (2022-06-10 21:52:19 GMT)",
          SubnetId: "subnet-0460f59e587aeecc0",
          VpcId: "vpc-010d9ef6af77e3ca7",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1652970565,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-055da8d70476b3093",
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
                AttachTime: 1652970564,
                AttachmentId: "eni-attach-015837e5259c1ae96",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "nat-instance-sg",
                  GroupId: "sg-0e6cbf0704953b857",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:bb:28:fa:7e:17",
              NetworkInterfaceId: "eni-0182825b1ad6c6f7a",
              OwnerId: "996443402123",
              PrivateIpAddress: "172.16.1.166",
              PrivateIpAddresses: [
                { Primary: true, PrivateIpAddress: "172.16.1.166" },
              ],
              SourceDestCheck: false,
              Status: "in-use",
              SubnetId: "subnet-0460f59e587aeecc0",
              VpcId: "vpc-010d9ef6af77e3ca7",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            { GroupName: "nat-instance-sg", GroupId: "sg-0e6cbf0704953b857" },
          ],
          SourceDestCheck: false,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            { Key: "Environment", Value: "PROD" },
            { Key: "Name", Value: "NAT-Instance" },
          ],
          VirtualizationType: "hvm",
          CpuOptions: { CoreCount: 1, ThreadsPerCore: 1 },
          CapacityReservationSpecification: {
            CapacityReservationPreference: "open",
          },
          HibernationOptions: { Configured: false },
          MetadataOptions: {
            State: "applied",
            HttpTokens: "optional",
            HttpPutResponseHopLimit: 1,
            HttpEndpoint: "enabled",
          },
          EnclaveOptions: { Enabled: false },
          Name: ["NAT-Instance"],
        },
      ],
    });

    const columns = ref([
      {
        name: "Name",
        required: true,
        label: "Name",
        align: "left",
        expression: "(row) => row.Name",
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
        sortable: true,
        typeField: null,
        mutable: false,
        no_editable: true,
      },
      {
        name: "State",
        align: "center",
        label: "State",
        expression: '(row) => row["State"]["Name"]',
        required: true,
        sortable: true,
        mutable: false,
        no_editable: true,
      },
      {
        name: "ImageId",
        align: "center",
        label: "ImageId",
        expression: '(row) => row["ImageId"]',
        required: false,
        sortable: true,
        mutable: true,
        no_editable: false,
      },
      {
        name: "SubnetId",
        align: "center",
        label: "Subnet Id",
        expression: '(row) => row["SubnetId"]',
        required: false,
        sortable: true,
        mutable: true,
        no_editable: false,
      },
      {
        name: "VpcId",
        align: "center",
        label: "VpcId",
        expression: '(row) => row["VpcId"]',
        required: false,
        sortable: true,
        mutable: true,
        no_editable: false,
      },
      {
        name: "InstanceType",
        align: "center",
        label: "Instance Type",
        expression: '(row) => row["InstanceType"]',
        required: false,
        sortable: true,
        mutable: true,
        no_editable: false,
      },
      {
        name: "Architecture",
        align: "center",
        label: "Architecture",
        expression: '(row) => row["Architecture"]',
        required: false,
        sortable: true,
        mutable: true,
        no_editable: false,
      },
    ]);

    const loading = ref(false);

    columns.value.map((e) => (e.field = eval(e.expression)));

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
      loading.value = true;
      setTimeout(() => {
        console.log("Refresca ", listInstances.value.items.length);
        listInstances.value.items.splice(0, 1);
        console.log("Final ", listInstances.value.items.length);
        loading.value = false;
      }, 1000);
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
