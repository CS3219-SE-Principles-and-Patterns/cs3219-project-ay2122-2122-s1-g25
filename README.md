# CS3219 Team Project - Upskill

Greetings, this repository contains the source code of our project. For the client side, `NextJS` is used to develop static UI assets, together with the renowed `Material-UI` styling library. For the server side,  `ExpressJS` is used to develop APIs which interact with our `PostgreSQL` database.

## Instructions for setup:
1. Ensure Docker, Docker Compose, Yarn and PSQL are installed in your workstation
2. Clone this repository
  
        git clone https://github.com/CS3219-SE-Principles-and-Patterns/cs3219-project-ay2122-2122-s1-g25.git
    
3. Launch all containers with Docker Compose

        docker-compose up

4. Access the frontend client at [http://localhost:3000](http://localhost:3000), backend server at [http://localhost:4000](http://localhost:4000), and database at [http://localhost:5433](http://localhost:5433)
5. Once development work is complete, tear down containers with Docker Compose

        docker-compose down

## Development scenarios:
- If you need to add npm modules to the project, follow this series of commands

        docker-compose down
        cd [client/server]
        yarn add [module]
        cd ..
        docker-compose build [client/server]
        docker-compose up

- If you would like to remove Docker persistent volumes, add the -v flag

        docker-compose down -v

## Instructions for Pull Requests:
1. Ensure the branch you are working on is named semantically based on the task at hand. Eg. **add-faq-page**
2. Submit the Pull Request with **master** as the target branch.
3. If any, link the GitHub issue to the Pull Request.
4. Ensure all CI checks are passing.
5. Assign a reviewer to review the Pull Request.
6. Once the reviewer has approved the Pull Request, merge it and delete the source branch.

That's all folks, cheers! =)