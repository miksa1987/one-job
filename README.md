## One job. You have one job.
This is a bit different kind of todo app. You select only ONE (1), the most important todo of your day and write that down. You also have to set a time for it. And when that time has passed, you can reflect on how it felt to do that one job.

This project is being done as my little hobby project to learn some Firebase and MobX, and it is currently heavily under construction. Technologies used are React, MobX, Firebase.

Background photo by Dominik Dombrowski on Unsplash.

## How to run the app
The app is deployed at https://fervent-babbage-0cd28a.netlify.com/ . If you however wish to run it locally, follow these steps:

1. Clone this repository

2. run npm install to install all dependencies.

3. Set up a new Firebase project and get your configuration strings. (Firebase console -> your project -> The gear icon next to "Project overview" -> scroll to the bottom of the page)

4. Copy the configuration strings to an .env file at the root of the project, in the following format: REACT_APP_CONFIG_STRING. You can see the file env.example for exact strings.

5. That's it! Now run npm start and the app will start at http://localhost:3000 !