# CRUD Application with React, React Query, and Axios
Overview
This project is a simple CRUD (Create, Read, Update, Delete) application built with React, React Query, and Axios. It demonstrates how to perform CRUD operations on a mock API using modern React practices, including hooks and functional components. The application is designed to be responsive and user-friendly, with a focus on clean and maintainable code.

# Features
1.Create: Add new items to the list.
2.Read: Fetch and display a list of items from the API.
3.Update: Edit existing items.
4.Delete: Remove items from the list.
5.Pagination: Navigate through pages of items.
6.Responsive Design: Optimized for both mobile and desktop screens.
7.Loading and Error States: User-friendly messages during data fetching.

# Technologies Used
.React: A JavaScript library for building user interfaces.
.React Query: A library for fetching, caching, and updating asynchronous data in React.
.Axios: A promise-based HTTP client for making API requests.
.Formik: A library for building forms in React.
.Yup: A JavaScript schema builder for value parsing and validation.
.Tailwind CSS: A utility-first CSS framework for styling.

# API Details
The application interacts with a mock API hosted at https://66a3deab44aa63704582bdea.mockapi.io/users. Below are the endpoints used:

-GET /users: Fetch a list of users.
-POST /users: Create a new user.
-PUT /users/:id: Update an existing user by ID.
-DELETE /users/:id: Delete a user by ID.


# Project Structure
Create.jsx: Component for creating and managing items.
Update.jsx: Component for updating items.
Read.jsx: Component for reading and displaying items.
Delete.jsx: Component for deleting items.
src/components/Dialog/FormDialog.jsx: Component for displaying forms in a dialog.
src/components/Card/ItemCard.jsx: Component for displaying individual items.
