# Picsum Image Gallery

A **React application** that fetches and displays photos from the [Lorem Picsum API](https://picsum.photos/).  
It features **infinite scrolling** and allows users to view detailed information for each photo.

---

## Live Demo (click to open the site)
🔗 [View on Vercel](https://csc13114-ia02-22120443.vercel.app/)

---

## Features
- Fetch and display photos from Lorem Picsum  
- Infinite scroll with automatic pagination  
- View full photo details on click (author, title, description)  
- Responsive layout using **Tailwind CSS**  
- Routing with **React Router**  
- Organized, reusable component structure  

---

## Tech Stack

| Category           | Tool / Library       |
|--------------------|----------------------|
| Frontend Framework | React                |
| Routing            | React Router DOM     |
| Styling            | Tailwind CSS         |
| API Source         | Lorem Picsum API     |
| State Management   | React Hooks          |

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/tlavu2004/csc13114-ia02.git
cd csc13114-ia02
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

App will start on http://localhost:5173

---

## Project Structure
```
csc13114-ia02/
├── public/
│ └── vite.svg                      # App (Vite) icon
│
├── src/
│ ├── api/
│ │ ├── http.js                     # Axios instance for HTTP requests
│ │ └── picsum.js                   # API wrapper for fetching Picsum data
│ ├── assets/
│ │ └── react.svg                   # React.js icon
│ │
│ ├── components/
│ │ ├── HeaderActionsContext.jsx    # Context for header actions
│ │ ├── Layout.jsx                  # Global layout wrapper
│ │ ├── ImageCard.jsx               # Single photo card
│ │ ├── ImageList.jsx               # Photo grid with infinite scroll
│ │ └── ImageDetails.jsx            # Detailed photo view
│ │
│ ├── hooks/
│ │ ├── usePicsumImages.js          # Custom hook: fetch & paginate API
│ │ └── useInfiniteScroll.js        # Custom hook: intersection observer logic
│ │
│ ├── App.jsx                       # Root component with routing
│ ├── App.css                       # Global styles (custom overrides)
│ ├── index.css                     # Tailwind base + utilities
│ └── main.jsx                      # App entry point
│
├── .gitignore                      # Files/folders to ignore in Git
├── DESCRIPTION.md                  # Assignment specification (project brief)
├── eslint.config.js                # ESLint configuration for code linting
├── index.html                      # HTML entry point loaded by Vite
├── package-lock.json               # Locked dependency versions
├── package.json                    # Project dependencies and scripts
├── README.md                       # Project documentation and setup guide
└── vite.config.js                  # Vite build and dev server configuration
```

---

## API Endpoints

- List photos: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- Photo details: `https://picsum.photos/id/{id}/info`

---

## Notes

- Fully responsive for desktop and mobile.
- Handles loading, errors, and end-of-list gracefully.
- Built as part of the assignment: “CSC13114 - IA02 - Photo gallery”

---

## Author

- [Trương Lê Anh Vũ - 22120443](https://github.com/tlavu2004/)
