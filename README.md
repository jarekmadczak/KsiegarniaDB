Project Overview
The E-Library project is an online bookstore application that allows users to browse books, add them to their cart, and complete purchases. The project is divided into two main parts:

UserSite – the frontend for users, where they can browse products (books), add them to the cart, and make purchases.
AdminSite – the admin panel where administrators can manage books, categories, users, and orders.
The application is built using Next.js, React, Node.js, and communicates with a backend API and database. The project provides full functionality for managing a bookstore, from product management to order fulfillment.





Running the Application
1. Installing Dependencies
To run the project, you need to install the dependencies. The project uses Yarn, so make sure you have Yarn installed.

Step 1: Install Yarn (if not already installed)
If you don't have Yarn installed, you can install it via npm:

bash
Skopiuj kod
npm install --global yarn
Step 2: Install Dependencies
Navigate to the root directory of the project and run the following command to install all dependencies:

bash
Skopiuj kod
yarn install
2. Running the Application
Once the dependencies are installed, you can run the application.

Step 3: Run the Application in Development Mode
To start the application in development mode (with hot reloading), use the following command:

bash
Skopiuj kod
yarn dev
The application should be available at http://localhost:3000.

3. Running the Application in Production Mode
If you want to run the application in production mode, first build the project:

bash
Skopiuj kod
yarn build
Then start the production application:

bash
Skopiuj kod
yarn start
Technologies
The project uses the following technologies:

Next.js – React framework for server-side rendering (SSR) and static site generation (SSG).
React – JavaScript library for building user interfaces.
Node.js – JavaScript runtime environment.
Axios – Library for making HTTP requests.
Styled-components – Library for writing styles in JavaScript using template literals.
Yarn – Package manager.
MongoDB – Database for storing books, users, and orders.
UserSite Application
The UserSite application is the frontend where users can browse books, manage their cart, and place orders.

Features:
Home Page: Users can browse available books and filter them by category and price.
Product Details Page: Each product has a details page showing the book's description, price, and an option to add it to the cart.
Cart: Users can add books to their cart, change quantities, and proceed to checkout.
Order Form: Users fill out their contact details and complete the purchase.
AdminSite Application
The AdminSite is the admin panel where administrators can manage the bookstore.

Features:
Book Management: Administrators can add, edit, and delete books.
Category Management: Administrators can add, edit, and delete book categories.
Order Management: Administrators can view orders placed by users.
User Management: Administrators can manage user accounts and assign roles.
Home Page
On the home page, users can browse products and search for books. They can also filter books by price range and category. Products are displayed in card form, with quick links to view product details.

Core Features
Add to Cart: Users can add books to their cart. The cart is stored in cookies to ensure the data is not lost after page reloads.
Checkout: Users can proceed to the checkout form, where they fill out their contact information and finalize the order.
Filtering and Searching: Users can search for books by title and filter them by price range and category.
System Requirements
To run the application locally, your system must meet the following requirements:

Node.js (recommended version: 16.x+)
Yarn – Package manager
MongoDB – Database (local or remote)
Development and Collaboration
If you want to contribute to the development of the application, you can follow these steps:

Fork the repository – Create your own copy of the repository to work on.
Create a branch – Create a new branch (e.g., feature/new-feature) to work on your changes.
Make changes – Add new features or fix issues.
Create a pull request – Once you're done, create a pull request to merge your changes into the main branch.
