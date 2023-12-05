# Group: JIC-3102
# Project: ASOP Project

## Team Members:
- Devita, Antony C
- Batistela, Victor H
- Fekade, Nathnael A
- Vo, Jonathan H
- Choi, Louie H

# General Notes
- Adding a new board member / admin
  1. Go to firebase under asopgardenmanager@gmail.com
  2. On firestore, search for the user
  3. Create a isAdmin boolean property and set it to true
 
- Running the stripe test
  1. Open 2 terminals, one in the ASOP-Final/src directory. The other in the ASOP-Final/server directory
  2. In the src terminal, run "npm start" in order to start the local webpage
  3. In the server terminal, run "node index.js" in order to start the REST API
  4. For test card info, use "424242" repeatedly.
 
- Make sure to grab the secret key file from the ASOP-Test Firestore if you're going to be testing the Stripe dues payment feature
  1. It can be located [here.](https://console.cloud.google.com/iam-admin/serviceaccounts/details/113165166929441828383/keys?project=asop-test&supportedpurview=project)
 
# Install Guide:

1. Request victorhugobatistela@gmail.com permission to join the following GitHub repository: https://github.com/A-Sip-Of-Paradise-Garden/ASOP-Final  
2. Once permission is granted, clone or download the code to your local machine. 
3. Open the code using your choice of IDE. 
4. Run “npm install” to install all dependencies. 
5. Create a .env file outside the src folder. This file should be in the same folder hierarchy as the src and public folder. 
6. In the .env file, you will need to add the following firebase credentials: 
- REACT_APP_API_KEY="" 
- REACT_APP_AUTH_DOMAIN="" 
- REACT_APP_PROJECT_ID="" 
- REACT_APP_STORAGE_BUCKET="" 
- REACT_APP_MESSAGING_SENDER_ID="" 
- REACT_APP_APP_ID="" 
7. You can find these credentials once you log in to firebase using the credentials you find under “Firebase” in the "Customer Release Document". 
- Note: do not use the credentials from asop-production as this is the server used to run the production app, and you do not want to modify the actual customer data. Create or use any other server instance when developing. 
8. Run “npm start” to start your development server. 
9. Access the website at http://localhost:3000/  

# Release Notes:

## v0.5
### Features
 - Implemented SendGrid API for email notifications.
 - Implemented Stripe webhook for payment authentication to maintain security.
 - Redesigned donation page
 - Redesigned members page
 - Added partners to home page
### Bug Fixes
- Various UI bug fixes
### Known Issues
N/A

## v0.4
### Features
  - New notifications property added to user profiles.
   - Users are able to toggle the property on their profiles page.
   - When turned on, users will receive notifications when board members create/delete events.
  - Members now have the ability to pay dues
   - Once paid, their status will update in firebase until the next payment is due (annually)
### Improvements
  - Removed age property on registration. Age is now calculated from date of birth, that way users have one less property to complete when signing up.
  - Added firebase functionality to creating events. They will now be stored in the database when created
  - Added some animation effects
### Bug Fixes
- Fixed an issue in the members page where infinite requests were being made to firebase due to an updating variable in the useEffect hook.
### Known Issues
N/A

## v0.3
### Features
  - Created the home page for the website
  - Created the contact us page for the website
  - Created the events page that allows for board members to manage events and allows for members to view / RSVP for events
  - Created payments page through Stripe
### Bug Fixes
  - Fixed a bug regarding global styling
### Known Issues
N/A

## v0.2
### Features
  - Finished the ability to sign up for an account and log in to the created account
  - Finished a fully functional profile page that showcases information including name, age, birthday, gender, phone #, profile picture along with the ability to update it.
### Bug Fixes
N/A
### Known Issues
N/A

## v0.1.1
### Features
  - Added members page where admins can check users' member status
  - Modified user profile to include user ID information
### Bug Fixes
N/A
### Known Issues
N/A

## v0.1.0
### Features
  - Added basic user login fetching functionality
  - Added authentication boilerplate
### Bug Fixes
N/A
### Known Issues
N/A
