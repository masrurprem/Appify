# Appify: A Full Stack Social Media Application Project

##Appify is a simple social media application built with modern web technologies. It provides essential social features along with secure user authentication. The key functionalities include:
🔐 1. User Registration & Login
Users can create an account and securely log in to access the application.

🔑 2. JWT-based Authentication
After a successful login, the access token is generated and stored in localStorage for making authorized requests to protected routes.

A refresh token is issued and stored securely in HTTP-only cookies.

This setup ensures secure authentication and smooth token refresh cycles.

📝 3. Create Posts
Users can create posts that contain:

-Text content
-Optional image uploads

🌍 4. Global Feed
Any logged-in user can view posts created by all other users, not just their own.
This follows this simple requirement:

“All users can see posts from all other users.”

#Tools and Technology:
Backend: express js
Frontend: react js 
Database: mysql 
Database modeling: prisma ORM
Authentication: jwt 
Hashing: bcryptjs
