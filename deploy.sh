
pip install fandogh-cli --upgrade
fandogh login --username $FANDOGH_USERNAME --password $FANDOGH_PASSWORD
fandogh namespace active --name $FANDOGH_NAMESPACE

fandogh service apply -f web-app-deployment.yml  \
                 -p SHA=$SHA



