@Library('jenkins-shared-library@main') _

pipeline {
    agent { label 'jenkins-slave-2' }

    environment {
        DEV_IMAGE_NAME = "unibots/ubquiz-dev:frontend1.0.${env.BUILD_NUMBER}"
        PROD_IMAGE_NAME = "unibots/ubquiz-prod:frontend1.0.${env.BUILD_NUMBER}"
        GOOGLE_CREDS = credentials('GOOGLE_SHEET_CREDENTIALS')
        SPREADSHEET_ID = credentials('SPREADSHEET_ID')
        GOOGLE_SHEET_NAME_DEV = 'ubquiz-DEV!A1'
        GOOGLE_SHEET_NAME_PROD = 'ubquiz-PROD!A1'
        DEV_SSH_CREDENTIALS_ID = 'linode-ubquiz-test'
        PROD_SSH_CREDENTIALS_ID_FE = 'linode-ubquiz-prod-FE'
        DEV_SERVER = 'ubuntu@192.46.208.136'
        PROD_SERVERS_FRONTEND = 'ubuntu@172.105.57.21, ubuntu@172.105.57.95'
    }

    stages {
        stage('Set Initial Mode') {
            steps {
                script {
                    writeFile file: 'mode.txt', text: 'DEV'
                }
            }
        }

        stage('Get Commit Info') {
            steps {
                script {
                    def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.COMMIT_MESSAGE = commitMessage
                    
                    def commitAuthor = sh(script: "git log -1 --pretty=format:'%an'", returnStdout: true).trim()
                    env.COMMIT_AUTHOR = commitAuthor
                    echo "Commit Author: ${COMMIT_AUTHOR}"

                    def commitAuthorEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
                    env.AUTHOR_EMAIL = commitAuthorEmail
                    echo "Commit Author Email: ${AUTHOR_EMAIL}"
                }
            }
        }

        stage('Checkout Master: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                                    userRemoteConfigs: [[url: 'git@github.com:unib0ts/ubQuiz.git']]])
                    }
                }
            }
        }

        stage('Copy Secrets: DEV') {
            steps {
                script {
                    copySecret.ubQuiz_master_dev()
                }
            }
        }                

        stage('Build: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        dir('client') {
                            sh 'npm i && npm run build'
                        }
                    }
                }
            }
        }

        stage('Copy master Build Directory: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        sh 'mkdir -p /tmp/build_master'
                        sh 'cp -r client/build /tmp/build_master'
                    }
                }
            }
        }

        stage('Checkout Production: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        checkout([$class: 'GitSCM', branches: [[name: '*/production']],
                                    userRemoteConfigs: [[url: 'git@github.com:unib0ts/ubQuiz.git']]])
                    }
                }
            }
        }

        stage('Copy Secrets to Production: DEV') {
            steps {
                script {
                    copySecret.ubQuiz_production_dev()
                }
            }
        }

        stage('Clean Production Build Directory: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        sh 'rm -rf client/build'
                        sh 'npm i'
                    }
                }
            }
        }

        stage('Paste Build Directory to Production: DEV') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        sh 'cp -r /tmp/build_master/build client/'
                    }
                }
            }
        }

        stage('Docker for Frontend: DEV') {
            steps {
                script{
                    dockerLogin('docker-hub') 
                    dockerBuild.devubQuiz_productionBuild()
                    dockerPush.devubQuizfrontendPush()
                }
                
            }
        }

        stage("Deploying to Frontend Test Server"){
            steps{
                script{
                    deployed.ubQuizFrontendDev()
                }
                script {
                    // Copy the Python script and requirements.txt to the workspace
                    writeFile file: 'update_google_sheet_DEV.py', text: libraryResource('scripts/update_google_sheet_DEV.py')
                    writeFile file: 'requirements.txt', text: libraryResource('requirements.txt')
                    
                    // Run the Python script in a virtual environment
                    runPythonInVenv('update_google_sheet_DEV.py')
                }
            }
        }

        stage('Notify Dev') {
            steps {
                script{
                    discordNotification.successDiscordDev()  
                }
            }
        }
        
        stage('Approval for Prod') {
            steps {
                input message: 'Approve to Deploy on Prod?', ok: 'Proceed'
                writeFile file: 'mode.txt', text: 'PROD'
            }
        }

        stage('Checkout Master: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        checkout([$class: 'GitSCM', branches: [[name: '*/master']],
                                    userRemoteConfigs: [[url: 'git@github.com:unib0ts/ubQuiz.git']]])
                    }
                }
            }
        }

        stage('Copy Secrets to Mastere: Prod') {
            steps {
                script {
                    copySecret.ubQuiz_master_prod()
                }
            }
        }                

        stage('Build Frontend App: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        dir('client') {
                            sh 'npm i && npm run build'
                        }
                    }
                }
            }
        }

        stage('Copy master Build Directory: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_master') {
                        sh 'mkdir -p /tmp/build_master'
                        sh 'cp -r client/build /tmp/build_master'
                    }
                }
            }
        }

        stage('Checkout Production: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        checkout([$class: 'GitSCM', branches: [[name: '*/production']],
                                    userRemoteConfigs: [[url: 'git@github.com:unib0ts/ubQuiz.git']]])
                    }
                }
            }
        }

        stage('Copy Secrets to Production: Prod') {
            steps {
                script {
                    copySecret.ubQuiz_production_prod()
                }
            }
        }

        stage('Clean Production Build Directory: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        sh 'rm -rf client/build'
                    }
                }
            }
        }

        stage('Paste Build Directory to Production: Prod') {
            steps {
                script {
                    ws('/home/jenkins/jenkins-agent/workspace/ubQuiz_production') {
                        sh 'cp -r /tmp/build_master/build client/'
                    }
                }
            }
        }

        stage('Docker: For Prod') {
            steps {
                script{
                    dockerLogin('docker-hub') 
                    dockerBuild.produbQuiz_productionBuild()
                    dockerPush.produbQuizfrontendPush()
                }
                
            }
        }

        stage("Deploying: Prod Server"){
            steps{
                script{
                    deployedProd.ubQuizFrontendProd()
                }
                script {
                    // Copy the Python script and requirements.txt to the workspace
                    writeFile file: 'update_google_sheet_PROD.py', text: libraryResource('scripts/update_google_sheet_PROD.py')
                    writeFile file: 'requirements.txt', text: libraryResource('requirements.txt')
                    
                    // Run the Python script in a virtual environment
                    runPythonInVenv('update_google_sheet_PROD.py')
                }
            }
        }

    }

    post {
        always {
            sh 'docker logout'
        }
        success {
            script {
                def mode = readFile('mode.txt').trim()
                if (mode == 'PROD') {
 discordNotification.successDiscordProd() }
                else
                { discordNotification.successDiscordDev() }
            }
        }
        failure {
            script {
                def mode = readFile('mode.txt').trim()
                if (mode == 'PROD') {
 discordNotification.failureDiscordProd() }
                else
                { discordNotification.failureDiscordDev() }
            }
        }
        aborted {
            script {
                def mode = readFile('mode.txt').trim()
                if (mode == 'PROD') {
 discordNotification.abortDiscordProd() }
                else
                { discordNotification.abortDiscordDev() }
            }
        }
    }
}
