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
        stage('Deploy to Staging') {
            steps {
                echo 'Download from Nexus'
                sh "wget -r https://nexus.internal.proximax.io/repository/raw-repo/proximax-catapult-explorer/v0.0.2/ "
                sh "tar xJfv proximax-catapult-explorer-*.xz* "

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