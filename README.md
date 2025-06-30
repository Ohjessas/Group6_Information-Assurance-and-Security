# Group6_Information-Assurance-and-Security
M3 SUMMATIVE
# G! - Secure Login System with 2FA Authentication 🔐

A secure authentication system built using **Node.js**, **Express**, **PostgreSQL**, and **React Native (Expo)**. This project supports **email-based One-Time Password (OTP)** verification for two-factor authentication (2FA).

---

## 📁 Project Structure
JessNew/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── index.js
│ ├── db.js
│ └── .env
└── MySecureApp/
├── App.js
├── screens/
│ ├── LoginScreen.js
│ ├── OTPScreen.js
└── api.js


---

## ⚙️ Backend Setup (Node.js + Express + PostgreSQL)

### 1. 📦 Install Dependencies

bash
cd backend
npm install

2. 🧪 Configure Environment Variables
Create a .env file inside the backend/ folder:

PORT=5000
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

⚠️ Make sure your PostgreSQL is running and the database exists.

3. 🔌 Start the Backend Server
npm start
The backend will run on:

http://localhost:5000
📱 Frontend Setup (React Native with Expo)

1. 📦 Install Expo CLI
npm install -g expo-cli
2. ▶️ Start the React Native App
cd MySecureApp
npm install
expo start
Scan the QR code using your Expo Go app on your mobile device or run on the iOS simulator (for Mac users).

🔑 Features

✅ Secure Login with email
🔐 OTP Generation & Email Verification
🧠 JWT-based session management
🔄 OTP Resend feature
🕒 5-minute OTP expiry window
📱 Clean UI with centered OTP input boxes
🔧 API Endpoints

Method	Endpoint	Description
POST	/login	Initiates login & sends OTP
POST	/verify-otp	Verifies OTP & logs in
✍️ Developer Notes

Make sure your phone and laptop are on the same Wi-Fi when using Expo Go.
OTP delivery may require you to enable "less secure apps" or use app passwords for Gmail SMTP.
Adjust CORS if you deploy the backend separately.
