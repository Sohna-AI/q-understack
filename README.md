# Q-understack

Welcome to Q-understack! Our platform is designed for the programmer with a humorous side to be able to post programming questions and answers that range from silly to serious.

## Features

### Users can:

   - Sign Up
   - Log In
   - Create a question
   - Edit a question
   - Delete a question
   - Post an answer
   - Update an answer
   - Delete an answer
   - Add tags to a question
   - Remove tags from a question
   - Save a question
   - Unsave a question
   - Save an answer
   - Unsave an answer

### Future features:

   - Post a comment
   - Edit a comment
   - Delete a comment
   - Up vote a question/answer
   - Down vote a question/answer
   - Search filters for questions
   - Follow a question/answer
   - UnFollow a question/answer
   - See recently updated follows in upper nav bar

## Screenshots

### Landing Page

![alt text](<react-vite/public/Landing Page.png>)

### Questions page

![alt text](<react-vite/public/questions page.png>)

### Question details page

![alt text](<react-vite/public/question details page.png>)

### Saves page

![alt text](<react-vite/public/saves page.png>)

### Users questions page

![alt text](<react-vite/public/users questions page.png>)


## Technologies Used

### Backend

   - Python
   - Flask
   - PostgreSQL

### Frontend

   - Javascript
   - React
   - Redux


### How to start

1. Clone this repository.
2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run -p 5001
   ```

5. In a second terminal you need to start your react app:

   React app:
   ```bash
   cd react-vite
   npm install
   npm run dev
   ```

## Live Link

https://q-understack.onrender.com/
