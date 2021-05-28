docker build -t razear/mega-electric-web-app:latest -t razear/mega-electric-web-app:$SHA -f Dockerfile .


docker push razear/mega-electric-web-app:latest
docker push razear/mega-electric-web-app:$SHA


