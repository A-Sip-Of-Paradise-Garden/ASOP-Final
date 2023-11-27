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

# Release Notes:

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
