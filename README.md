# International Office

Name of the project -International Office

Author: William Amouh

## How to run the plateform

The plateform is made up with 3 applications (backend application - frontend-admin - frontend - app)

This projet is a MEAN stack project

### Running The backend 

Install Mongodb and Mongodb Compass
 
Go to backend

```
cd backend-app
```
Install package
```
npm install
```
Copy the .env.dev file to .en.
```
cp .env.dev .env
```
Start the server
```
nodemon server.ts
```
Open postman 
Make a post request with : 

```
url: http://localhost:8000/api/users/
```

```
body: {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@tdh.de",
        "password": "123456",
        "address": "8920 Bahnhofstrasse 21",
        "type": "staff",
        "birthdate": "02-04-1990"
    }
```
Once the user (member of staff) is created you can go to the admin frontend to login

### Running The Admin frontend

 Go to admin frontend
```
cd frontend-admin-app
```
Install package
```
npm install
```
Start the server
```
npm start
```
Here in the homepage you can create every type of user( student, staff member, professor)

### Running The frontend (student)

 Go to frontend
```
cd frontend-app
```
Install package
```
npm install
```
Start the server
```
npm start
```
Everyone can access this application but just student can login.

## Usage:
In the Admin application: The staff member or a professor can login, check all users list, created, read, update and delete an event or news. He can also chat we student or another staff member or a professor.

In the frontend: the student can get all information about the school, faculties, degrees, events, news, etc.. In additiomn he can login and chat with another user (student, professor, staff member).
