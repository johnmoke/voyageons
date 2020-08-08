Authentication
Page is composed of several webpages 
we need to secure the adminpage 

Step one : Authentication 
           check weither a user is already registered or not 
Step two : Authorization 
           Process of checking to which pages the user has access rights

Create a sign in page 

Create the login.js file 
   get all necessary information from the forms 
Create a table or collection users in the database travels
create a model for every user in the 
Create the users.js file in models folder 
   1. Connnect mongoose library to it 
   2. Create a schema for the model 
   3. Create a models based upon the schema created earlier 
   4. Export the model 

Create a file in Routes folder called users.js
   Here we will work with all the requests made on the route ('/users')
Protect the password  we use the package bcrypt 



  


       
