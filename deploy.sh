

docker push razear/mega-electric-web-app:latest
docker push razear/mega-electric-web-app:$SHA

fandogh service deploy --image razear/mega-electric-web-app --version $SHA --name mega-electric-web-app  --env REACT_APP_HOST=$REACT_APP_HOST -p 3000 -d
