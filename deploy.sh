docker build --build-arg REACT_APP_HOST=$REACT_APP_HOST -t razear/mega-electric-web-app:latest -t razear/mega-electric-web-app:$SHA -f Dockerfile .

docker push razear/mega-electric-web-app:latest
docker push razear/mega-electric-web-app:$SHA


fandogh service apply -f web-app-deployment.yml  \
                 -p SHA=$SHA
#fandogh service deploy  --image razear/mega-electric-web-app --version $SHA --name mega-electric-web-app  -p 3000 -d
