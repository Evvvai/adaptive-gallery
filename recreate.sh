sudo docker-compose stop

sudo docker volume rm ecwid-gallery_client_build
sudo rm -rf rm data

sudo docker-compose up --build --force-recreate client nginx