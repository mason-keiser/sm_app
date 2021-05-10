# üConnect
A full-stack social media application made with React Hooks.

* Link: https://mss.masonkeiser.com/
# Technologies Used
* React.js
* React Hooks
* Node.js
* Express
* PostgreSQL
* Webpack 4
* HTML 5
* CSS 3
* Bootstrap 4
* AWS EC2
# Features
* User can create/log into account
* User can create a post for the feed
* User can respond to feed posts
* User can like a post
* User can upload/change bio
* User can upload/change profile picture
* User can upload/change profile header
# Development
## System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* PostgreSQL 10 or higher
# Getting Started
1. Clone this repository:
```
git clone https://github.com/mason-keiser/sm_app.git
```
2. Locate cloned repository: 
```
cd sm_app
```
3. Install all dependencies with NPM:
```
npm install
```
4. Start postgreSQL server in terminal:
```
sudo service posgresql start
``` 
5. Create database that you will be using for the site:
```
createdb smApp
```
6. Import database to PostgreSQL:
```
npm run db:import
```
7. Open a second terminal; navigate to project directory, start pgweb:
```
pgweb --db=smApp
```
8. Start the project (in another terminal). You can view the application by opening http://localhost:3000 in your browser:
```
npm run dev
```

