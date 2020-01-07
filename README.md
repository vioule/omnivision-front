# OmniVision

### Requirements

Applications needed to work on this project :

- Any IDE (WebStorm, PHPStorm, Visual Basic, Atom, Vim, ...)
- Docker + Docker Compose (If your OS is Windows, think to open ports, see docker-compose.yml file to get the full port list)
- A browser

### Installation

There is two ways to work on the project.
The first one is when Node.js is installed on your machine. The second one is when you do not want to install Node.js and prefer to use only docker.

For several reasons, the following steps concerns only the docker use.

To install dependencies and to prepare environment, run the command below :

```
docker-compose build
```

This command will create images on your machine to allow you to run expected containers.

You have to run this command each time the `docker-compose.yml` file is updated.

### Starting working

#### Environment configuration
To enable the application to run, you have to create the file `.npmrc`.
The `.npmrc` is the default configuration file for npm scripts.

Inside this file, thanks to add this configuration :
```
env="localhost"
api="dev"
```
This file is not versioned, so feel free to configure this one to update your local application with a specific environment.

The `env` key, define the environment used to build and run the project.
The `api` key is used when you're `env` is equal to `localhost`. In this case some APIs need to be served by a proxy to allows OPTIONS and prevent from CORS issues.


#### Start containers
To run the application, you have to execute the command below :

```
docker-compose up -d
```

The option `-d` is there to run docker containers in background and prevent it to lock the prompt.

This command will start two containers :

- omnivision_node
- omnivision_nginx

The first one, `omnivision_node` is the Node container that will build the project. Each files will be saved into the `./public` directory. This container is in watch mode and build update `script.js` and `style.css` files each time you update a file, without the needs to restart containers.

The second one, `omnivision_nginx` is the web server that will enable your browser to access to those files. The nginx server is configure to be a reverse proxy too (for mocks).

### Development & testing

#### Informations about the use of Flow

The application uses [Flow](http://flowtype.org/) for type checking.

- Configure your IDE to use Flow
- Add @flow to all new files that need type checking

#### When changing branch

Each time you change branch, you have to restart docker containers to be sure that webpack is up to date with your project sources. To restart containers, you can run the command below :

```
docker-compose restart
```

Sometimes, you will need to rebuild containers (when a dependencie is updated or a new one is installed)

#### Information about Enzyme, Jest (Test engine)

The project is using Enzyme and Jest for Unit Tests.
Thank to update and maintained those tests up to date.
<br/>For more informations about [Enzyme](https://airbnb.io/enzyme/docs/guides/jest.html)

#### Access to logs of the containers

If you need to have access to containers prompt or logs, you can run those commands :

```
docker-compose logs #container_name#
```

This command will replace your prompt by the one of the container. You can run the command below, if you need to have "live" logs, your prompt automatically linked to the container :

```
docker-compose logs -f #container_name#
```

#### Enter into the container

If you need to execute commands into a container or need to access to file or inspect the container, you have to run the command below :

```
docker exec -it #container_name# bash
```

#### Stop containers

When you finish to work or want to stop containers, you have to run this command :

```
docker-compose down
```
