

docker push razear/mega-electric-web-app:latest
docker push razear/mega-electric-web-app:$SHA

fandogh service deploy  --image razear/mega-electric-web-app --version $SHA --name mega-electric-web-app  -p 3000 -d
