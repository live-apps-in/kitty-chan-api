pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t kittychan-api .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm kittychan-api --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 5010:5000 -d --restart always --name kittychan-api kittychan-api'
            }
        }
    }
}