# 🚀 IMAGIFY

**Imagify** is an AI-powered SaaS image generator that provides smart tools for image manipulation using modern web technologies and AI APIs.

---

## 🌐 Live Demo

👉 [Imagify Live](https://imagify-omega-three.vercel.app)

---

## 🖼️ Screenshots
![Home Page](https://github.com/Arijit-mondal099/imagify/blob/main/frontend/public/screenshots/home.png)
![Image Editor](https://github.com/Arijit-mondal099/imagify/blob/main/frontend/public/screenshots/imageOne.png)
![Batch Processing](https://github.com/Arijit-mondal099/imagify/blob/main/frontend/public/screenshots/imageTwo.png)

---

## 🛠️ Tech Stack

**Backend:**

- **Node.js**: Runs the backend server and handles API requests.
- **Express.js**: Provides routing and middleware for building RESTful APIs.
- **MongoDB**: Stores user data, images, and processing history.
- **Razorpay**: Manages payment processing for subscriptions and purchases.
- **Bcrypt**: Secures user passwords through hashing and authentication.
- **ClipDrop API**: Powers AI-based image manipulation features.
- **Axios**: Facilitates HTTP requests between frontend and backend services.

**Frontend:**

- **React.js**: Builds interactive user interfaces and manages application state.
- **Tailwind CSS**: Provides utility-first CSS for rapid UI development.
- **TensorFlow.js**: Enables client-side AI-powered image processing.
- **Framer Motion**: Adds smooth animations and transitions to the UI.
- **Axios**: Handles HTTP requests between frontend and backend.

---

## ✨ Features

- 🔄 Image resizing and cropping
- 🖼️ Format conversion (JPEG, PNG, etc.)
- 📂 Batch processing of multiple images
- 🎨 Custom filters and effects
- 💳 Razorpay-based payment integration
- 🔒 Secure user authentication

---

## 🚀 Installation

```bash
git clone https://github.com/Arijit-mondal099/imagify.git
cd frontend
npm install

cd ../backend
npm install

cd frontend
npm run dev

cd backend
npm run dev
```

## Environment Variables

```bash
# backend
PORT = 4000
MONGODB_URI = "***"
JWT_SECRET = "***"
CLIPDROP_API_KEY = "***"
CLIPDROP_API = "***"
RAZORPAY_KEY_ID = "***"
RAZORPAY_SECRET_KEY = "***"
CURRENCY = "INR"

# frontend
VITE_SERVER_URL = "http://localhost:4000"
VITE_RAZORPAY_KEY_ID = ""
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

Made with ❤️ by Arijit Mondal
Email: arijitm717@gmail.com
