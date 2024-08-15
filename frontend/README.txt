комманда для образа 

    docker build -t grigorytitov/k8s_test_frontend:v1 .

комманда для контейнера

    docker run  -p 80:3000 -d --name frontend frontend:v1