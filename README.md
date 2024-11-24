# Ahri.Cool CMS
powered by Halo

## Build 
Build Jar
```shell
# Windows
./gradlew.bat clean build -x check 
```
Build Docker Images 
```shell
docker build -t ahri .
docker tag ahri:latest public.ecr.aws/o7d5s8i7/ahri:latest
```
Push Docker Images to AWS ECR
```shell
docker push public.ecr.aws/o7d5s8i7/ahri:latest
```

## Deployment
Windows Dev Env
```shell
docker compose -f ./docker-compose.dev.yaml up
```
Production Env
```shell
docker compose up -d
```