## About MasOnline

Online card game where you can play with your friends and family. You can create your own game and invite your friends to play with you. You can also join a game that your friends have created. The game is played with a deck of cards and the goal is to get rid of all your cards before the other players. You can play with 2-4 players.

## Start the application

This is the full MasOnline Application. In order to get the following application to start you need to follow the following steps (Lucas guide):

- Clone the repository
- Cd into the folder
- Run `composer install`
- Then open 3 terminals
- First run `php artisan serve`
- Second cd Client and then `npm install` and then `npm run dev`
- Third cd Server and then `npm start`

Now you should be able to see the application running on `http://127.0.0.1:5173/`
If this is the first time you are running the application you need to run `php artisan migrate --seed` in order to create a database and some information.


## Usefull information

- In order to create a admin user you need to change the permmision of a user in the database to 1.
- The following application can be split up in 3 parts: Client, Server and Database, Client and Server need to be in the same folder in order to work. But the laravel/backend part of the application can run on it own.
- If the application is not working check so that in Client/env imports from the same port as the laraavel application is running on.