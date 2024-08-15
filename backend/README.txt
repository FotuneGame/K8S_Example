комманда для образа 

    docker build -t grigorytitov/k8s_test_backend:v1 .

комманда для контейнера

    docker run  -p 3001:3001 -d --name backend backend:v1