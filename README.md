Advanced AI Trip Planner
=======================

AI Planner is a travel planning app built with React, Gemini AI, Firebase, and TailwindCSS. This guide will help you set up and run the project in your own environment, like VS Code.

Features
=======================

AI-powered trip generation

Google Authentication

Save and view trip details

Display place photos using Google Photo API

User trip history

Tech Stack
=======================

React (Frontend)

Gemini AI (AI-powered trip generation)

Firebase (Authentication & Database)

TailwindCSS (Styling)

Getting Started
=======================

1. Clone this repository

2. Install Dependencies

* npm install

3. Set Up Firebase & Google API

* Go to Firebase Console

* Create a new project

* Enable Authentication (Google Sign-In)

* Create a Firestore database

* Generate your own Google API key from Google Cloud Console

* Create a .env file in the root directory and add your Google API key:

 VITE_GOOGLE_PLACE_API_KEY=your_google_api_key

* Set up your Firebase configuration in service/firebaseConfig.js. It should look something like this:

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};
export default firebaseConfig;

Note: You must generate your own Firebase and Google API keys. The API keys in this project are not included for security reasons.

4. Run the App

npm start

*hope it will work on your end!
