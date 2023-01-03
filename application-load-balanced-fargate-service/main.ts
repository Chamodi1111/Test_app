import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecspatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as logs from 'aws-cdk-lib/aws-logs';

export class ECSServiceStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Create a VPC with 6x subnets divided over 2 AZ's
    const vpc = new ec2.Vpc(this, 'SkeletonVpc', {
      cidr: '172.31.0.0/16',
      natGateways: 1,
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 20,
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 20,
          name: 'application',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        },
      ],
    });
       
    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'service-cluster', {
      clusterName: 'service-cluster',
      containerInsights: true,
      vpc: vpc,
    }); 

    // Create a Fargate container image
    const image = ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample');

    // Create higher level construct containing the Fargate service with a load balancer
    new ecspatterns.ApplicationLoadBalancedFargateService(this, 'amazon-ecs-sample', {
      cluster,
      circuitBreaker: {
        rollback: true,
      },
      cpu: 512,
      memoryLimitMiB: 2048,
      desiredCount: 1,
      taskImageOptions: {
        image: image,
        containerPort: 8000,
        logDriver: ecs.LogDrivers.awsLogs({
          streamPrefix: id,
          logRetention: logs.RetentionDays.ONE_YEAR,
        }),
      },
    });
  }
}

const app = new cdk.App();
new ECSServiceStack(app, 'ECSServiceStack');
app.synth();