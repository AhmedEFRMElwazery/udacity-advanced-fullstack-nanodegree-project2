# Udacity's Advanced Full-Stack Web Development Nanodegree - Project2 (Build a Storefront Backend)


[![Udacity's Logo](./assets/docs/udacityLogo.svg "Udacity's Logo")](https://www.udacity.com/)



## Sponsored and funded by [egFWD](https://egfwd.com/) 

[![egFWD - Future of Work is Digital](./assets/docs/Egypt_fwd_logo-1.png "egFWD - Future of Work is Digital")](https://egfwd.com/specializtion/web-development-advanced/)



*author*: **Ahmed E. F. R. Mohammed**


* [Required-packages](#Required-packages)
* [Database-setup](#Database-setup)
* [Package-dot-json-scripts](#Package-dot-json-scripts)
* [Environment-variables](#Environment-variables)
* [Endpoint](#Endpoint)
* [Remarks](#Remarks)


--------------------
## Required-packages
--------------------

* bcrypt (^5.1.0)

* body-parser (^1.19.0)

* db-migrate (^0.11.13): This is installed globally using the `npm install -g db-migrate`

* db-migrate-pg (^1.2.2)

* express (^4.17.1)

* jsonwebtoken (^8.5.1)

* pg (^8.5.1)

- **```npm install```**: This is the first script to run in order to install all the dependencies and devDependencies needed for the project to function properly.


--------------------
## Database-setup
--------------------

In this step, we will create both the development (i.e. db_store_backend_dev) as well as testing (i.e. db_store_backend_test) databases:

- First, we will need to connect to the default postgres database as the server's root user
    - `psql -U postgres`
- Then, run the following command to create a new user named `AhmedEFRMohammed`. 
    - `CREATE USER AhmedEFRMohammed WITH PASSWORD 'JarvisArmy11011';`
- Thridly, run the following command to create both the development and testing databases, respectively
    - `CREATE DATABASE db_store_backend_dev;`
    - `CREATE DATABASE db_store_backend_test;`
- Fourthly, you can now connect to both databases in order to grant all privileges to the newly created user
    - Development database
        - `\c db_store_backend_dev`
        - `GRANT ALL PRIVILEGES ON DATABASE db_store_backend_dev TO AhmedEFRMohammed;`
    - Testing database
        - `\c db_store_backend_test`
        - `GRANT ALL PRIVILEGES ON DATABASE db_store_backend_test TO AhmedEFRMohammed;`

- Eventualy, now that our databases are ready, we should start the migration process:
    - run this command to initiate migration **```npm run migrate:upd```**

-----------------------
## Package-dot-json-scripts
-----------------------

- **```npm run prettier```**: To apply the prettier rules to the code base, in order to ensure consistency for how the code is displayed.

- **```npm run eslint```**: This "eslint" command will help you to write proper TypeScript code, but ensuring that there is no implict typing throughout the codebase.

- **```npm run dev```**: This command will start the nodemon server on the server.main.ts.

- **```npm run build```**: This command will build/compile the TypeScript code into JavaScript in the `/dist` folder

- **```npm run test```**: This "test" command run the above-mentioned `build` command to compile TypeScript, then will run testing using `jasmine`.

- **```npm run migrate:test```**: This "migrate:test" command will set the "ENV_STATUS" to "test", hence starting the testing phase, and will start running the `migrate:upt` command (responsible for upping the migration for testing), then the `test` command (explained above), then the `migrate:resett` (responsible for resetting the migration for testing).

- **```npm run watch```**: The "watch" command will start running the app...The port on which the server will be running is `1987` while the database will run on port `5432`.


--------------------
## Environment-variables
--------------------

These are the environment variables to be included in the `.env` file. These are the defaults that I have used for my development and testing settings. Please feel free to switch them around for whatever that suits you.


```
ENV_STATUS=dev                               //default environment (set to `dev`).

SERVERPORT=1987                              //port on which server is running.

DB_POSTGRES_HOST=localhost                   

DB_POSTGRES_PORT=5432                        //port on which the database is running.

DB_POSTGRES_DBDEV=db_store_backend_dev       // default database for development. 

DB_POSTGRES_DBTEST=db_store_backend_test     // default database for testing.

DB_POSTGRES_USER=AhmedEFRMohammed           // user created for the postgres database

DB_POSTGRES_PASSWORD=JarvisArmy11011        // password of the created username

BCRYPT_PASS = "A.K.A.AhmedElwazery"         

SALT_ROUNDS =10

SECRET_TOKEN = aJhAmReVdIeSlAwRaMzyery

```
--------------------
## Endpoint
--------------------
They were discussed in the [REQUIREMENTS.md](./REQUIREMENTS.md) file.



--------------------
## Remarks
--------------------
Please note that the `.env` file was NOT included in this github repo, as requested by the Udacity project requirements. However, all the environment variable that were to be included in this `.env` file were aforementioned and clearly stated right above this section, under the [Environment-variables](#Environment-variables)