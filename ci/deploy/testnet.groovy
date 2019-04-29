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
        stage('Build') {
            steps {
                echo 'Writing Nexus Credentials'
                script {
                    // Writes a multi-line .npmrc file with the authentication hash for Nexus
                    writeFile file: '.npmrc', text: 'registry=https://nexus.internal.proximax.io/repository/npm-group/\n@scope:registry=https://nexus.internal.proximax.io/repository/npm-private/\nemail=jenkins@proximax.io\nalways-auth=true\n_auth=' + env.nexusAuth + '\n'
                }

                echo 'Starting Docker Container'
                withDockerContainer(image: 'node:8') {
                    echo 'Installing dependencies'
                    sh 'npm install'

                    echo 'Building'
                    sh 'npm run build'
                }

                echo 'Leaving Container'

                echo 'Compressing Artifacts'
                // Creates an XZ compressed archive
                sh "tar cJfv proximax-catapult-explorer-testnet-deploy.tar.xz dist"
            }

            post {
                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Branch *testnet-deploy* build of *${currentBuild.fullDisplayName}* FAILED :scream:"
                }
            }
        }

        stage('Publish Artifact') {
            steps {
                echo 'Publishing Artifact to Nexus'
                nexusArtifactUploader(
                        nexusVersion: 'nexus3',
                        protocol: 'https',
                        nexusUrl: 'nexus.internal.proximax.io',
                        groupId: 'group1',
                        version: "testnet-deploy",
                        repository: 'raw-repo',
                        credentialsId: 'jenkins-nexus',
                        artifacts: [
                                [
                                        artifactId: 'proximax-catapult-explorer',
                                        classifier: '',
                                        file      : 'proximax-catapult-explorer-testnet-deploy.tar.xz',
                                        type      : 'xz'
                                ]
                        ]
                )
            }

            post {
                success {
                    slackSend channel: '#devops',
                            color: 'good',
                            message:  "Branch *testnet-deploy* build of *${currentBuild.fullDisplayName}* completed successfully :100:\nArtifact stored in Nexus"
                }

                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Branch *testnet-deploy* of *${currentBuild.fullDisplayName}* FAILED :scream:"
                }
            }
        }

        stage('Wait for QA') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    input message: "Ready to deploy to Testnet?",
                            ok: "Deploy"
                }
            }
        }

        stage('Deploy to Testnet') {
            steps {
                echo 'Deploying to Testnet'

                echo 'Managing S3'
                withAWS(credentials: 'jenkins-ecr', region: 'ap-southeast-2') {
                    echo 'Deleting old files'
                    s3Delete bucket: 'bctestnetexplorer.xpxsirius.io', path: './'

                    echo 'Uploading new files'
                    s3Upload bucket: 'bctestnetexplorer.xpxsirius.io', acl: 'PublicRead', file: 'dist/', sseAlgorithm: 'AES256'
                }

                echo 'Managing CloudFront'
                withAWS(credentials: 'jenkins-ecr') {
                    echo 'Invalidating CloudFront'
                    cfInvalidate distribution: 'E1RZY6CIY8D6XA', paths: ['/*']
                }
            }

            post {
                success {
                    slackSend channel: '#devops',
                            color: 'good',
                            message: "Branch *testnet-deploy* TESTNET deployment of *${currentBuild.fullDisplayName}* completed successfully :100:\nAvailable at http://bctestnetexplorer.xpxsirius.io"
                }

                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Branch *testnet-deploy* TESTNET deployment of *${currentBuild.fullDisplayName}* FAILED :scream:"
                }
            }
        }
    }
}