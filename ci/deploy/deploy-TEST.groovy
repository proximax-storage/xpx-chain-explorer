pipeline {
    agent {
        node {
            label 'docker-build-node'
        }
    }

    environment {
        npm_config_cache = "npm-cache"
        nexusAuth = credentials('jenkins-nexus-npm')
    }

    options {
        timestamps()
    }

    stages {

        stage('Deploy') {
            sh "wget -O rx-latest.zip  \"192.168.240.249:8082/nexus/service/local/artifact/maven/content?g=com.corero&a=${env.PACKAGE_NAME}&v=LATEST&r=coreroSnapshot&p=zip\""
            sh "unzip rx-latest.zip -d ./build"
            ansiblePlaybook credentialsId: 'sshroot', installation: 'ansible 2.2.0.0', inventory: "${env.WORKSPACE}@script/jenkins/ansible/frontend/hosts", playbook: "${env.WORKSPACE}@script/jenkins/ansible/frontend/webservers.yml", extraVars: [build_path: "${env.WORKSPACE}/build/"], sudoUser: null
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging'

                echo 'Rename artifact targets'
                sh 'sed -i "s/bctestnet/bcstage/g" dist/json/nodes.json'

                echo 'Managing S3'
                withAWS(credentials: 'jenkins-ecr', region: 'ap-southeast-2') {
                    echo 'Deleting old files'
                    s3Delete bucket: 'bcstagingexplorer.xpxsirius.io', path: './'

                    echo 'Uploading new files'
                    s3Upload bucket: 'bcstagingexplorer.xpxsirius.io', acl: 'PublicRead', file: 'dist/', sseAlgorithm: 'AES256'
                }

                echo 'Managing CloudFront'
                withAWS(credentials: 'jenkins-ecr') {
                    echo 'Invalidating CloudFront'
                    cfInvalidate distribution: 'E373B3Y0NEN1OB', paths: ['/*']
                }
            }

            post {
                success {
                    slackSend channel: '#devops',
                            color: 'good',
                            message: "Job *staging-deploy* STAGING deployment of *${currentBuild.fullDisplayName}* completed successfully :100:\nAvailable at http://bcstagingexplorer.xpxsirius.io"
                }

                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Job *staging-deploy* STAGING deployment of *${currentBuild.fullDisplayName}* FAILED :scream:"
                }
            }
        }
    }
}