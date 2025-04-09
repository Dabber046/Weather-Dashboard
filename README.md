🌦 Weather Dashboard
A single-page web application that allows users to search for the current weather and a 5-day forecast by city. The application uses the OpenWeather API and stores search history on the backend, enabling users to view and delete previously searched cities.

 Live Features
 Search any city and view real-time weather data

🌡 See current weather conditions with icon, temp, wind, and humidity

 5-day forecast displayed in clean, styled cards

 Search history stored and displayed — with delete support

 Powered by Node.js, Express, and OpenWeather API

 Fully browser-based — no front-end framework required

 Project Structure
bash
Copy
Edit
weather-dashboard/
├── public/                 # Static frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/                 # Node + Express backend
│   ├── server.js
│   ├── routes/
│   └── service/
├── db/
│   └── db.json             # Stores searched cities
├── .env                    # Stores API key securely
└── README.md
🔧 Setup Instructions
Clone the project and install dependencies:

bash
Copy
Edit
cd server
npm install
Get your OpenWeather API Key:
Sign up at openweathermap.org/api

Create a .env file in the /server directory:

ini
Copy
Edit
OPENWEATHER_API_KEY=your_api_key_here
Run the app:

bash
Copy
Edit
npm run dev
Open your browser:

arduino
Copy
Edit
http://localhost:3000
 Technology Stack
Frontend: HTML5, CSS3, JavaScript (Vanilla)

Backend: Node.js, Express

API: OpenWeather 5-Day Forecast

Storage: JSON-based file (db.json)

Dev Tools: nodemon, dotenv

 Screenshot
Include a screenshot of your app here (if deployed or locally hosted):

scss
Copy
Edit
![Weather Dashboard Screenshot](screenshot.png)
 Future Improvements
Auto-detect user location

Theme switcher (dark/light mode)

Responsive design for mobile devices

LocalStorage backup in browser

 Author
Jared Mindock
 jjmin94@gmail.com
