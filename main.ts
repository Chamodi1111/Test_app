import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecspatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as elasticloadbalancingv2_targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';

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

    // create IP target group
    const ipTarget = new elasticloadbalancingv2_targets.IpTarget('ipAddress', 8000,'availabilityZone'); 
    
    // Create a Fargate container image
    const image = ecs.ContainerImage.fromRegistry('567282118302.dkr.ecr.us-east-1.amazonaws.com/cdk-hnb659fds-container-assets-567282118302-us-east-1:app_image');

    // Create higher level construct containing the Fargate service with a load balancer
    const loadbalancerService = new ecspatterns.ApplicationLoadBalancedFargateService(this, 'amazon-ecs-sample', {
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
    loadbalancerService.loadBalancer.ApplicationTargetGroup(ipTarget);
    
  }
}

const app = new cdk.App();
new ECSServiceStack(app, 'App-CDK');
app.synth();
