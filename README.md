# DevConnect - A Mini Social Media Platform for Developers

![DevConnectLogo](https://github.com/user-attachments/assets/de4c2454-a8c9-41eb-a4fc-994f4499cd76)

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

DevConnect is a mini social media platform tailored for developers to connect, share updates, and engage with one another. This full-stack application features a robust backend built with Django and Django REST Framework (DRF) and a modern, responsive frontend developed using React and Vite. Authentication is secured with JWT tokens, ensuring a seamless and secure user experience.

The platform enables developers to create profiles, post updates (with text and images), follow/unfollow other users, and interact with posts through fully functional likes, dislikes, comments, and a multiple-comment system—all working perfectly across both web and mobile app interfaces. Users can explore a global feed or a personalized "Following Feed," with real-time notifications enhancing engagement. This project showcases expertise in full-stack development, RESTful API design, and modern web development practices.

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
   - Fully functional like and dislike system for posts.
   - Robust comment system with support for multiple comments per post.
   - View and interact with comments beneath each post.

4. **Follow System**
   - Follow or unfollow other users seamlessly.
   - Access a "Following Feed" showing posts from followed users.

5. **Notifications** *(Optional Stretch Goal - Implemented)*
   - Receive real-time notifications for likes, dislikes, comments, and new followers.

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
  - MySQL (Database)
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
- MySQL installed and running
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
   *Note*: Ensure `mysqlclient` is included in `requirements.txt` for MySQL support. If not, install it with:
   ```bash
   pip install mysqlclient
   ```

4. **Set Up MySQL Database**
   - Create a MySQL database named `devconnect_db`:
     ```sql
     CREATE DATABASE devconnect_db;
     ```
   - Update the `DATABASES` configuration in `settings.py`:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.mysql',
             'NAME': 'devconnect_db',
             'USER': 'your_mysql_user',
             'PASSWORD': 'your_mysql_password',
             'HOST': 'localhost',
             'PORT': '3306',
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
| `/posts/<id>/dislike/`  | POST   | Dislike a post                 | Yes            |
| `/follow/<id>/`         | POST   | Follow a user                  | Yes            |
| `/unfollow/<id>/`       | POST   | Unfollow a user                | Yes            |
| `/search/`              | GET    | Search posts or users          | Yes            |

For a full list, refer to the DRF browsable API at `http://localhost:8000/api/`.

---

## Screenshots

*(Screenshots showcase the platform’s fully functional features across web and mobile app interfaces.)*

1. **Login Page**  
   *Web Page:*  
   ![Login Page](https://github.com/user-attachments/assets/88ab90bb-e9c7-40e3-8f12-d3d9a08dd8e4)  
   *App Screen:*  
   ![Login Page](https://github.com/user-attachments/assets/2059ef33-3bd6-4525-b5b2-b7e024540ef5)  
   - *Description*: Secure JWT-based login for seamless access.

2. **Signup Page**  
   *Web Page:*  
   ![Signup Page](https://github.com/user-attachments/assets/599fe063-ec61-4bd1-a828-a631bcd0a699)  
   *App Screen:*  
   ![Signup Page](https://github.com/user-attachments/assets/a58adf54-66b5-4f7f-8168-82b1d8a47207)  
   - *Description*: Easy signup process to join the developer community.

3. **Home Page (Global Feed)**  
   *Web Page:*  
   ![Global Feed](https://github.com/user-attachments/assets/006738bb-460f-40a2-b02c-99fb1ea3df4f)  
   *App Screen:*  
   ![Global Feed](https://github.com/user-attachments/assets/de799581-93df-4883-8e7d-2861f28a5ae2)  
   - *Description*: Displays all posts with like, dislike, and comment options fully functional.

4. **User Profile**  
   *Web Page:*  
   ![User Profile](https://github.com/user-attachments/assets/ca820c72-4218-4c70-8263-a95ef733809a)  
   *App Screen:*  
   ![User Profile](https://github.com/user-attachments/assets/2caa035a-f20a-4470-91e7-57d3583c3853)  
   - *Description*: Edit your profile and view your posts; follow/unfollow functionality available.

5. **All Users Post Page**  
   *Web Page:*  
   ![All Users Post Page](https://github.com/user-attachments/assets/d08ed243-3d7e-4b49-b909-8721d1075f57)  
   *App Screen:*  
   ![All Users Post Page](https://github.com/user-attachments/assets/9bdc3b1b-cccd-429e-aa20-792230ca5857)  
   - *Description*: Browse all posts with like, dislike, and multiple-comment system working perfectly.

6. **My Post Page**  
   *Web Page:*  
   ![My Post Page](https://github.com/user-attachments/assets/40c68de5-5337-4c3c-8d9c-a0811322c378)  
   *App Screen:*  
   ![My Post Page](https://github.com/user-attachments/assets/2109dba5-aec3-4aec-93d2-a94d382f62f6)  
   - *Description*: Manage your posts with edit/delete options and view interactions (likes, dislikes, comments).

7. **Other User's Profile**  
   *Web Page:*  
   ![Other User's Profile](https://github.com/user-attachments/assets/b98ba8e2-633e-4bf8-b4ed-7060ea05fe0c)  
   *App Screen:*  
   ![Other User's Profile](https://github.com/user-attachments/assets/0667b5e1-7b02-4005-9803-ad2a5bb664d0)  
   - *Description*: View others’ profiles and follow/unfollow them effortlessly.

8. **Comment Page For Posts**  
   *Web Page:*  
   ![Comment Page For Posts](https://github.com/user-attachments/assets/e899d583-7df5-43a1-8333-df2a95f3b0c8)  
   *App Screen:*  
   ![Comment Page For Posts](https://github.com/user-attachments/assets/c009bd6d-ca2e-4400-9af6-1899a2e4f02f)  
   - *Description*: Fully functional comment system supporting multiple comments per post.

9. **Add/Create Post Page**  
   *Web Page:*  
   ![Add/Create Post Page](https://github.com/user-attachments/assets/788ce22a-c94d-4da8-97ec-c771cee153fb)  
   *App Screen:*  
   ![Add/Create Post Page](https://github.com/user-attachments/assets/9f57ae08-bc51-4d10-aaf5-6c8442923c7d)  
   - *Description*: Create posts with text and images, ready for interactions.

10. **Side Bar**  
    *Web Page:*  
    ![Side Bar](https://github.com/user-attachments/assets/f9bbb759-b42b-475c-bd0c-02d8b51a354e)  
    *App Screen:*  
    ![Side Bar](https://github.com/user-attachments/assets/4f609b45-d1ac-43ba-8e96-e255b5cc0332)  
    - *Description*: Navigate easily with access to all features, including notifications for likes, dislikes, and comments.

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
