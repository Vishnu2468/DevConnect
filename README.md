# DevConnect - A Mini Social Media Platform for Developers

![DevConnect Logo](![DevConnectLogo](https://github.com/user-attachments/assets/de4c2454-a8c9-41eb-a4fc-994f4499cd76)) <!-- Replace with your actual logo/image if available -->

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Project Overview

DevConnect is a mini social media platform designed specifically for developers to connect, share updates, and interact with one another. Built as a final project for MHCognition, this full-stack application combines a robust backend powered by Django and Django REST Framework (DRF) with a modern, responsive frontend crafted using React and Vite. Authentication is secured with JWT tokens, ensuring a seamless and secure user experience.

The platform allows developers to create profiles, post updates, follow other users, interact with posts via likes and comments, and explore a global or personalized feed. Optional stretch goals like notifications and image uploads have been implemented to enhance functionality.

This project demonstrates proficiency in full-stack development, RESTful API design, and modern web development practices.

---

## Key Features

1. **User Profiles**
   - Create and edit profiles with username, bio, and profile picture.
   - View public profiles of other users.

2. **Posts**
   - Create posts with text and optional images.
   - View posts on a global timeline (public feed).
   - Edit or delete your own posts.
   - Access a "My Posts" page to see all your posts.

3. **Interactions**
   - Like and comment on posts.
   - View comments beneath each post.

4. **Follow System**
   - Follow or unfollow other users.
   - Access a "Following Feed" showing posts from followed users.

5. **Notifications** *(Optional Stretch Goal - Implemented)*
   - Receive real-time notifications for likes, comments, and new followers.

6. **Search**
   - Search for posts or users via a search bar.

7. **Authentication**
   - Secure login/signup with JWT-based authentication.
   - Password reset functionality for account recovery.

---

## Technologies Used

- **Frontend:**
  - React (with Vite for fast development and builds)
  - Tailwind CSS (or Bootstrap/MUI, depending on your choice) for styling
- **Backend:**
  - Django
  - Django REST Framework (DRF)
  - PostgreSQL (Database)
- **Authentication:**
  - JWT (via SimpleJWT)
- **Tools:**
  - Git & GitHub for version control
  - npm/yarn for frontend package management
  - pip for Python dependencies

---

## Installation

Follow these steps to set up and run DevConnect locally.

### Prerequisites
- Python 3.8+ installed
- Node.js 18+ and npm/yarn installed
- PostgreSQL installed and running
- Git installed

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/devconnect.git
   cd devconnect/backend
   ```

2. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up PostgreSQL Database**
   - Create a PostgreSQL database named `devconnect_db`.
   - Update the `DATABASES` configuration in `settings.py`:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'devconnect_db',
             'USER': 'your_postgres_user',
             'PASSWORD': 'your_postgres_password',
             'HOST': 'localhost',
             'PORT': '5432',
         }
     }
     ```

5. **Apply Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a Superuser (Optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the Backend Server**
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install  # or yarn install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the `frontend` directory:
     ```
     VITE_API_URL=http://localhost:8000/api/
     ```

4. **Run the Frontend**
   ```bash
   npm run dev  # or yarn dev
   ```
   The frontend will be available at `http://localhost:5173` (default Vite port).

---

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new account or log in with existing credentials.
3. Create your profile, start posting, follow other users, and explore the platform!
4. Use the search bar to find posts or users.
5. Check notifications for updates on your activity.

---

## Project Structure

```
devconnect/
├── backend/
│   ├── devconnect/         # Django project settings and URLs
│   ├── users/             # User model and profile management
│   ├── posts/             # Post creation, editing, and interactions
│   ├── follows/           # Follow/unfollow logic
│   ├── notifications/     # Notification system (optional)
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-level components (e.g., Profile, Feed)
│   │   ├── api/           # API call utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## API Endpoints

Here are some key API endpoints implemented in the backend (served at `http://localhost:8000/api/`):

| Endpoint                | Method | Description                     | Authentication |
|-------------------------|--------|---------------------------------|----------------|
| `/auth/register/`       | POST   | Register a new user            | No             |
| `/auth/login/`          | POST   | Log in and get JWT tokens      | No             |
| `/auth/password/reset/` | POST   | Request password reset         | No             |
| `/profiles/`            | GET    | List all profiles              | Yes            |
| `/profiles/<id>/`       | GET    | View a specific profile        | Yes            |
| `/posts/`               | GET    | List all posts (global feed)   | Yes            |
| `/posts/`               | POST   | Create a new post              | Yes            |
| `/posts/<id>/`          | PUT    | Edit a post                    | Yes (Owner)    |
| `/posts/<id>/like/`     | POST   | Like a post                    | Yes            |
| `/follow/<id>/`         | POST   | Follow a user                  | Yes            |
| `/search/`              | GET    | Search posts or users          | Yes            |

For a full list, refer to the DRF browsable API at `http://localhost:8000/api/`.

---

## Screenshots

*(Add screenshots of your project here for better visualization. Below are placeholders.)*

1. **Home Page (Global Feed)**  
   ![Global Feed](https://via.placeholder.com/600x300)

2. **User Profile**  
   ![User Profile](https://via.placeholder.com/600x300)

3. **Following Feed**  
   ![Following Feed](https://via.placeholder.com/600x300)

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- MHCognition for providing the project guidelines and inspiration.
- The Django, React, and PostgreSQL communities for their amazing documentation and tools.
- xAI for creating Grok, which assisted in drafting this README!

---
