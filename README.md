## Applicaion readme file

# Application
The 'testapp' directory contains the application which runs on python 3.9.
Project dependencies are stored in 'requirements.txt' and need to be installed with
`pip install -r requirements.txt`
Running `start.sh` will start the application server on port 8000

# Tests
Running `test.sh` will execute the test suite. 
The environment variable REQUIRED_SETTING must 
be set to some value for the tests to pass. 

## Assignment Guidlines


DevOps Assessment
******************

This assignment cannot be completed without "testapp.tar.gz" file . Please reach out to HR if the file was not included as part of email attachment. 

Background
***********

We think infrastructure is best represented as code, and provisioning of resources should be automated as much as possible.

We want you to Dockerise and deploy TestApp django application to Amazon Web Services with their Elastic Container Service, we want a secure isolated environment and we want to run multiple containers on a instance.

You can find more details about Django application inside README.md file located in TestApp directory.

Outcome
********
A Docker container running our Django application in AWS.

Please write the required infrastructure as code using AWS CDK (TypeScript) to do this, including any Dockerfiles,health-checks and scripts.

Create CI/CD pipeline using GitHub Actions to build and deploy application.

CI/CD pipeline should deploy infrastructure components too.

Please give us a narrative of the approach taken : 
What principles did you apply?
Explain the decisions you made and why you thought it was the best approach
If you ran out of time, how did you envision your finished infrastructure?
What is your recommendation for future work?

NOTE: 
1. Please us AWS CDK TypeScript as your programming language.



Evaluation criteria
*********************
The main evaluation criteria is that the CI/CD pipeline works. Application has to run and be accessible via web browser. When a change in master branch of repository occurs, it should automatically propagate to application.

Apart from that we will evaluate:

tools that you've picked
correct usage of said tools
code readability
solution flexibility & extensibility


Submit your solution
**********************
Create a public Github repository and push your solution in it. Commit often - we would rather see a history of trial and error than a single monolithic push. When you're finished, send us the URL to the repository.
