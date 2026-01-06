pipeline {
  agent any

  environment {
    IMAGE_NAME = "your-dockerhub-username/nodejs-app"
    TAG = "latest"
    EC2_USER = "ubuntu"
    EC2_HOST = "EC2_PUBLIC_IP"
  }

  stages {

    stage('Checkout') {
      steps {
        git 'https://github.com/your-repo/nodejs-devops-pipeline.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install --prefix app'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test --prefix app'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$TAG .'
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
          sh '''
          echo $DOCKER_PASS | docker login -u your-dockerhub-username --password-stdin
          docker push $IMAGE_NAME:$TAG
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2-key']) {
          sh '''
          ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << EOF
            docker pull $IMAGE_NAME:$TAG
            docker stop nodejs || true
            docker rm nodejs || true
            docker run -d --name nodejs -p 3000:3000 $IMAGE_NAME:$TAG
          EOF
          '''
        }
      }
    }
  }
}
