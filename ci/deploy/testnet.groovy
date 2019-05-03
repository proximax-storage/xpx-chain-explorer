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
        stage('Deploy to Testnet') {
            steps {
                echo 'Download from Nexus'

                withCredentials([string(credentialsId: 'nexustasker', variable: 'PW1')]) {
                    //echo "My password is '${PW1}'!"
                    sh "curl -u nexustasker:'${PW1}' -X GET \"https://nexus.internal.proximax.io/repository/raw-repo/proximax-catapult-explorer/proximax-catapult-explorer/v0.0.2/proximax-catapult-explorer-v0.0.2.tar.xz\" -O -J"

                }

                sh "tar xJfv proximax-catapult-explorer-*tar.xz* "

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
                            message: "Job *testnet-deploy* TESTNET deployment of *${currentBuild.fullDisplayName}* completed successfully :100:\nAvailable at http://bctestnetexplorer.xpxsirius.io"
                }

                failure {
                    slackSend channel: '#devops',
                            color: 'bad',
                            message: "Job *testnet-deploy* TESTNET deployment of *${currentBuild.fullDisplayName}* FAILED :scream:"
                }
            }
        }
    }
}