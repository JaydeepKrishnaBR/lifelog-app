
# 📓 LifeLog – Smart Visual Journal App

A modern, interactive journaling app that helps you log your mood, photos, personal notes, location, and even hand-drawn doodles — all from your browser. Built with React and powerful modern Web APIs, LifeLog gives you a clean, app-like experience with offline support and PDF export.

---

### ✨ Features

- 🧠 **Mood + Note Logging**  
  Quickly capture your thoughts and emotions in one place.

- 📍 **Geolocation Tracking**  
  Automatically tags your location and displays it on a map.

- 🎨 **Canvas Doodle Tool**  
  Draw visual thoughts and store them with your entries.

- 📸 **Selfie Camera**  
  Capture your daily look directly in the browser.

- 🧠 **Smart Offline Detection**  
  Alerts users when they're offline using the Network Info API.

- 👀 **Smooth UX with Intersection Observer**  
  Tips and UI sections fade in as you scroll.

- 📄 **Export to PDF**  
  Save or share entries as clean PDF pages.

- 💾 **Offline-First with localStorage**  
  Works without internet — entries are saved locally.

- 📲 **PWA Support**  
  Install on Android/iOS/Desktop like a native app.

---

### 🔧 Tech Stack

| Technology     | Purpose                           |
|----------------|------------------------------------|
| React          | UI Framework                      |
| Material UI    | Component Library (UI/UX)         |
| Leaflet + React-Leaflet | Interactive Maps        |
| Canvas API     | Doodle Drawing                    |
| Geolocation API| Track & tag user location         |
| MediaDevices API | Capture camera selfies         |
| Network Info API| Detect connection status         |
| Intersection Observer API | Animate on scroll    |
| jsPDF + html2canvas | Export entries to PDF        |
| localStorage   | Persist journal entries offline   |

---

### 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/lifelog-app.git
cd lifelog-app

# Install dependencies
npm install

# Start the app
npm start

