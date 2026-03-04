# 🎤 AI Voice Todo App

A smart **voice-enabled Todo application** that allows users to manage tasks using both **text input and voice commands**.
The application integrates **speech recognition and AI task extraction** to provide a faster and more natural way to manage daily tasks.

---

## 🚀 Features

* ➕ Add tasks manually
* 🎤 Add tasks using **voice input**
* 🤖 AI-powered task extraction using **OpenAI API**
* ✔ Mark tasks as **done using voice commands**
* 🗑 Delete specific tasks using **voice commands**
* 🧹 Delete all tasks
* 💾 Save tasks using **LocalStorage**
* 📱 Clean and simple user interface

---

## 🗣 Voice Commands

You can control the application completely using voice.

### ➕ Add Tasks

Examples:

buy milk
buy rice
buy sugar

### ✔ Mark Task as Done

Examples:

milk done
rice done
sugar done

### 🗑 Delete Task

Examples:

delete milk
delete rice
delete sugar

### 🧹 Delete All Tasks

delete all

### 💾 Save Tasks

save

---

## 🛠 Tech Stack

Frontend:

* HTML
* CSS
* JavaScript
* Web Speech API (Speech Recognition)

Backend:

* Node.js
* Express.js
* OpenAI API

Storage:

* LocalStorage

---

## 📂 Project Structure

```
AI-Voice-Todo-App
│
├── public
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
│
├── server.js
├── package.json
├── README.md
└── .env
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/nandanrr/AI-Voice-Todo-App.git
```

Install dependencies:

```
npm install
```

Create `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

Run the server:

```
node server.js
```

Open in browser:

```
http://localhost:3000
```

---

## 🎯 Purpose of the Project

This project was built to explore the integration of **AI, voice recognition, and task management systems** to create a more convenient productivity tool.

---

## 👨‍💻 Author

Nandan R
