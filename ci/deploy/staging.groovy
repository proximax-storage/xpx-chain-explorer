pipeline {
    agent {
        node {
            label 'docker-build-node'
        }
    }

    environment {
        nexusAuth = credentials('nexustasker')
    }

    options {
        timestamps()
    }

    stages {
        stage('Deploy to Staging') {
            steps {
                echo 'Download from Nexus'

                withCredentials([string(credentialsId: 'nexustasker', variable: 'PW1')]) {
                    //echo "My password is '${PW1}'!"
                    sh "curl -u nexustasker:'${PW1}' -X GET \"https://nexus.internal.proximax.io/repository/raw-repo/proximax-catapult-explorer/proximax-catapult-explorer/v0.0.2/proximax-catapult-explorer-v0.0.2.tar.xz\" -O -J"

                }

                sh "tar xJfv proximax-catapult-explorer-*tar.xz* "

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