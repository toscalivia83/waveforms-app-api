# Feebris application

Submit waveform annotations and get list of submitted answers.

## Getting started

1. Check that you have node and npm install by running `npm -v` and `node -v`, if not, [install node and npm](https://www.npmjs.com/get-npm)
1. Check that you have mongodb installed with the driver, if not [install mongodb](https://www.npmjs.com/package/mongodb)
2. Run `npm install` which will install library dependencies.
3. Run `npm run start-server` to run the server.


## MongoDB
To look at what is inside your database in dev
1. Run `mongo "mongodb://localhost/dev"`
2. Run `use dev`
3. Then you can run any command like `db.stethoscoperecords.find()`


## Improvements
- [x] Export the get and post from NodeJs to a routes folder
- [ ] Add more tests
- [ ] Add express cookie
- [ ] Could generate the .dat from the .wav file in Nodejs and save it on the cloud, then use it in the FE, instead of saving them in the public folder.
