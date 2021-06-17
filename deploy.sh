
#docker push razear/mega-electric-web-app:$SHA
#docker push razear/mega-electric-web-app:latest


fandogh service apply -f web-app-deployment.yml  \
                 -p SHA=$SHA



