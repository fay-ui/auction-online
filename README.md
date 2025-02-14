# online-auction-house
Online Auction House
Welcome to the Online Auction House! This is a platform where users can list auction items, place bids, and manage their auction activities. The platform is built using Flask (for the backend) and React (for the frontend). Users can easily browse, create, and manage auction listings, as well as place bids on items.

Features
User Registration & Authentication: Sign up, login, and JWT-based authentication.
Create Auction Items: Sellers can create new auction items with titles, descriptions, and images.
Place Bids: Users can place bids on items, with real-time updates on bidding status.
CRUD Operations: Sellers can update and delete their auction items.
Image Upload: Items can be associated with images to make the listings more attractive.
Tech Stack
Frontend: React.js, Axios for API calls
Backend: Flask, SQLAlchemy for ORM
Authentication: JWT (JSON Web Tokens)
Database: SQLite (for local development)
File Storage: Local file system (for image uploads)
Installation
To get started with the project locally:

1. Clone the Repository
bash
Copy

2. Set Up Backend
Navigate to the backend/ directory.
Install the required dependencies:
bash
Copy
pip install -r requirements.txt
Set up your local database (SQLite):
bash
Copy
python setup_db.py
Run the Flask development server:
bash
Copy
flask run
3. Set Up Frontend
Navigate to the frontend/ directory.
Install the required dependencies:
bash
Copy
npm install
Run the React development server:
bash
Copy
npm start
The frontend will be available at http://localhost:3000 and the backend will be running on http://localhost:5000.

Live Demo
You can try the live demo of the Online Auction House below:

Live Demo Link:



Contribution
Feel free to fork this repository and submit pull requests. Contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.
