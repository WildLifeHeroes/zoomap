# Zoo map
Interactive Zoo Map based on Point Defiance Zoo in Tacoma, WA

### How to install
After cloning, in the installation directory:
```
npm install
```

### Environment setup
The program uses mongoose to connect to a MongoDB.  Either install a local installation of MongoDB or a cloud version.
Create a .env file in the root directory and set the following environmental variables:
```
SALT = <small int value>
dbUserName = <your database username>
dbPassword = <your database password>
unSplashKey = <your Unsplash API key> 
unSplashSecret = <your Unsplash API secret>
youTubeKey = <your youTube API key>
pointDefianceChannel = UCLT8e5UqiAE5EoQi3YDkP8A
```

### Database setup
- Adjust ./database/index.js database URI for your particular installation (local or cloud hosted).  See MongoDB and Mongoose websites for details.

- At your option, you may create an option seed 'animals.csv' file for the database with the following fields:
  - "name": String
  - "habitatImageUrl": String
  - "info": String
  - "moreInfoUrl": String

- Seed the database with this command:
```
npm run seed
```

### Front end environment
Set public/js/script.js line #1 const host = "http://localhost:3000" or "hosted url"

### Start the server
```
npm start
```


 
