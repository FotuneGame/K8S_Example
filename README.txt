#Перед запуском установить kubectl и minikube

    ##1) Запустить DockerDesktop и wsl в терминале.

    ##2) Установить
        kubectl: https://kubernetes.io/ru/docs/tasks/tools/install-kubectl/
        minikube: https://kubernetes.io/ru/docs/tasks/tools/install-minikube/

    >Так же возможна настройка переменных окружения PATH для windows, (путь до minikube.exe): https://www.youtube.com/watch?v=TAM-DLPX9XA

    ##3)В качестве гипервизора для последнего используйте docker (https://minikube.sigs.k8s.io/docs/drivers/docker/#Standard%20Docker): 
        Запустите кластер с помощью драйвера docker:
        ```
            minikube start --driver=docker
        ```
        Как сделать docker драйвером по умолчанию:
        ```
            minikube delete
            minikube config set driver docker
            minikube start
        ```
    ##4) Проверка установки:
        ```
            kubectl version --client
            minikube version
            minikube status
        ```

#Для запуска:
    ##1) Создания образов в соответствующих директориях (backend и frontend) и загрузка их на DockerHub:
        ```
        docker build -t grigorytitov/k8s_test_backend:v1 .
        docker push grigorytitov/k8s_test_backend:v1 
        docker build -t grigorytitov/k8s_test_frontend:v1 .
        docker push grigorytitov/k8s_test_frontend:v1 
        ```

    ##2) Включите контроллер входа:
        Чтобы включить контроллер входа NGINX, выполните следующую команду:
        ```
        minikube addons enable ingress
        ```
        Убедитесь, что контроллер входа NGINX запущен
        ```
        kubectl get pods -n ingress-nginx
        ```

    ##3) Выполняем yaml манифесты:
        Выполнить одну команду для установки всех манифестов:
        ```
        kubectl apply -f k8s
        ```
        Или:
            Для применения манифеста и его проверки 
            ```
            kubectl apply -f k8s/backend-deployment.yaml
            kubectl describe deployment backend

            kubectl apply -f k8s/frontend-deployment.yaml
            kubectl describe deployment frontend
            ```
            Для создания логики подключения (сервисы)
            ```
            kubectl apply -f k8s/backend-service.yaml
            kubectl apply -f k8s/frontend-service.yaml   
            ```
            Для работы с ingress:
            ```
            kubectl apply -f k8s/ingress.yaml
            ```

    ##4) Проверка состояния:
        ```
        kubectl get pods
        kubectl get deployment
        kubectl get service frontend-service --watch
        kubectl get service backend-service --watch
        kubectl describe ingress example-ingress
        kubectl get ingress
        ```

    ##5) Пробросить порты во вне кластера через INGRESS:
    ```
    minikube tunnel
    ```
    >Работает только при открытом терминале


    ##6) Отчистка:

        ```
        kubectl delete ingress example-ingress
        kubectl delete services frontend-service backend-service
        kubectl delete deployment frontend backend
        ```

>Источники для подробного изучения k8s yaml: https://habr.com/ru/articles/752586/