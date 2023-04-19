
# PetMatch.es

**"Bringing forever homes and loving pets together"**.

PetMatch.es is a platform that unites forever homes and loving pets. A pet adoption platform that allows users to search for available pets for adoption and connect with local shelters or rescue organizations.

> _"To connect one million homeless pets with loving forever homes through PetMatch." (BHAG)_

This platform encourages and facilitates pet adoption, connects potential adopters with animals in need, and provides them with the support and resources necessary to ensure successful adoption.

Users of this platform, by adopting and/or contributing to the adoption of a pet, can make a significant difference in the lives of abandoned animals and contribute to improving the situation of pet abandonment in Spain.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

---
## API

Welcome to PetMatch API! Our API allows you to access and manage data from our platform using HTTP requests. This documentation will guide you through the available endpoints and their functionalities.

Our API is built with Node.js and uses Express.js as a framework. We use MySQL as our database management system.

To start using the API, you don't need to fork the project or install anything on your computer. You just need to know the base URL of our API, which is http://localhost:3000/api/v1/. From there, you can start making HTTP requests to the available endpoints.

### Endpoints

Our API has the following endpoints:

- `GET /users`: Returns a list of all users in the platform
- `GET /users/:id`: Returns the user with the specified ID
- `POST /users`: Creates a new user
- `PUT /users/:id`: Updates the user with the specified ID
- `DELETE /users/:id`: Deletes the user with the specified ID

All these endpoints can be accessed using HTTP requests to the base URL of our API (http://localhost:3000/api/v1/).

### Authentication

Some of the endpoints in our API require authentication. To authenticate, you need to send an HTTP POST request to the /auth/login endpoint with your email and password in the request body. If your credentials are correct, you will receive a JSON Web Token (JWT) in the response. You should include this token in the Authorization header of all subsequent requests to the authenticated endpoints.

### Error handling

Our API returns standard HTTP status codes for all requests. If an error occurs, the response will include an error message in the message property of the response body.

### API Documentation
To view the API documentation for this project, navigate to http://localhost:3000/api/v1/docs/ in your web browser. This documentation is generated automatically using the Swagger UI library and provides detailed information on each endpoint in the API.

The documentation includes information on each route, the expected request parameters, and the expected response format. It also provides examples of requests and responses to help you understand how to use the API.

To use the API documentation, simply navigate to the desired endpoint using the menu on the left-hand side of the page. You can then view the available operations for that endpoint, including GET, POST, PUT, DELETE, and others.

For each operation, the documentation provides detailed information on the expected request parameters, as well as any optional parameters and their expected values. It also provides information on the expected response format, including any errors that may occur and their associated error codes.

### Conclusion

We hope this introduction helps you get started with our API! For more detailed information on the available endpoints, please refer to the API documentation available at http://localhost:3000/api/v1/docs/. If you have any questions or issues, feel free to reach out to our support team.


---
## Getting started

To get started with the project, follow these steps:

1. Clone this repository to your local machine
1. Run npm install to install the project dependencies
1. Configure the database connection parameters in the .env file
1. Run npm run start to start the server

---
## Project structure

The project structure is organized as follows:

Sure, here is a description of each folder in your project structure:

- `/config`: This folder contains configuration files for your project. It typically includes files for environment variables, database configuration, and other settings specific to your project.

- `/controllers`: This folder contains the route handlers for the API routes. These controllers are responsible for handling the incoming requests, processing the data, and returning the appropriate response.

- `/database`: This folder contains connection files and other utilities for database management. It may include files for establishing a connection to your database, defining your database schema, and running database migrations.

- `/helpers`: This folder contains utility functions used throughout the project. These functions can be used to perform common tasks such as validation, data manipulation, and error handling.

- `/middlewares`: This folder contains middleware functions that can be used to modify or intercept incoming requests. Common use cases include authentication, logging, and rate limiting.

- `/models`: This folder contains the database models for the project. These models define the schema for your database tables and provide methods for querying and manipulating data.

- `/seeder`: This folder contains files for seeding your database with test data. This can be useful for testing your application in a realistic environment.

- `/services`: This folder contains business logic for your application. It may include files for sending emails, processing payments, or interacting with external APIs.

- `/tests`: This folder contains the test files for your project. These tests ensure that your application is functioning as expected and can help catch bugs before they make it into production.

- `/v1`: This folder contains the v1 API routes for your project. This is where you define the endpoints for your application and map them to the appropriate controllers.

- `index.js`: This is the main entry point for your project. It typically includes the code to start your server, establish your database connection, and configure any middleware or other settings required by your application.

---
## How to contribute to the code base

Contributions to the project are welcome and appreciated! Here's how you can contribute:

1. Fork the repository to your GitHub account.
1. Clone your forked repository to your local machine.
1. Create a new branch for your changes: git checkout -b feature/your-feature-name.
1. Make your changes to the code and commit them: git commit -am 'Add your commit message here'.
1. Push your changes to your forked repository: git push origin feature/your-feature-name.
1. Create a pull request from your forked repository to the main repository.

Please ensure that your code adheres to the project's coding standards and passes all tests before submitting a pull request. Also, please make sure to include a clear description of your changes in the pull request.

### Contributing Guidelines

Thank you for considering contributing to this project! Before making a contribution, please read and follow the guidelines detailed in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

---

## Acknowledgments

[Insert any acknowledgments, if applicable]

## Author
Auth0

## License

This project is licensed under the MIT license. See the LICENSE.md file for details.
