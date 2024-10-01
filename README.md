
---

# Book Management System

This project is a **Book Management System** consisting of a backend API built with **PHP Laravel** and a frontend application developed with **Angular**. The system provides functionalities for authors to manage their books, admins to oversee authors, and visitors to search for books without logging in.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Role-Based Access Control](#role-based-access-control)
- [License](#license)

## Features

### Backend (API)

- Author registration and authentication via OAuth2 (Laravel Passport).
- CRUD operations for books (add, update, delete, list).
- Admin functionality to manage authors (activate/deactivate) and books.
- Public access to search books without login.
- Role-based access control to restrict functionalities based on user roles.

### Frontend

- User-friendly interface for authors and admins.
- Responsive design for different screen sizes.
- Registration and login forms for authors.
- Book management dashboard for authors.
- Admin dashboard for managing authors and books.
- Public book search functionality.

## Technologies Used

### Backend

- **PHP** (Laravel Framework)
- **OAuth2** (Laravel Passport)
- **MySQL/PostgreSQL** for database
- **Git** for version control

### Frontend

- **Angular** (Version 17)
- **HTML/CSS/TypeScript** for frontend development
- **Angular Services** for API communication

## Installation

### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/your-username/book-management-system-backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   composer install
   ```

4. Set up your `.env` file:

   ```bash
   cp .env.example .env
   ```

   Configure the database connection and other environment variables.

5. Generate the application key:

   ```bash
   php artisan key:generate
   ```

6. Migrate the database:

   ```bash
   php artisan migrate
   ```

7. Seed the database with initial data (To Create An Admin):

   ```bash
   php artisan db:seed
   ```

8. Install and configure Laravel Passport for OAuth2:

   ```bash
   php artisan passport:install
   ```

9. Start the development server:

   ```bash
   php artisan serve
   ```

### Frontend

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/your-username/book-management-system-frontend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Update the `src/environments/environment.ts` file with the API URL:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

5. Serve the application:

   ```bash
   ng serve
   ```

6. Open the application in your browser:

   ```bash
   http://localhost:4200
   ```

## Environment Variables

For the backend, ensure to update the following in your `.env` file:

- `DB_CONNECTION=mysql` or `pgsql`
- `DB_DATABASE=your_database`
- `DB_USERNAME=your_username`
- `DB_PASSWORD=your_password`

## API Endpoints

### Authentication

- `POST /api/register` - Register a new author
- `POST /api/login` - Login and obtain an access token

### Authors

- `GET /api/authors` - List all authors (admin only)
- `PUT /api/authors/{id}/status` - Update author status (admin only)

### Books

- `GET /api/books` - List all books (public)
- `POST /api/books` - Add a new book (author only)
- `PUT /api/books/{id}` - Update book details (author only)
- `DELETE /api/books/{id}` - Delete a book (author only)

## Project Structure

### Backend

```
book-management-system-backend/
 ├── app/
 ├── config/
 ├── database/
 ├── routes/
 └── .env
```

### Frontend

```
book-management-system-frontend/
 ├── src/
 │   ├── app/
 │   ├── environments/
 │   ├── assets/
 │   └── index.html
 └── package.json
```

## Usage

### Backend

- Run the backend server and ensure the database is migrated and seeded.
- Use tools like Postman to test the API endpoints.

### Frontend

- Run the frontend application to access the user interface.
- Authors can register and log in to add their books.
- Admins can log in to manage author status and view books.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
