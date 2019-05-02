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
                sh "tar cJfv proximax-catapult-explorer-v0.0.2.tar.xz dist"
            }

            post {
                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Branch *staging-deploy* build of *${currentBuild.fullDisplayName}* FAILED :scream:"
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
                        groupId: 'proximax-catapult-explorer',
                        version: "v0.0.2",
                        repository: 'raw-repo',
                        credentialsId: 'jenkins-nexus',
                        artifacts: [
                                [
                                        artifactId: 'proximax-catapult-explorer',
                                        classifier: '',
                                        file      : 'proximax-catapult-explorer-v0.0.2.tar.xz',
                                        type      : 'xz'
                                ]
                        ]
                )
            }


        }


    }
}