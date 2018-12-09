# Vote Now

## Purpose: ##

A React.js application using components to build the UI, manages component state, and responds to user events. 

## Description ##
VOTE NOW is an application to encourage people to actively engage and participate in the elections by providing information about where to vote and a list of their candidates. VOTE NOW's helpful resources include podcasts and links to a variety of resources that allows them to make a educated and informed decision.

Link to app: [VoteNow](https://immense-wave-55962.herokuapp.com/)

**Frameworks**
* Bootstrap

**Libraries**
* Axios
* React
* React-bootstrap
* React-form-validation
* Bcrypt-node.js
* Bluebird
* Body-parser
* Dotenv
* Express
* Mongoose
* Nodemailer
* Passport
* Path
* Xml2js
* Yarn

**APIs**
* **Google Civic:** Provides polling places, early vote locations, contest data, election officials, and government representatives for U.S. residential addresses.
* **VoteSmart:** Provides local, state and federal election information, including in-depth candidate information and political courage test responses.
* **ListenNotes:** Podcast search engine

## Developer's Notes: ##
* Uses Passport to authenicate new and returning users. User can reset password via email link.
* When a user enters their address, the application will provide information on their polling place and the list of candidates for select contents.
* By selecting the "Get Podcasts" button, the application will show a list of available podcasts about the 2018 elections. This feature uses an API call and will update the available list of podcasts.
* The user can listen to the podcast, the app will open a new window.
* If a user is signed in, then the app will show their saved address and automatically show their election information and their previously saved podcast list.
* When signed in, the user may also save and delete podcasts from their saved list.
* The user may update and save their address.

## Future Enhancements ##
* Add Google map/directions to display polling location
* Display 'mock' ballot - all information is available including all election contests and referendums
* Add modal to display candidates response to Political Courage Test to show their position on key issues

## Team Members: ##
* Tashi Wangmo
* Joe Hoffman
* Abhinav Sharma
* Lindsay Lindner
* Virginia de la Riva
