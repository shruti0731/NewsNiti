# 📖 **NewsNiti – Smart News Aggregator Website**

**NewsNiti** is an intelligent, full-stack news aggregation platform that curates and summarizes the latest news from multiple trusted sources in real-time. It combines web scraping, news APIs, AI-powered summarization and a modern user interface to deliver a seamless reading experience.

Live Demo (link): 

---

## 🚀 **Project Overview**
NewsNiti automatically fetches trending and category-wise news articles from various sources, summarizes them using NLP techniques and presents them in a clean, interactive UI.  
Users can explore top headlines, browse by country or topic, save articles for later, add notes and personalize their profile dashboard.

---

## 🧠 **Key Features**

### 📰 **1. Real-Time News Aggregation**
- Fetches live news articles from trusted news API.
- Supports categories like **Technology, Sports, Politics, Business, Entertainment, and Health**.
- Country-wise filtering (e.g., India, US, UK, etc.).

### 🤖 **2. AI-Powered Summarization**
- Uses an NLP summarizer module to generate short and readable summaries.
- Helps users get the gist of an article instantly.

### 🌐 **3. Web Scraping Integration**
- Extracts fresh articles and updates from various news sources using **Cheerio** and **Axios**.

### 👤 **4. User Authentication & Profiles**
- Secure login and registration using **JWT** and **bcrypt**.
- Personalized dashboard with saved articles, notes and alerts.
- Dynamic counters to track user activity (saved items, notes, alerts).

### 💾 **5. User-Friendly Features**
- **Save articles** for later reading.
- **Add personal notes** on any article.
- **Manage alerts** to stay informed on preferred topics.

### 🎨 **6. Modern & Responsive UI**
- Built with **React.js** and **Tailwind CSS**.
- Clean color palette with improved accessibility.
- Smooth animations, icons and hover effects.
- Fully responsive across devices (desktop, tablet, mobile).

### 🧰 **7. Admin / Developer Tools**
- Easily configurable API keys and endpoints.
- Centralized environment configuration via `.env`.
- Sanitize and validate all inputs for security.

---

## 🏗️ **Tech Stack**

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **APIs / Tools** | Axios, Cheerio, sanitize-html |
| **Authentication** | JWT, bcrypt.js |
| **Summarization** | Custom text summarizer (NLP-based) |
| **Hosting** | GitHub / Netlify |

---

## ⚙️ **Setup Instructions**

### 1. Clone the repository
```bash
git clone https://github.com/shruti0731/NewsNiti.git
cd NewsNiti
```

### 2. Install dependencies
```bash
npm install
cd client
npm install
```

### 3. Create a `.env` file in the root folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
PORT=5000
```

### 4. Run the backend
```bash
npm start
```

### 5. Run the frontend
```bash
cd client
npm start
```

Visit 👉 **http://localhost:3000**

---

## 🧩 **Folder Structure**

```
NewsNiti/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Home, Profile, Login, etc.
│   │   └── styles/         # Tailwind + custom styles
│
├── server/ or root files   # Express backend
│   ├── summariser.js       # Text summarization logic
│   ├── routes/             # API routes
│   ├── models/             # Mongoose schemas
│   └── index.js            # App entry point
│
├── package.json
└── README.md
```

---

## 🔐 **Security Highlights**
- Sanitized HTML content to prevent XSS attacks.
- JWT-based authentication for secure user sessions.
- Encrypted passwords using bcrypt.

---

## 💡 **Future Enhancements**
- Multi-language translation.
- AI recommendation system for personalized feeds.

---

## 👩‍💻 **Author**
**Shruti Chavan**  
