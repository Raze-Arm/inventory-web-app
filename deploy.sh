#docker build --build-arg REACT_APP_HOST=$REACT_APP_HOST -t razear/mega-electric-web-app:latest -t razear/mega-electric-web-app:$SHA -f Dockerfile .
docker build   -t razear/mega-electric-web-app:latest -t razear/mega-electric-web-app:$SHA -f Dockerfile .

docker push razear/mega-electric-web-app:$SHA
docker push razear/mega-electric-web-app:latest


#fandogh  secret create --name backend-api  -t environment-secret -f SECRET_KEY=$BACKEND_API
#fandogh  secret put --name backend-api  -t environment-secret -f SECRET_KEY=$BACKEND_API
fandogh service apply -f web-app-deployment.yml  \
                 -p SHA=$SHA -p BACKEND_API=$BACKEND_API
#fandogh service deploy  --image razear/mega-electric-web-app --version $SHA --name mega-electric-web-app  -p 3000 -d
