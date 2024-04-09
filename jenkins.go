pipeline {
    agent any

    environment {

        GIT_BRANCH = "main"
        GIT_URL = "https://gitlab.com/AchoBestman/godwin-api.git"
        GIT_CREDENTIAL_ID = "6462f35a-6057-4650-a232-b9e9ed4b8de5"

        APP_CONTAINER_NAME = "fintechgodwin-api"
        APP_IMAGE_NAME = "aikpe/fintechgodwin-api"
        APP_PORT = "8020"
        SERVER_PORT = "80"

        MYSQL_IMAGE = "mysql:latest"
        MYSQL_ROOT_PASSWORD = "Hp@C2WPluX=Pw]y~sJ96ç3Tnç,!@¨£¨£"
        MYSQL_DATABASE = "fintechgodwin"
        MYSQL_USER = "fintechgodwin"
        MYSQL_PASSWORD = "Hp@C2WPluX=Pw]y~sJ96ç3Tnç,!@¨£¨£"
        MYSQL_CONTAINER_NAME = "fintechgodwin-mysql"
        MYSQL_VOLUMES = "mysql-data:/var/lib/mysql"
        MYSQL_PORT = "3306"

        PHPMYADMIN_IMAGE = "phpmyadmin/phpmyadmin:latest"
        PHPMYADMIN_CONTAINER_NAME = "fintechgodwin-phpmyadmin"
        PHPMYADMIN_PORT = "8021"
        NETWORK = "fintechgodwin-net"
        RESTART_WAY = "always"

        STORAGE_AUTHORIZE = "chmod -R 0777 /var/www/html/storage"
        PUBLIC_AUTHORIZE = "chmod -R 0777 /var/www/html/public"
        BOOTSTRAP_AUTHORIZE = "chmod -R 0777 /var/www/html/bootstrap"

        KEY_GENERATE = "php artisan key:generate"
        MIGRATION = "php artisan migrate"
        PASSPORT_INSTALL = "php artisan passport:install"
        PASSPORT_KEY = "php artisan passport:keys --force"

        EXPORT_DATABASE = "php artisan database:export"
    }

    stages {
        stage("Pull godwin-api.git project") {
            steps {
                git branch: "${GIT_BRANCH}", credentialsId: "${GIT_CREDENTIAL_ID}", url: "${GIT_URL}"
            }
        }

        stage("Create and start network") {
            steps {
                script {

                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${NETWORK}", returnStatus: true)
                    
                    if (containerExists == 0) {
                        echo "create and start project network container: ${NETWORK}"
                        sh "docker network create ${NETWORK}"
                    }
                    else{
                        echo " ${containerExists} ${NETWORK} container already exist and start fine."
                    }
                }
            }
        }

        stage("Create and start mysql") {
            steps {
                script {

                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${MYSQL_CONTAINER_NAME}", returnStatus: true)

                    if (containerExists != 0) {
                        echo "create and start mysql container: ${MYSQL_CONTAINER_NAME}"
                        sh "docker run -d --name ${MYSQL_CONTAINER_NAME} --network ${NETWORK} -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -e MYSQL_DATABASE=${MYSQL_DATABASE} -e MYSQL_USER=${MYSQL_USER} -e MYSQL_PASSWORD=${MYSQL_PASSWORD} -v ${MYSQL_VOLUMES} --restart ${RESTART_WAY} ${MYSQL_IMAGE}"
                    }
                    else{
                        echo " ${containerExists} ${MYSQL_CONTAINER_NAME} container already exist and start fine."
                    }
                }
            }
        }

        stage("Create and start phpmyadmin") {
            steps {
                script {

                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${PHPMYADMIN_CONTAINER_NAME}", returnStatus: true)

                    if (containerExists != 0) {
                        echo "create and start phpmyadmin container: ${PHPMYADMIN_CONTAINER_NAME}"
                        sh "docker run -d --name ${PHPMYADMIN_CONTAINER_NAME} --network ${NETWORK} -e PMA_HOST=${MYSQL_CONTAINER_NAME} -e PMA_PORT=${MYSQL_PORT} -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -p ${PHPMYADMIN_PORT}:${SERVER_PORT} --restart ${RESTART_WAY} ${PHPMYADMIN_IMAGE}"
                    }
                    else{
                        echo " ${containerExists} ${PHPMYADMIN_CONTAINER_NAME} container already exist and start fine."
                    }
                }
            }
        }

        stage("Build project image") {
            steps {
                script {
                    sh "docker --version"
                    sh "docker image build -t ${APP_IMAGE_NAME}:v$BUILD_ID ."
                    sh "docker image tag ${APP_IMAGE_NAME}:v$BUILD_ID ${APP_IMAGE_NAME}:latest"
                }
            }
        }

        stage("Push project image on hub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "docker_hub", passwordVariable: "docker_hub_password", usernameVariable: "docker_hub_user")]) {
                        sh "docker login -u ${docker_hub_user} -p ${docker_hub_password}"
                        sh "docker image push ${APP_IMAGE_NAME}:v$BUILD_ID"
                        sh "docker image push ${APP_IMAGE_NAME}:latest"
                        sh "docker image rmi ${APP_IMAGE_NAME}:v$BUILD_ID ${APP_IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage("Remove project container if exist") {
            steps {
                script {

                    def containerExists = sh(script: "docker ps -a --format '{{.Names}}' | grep -w ${APP_CONTAINER_NAME}", returnStatus: true)
                    
                    if (containerExists == 0) {
                        echo " ${containerExists} ${APP_CONTAINER_NAME} container exist and will be remove and recreate."
                        sh "docker stop ${APP_CONTAINER_NAME}"
                        sh "docker rm ${APP_CONTAINER_NAME}"
                    }
                    else {
                        echo "Docker container ${APP_CONTAINER_NAME} does not exist and will be create."
                    }
                }
            }
        }

        stage("Create project container") {
            steps {
                script {

                    echo "Create ${APP_CONTAINER_NAME} container."
                    sh "docker run -itd --name ${APP_CONTAINER_NAME} --network ${NETWORK} -p ${APP_PORT}:${SERVER_PORT} ${APP_IMAGE_NAME}:latest"
                }
            }
        }

        stage("Delete all unuse containers and images") {
            steps {
                script {

                    echo "Delete all unuse containers and images"
                    sh "docker container prune -f"
                    sh "docker image prune -a -f"
                }
            }
        }

        stage("Run cli command on the container") {
            steps {
                script {

                    echo "Running php artisan commands and others commands inside ${APP_CONTAINER_NAME} container."

                    sh "docker exec ${APP_CONTAINER_NAME} ${STORAGE_AUTHORIZE}"
                    sh "docker exec ${APP_CONTAINER_NAME} ${PUBLIC_AUTHORIZE}"
                    sh "docker exec ${APP_CONTAINER_NAME} ${BOOTSTRAP_AUTHORIZE}"

                    sh "docker exec ${APP_CONTAINER_NAME} ${KEY_GENERATE}"
                    sh "docker exec ${APP_CONTAINER_NAME} ${MIGRATION}"
                    sh "docker exec ${APP_CONTAINER_NAME} ${PASSPORT_INSTALL}"
                    sh "docker exec ${APP_CONTAINER_NAME} ${PASSPORT_KEY}"
                }
            }
        }

    }
}

