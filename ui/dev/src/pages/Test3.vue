<template>
  <q-page>
    <div style="height: 80vh" class="q-pa-lg">
      <QDynamicTableRender
        :data-columns="columns"
        :data-rows="listInstances.items"
        :data-filters="listInstances.filters"
        :disable-selection="false"
        :data-selection-all="true"
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
              label: "Backup",
              model: null,
              value: "Backup",
              items: ["True"],
            },
            {
              prefix: "tag:",
              label: "Description",
              model: null,
              value: "Description",
              items: [
                "Instancia para entorno de pruebas de la pagina uao.edu.co (portal intitucional)",
              ],
            },
            {
              prefix: "tag:",
              label: "Environment",
              model: null,
              value: "Environment",
              items: ["Production"],
            },
            {
              prefix: "tag:",
              label: "Name",
              model: null,
              value: "Name",
              items: [
                "Ingenieria2",
                "Portal Institucional - wordpress3",
                "AirViro",
                "old_90minutos",
                "a_TemplateCentOS7",
                "ChatbotMercadeoBackend",
                "Campus-webserver-v10-1006308-SURALAB",
                "Portal_Pruebas",
                "90minutos-Pruebas",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress-05",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress-14",
                "Sitios",
                "OJS",
                "Portal Institucional - wordpress2",
                "a_campus-Webserver-v6_old",
                "DCAWS",
                "UAOVirtualOpsworks - wordpress-uao-virtual7",
                "a_campus-webserver-semilla",
                "Portal Institucional - wordpress1",
                "UAOVirtualOpsworks - wordpress-uao-virtual5",
                "Campus-webserver-v10_1006308 (SURA)",
                "Dependencias",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress013",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress-12",
                "InteOCAV2",
                "Portal Institucional - wordpress5",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress-10",
                "UAO-MyPyme",
                "Bastion-Portal-Institucional",
                "a_TemplateUbuntuM6g",
                "UAOVirtualOpsworks - wordpress-uao-virtual-4",
                "a_Webexdb",
                "UAOVirtualOpsworks - wordpress-uao-virtual6",
                "CitApps",
                "a_UAO_Troughput",
                "UAO-Portal90Min-Prod-OpsWorks - wordpress-06",
              ],
            },
            {
              prefix: "tag:",
              label: "OrbisBackup",
              model: null,
              value: "OrbisBackup",
              items: [
                "Weekly_SUN_0100-Ret30",
                "Daily_MON-SUN_0100-Ret15",
                "Every-15Days_Ret30_0100",
              ],
            },
            {
              prefix: "tag:",
              label: "OrbisSchedule",
              model: null,
              value: "OrbisSchedule",
              items: ["True", "true"],
            },
            {
              prefix: "tag:",
              label: "OrbisStart",
              model: null,
              value: "OrbisStart",
              items: ["Daily_MON-FRI_0700"],
            },
            {
              prefix: "tag:",
              label: "OrbisStop",
              model: null,
              value: "OrbisStop",
              items: ["Daily_MON-FRI_1400", "Daily_MON-FRI_2359"],
            },
            {
              prefix: "tag:",
              label: "Project",
              model: null,
              value: "Project",
              items: ["Portal Institucional", "UAO Virtual", "Portal90Min"],
            },
            {
              prefix: "tag:",
              label: "Proyecto",
              model: null,
              value: "Proyecto",
              items: ["SURA"],
            },
            {
              prefix: "tag:",
              label: "ServiceProvider",
              model: null,
              value: "ServiceProvider",
              items: ["Escala24x7"],
            },
            {
              prefix: "tag:",
              label: "Ticket",
              model: null,
              value: "Ticket",
              items: ["#1007487"],
            },
            {
              prefix: "tag:",
              label: "apagar",
              model: null,
              value: "apagar",
              items: ["si-"],
            },
            {
              prefix: "tag:",
              label: "aws:cloudformation:logical-id",
              model: null,
              value: "aws:cloudformation:logical-id",
              items: ["EC2Instance"],
            },
            {
              prefix: "tag:",
              label: "aws:cloudformation:stack-id",
              model: null,
              value: "aws:cloudformation:stack-id",
              items: [
                "arn:aws:cloudformation:us-east-1:489129722211:stack/Campus-webserver-v10-1006308-SURALAB/3f930570-2013-11ec-8b0f-1201a0a44b75",
              ],
            },
            {
              prefix: "tag:",
              label: "aws:cloudformation:stack-name",
              model: null,
              value: "aws:cloudformation:stack-name",
              items: ["Campus-webserver-v10-1006308-SURALAB"],
            },
            {
              prefix: "tag:",
              label: "backup",
              model: null,
              value: "backup",
              items: ["SURA", "Semanal", "Diario"],
            },
            {
              prefix: "tag:",
              label: "by",
              model: null,
              value: "by",
              items: ["Escala24x7"],
            },
            {
              prefix: "tag:",
              label: "encender",
              model: null,
              value: "encender",
              items: ["si-"],
            },
            {
              prefix: "tag:",
              label: "environment",
              model: null,
              value: "environment",
              items: ["production"],
            },
            {
              prefix: "tag:",
              label: "horario",
              model: null,
              value: "horario",
              items: ["am", "chatbotmercadeo"],
            },
            {
              prefix: "tag:",
              label: "opsworks:instance",
              model: null,
              value: "opsworks:instance",
              items: [
                "wordpress5",
                "wordpress013",
                "wordpress3",
                "wordpress-uao-virtual6",
                "wordpress-uao-virtual5",
                "wordpress-uao-virtual7",
                "wordpress-uao-virtual-4",
                "wordpress2",
                "wordpress-10",
                "wordpress-12",
                "wordpress1",
                "wordpress-14",
                "wordpress-05",
                "wordpress-06",
              ],
            },
            {
              prefix: "tag:",
              label: "opsworks:layer:wordpress",
              model: null,
              value: "opsworks:layer:wordpress",
              items: ["WordPress"],
            },
            {
              prefix: "tag:",
              label: "opsworks:layer:wordpress-uao-virtual",
              model: null,
              value: "opsworks:layer:wordpress-uao-virtual",
              items: ["wordpress-uao-virtual"],
            },
            {
              prefix: "tag:",
              label: "opsworks:stack",
              model: null,
              value: "opsworks:stack",
              items: [
                "UAOVirtualOpsworks",
                "Portal Institucional",
                "Portal Institucional",
                "Portal Institucional",
                "Portal Institucional",
                "UAOVirtualOpsworks",
                "UAO-Portal90Min-Prod-OpsWorks",
                "UAO-Portal90Min-Prod-OpsWorks",
                "UAOVirtualOpsworks",
                "UAOVirtualOpsworks",
                "UAO-Portal90Min-Prod-OpsWorks",
                "UAO-Portal90Min-Prod-OpsWorks",
                "UAO-Portal90Min-Prod-OpsWorks",
                "UAO-Portal90Min-Prod-OpsWorks",
              ],
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
              items: [
                "m6g.medium",
                "t3.small",
                "c5.xlarge",
                "m5.2xlarge",
                "t3.large",
                "t3.medium",
                "m6g.2xlarge",
                "t3a.small",
                "c5.large",
                "m5.large",
                "m6g.large",
                "t4g.medium",
                "t3.micro",
              ],
              label: "Instance type",
              value: "instance-type",
            },
            {
              prefix: null,
              model: null,
              items: [
                "ami-02eac2c0129f6376b",
                "ami-0c248ea2eaf2bd932",
                "ami-00579fbb15b954340",
                "ami-9887c6e7",
                "ami-0880b2c00c181690c",
                "ami-0b09b9c8affd7019f",
                "ami-05f3141013eebdc12",
                "ami-01eac47ab6026dfab",
                "ami-0747bdcabd34c712a",
                "ami-00e6333a8eaa5b461",
                "ami-009d6802948d06e52",
                "ami-0fc61db8544a617ed",
                "ami-0059418b2ffb1d6a8",
                "ami-095192256fe1477ad",
                "ami-07b2d4b5444e146b5",
                "ami-0cd85f74b6fda25d1",
                "ami-0fb7922535155b1c9",
                "ami-03bc60469476ce857",
                "ami-0affd4508a5d2481b",
                "ami-024a01cc806a4d96a",
                "ami-0b898040803850657",
                "ami-0476d5ed6c8143cb6",
                "ami-052b8ee57a67322c0",
              ],
              label: "Image Id",
              value: "image-id",
            },
            {
              prefix: null,
              model: null,
              items: [
                "subnet-052bc368c35279ab5",
                "subnet-016e97bb16f19170b",
                "subnet-049a2e28a22c6806c",
                "subnet-0dda2d9e2e242351e",
                "subnet-0fee81ccac82d153b",
                "subnet-060051a8e64d48547",
                "subnet-0980174bc4894aab7",
                "subnet-0cc8acdfe255ff0bc",
                "subnet-00d9a2813f77fc33f",
                "subnet-087208c1538239d6c",
              ],
              label: "Subnet Id",
              value: "subnet-id",
            },
            {
              prefix: null,
              model: null,
              items: ["vpc-0a28d8f53c222aefb", "vpc-0b38db423a9c187be"],
              label: "Vpc Id",
              value: "vpc-id",
            },
            {
              prefix: null,
              label: "Architecture",
              value: "architecture",
              items: ["i386", "x86_64", "arm64"],
            },
          ],
        },
      ],
      items: [
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-01eac47ab6026dfab",
          InstanceId: "i-084f21a7809ad0ed3",
          InstanceType: "t3.large",
          KeyName: "UAO-KEY",
          LaunchTime: 1663243263,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-51.ec2.internal",
          PrivateIpAddress: "172.20.10.51",
          ProductCodes: [],
          PublicDnsName: "ec2-34-230-189-229.compute-1.amazonaws.com",
          PublicIpAddress: "34.230.189.229",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1539206484,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-096e9424027a9ce30",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1539206497,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-0c3ef8c38d6c3f76f",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-34-230-189-229.compute-1.amazonaws.com",
                PublicIp: "34.230.189.229",
              },
              Attachment: {
                AttachTime: 1529599514,
                AttachmentId: "eni-attach-02ae0790ce1b99260",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_FTP_UAO",
                  GroupId: "sg-0bc47f2ce7ce6dc81",
                },
                {
                  GroupName: "sg_FTP_UAO_Int",
                  GroupId: "sg-06f3092aafdce80cd",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
                {
                  GroupName: "sg_90minutos",
                  GroupId: "sg-05d1924fb887e583c",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:6c:af:ed:17:82",
              NetworkInterfaceId: "eni-03ac87ec38e474f81",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-51.ec2.internal",
              PrivateIpAddress: "172.20.10.51",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-34-230-189-229.compute-1.amazonaws.com",
                    PublicIp: "34.230.189.229",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-51.ec2.internal",
                  PrivateIpAddress: "172.20.10.51",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_FTP_UAO",
              GroupId: "sg-0bc47f2ce7ce6dc81",
            },
            {
              GroupName: "sg_FTP_UAO_Int",
              GroupId: "sg-06f3092aafdce80cd",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
            {
              GroupName: "sg_90minutos",
              GroupId: "sg-05d1924fb887e583c",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "old_90minutos",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-FRI_1400",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "OrbisStart",
              Value: "Daily_MON-FRI_0700",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-084f21a7809ad0ed3",
          Name: "old_90minutos",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-024a01cc806a4d96a",
          InstanceId: "i-0006e051099d2ad63",
          InstanceType: "m5.large",
          KeyName: "DCAWS",
          LaunchTime: 1562166393,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          Platform: "windows",
          PrivateDnsName: "ip-172-20-10-39.ec2.internal",
          PrivateIpAddress: "172.20.10.39",
          ProductCodes: [],
          PublicDnsName: "ec2-50-17-70-139.compute-1.amazonaws.com",
          PublicIpAddress: "50.17.70.139",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1562166393,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-04e8c565be4884aed",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-50-17-70-139.compute-1.amazonaws.com",
                PublicIp: "50.17.70.139",
              },
              Attachment: {
                AttachTime: 1562166393,
                AttachmentId: "eni-attach-06f912d0fb079e7ca",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_metabibliotecas",
                  GroupId: "sg-05f1da1e5a011a6c5",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
                {
                  GroupName: "sg_uao_DCAWS",
                  GroupId: "sg-07562b3d203dda970",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:cd:27:e2:0c:fa",
              NetworkInterfaceId: "eni-0948c6868aad1ff8d",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-39.ec2.internal",
              PrivateIpAddress: "172.20.10.39",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-50-17-70-139.compute-1.amazonaws.com",
                    PublicIp: "50.17.70.139",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-39.ec2.internal",
                  PrivateIpAddress: "172.20.10.39",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_metabibliotecas",
              GroupId: "sg-05f1da1e5a011a6c5",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
            {
              GroupName: "sg_uao_DCAWS",
              GroupId: "sg-07562b3d203dda970",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "DCAWS",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "ServiceProvider",
              Value: "Escala24x7",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0006e051099d2ad63",
          Name: "DCAWS",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0b898040803850657",
          InstanceId: "i-0b59acf33b53398e1",
          InstanceType: "t3.small",
          KeyName: "chatbotmercadeo",
          LaunchTime: 1570887681,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-185.ec2.internal",
          PrivateIpAddress: "172.20.10.185",
          ProductCodes: [],
          PublicDnsName: "ec2-3-222-112-241.compute-1.amazonaws.com",
          PublicIpAddress: "3.222.112.241",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1565090901,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0c34a470b1bd0d9b4",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-3-222-112-241.compute-1.amazonaws.com",
                PublicIp: "3.222.112.241",
              },
              Attachment: {
                AttachTime: 1565090901,
                AttachmentId: "eni-attach-0bcf9097c7b75c695",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_ChatbotMercadeoBackend",
                  GroupId: "sg-09ad2190c92476716",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:f6:e6:d7:75:c0",
              NetworkInterfaceId: "eni-0cb76d77bb42a690f",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-185.ec2.internal",
              PrivateIpAddress: "172.20.10.185",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-3-222-112-241.compute-1.amazonaws.com",
                    PublicIp: "3.222.112.241",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-185.ec2.internal",
                  PrivateIpAddress: "172.20.10.185",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_ChatbotMercadeoBackend",
              GroupId: "sg-09ad2190c92476716",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "ServiceProvider",
              Value: "Escala24x7",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
            {
              Key: "horario",
              Value: "chatbotmercadeo",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "ChatbotMercadeoBackend",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0b59acf33b53398e1",
          Name: "ChatbotMercadeoBackend",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0fc61db8544a617ed",
          InstanceId: "i-0ac22f9f5c33bf4d5",
          InstanceType: "t3.micro",
          KeyName: "UAO-KEY",
          LaunchTime: 1601669456,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-247.ec2.internal",
          PrivateIpAddress: "172.20.10.247",
          ProductCodes: [],
          PublicDnsName: "ec2-54-157-116-124.compute-1.amazonaws.com",
          PublicIpAddress: "54.157.116.124",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1584738653,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-03e49315f473fa691",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-54-157-116-124.compute-1.amazonaws.com",
                PublicIp: "54.157.116.124",
              },
              Attachment: {
                AttachTime: 1584738653,
                AttachmentId: "eni-attach-0afbd450b6a4fd924",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "SG-portal-phpmyadmin",
                  GroupId: "sg-0e7bf8a3f38bfacc0",
                },
                {
                  GroupName: "sg_bastion_portal",
                  GroupId: "sg-013abbb0463379ad3",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:cb:aa:2b:15:85",
              NetworkInterfaceId: "eni-0b6df666d0da8fa6a",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-247.ec2.internal",
              PrivateIpAddress: "172.20.10.247",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-54-157-116-124.compute-1.amazonaws.com",
                    PublicIp: "54.157.116.124",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-247.ec2.internal",
                  PrivateIpAddress: "172.20.10.247",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "SG-portal-phpmyadmin",
              GroupId: "sg-0e7bf8a3f38bfacc0",
            },
            {
              GroupName: "sg_bastion_portal",
              GroupId: "sg-013abbb0463379ad3",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "Name",
              Value: "Bastion-Portal-Institucional",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0ac22f9f5c33bf4d5",
          Name: "Bastion-Portal-Institucional",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0c248ea2eaf2bd932",
          InstanceId: "i-0fc3756bfd3432e55",
          InstanceType: "c5.xlarge",
          KeyName: "moodle",
          LaunchTime: 1576596942,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-4-150.ec2.internal",
          PrivateIpAddress: "172.30.4.150",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated",
          SubnetId: "subnet-0fee81ccac82d153b",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1564481397,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0dd864355da88a9dd",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1564481397,
                AttachmentId: "eni-attach-091e0a3c846ead9d2",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "UAOMoodleCampus-securitygroups-no-asg",
                  GroupId: "sg-053079d88c7aee742",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:89:c4:ff:ab:ee",
              NetworkInterfaceId: "eni-01fa5102fc1c1e28d",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-4-150.ec2.internal",
              PrivateIpAddress: "172.30.4.150",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-4-150.ec2.internal",
                  PrivateIpAddress: "172.30.4.150",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0fee81ccac82d153b",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "UAOMoodleCampus-securitygroups-no-asg",
              GroupId: "sg-053079d88c7aee742",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.InstanceInitiatedShutdown",
            Message:
              "Client.InstanceInitiatedShutdown: Instance initiated shutdown",
          },
          Tags: [
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "ServiceProvider",
              Value: "Escala24x7",
            },
            {
              Key: "Name",
              Value: "a_campus-Webserver-v6_old",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0fc3756bfd3432e55",
          Name: "a_campus-Webserver-v6_old",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-9887c6e7",
          InstanceId: "i-077b4f8b9a448d481",
          InstanceType: "m5.large",
          KeyName: "airviro",
          LaunchTime: 1600189367,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-30-190.ec2.internal",
          PrivateIpAddress: "172.20.30.190",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "ec2-52-21-160-52.compute-1.amazonaws.com",
          PublicIpAddress: "52.21.160.52",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-049a2e28a22c6806c",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1535566594,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-023a119d7c04b2aae",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1537361084,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-0a97b8cc0cd08b5e7",
              },
            },
          ],
          ClientToken: "153556656661513253",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-52-21-160-52.compute-1.amazonaws.com",
                PublicIp: "52.21.160.52",
              },
              Attachment: {
                AttachTime: 1535566594,
                AttachmentId: "eni-attach-09fdd21f64bdb49b8",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_AirViro",
                  GroupId: "sg-0a28b7ee8909e8192",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:7f:35:d5:1f:b6",
              NetworkInterfaceId: "eni-0b8dc0a56c1921d91",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-30-190.ec2.internal",
              PrivateIpAddress: "172.20.30.190",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-52-21-160-52.compute-1.amazonaws.com",
                    PublicIp: "52.21.160.52",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-30-190.ec2.internal",
                  PrivateIpAddress: "172.20.30.190",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-049a2e28a22c6806c",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_AirViro",
              GroupId: "sg-0a28b7ee8909e8192",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "AirViro",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-077b4f8b9a448d481",
          Name: "AirViro",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-009d6802948d06e52",
          InstanceId: "i-0c3dc70faa31b17e5",
          InstanceType: "m5.2xlarge",
          KeyName: "uao_troughput",
          LaunchTime: 1625198460,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-30-243.ec2.internal",
          PrivateIpAddress: "172.20.30.243",
          ProductCodes: [],
          PublicDnsName: "ec2-52-207-82-195.compute-1.amazonaws.com",
          PublicIpAddress: "52.207.82.195",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2021-07-06 21:04:12 GMT)",
          SubnetId: "subnet-049a2e28a22c6806c",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1545167379,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-069d30c7295a51749",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-52-207-82-195.compute-1.amazonaws.com",
                PublicIp: "52.207.82.195",
              },
              Attachment: {
                AttachTime: 1545167378,
                AttachmentId: "eni-attach-0ee041c59c4c441d2",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_uao_troughput",
                  GroupId: "sg-06a056158fce15659",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:17:09:fe:f2:6a",
              NetworkInterfaceId: "eni-02d328920d7129b8a",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-30-243.ec2.internal",
              PrivateIpAddress: "172.20.30.243",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-52-207-82-195.compute-1.amazonaws.com",
                    PublicIp: "52.207.82.195",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-30-243.ec2.internal",
                  PrivateIpAddress: "172.20.30.243",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-049a2e28a22c6806c",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_uao_troughput",
              GroupId: "sg-06a056158fce15659",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "apagar",
              Value: "si-",
            },
            {
              Key: "OrbisSchedule",
              Value: "true",
            },
            {
              Key: "encender",
              Value: "si-",
            },
            {
              Key: "Name",
              Value: "a_UAO_Troughput",
            },
            {
              Key: "horario",
              Value: "am",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 4,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0c3dc70faa31b17e5",
          Name: "a_UAO_Troughput",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-02eac2c0129f6376b",
          InstanceId: "i-0799d106f3babb24e",
          InstanceType: "t3.large",
          KeyName: "OJS",
          LaunchTime: 1569612854,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-30-141.ec2.internal",
          PrivateIpAddress: "172.20.30.141",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "ec2-34-232-194-9.compute-1.amazonaws.com",
          PublicIpAddress: "34.232.194.9",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-049a2e28a22c6806c",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1560174714,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0ef0d549adc3a3922",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1560174714,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-04808318bf17cfbdd",
              },
            },
          ],
          ClientToken: "156017471126494775",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-34-232-194-9.compute-1.amazonaws.com",
                PublicIp: "34.232.194.9",
              },
              Attachment: {
                AttachTime: 1560174713,
                AttachmentId: "eni-attach-0407af3f501cdfebd",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_OJS",
                  GroupId: "sg-041f616f7129f5de3",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:9a:f0:e5:89:28",
              NetworkInterfaceId: "eni-0a6b00b639f7bd1ca",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-30-141.ec2.internal",
              PrivateIpAddress: "172.20.30.141",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-34-232-194-9.compute-1.amazonaws.com",
                    PublicIp: "34.232.194.9",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-30-141.ec2.internal",
                  PrivateIpAddress: "172.20.30.141",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-049a2e28a22c6806c",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_OJS",
              GroupId: "sg-041f616f7129f5de3",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisBackup",
              Value: "Weekly_SUN_0100-Ret30",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "ServiceProvider",
              Value: "Escala24x7",
            },
            {
              Key: "Name",
              Value: "OJS",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "backup",
              Value: "Semanal",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0799d106f3babb24e",
          Name: "OJS",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0b09b9c8affd7019f",
          InstanceId: "i-0b5cbbf142e8da706",
          InstanceType: "c5.large",
          KeyName: "moodle",
          LaunchTime: 1660254547,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-201-63.ec2.internal",
          PrivateIpAddress: "172.30.201.63",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "ec2-34-195-126-250.compute-1.amazonaws.com",
          PublicIpAddress: "34.195.126.250",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated",
          SubnetId: "subnet-0dda2d9e2e242351e",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1584661473,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-04a8c90601113eecc",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1584661473,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-07b16c343afb60f18",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-34-195-126-250.compute-1.amazonaws.com",
                PublicIp: "34.195.126.250",
              },
              Attachment: {
                AttachTime: 1584661472,
                AttachmentId: "eni-attach-060ad6447920cb1ad",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "campus_seed_sg",
                  GroupId: "sg-082746167fe29ab99",
                },
                {
                  GroupName: "UAOMoodleCampus-securitygroups-no-asg",
                  GroupId: "sg-053079d88c7aee742",
                },
                {
                  GroupName:
                    "UAOMoodleCampus-securitygroups-1L3P20N7MPR38-WebSecurityGroup-17W8HHSI7N2RD",
                  GroupId: "sg-01a160e14b54b9581",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:c0:10:9b:0a:ff",
              NetworkInterfaceId: "eni-096be6bd7b1b87252",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-201-63.ec2.internal",
              PrivateIpAddress: "172.30.201.63",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-34-195-126-250.compute-1.amazonaws.com",
                    PublicIp: "34.195.126.250",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-30-201-63.ec2.internal",
                  PrivateIpAddress: "172.30.201.63",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0dda2d9e2e242351e",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "campus_seed_sg",
              GroupId: "sg-082746167fe29ab99",
            },
            {
              GroupName: "UAOMoodleCampus-securitygroups-no-asg",
              GroupId: "sg-053079d88c7aee742",
            },
            {
              GroupName:
                "UAOMoodleCampus-securitygroups-1L3P20N7MPR38-WebSecurityGroup-17W8HHSI7N2RD",
              GroupId: "sg-01a160e14b54b9581",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.InstanceInitiatedShutdown",
            Message:
              "Client.InstanceInitiatedShutdown: Instance initiated shutdown",
          },
          Tags: [
            {
              Key: "Name",
              Value: "a_campus-webserver-semilla",
            },
            {
              Key: "Backup",
              Value: "True",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0b5cbbf142e8da706",
          Name: "a_campus-webserver-semilla",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0affd4508a5d2481b",
          InstanceId: "i-0ee3e11306e525c6e",
          InstanceType: "t3.medium",
          KeyName: "CentOS7",
          LaunchTime: 1636482154,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-1-53.ec2.internal",
          PrivateIpAddress: "172.20.1.53",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2021-11-09 18:39:35 GMT)",
          SubnetId: "subnet-060051a8e64d48547",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1589554417,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-09ad7de5c515386c0",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1589554417,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-018205bb44803317e",
              },
            },
          ],
          ClientToken: "158955441358416617",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1589554416,
                AttachmentId: "eni-attach-06211dcbfac1db85e",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:38:90:a8:1d:3f",
              NetworkInterfaceId: "eni-0c746f3726ae0e56a",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-1-53.ec2.internal",
              PrivateIpAddress: "172.20.1.53",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-1-53.ec2.internal",
                  PrivateIpAddress: "172.20.1.53",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-060051a8e64d48547",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Name",
              Value: "a_TemplateCentOS7",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0ee3e11306e525c6e",
          Name: "a_TemplateCentOS7",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-03f3b7065d26ffe8b",
          InstanceType: "m5.large",
          LaunchTime: 1594296096,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-4-201.ec2.internal",
          PrivateIpAddress: "172.30.4.201",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2020-07-09 12:08:08 GMT)",
          SubnetId: "subnet-0fee81ccac82d153b",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1587470556,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-023aa868ed4ce789f",
              },
            },
          ],
          ClientToken: "3a340be4-d181-46b6-928b-0c2918dde277",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAOVirtualOpsworks-InstanceProfile-OELWZQDCE6R4",
            Id: "AIPAXDYTHIFRQFXDO3U44",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1587470547,
                AttachmentId: "eni-attach-0e577196eced29875",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0099e528fedb68bcf",
                },
                {
                  GroupName:
                    "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
                  GroupId: "sg-014c2b1cc2006cbbb",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:09:e4:dc:8c:f3",
              NetworkInterfaceId: "eni-01a90299dc6bb755e",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-4-201.ec2.internal",
              PrivateIpAddress: "172.30.4.201",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-4-201.ec2.internal",
                  PrivateIpAddress: "172.30.4.201",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0fee81ccac82d153b",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0099e528fedb68bcf",
            },
            {
              GroupName: "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
              GroupId: "sg-014c2b1cc2006cbbb",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "environment",
              Value: "production",
            },
            {
              Key: "opsworks:layer:wordpress-uao-virtual",
              Value: "wordpress-uao-virtual",
            },
            {
              Key: "opsworks:stack",
              Value: "UAOVirtualOpsworks",
            },
            {
              Key: "Project",
              Value: "UAO Virtual",
            },
            {
              Key: "Name",
              Value: "UAOVirtualOpsworks - wordpress-uao-virtual-4",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-uao-virtual-4",
            },
            {
              Key: "by",
              Value: "Escala24x7",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-03f3b7065d26ffe8b",
          Name: "UAOVirtualOpsworks - wordpress-uao-virtual-4",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-00579fbb15b954340",
          InstanceId: "i-0de73fe2c87bc0e0c",
          InstanceType: "m6g.medium",
          KeyName: "UAO-KEY",
          LaunchTime: 1636482154,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-19.ec2.internal",
          PrivateIpAddress: "172.20.2.19",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2021-11-09 18:39:35 GMT)",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1591997185,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0e3f2251fd181091d",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1591997185,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-07aba26b22b4979e9",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1591997185,
                AttachmentId: "eni-attach-0f79101128f9e105d",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "launch-wizard-1",
                  GroupId: "sg-025b4ab1c27ec7cc3",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:05:b5:76:28:cb",
              NetworkInterfaceId: "eni-05cb8f5cbf70847ad",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-19.ec2.internal",
              PrivateIpAddress: "172.20.2.19",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-19.ec2.internal",
                  PrivateIpAddress: "172.20.2.19",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "launch-wizard-1",
              GroupId: "sg-025b4ab1c27ec7cc3",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Name",
              Value: "a_TemplateUbuntuM6g",
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0de73fe2c87bc0e0c",
          Name: "a_TemplateUbuntuM6g",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0880b2c00c181690c",
          InstanceId: "i-0554cdc48e6491c15",
          InstanceType: "m6g.large",
          KeyName: "UAO-KEY",
          LaunchTime: 1601321940,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-20-32.ec2.internal",
          PrivateIpAddress: "172.20.20.32",
          ProductCodes: [],
          PublicDnsName: "ec2-23-22-87-41.compute-1.amazonaws.com",
          PublicIpAddress: "23.22.87.41",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0980174bc4894aab7",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1593018104,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0e734214595bcc389",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1593018104,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0c150b2ca18c63143",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-23-22-87-41.compute-1.amazonaws.com",
                PublicIp: "23.22.87.41",
              },
              Attachment: {
                AttachTime: 1593018103,
                AttachmentId: "eni-attach-065878015a5116308",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_ssh_P_Ingenierias",
                  GroupId: "sg-0e5dce29a7dba6ae6",
                },
                {
                  GroupName: "sg_ingenieria",
                  GroupId: "sg-0f22f65dff38c4532",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:0d:41:9e:e0:43",
              NetworkInterfaceId: "eni-0070657872ce62296",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-20-32.ec2.internal",
              PrivateIpAddress: "172.20.20.32",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-23-22-87-41.compute-1.amazonaws.com",
                    PublicIp: "23.22.87.41",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-20-32.ec2.internal",
                  PrivateIpAddress: "172.20.20.32",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0980174bc4894aab7",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_ssh_P_Ingenierias",
              GroupId: "sg-0e5dce29a7dba6ae6",
            },
            {
              GroupName: "sg_ingenieria",
              GroupId: "sg-0f22f65dff38c4532",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "backup",
              Value: "Semanal",
            },
            {
              Key: "OrbisBackup",
              Value: "Weekly_SUN_0100-Ret30",
            },
            {
              Key: "Name",
              Value: "Ingenieria2",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0554cdc48e6491c15",
          Name: "Ingenieria2",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0059418b2ffb1d6a8",
          InstanceId: "i-0c5f0a1e6bf14923f",
          InstanceType: "m6g.2xlarge",
          KeyName: "UAO-KEY",
          LaunchTime: 1600100991,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-37.ec2.internal",
          PrivateIpAddress: "172.20.10.37",
          ProductCodes: [],
          PublicDnsName: "ec2-35-172-255-235.compute-1.amazonaws.com",
          PublicIpAddress: "35.172.255.235",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1599761400,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-043ba33ecb7bea662",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1599761400,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0ce5d5092cf93508e",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-35-172-255-235.compute-1.amazonaws.com",
                PublicIp: "35.172.255.235",
              },
              Attachment: {
                AttachTime: 1599761399,
                AttachmentId: "eni-attach-046da68dc76acc0c9",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_dependencias",
                  GroupId: "sg-00d05bb64e809d8bb",
                },
                {
                  GroupName: "sg_bitbucket_ssh",
                  GroupId: "sg-0c9bca0c9123eea81",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:87:95:d4:29:cb",
              NetworkInterfaceId: "eni-0d1504cfd191c710a",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-37.ec2.internal",
              PrivateIpAddress: "172.20.10.37",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-35-172-255-235.compute-1.amazonaws.com",
                    PublicIp: "35.172.255.235",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-37.ec2.internal",
                  PrivateIpAddress: "172.20.10.37",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_dependencias",
              GroupId: "sg-00d05bb64e809d8bb",
            },
            {
              GroupName: "sg_bitbucket_ssh",
              GroupId: "sg-0c9bca0c9123eea81",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
            {
              Key: "Name",
              Value: "Dependencias",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 8,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0c5f0a1e6bf14923f",
          Name: "Dependencias",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0b99da6dbc54bf720",
          InstanceType: "m5.large",
          LaunchTime: 1607170827,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-1-65.ec2.internal",
          PrivateIpAddress: "172.20.1.65",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2020-12-05 12:31:35 GMT)",
          SubnetId: "subnet-060051a8e64d48547",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1607170828,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0e306dd35706f8142",
              },
            },
          ],
          ClientToken: "443fc0da-a054-4476-ba85-e620d4c3a015",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/aws-opsworks-ec2-role",
            Id: "AIPAXDYTHIFRXOJZ7EPJN",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1607170827,
                AttachmentId: "eni-attach-0699335e43396cb8a",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "AWS-OpsWorks-WebApp",
                  GroupId: "sg-0481910539f46bd1a",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:9d:9a:6f:6c:07",
              NetworkInterfaceId: "eni-05c26b39fe6a79727",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-1-65.ec2.internal",
              PrivateIpAddress: "172.20.1.65",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-1-65.ec2.internal",
                  PrivateIpAddress: "172.20.1.65",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-060051a8e64d48547",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "AWS-OpsWorks-WebApp",
              GroupId: "sg-0481910539f46bd1a",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "opsworks:instance",
              Value: "wordpress3",
            },
            {
              Key: "Project",
              Value: "Portal Institucional",
            },
            {
              Key: "opsworks:stack",
              Value: "Portal Institucional",
            },
            {
              Key: "Name",
              Value: "Portal Institucional - wordpress3",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          BootMode: "legacy-bios",
          ResourceId: "i-0b99da6dbc54bf720",
          Name: "Portal Institucional - wordpress3",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-03bc60469476ce857",
          InstanceId: "i-026c9a84c3acc373b",
          InstanceType: "m6g.2xlarge",
          KeyName: "UAO-KEY",
          LaunchTime: 1599484066,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-20-179.ec2.internal",
          PrivateIpAddress: "172.20.20.179",
          ProductCodes: [],
          PublicDnsName: "ec2-107-22-123-79.compute-1.amazonaws.com",
          PublicIpAddress: "107.22.123.79",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0980174bc4894aab7",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1597415130,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-03561e4883fe0f76d",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1597781881,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-0b16c079ee35bee64",
              },
            },
            {
              DeviceName: "/dev/sdg",
              Ebs: {
                AttachTime: 1598286514,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-02390e7dbeaee3002",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-107-22-123-79.compute-1.amazonaws.com",
                PublicIp: "107.22.123.79",
              },
              Attachment: {
                AttachTime: 1597415129,
                AttachmentId: "eni-attach-004802a69bf0106d0",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_sitios",
                  GroupId: "sg-01ed764a4dcbfebc6",
                },
                {
                  GroupName: "sg_bitbucket_ssh",
                  GroupId: "sg-0c9bca0c9123eea81",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:aa:77:31:94:db",
              NetworkInterfaceId: "eni-08092357c505d25bf",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-20-179.ec2.internal",
              PrivateIpAddress: "172.20.20.179",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-107-22-123-79.compute-1.amazonaws.com",
                    PublicIp: "107.22.123.79",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-20-179.ec2.internal",
                  PrivateIpAddress: "172.20.20.179",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0980174bc4894aab7",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_sitios",
              GroupId: "sg-01ed764a4dcbfebc6",
            },
            {
              GroupName: "sg_bitbucket_ssh",
              GroupId: "sg-0c9bca0c9123eea81",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "Sitios",
            },
            {
              Key: "OrbisBackup",
              Value: "Weekly_SUN_0100-Ret30",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 8,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-026c9a84c3acc373b",
          Name: "Sitios",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-07b2d4b5444e146b5",
          InstanceId: "i-02181acab3775c661",
          InstanceType: "m6g.medium",
          KeyName: "webexdb",
          LaunchTime: 1622834641,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-20-182.ec2.internal",
          PrivateIpAddress: "172.20.20.182",
          ProductCodes: [],
          PublicDnsName: "ec2-3-93-123-81.compute-1.amazonaws.com",
          PublicIpAddress: "3.93.123.81",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated",
          SubnetId: "subnet-0980174bc4894aab7",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1600504149,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-03cb3b0d70673c335",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1600504149,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0a12cd700cef0a008",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-3-93-123-81.compute-1.amazonaws.com",
                PublicIp: "3.93.123.81",
              },
              Attachment: {
                AttachTime: 1600504148,
                AttachmentId: "eni-attach-0b36b549c82ef07d0",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_a_Webexdb",
                  GroupId: "sg-022cbe6cab06b8182",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:dd:35:e8:be:61",
              NetworkInterfaceId: "eni-0847eaeb4b4d19884",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-20-182.ec2.internal",
              PrivateIpAddress: "172.20.20.182",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-3-93-123-81.compute-1.amazonaws.com",
                    PublicIp: "3.93.123.81",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-20-182.ec2.internal",
                  PrivateIpAddress: "172.20.20.182",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0980174bc4894aab7",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_a_Webexdb",
              GroupId: "sg-022cbe6cab06b8182",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.InstanceInitiatedShutdown",
            Message:
              "Client.InstanceInitiatedShutdown: Instance initiated shutdown",
          },
          Tags: [
            {
              Key: "Name",
              Value: "a_Webexdb",
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-02181acab3775c661",
          Name: "a_Webexdb",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0476d5ed6c8143cb6",
          InstanceId: "i-02a4d37a86510a27b",
          InstanceType: "m6g.large",
          KeyName: "CIT",
          LaunchTime: 1600787176,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-20-40.ec2.internal",
          PrivateIpAddress: "172.20.20.40",
          ProductCodes: [],
          PublicDnsName: "ec2-35-173-29-82.compute-1.amazonaws.com",
          PublicIpAddress: "35.173.29.82",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0980174bc4894aab7",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1600787177,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-01b0dc7878a0578ba",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1600787177,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-04897eade4c85f794",
              },
            },
            {
              DeviceName: "/dev/sdc",
              Ebs: {
                AttachTime: 1600787177,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0ad3bcf86a585de34",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-35-173-29-82.compute-1.amazonaws.com",
                PublicIp: "35.173.29.82",
              },
              Attachment: {
                AttachTime: 1600787176,
                AttachmentId: "eni-attach-0e77453f14203e3d9",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_CitApps",
                  GroupId: "sg-09c0b32e4f2371f92",
                },
                {
                  GroupName: "sg_CitApps_ssh",
                  GroupId: "sg-0ff32a506406bd57a",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:53:19:21:98:95",
              NetworkInterfaceId: "eni-01f1def7331a2f212",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-20-40.ec2.internal",
              PrivateIpAddress: "172.20.20.40",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-35-173-29-82.compute-1.amazonaws.com",
                    PublicIp: "35.173.29.82",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-20-40.ec2.internal",
                  PrivateIpAddress: "172.20.20.40",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0980174bc4894aab7",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_CitApps",
              GroupId: "sg-09c0b32e4f2371f92",
            },
            {
              GroupName: "sg_CitApps_ssh",
              GroupId: "sg-0ff32a506406bd57a",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "backup",
              Value: "Semanal",
            },
            {
              Key: "OrbisBackup",
              Value: "Weekly_SUN_0100-Ret30",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Name",
              Value: "CitApps",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-02a4d37a86510a27b",
          Name: "CitApps",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0cd85f74b6fda25d1",
          InstanceId: "i-0c8872e79be87d01a",
          InstanceType: "m6g.large",
          KeyName: "InteOCAV",
          LaunchTime: 1601321983,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-30-132.ec2.internal",
          PrivateIpAddress: "172.20.30.132",
          ProductCodes: [],
          PublicDnsName: "ec2-34-235-22-152.compute-1.amazonaws.com",
          PublicIpAddress: "34.235.22.152",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-049a2e28a22c6806c",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1598038556,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0dca96c7210c8b2b5",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1598038556,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-054aa03c806f9aeab",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-34-235-22-152.compute-1.amazonaws.com",
                PublicIp: "34.235.22.152",
              },
              Attachment: {
                AttachTime: 1598038555,
                AttachmentId: "eni-attach-0f57560f8cb405eb8",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_InteOCAV_SSH_Ext",
                  GroupId: "sg-0ec7ba6e1442db975",
                },
                {
                  GroupName: "sg_InteOCAV_ports",
                  GroupId: "sg-083f9ff629ce0d21c",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:e3:66:b9:6d:2d",
              NetworkInterfaceId: "eni-0f5b5bd67d8fdea63",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-30-132.ec2.internal",
              PrivateIpAddress: "172.20.30.132",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-34-235-22-152.compute-1.amazonaws.com",
                    PublicIp: "34.235.22.152",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-30-132.ec2.internal",
                  PrivateIpAddress: "172.20.30.132",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-049a2e28a22c6806c",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_InteOCAV_SSH_Ext",
              GroupId: "sg-0ec7ba6e1442db975",
            },
            {
              GroupName: "sg_InteOCAV_ports",
              GroupId: "sg-083f9ff629ce0d21c",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Ticket",
              Value: "#1007487",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "backup",
              Value: "Semanal",
            },
            {
              Key: "Name",
              Value: "InteOCAV2",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisBackup",
              Value: "Weekly_SUN_0100-Ret30",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0c8872e79be87d01a",
          Name: "InteOCAV2",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-097852646f783b4a2",
          InstanceType: "m5.large",
          LaunchTime: 1624057204,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-1-104.ec2.internal",
          PrivateIpAddress: "172.20.1.104",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-060051a8e64d48547",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1624057206,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-03e972d2e7dace417",
              },
            },
          ],
          ClientToken: "a20d67e6-8bc9-4ec4-a32d-b0d6134ca848",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/aws-opsworks-ec2-role",
            Id: "AIPAXDYTHIFRXOJZ7EPJN",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1624057204,
                AttachmentId: "eni-attach-0fae7d355a74a4368",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "AWS-OpsWorks-WebApp",
                  GroupId: "sg-0481910539f46bd1a",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:fc:95:25:23:71",
              NetworkInterfaceId: "eni-0661dd72408be164d",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-1-104.ec2.internal",
              PrivateIpAddress: "172.20.1.104",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-1-104.ec2.internal",
                  PrivateIpAddress: "172.20.1.104",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-060051a8e64d48547",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "AWS-OpsWorks-WebApp",
              GroupId: "sg-0481910539f46bd1a",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "Portal Institucional - wordpress5",
            },
            {
              Key: "opsworks:stack",
              Value: "Portal Institucional",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress5",
            },
            {
              Key: "Project",
              Value: "Portal Institucional",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-097852646f783b4a2",
          Name: "Portal Institucional - wordpress5",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0747bdcabd34c712a",
          InstanceId: "i-028653ccbd980c29e",
          InstanceType: "t3.medium",
          KeyName: "UAO-KEY",
          LaunchTime: 1663243264,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-66.ec2.internal",
          PrivateIpAddress: "172.20.10.66",
          ProductCodes: [],
          PublicDnsName: "ec2-44-194-56-117.compute-1.amazonaws.com",
          PublicIpAddress: "44.194.56.117",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1625867458,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-05f4d6cbfdcd44aa4",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "489129722211",
                PublicDnsName: "ec2-44-194-56-117.compute-1.amazonaws.com",
                PublicIp: "44.194.56.117",
              },
              Attachment: {
                AttachTime: 1625867457,
                AttachmentId: "eni-attach-086e464d4e4acb01a",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_portal_pruebas_ssh-UsoInterno",
                  GroupId: "sg-0adb40e05cf0757b7",
                },
                {
                  GroupName: "sg_portal_pruebas_AccesoWeb",
                  GroupId: "sg-0926d59a7056a3157",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:63:37:04:09:65",
              NetworkInterfaceId: "eni-023b4f22afd18babf",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-66.ec2.internal",
              PrivateIpAddress: "172.20.10.66",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "489129722211",
                    PublicDnsName: "ec2-44-194-56-117.compute-1.amazonaws.com",
                    PublicIp: "44.194.56.117",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-66.ec2.internal",
                  PrivateIpAddress: "172.20.10.66",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_portal_pruebas_ssh-UsoInterno",
              GroupId: "sg-0adb40e05cf0757b7",
            },
            {
              GroupName: "sg_portal_pruebas_AccesoWeb",
              GroupId: "sg-0926d59a7056a3157",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "Portal_Pruebas",
            },
            {
              Key: "backup",
              Value: "Diario",
            },
            {
              Key: "Description",
              Value:
                "Instancia para entorno de pruebas de la pagina uao.edu.co (portal intitucional)",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "OrbisStop",
              Value: "Daily_MON-FRI_2359",
            },
            {
              Key: "OrbisStart",
              Value: "Daily_MON-FRI_0700",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-028653ccbd980c29e",
          Name: "Portal_Pruebas",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0705a5b67a0393b78",
          InstanceType: "m5.large",
          LaunchTime: 1624058840,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-184.ec2.internal",
          PrivateIpAddress: "172.20.2.184",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1624058841,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0c262986c06802e03",
              },
            },
          ],
          ClientToken: "fc61daea-1166-4b8b-a945-215bd36449e6",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/aws-opsworks-ec2-role",
            Id: "AIPAXDYTHIFRXOJZ7EPJN",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1624058840,
                AttachmentId: "eni-attach-0ed4a565db94a5eaa",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "AWS-OpsWorks-WebApp",
                  GroupId: "sg-0481910539f46bd1a",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:38:ad:83:7a:47",
              NetworkInterfaceId: "eni-07197f4be56177ea7",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-184.ec2.internal",
              PrivateIpAddress: "172.20.2.184",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-184.ec2.internal",
                  PrivateIpAddress: "172.20.2.184",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "AWS-OpsWorks-WebApp",
              GroupId: "sg-0481910539f46bd1a",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress1",
            },
            {
              Key: "Project",
              Value: "Portal Institucional",
            },
            {
              Key: "Name",
              Value: "Portal Institucional - wordpress1",
            },
            {
              Key: "opsworks:stack",
              Value: "Portal Institucional",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0705a5b67a0393b78",
          Name: "Portal Institucional - wordpress1",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-0fb7922535155b1c9",
          InstanceId: "i-030dad4b214cc9ef7",
          InstanceType: "t3.medium",
          KeyName: "UAO-KEY",
          LaunchTime: 1632946039,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-10-168.ec2.internal",
          PrivateIpAddress: "172.20.10.168",
          ProductCodes: [
            {
              ProductCodeId: "3iplms73etrdhxdepv72l6ywj",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "ec2-52-91-190-175.compute-1.amazonaws.com",
          PublicIpAddress: "52.91.190.175",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-052bc368c35279ab5",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1632782653,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-00ccdeef9caacb8cc",
              },
            },
            {
              DeviceName: "/dev/sdb",
              Ebs: {
                AttachTime: 1632782653,
                DeleteOnTermination: false,
                Status: "attached",
                VolumeId: "vol-07fe7bb66482d1c67",
              },
            },
          ],
          ClientToken: "163278264933355283",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Association: {
                IpOwnerId: "amazon",
                PublicDnsName: "ec2-52-91-190-175.compute-1.amazonaws.com",
                PublicIp: "52.91.190.175",
              },
              Attachment: {
                AttachTime: 1632782652,
                AttachmentId: "eni-attach-068e2e9e7d36df337",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "sg_FTP_UAO",
                  GroupId: "sg-0bc47f2ce7ce6dc81",
                },
                {
                  GroupName: "sg_FTP_UAO_Int",
                  GroupId: "sg-06f3092aafdce80cd",
                },
                {
                  GroupName: "sg_redes_UAO",
                  GroupId: "sg-0d511387d828eb4ec",
                },
                {
                  GroupName: "sg_redes_escala24x7",
                  GroupId: "sg-08d9016089ad4bf16",
                },
                {
                  GroupName: "sg_90minutos",
                  GroupId: "sg-05d1924fb887e583c",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:82:6b:1e:8d:09",
              NetworkInterfaceId: "eni-02294b4bb89ebb198",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-10-168.ec2.internal",
              PrivateIpAddress: "172.20.10.168",
              PrivateIpAddresses: [
                {
                  Association: {
                    IpOwnerId: "amazon",
                    PublicDnsName: "ec2-52-91-190-175.compute-1.amazonaws.com",
                    PublicIp: "52.91.190.175",
                  },
                  Primary: true,
                  PrivateDnsName: "ip-172-20-10-168.ec2.internal",
                  PrivateIpAddress: "172.20.10.168",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-052bc368c35279ab5",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "sg_FTP_UAO",
              GroupId: "sg-0bc47f2ce7ce6dc81",
            },
            {
              GroupName: "sg_FTP_UAO_Int",
              GroupId: "sg-06f3092aafdce80cd",
            },
            {
              GroupName: "sg_redes_UAO",
              GroupId: "sg-0d511387d828eb4ec",
            },
            {
              GroupName: "sg_redes_escala24x7",
              GroupId: "sg-08d9016089ad4bf16",
            },
            {
              GroupName: "sg_90minutos",
              GroupId: "sg-05d1924fb887e583c",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisBackup",
              Value: "Every-15Days_Ret30_0100",
            },
            {
              Key: "Name",
              Value: "90minutos-Pruebas",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-030dad4b214cc9ef7",
          Name: "90minutos-Pruebas",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-011cfc70aae861ba8",
          InstanceType: "m5.large",
          LaunchTime: 1633122541,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-1-199.ec2.internal",
          PrivateIpAddress: "172.20.1.199",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2021-10-01 21:24:58 GMT)",
          SubnetId: "subnet-060051a8e64d48547",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1633122542,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-05ca35c6a2fafcb61",
              },
            },
          ],
          ClientToken: "65e594be-154e-41cb-8beb-5bfa74e2ed85",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/aws-opsworks-ec2-role",
            Id: "AIPAXDYTHIFRXOJZ7EPJN",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1633122541,
                AttachmentId: "eni-attach-0be328e326f17e2cb",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "AWS-OpsWorks-WebApp",
                  GroupId: "sg-0481910539f46bd1a",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:4c:38:f1:ca:19",
              NetworkInterfaceId: "eni-0aeb1f0616b5535f8",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-1-199.ec2.internal",
              PrivateIpAddress: "172.20.1.199",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-1-199.ec2.internal",
                  PrivateIpAddress: "172.20.1.199",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-060051a8e64d48547",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "AWS-OpsWorks-WebApp",
              GroupId: "sg-0481910539f46bd1a",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "Project",
              Value: "Portal Institucional",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress2",
            },
            {
              Key: "Name",
              Value: "Portal Institucional - wordpress2",
            },
            {
              Key: "opsworks:stack",
              Value: "Portal Institucional",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-011cfc70aae861ba8",
          Name: "Portal Institucional - wordpress2",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-00e6333a8eaa5b461",
          InstanceId: "i-0a4dc76abde8c6f77",
          InstanceType: "c5.xlarge",
          KeyName: "moodle",
          LaunchTime: 1643061747,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-10-250.ec2.internal",
          PrivateIpAddress: "172.30.10.250",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-087208c1538239d6c",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1632595949,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-045e00b5c686c3290",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1632595949,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0a47b32d442909064",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1632595948,
                AttachmentId: "eni-attach-0b69ef78af4e0c756",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "Primary network interface",
              Groups: [
                {
                  GroupName: "UAO-Moodle-Campus-sg",
                  GroupId: "sg-0e59656bab0ae4b94",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:53:75:7a:73:b7",
              NetworkInterfaceId: "eni-0c8a93304cb208d11",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-10-250.ec2.internal",
              PrivateIpAddress: "172.30.10.250",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-10-250.ec2.internal",
                  PrivateIpAddress: "172.30.10.250",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-087208c1538239d6c",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "UAO-Moodle-Campus-sg",
              GroupId: "sg-0e59656bab0ae4b94",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "backup",
              Value: "SURA",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
            {
              Key: "Proyecto",
              Value: "SURA",
            },
            {
              Key: "OrbisBackup",
              Value: "Daily_MON-SUN_0100-Ret15",
            },
            {
              Key: "Name",
              Value: "Campus-webserver-v10_1006308 (SURA)",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0a4dc76abde8c6f77",
          Name: "Campus-webserver-v10_1006308 (SURA)",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-052b8ee57a67322c0",
          InstanceId: "i-0728dca94537c0b15",
          InstanceType: "t3a.small",
          KeyName: "moodle",
          LaunchTime: 1632802908,
          Monitoring: {
            State: "enabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-9-243.ec2.internal",
          PrivateIpAddress: "172.30.9.243",
          ProductCodes: [
            {
              ProductCodeId: "aw0evgkw8e5c1q413zgy5pjce",
              ProductCodeType: "marketplace",
            },
          ],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-087208c1538239d6c",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1632802909,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0a4c689a405ac9521",
              },
            },
            {
              DeviceName: "/dev/sdf",
              Ebs: {
                AttachTime: 1632802909,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-01584512df34c5fed",
              },
            },
          ],
          ClientToken: "Campu-EC2In-5YGQBZK7X1I9",
          EbsOptimized: false,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/Campus-webserver-v10-1006308-SURALAB-InstanceRoleInstanceProfile-ADXLK17KLC6",
            Id: "AIPAXDYTHIFRVMMLVOGL4",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1632802908,
                AttachmentId: "eni-attach-0c76332a263ff51c5",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "UAO-Moodle-Campus-sg",
                  GroupId: "sg-0e59656bab0ae4b94",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:5e:e1:32:35:bd",
              NetworkInterfaceId: "eni-0371daf4067c16ca1",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-9-243.ec2.internal",
              PrivateIpAddress: "172.30.9.243",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-9-243.ec2.internal",
                  PrivateIpAddress: "172.30.9.243",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-087208c1538239d6c",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "UAO-Moodle-Campus-sg",
              GroupId: "sg-0e59656bab0ae4b94",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "OrbisBackup",
              Value: "Every-15Days_Ret30_0100",
            },
            {
              Key: "aws:cloudformation:logical-id",
              Value: "EC2Instance",
            },
            {
              Key: "aws:cloudformation:stack-id",
              Value:
                "arn:aws:cloudformation:us-east-1:489129722211:stack/Campus-webserver-v10-1006308-SURALAB/3f930570-2013-11ec-8b0f-1201a0a44b75",
            },
            {
              Key: "Name",
              Value: "Campus-webserver-v10-1006308-SURALAB",
            },
            {
              Key: "aws:cloudformation:stack-name",
              Value: "Campus-webserver-v10-1006308-SURALAB",
            },
            {
              Key: "OrbisSchedule",
              Value: "True",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0728dca94537c0b15",
          Name: "Campus-webserver-v10-1006308-SURALAB",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0f05be649e16033de",
          InstanceType: "m5.large",
          LaunchTime: 1659721752,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-1-193.ec2.internal",
          PrivateIpAddress: "172.30.1.193",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-016e97bb16f19170b",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1659721753,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0026fa9e151cd2804",
              },
            },
          ],
          ClientToken: "2d6053be-50ac-4536-a29c-0f02d7677348",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAOVirtualOpsworks-InstanceProfile-OELWZQDCE6R4",
            Id: "AIPAXDYTHIFRQFXDO3U44",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1659721752,
                AttachmentId: "eni-attach-017730c466235f36b",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0099e528fedb68bcf",
                },
                {
                  GroupName:
                    "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
                  GroupId: "sg-014c2b1cc2006cbbb",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:c9:e4:2e:9f:51",
              NetworkInterfaceId: "eni-067de20439b302ebe",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-1-193.ec2.internal",
              PrivateIpAddress: "172.30.1.193",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-1-193.ec2.internal",
                  PrivateIpAddress: "172.30.1.193",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-016e97bb16f19170b",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0099e528fedb68bcf",
            },
            {
              GroupName: "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
              GroupId: "sg-014c2b1cc2006cbbb",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "opsworks:instance",
              Value: "wordpress-uao-virtual6",
            },
            {
              Key: "Project",
              Value: "UAO Virtual",
            },
            {
              Key: "by",
              Value: "Escala24x7",
            },
            {
              Key: "Name",
              Value: "UAOVirtualOpsworks - wordpress-uao-virtual6",
            },
            {
              Key: "opsworks:stack",
              Value: "UAOVirtualOpsworks",
            },
            {
              Key: "opsworks:layer:wordpress-uao-virtual",
              Value: "wordpress-uao-virtual",
            },
            {
              Key: "environment",
              Value: "production",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0f05be649e16033de",
          Name: "UAOVirtualOpsworks - wordpress-uao-virtual6",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-01443e10a000ecdfa",
          InstanceType: "t3.medium",
          LaunchTime: 1662508855,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-172.ec2.internal",
          PrivateIpAddress: "172.20.2.172",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2022-09-07 00:52:47 GMT)",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1650996960,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-05ef07531f0055352",
              },
            },
          ],
          ClientToken: "2399cc44-4c3b-4dc0-8bf6-3dbdc6e59b42",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1650996959,
                AttachmentId: "eni-attach-0f0cf85228bd0f7d9",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:42:c7:8a:93:3f",
              NetworkInterfaceId: "eni-0c68f9e5002bc55e9",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-172.ec2.internal",
              PrivateIpAddress: "172.20.2.172",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-172.ec2.internal",
                  PrivateIpAddress: "172.20.2.172",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-05",
            },
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress-05",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-01443e10a000ecdfa",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress-05",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-039796c3559113b05",
          InstanceType: "t3.medium",
          LaunchTime: 1659722189,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-142.ec2.internal",
          PrivateIpAddress: "172.20.2.142",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2022-08-26 19:44:28 GMT)",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1655505079,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0e79bde79144f8631",
              },
            },
          ],
          ClientToken: "6f9057fe-527b-448d-a827-b89b3a94166b",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1655505078,
                AttachmentId: "eni-attach-00b0a7f90412908ab",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:3e:ed:44:07:21",
              NetworkInterfaceId: "eni-0f6bfdec1b57ddf85",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-142.ec2.internal",
              PrivateIpAddress: "172.20.2.142",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-142.ec2.internal",
                  PrivateIpAddress: "172.20.2.142",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress-12",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-12",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-039796c3559113b05",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress-12",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0a303d372d12201b5",
          InstanceType: "m5.large",
          LaunchTime: 1659721587,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-7-132.ec2.internal",
          PrivateIpAddress: "172.30.7.132",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2022-08-05 18:04:09 GMT)",
          SubnetId: "subnet-0fee81ccac82d153b",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1659721588,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0b7134257cf715bd6",
              },
            },
          ],
          ClientToken: "c41f6b75-4c29-44a5-a81e-fb536033ccf5",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAOVirtualOpsworks-InstanceProfile-OELWZQDCE6R4",
            Id: "AIPAXDYTHIFRQFXDO3U44",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1659721587,
                AttachmentId: "eni-attach-018e2b26c4cab1e17",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0099e528fedb68bcf",
                },
                {
                  GroupName:
                    "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
                  GroupId: "sg-014c2b1cc2006cbbb",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:1f:fd:8c:bd:d9",
              NetworkInterfaceId: "eni-08ed2cbd68c97846b",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-7-132.ec2.internal",
              PrivateIpAddress: "172.30.7.132",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-7-132.ec2.internal",
                  PrivateIpAddress: "172.30.7.132",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0fee81ccac82d153b",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0099e528fedb68bcf",
            },
            {
              GroupName: "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
              GroupId: "sg-014c2b1cc2006cbbb",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Project",
              Value: "UAO Virtual",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-uao-virtual5",
            },
            {
              Key: "opsworks:stack",
              Value: "UAOVirtualOpsworks",
            },
            {
              Key: "Name",
              Value: "UAOVirtualOpsworks - wordpress-uao-virtual5",
            },
            {
              Key: "environment",
              Value: "production",
            },
            {
              Key: "opsworks:layer:wordpress-uao-virtual",
              Value: "wordpress-uao-virtual",
            },
            {
              Key: "by",
              Value: "Escala24x7",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0a303d372d12201b5",
          Name: "UAOVirtualOpsworks - wordpress-uao-virtual5",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0ddf4ef635c009056",
          InstanceType: "m5.large",
          LaunchTime: 1659722653,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-30-5-108.ec2.internal",
          PrivateIpAddress: "172.30.5.108",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0fee81ccac82d153b",
          VpcId: "vpc-0b38db423a9c187be",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1659722653,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0fde1eb4fb040bf65",
              },
            },
          ],
          ClientToken: "066ee904-1d7a-4a43-a886-256c000b9740",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAOVirtualOpsworks-InstanceProfile-OELWZQDCE6R4",
            Id: "AIPAXDYTHIFRQFXDO3U44",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1659722653,
                AttachmentId: "eni-attach-043b2f8d30361198e",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0099e528fedb68bcf",
                },
                {
                  GroupName:
                    "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
                  GroupId: "sg-014c2b1cc2006cbbb",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:a9:16:6a:2f:f7",
              NetworkInterfaceId: "eni-087cd0aba0057616b",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-30-5-108.ec2.internal",
              PrivateIpAddress: "172.30.5.108",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-30-5-108.ec2.internal",
                  PrivateIpAddress: "172.30.5.108",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0fee81ccac82d153b",
              VpcId: "vpc-0b38db423a9c187be",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0099e528fedb68bcf",
            },
            {
              GroupName: "UAOVirtualOpsworks-Ec2SecurityGroup-1SUAGQLW2D94O",
              GroupId: "sg-014c2b1cc2006cbbb",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "UAOVirtualOpsworks - wordpress-uao-virtual7",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-uao-virtual7",
            },
            {
              Key: "opsworks:layer:wordpress-uao-virtual",
              Value: "wordpress-uao-virtual",
            },
            {
              Key: "opsworks:stack",
              Value: "UAOVirtualOpsworks",
            },
            {
              Key: "Project",
              Value: "UAO Virtual",
            },
            {
              Key: "by",
              Value: "Escala24x7",
            },
            {
              Key: "environment",
              Value: "production",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0ddf4ef635c009056",
          Name: "UAOVirtualOpsworks - wordpress-uao-virtual7",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0fdba02b1042f54ce",
          InstanceType: "t3.medium",
          LaunchTime: 1662508857,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-3-251.ec2.internal",
          PrivateIpAddress: "172.20.3.251",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2022-09-07 01:03:29 GMT)",
          SubnetId: "subnet-00d9a2813f77fc33f",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1650996960,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-05a2f43c48788a35a",
              },
            },
          ],
          ClientToken: "99c5b75f-9c61-4fbb-8df3-8ac4ae747cbd",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1650996959,
                AttachmentId: "eni-attach-0fd90aa3df8b99978",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:82:d6:73:6e:53",
              NetworkInterfaceId: "eni-01e6d82bc8bc89d36",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-3-251.ec2.internal",
              PrivateIpAddress: "172.20.3.251",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-3-251.ec2.internal",
                  PrivateIpAddress: "172.20.3.251",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-00d9a2813f77fc33f",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress-06",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-06",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0fdba02b1042f54ce",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress-06",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-007b1a9628e1b8e12",
          InstanceType: "t3.medium",
          LaunchTime: 1661540316,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1c",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-3-138.ec2.internal",
          PrivateIpAddress: "172.20.3.138",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 80,
            Name: "stopped",
          },
          StateTransitionReason: "User initiated (2022-08-26 19:30:57 GMT)",
          SubnetId: "subnet-00d9a2813f77fc33f",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1655502954,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-097eb39c5d25bea78",
              },
            },
          ],
          ClientToken: "0281be60-3e0d-4955-a97d-2f688c5db16c",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1655502953,
                AttachmentId: "eni-attach-03ea2913d138bdb5b",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0e:05:d2:4a:db:bd",
              NetworkInterfaceId: "eni-06fe3011773b600ee",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-3-138.ec2.internal",
              PrivateIpAddress: "172.20.3.138",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-3-138.ec2.internal",
                  PrivateIpAddress: "172.20.3.138",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-00d9a2813f77fc33f",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          StateReason: {
            Code: "Client.UserInitiatedShutdown",
            Message: "Client.UserInitiatedShutdown: User initiated shutdown",
          },
          Tags: [
            {
              Key: "opsworks:instance",
              Value: "wordpress-10",
            },
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress-10",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-007b1a9628e1b8e12",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress-10",
          check: false,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0554b2737a4305c79",
          InstanceType: "t3.medium",
          LaunchTime: 1662511194,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-238.ec2.internal",
          PrivateIpAddress: "172.20.2.238",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1661536592,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0120f8461e9dbe2a3",
              },
            },
          ],
          ClientToken: "588989dd-5d33-4637-9a91-4ba655719141",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1661536592,
                AttachmentId: "eni-attach-0c6daaea91a1fd82e",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:60:22:ef:2b:fb",
              NetworkInterfaceId: "eni-059d29245b65b54c0",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-238.ec2.internal",
              PrivateIpAddress: "172.20.2.238",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-238.ec2.internal",
                  PrivateIpAddress: "172.20.2.238",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress013",
            },
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress013",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0554b2737a4305c79",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress013",
          check: true,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-095192256fe1477ad",
          InstanceId: "i-0dbdde1c892ba9e59",
          InstanceType: "t3.medium",
          LaunchTime: 1662512658,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1b",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-2-58.ec2.internal",
          PrivateIpAddress: "172.20.2.58",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-0cc8acdfe255ff0bc",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "x86_64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/sda1",
              Ebs: {
                AttachTime: 1661542508,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0181dd16f050e9825",
              },
            },
          ],
          ClientToken: "822dd016-54b3-4c8e-b724-8542a2892ea0",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/UAO-Portal90Min-Prod-OpsWorks-InstanceProfile-12M4E2U78QZ9E",
            Id: "AIPAXDYTHIFRYYATCS2AB",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1661542508,
                AttachmentId: "eni-attach-0f8979dbf8ba2b68c",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "AWS-OpsWorks-Default-Server",
                  GroupId: "sg-0a4a911e5c9dbacad",
                },
                {
                  GroupName: "Portal90Min-Prod-App-SG",
                  GroupId: "sg-051811a115046d53b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "0a:1d:50:b3:74:1b",
              NetworkInterfaceId: "eni-06f4bed9a39b8b8f1",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-2-58.ec2.internal",
              PrivateIpAddress: "172.20.2.58",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-2-58.ec2.internal",
                  PrivateIpAddress: "172.20.2.58",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-0cc8acdfe255ff0bc",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/sda1",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "AWS-OpsWorks-Default-Server",
              GroupId: "sg-0a4a911e5c9dbacad",
            },
            {
              GroupName: "Portal90Min-Prod-App-SG",
              GroupId: "sg-051811a115046d53b",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "opsworks:layer:wordpress",
              Value: "WordPress",
            },
            {
              Key: "Name",
              Value: "UAO-Portal90Min-Prod-OpsWorks - wordpress-14",
            },
            {
              Key: "opsworks:instance",
              Value: "wordpress-14",
            },
            {
              Key: "opsworks:stack",
              Value: "UAO-Portal90Min-Prod-OpsWorks",
            },
            {
              Key: "Environment",
              Value: "Production",
            },
            {
              Key: "Project",
              Value: "Portal90Min",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 1,
            ThreadsPerCore: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          ResourceId: "i-0dbdde1c892ba9e59",
          Name: "UAO-Portal90Min-Prod-OpsWorks - wordpress-14",
          check: true,
        },
        {
          AmiLaunchIndex: 0,
          ImageId: "ami-05f3141013eebdc12",
          InstanceId: "i-071cb6bdbe1f33006",
          InstanceType: "t4g.medium",
          KeyName: "UAO-MyPyme",
          LaunchTime: 1663253221,
          Monitoring: {
            State: "disabled",
          },
          Placement: {
            AvailabilityZone: "us-east-1a",
            GroupName: "",
            Tenancy: "default",
          },
          PrivateDnsName: "ip-172-20-1-190.ec2.internal",
          PrivateIpAddress: "172.20.1.190",
          ProductCodes: [],
          PublicDnsName: "",
          State: {
            Code: 16,
            Name: "running",
          },
          StateTransitionReason: "",
          SubnetId: "subnet-060051a8e64d48547",
          VpcId: "vpc-0a28d8f53c222aefb",
          Architecture: "arm64",
          BlockDeviceMappings: [
            {
              DeviceName: "/dev/xvda",
              Ebs: {
                AttachTime: 1663201759,
                DeleteOnTermination: true,
                Status: "attached",
                VolumeId: "vol-0d4d399a9a216d513",
              },
            },
          ],
          ClientToken: "",
          EbsOptimized: true,
          EnaSupport: true,
          Hypervisor: "xen",
          IamInstanceProfile: {
            Arn: "arn:aws:iam::489129722211:instance-profile/AmazonSSMRoleForInstancesQuickSetup",
            Id: "AIPAXDYTHIFR2Q5LEIBLU",
          },
          NetworkInterfaces: [
            {
              Attachment: {
                AttachTime: 1663201758,
                AttachmentId: "eni-attach-02558e5370c4108a1",
                DeleteOnTermination: true,
                DeviceIndex: 0,
                Status: "attached",
                NetworkCardIndex: 0,
              },
              Description: "",
              Groups: [
                {
                  GroupName: "SG-EC2-MyPyme",
                  GroupId: "sg-0a2986bdf688bcb9b",
                },
              ],
              Ipv6Addresses: [],
              MacAddress: "12:77:a5:c3:b1:9d",
              NetworkInterfaceId: "eni-01f3a444b98962d57",
              OwnerId: "489129722211",
              PrivateDnsName: "ip-172-20-1-190.ec2.internal",
              PrivateIpAddress: "172.20.1.190",
              PrivateIpAddresses: [
                {
                  Primary: true,
                  PrivateDnsName: "ip-172-20-1-190.ec2.internal",
                  PrivateIpAddress: "172.20.1.190",
                },
              ],
              SourceDestCheck: true,
              Status: "in-use",
              SubnetId: "subnet-060051a8e64d48547",
              VpcId: "vpc-0a28d8f53c222aefb",
              InterfaceType: "interface",
            },
          ],
          RootDeviceName: "/dev/xvda",
          RootDeviceType: "ebs",
          SecurityGroups: [
            {
              GroupName: "SG-EC2-MyPyme",
              GroupId: "sg-0a2986bdf688bcb9b",
            },
          ],
          SourceDestCheck: true,
          Tags: [
            {
              Key: "Name",
              Value: "UAO-MyPyme",
            },
          ],
          VirtualizationType: "hvm",
          CpuOptions: {
            CoreCount: 2,
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
          },
          EnclaveOptions: {
            Enabled: false,
          },
          BootMode: "uefi",
          ResourceId: "i-071cb6bdbe1f33006",
          Name: "UAO-MyPyme",
          check: false,
        },
      ],
    });

    const columns = ref([
      {
        name: "check",
        required: true,
        label: "Check",
        align: "left",
        field: (row) => row.check,
        sortable: true,
        mutable: false,
        style: (row) =>
          row.check
            ? "font-weight: bolder;background-color: #d7d4d4"
            : "font-weight: normal",
      },
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
