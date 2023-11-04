# appli-meteo

## Build de l'image

sudo docker build . -t meteo:latest

## Lancer un conteneur

sudo docker run -p 3008:80 meteo

## Consulter le site depuis le navigateur

http://localhost:3008/

## Commandes utiles

sudo docker container ls : Afficher la liste des conteneurs actifs

sudo docker container ls -a : Afficher la liste des conteneurs

sudo docker image ls : Afficher la liste des images

sudo docker image rm id_de_l'image : Supprimer une image (possibilité d'utiliser -f pour forcer)

sudo docker container prune : Supprimer les containers arrêtés

sudo docker image prune : Supprimer les images n'ayant pas de containers actifs