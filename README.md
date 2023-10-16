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

# Release Notes:
## v0.1.0
### Features
  - Added basic user login fetching functionality
  - Added authentication boilerplate
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
