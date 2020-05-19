# Pixslick Backend Node + Mongo

[Reference](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)

1. Required installation for backend
    - docker [Docker Pages](https://www.docker.com/)
    - docker-compose [Docker compose install](https://docs.docker.com/compose/install/)

2. to run this backend
    - setup .env take required variabel from .env_example
    - $ docker-compose up -d

3. run migration 
    - $ docker exec -it todo_nodejs node db-migration.js

4. postman
    - https://www.getpostman.com/collections/2c6990717a8fe037b106