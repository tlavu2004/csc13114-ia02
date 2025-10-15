# Picsum Image Gallery

## Objective
Build a **React application** that fetches and displays photos from the [Lorem Picsum API](https://picsum.photos/).  
Users can scroll infinitely to load more photos, and click on any photo to view its detailed information (full-size image, author, and description).

---

## Features & Requirements

### 1. Display a Grid/List of Photos
- Fetch a list of photos from `https://picsum.photos/` using their **public API**.  
- Display photos in a **responsive grid** layout.  
- Each photo card shows:
  - A **thumbnail image**.
  - The **author’s name**.

### 2. Infinite Scroll (Scroll to Load More)
- As the user scrolls down, automatically load more photos from the API.  
- Use the `page` parameter from the API to fetch additional pages.  
- Display a **loading indicator** while fetching new photos.  
- Handle the **end of the list** gracefully when there are no more photos to load.

### 3. View Photo Details on Click
- When a photo is clicked, navigate to a **detailed view** of that specific photo.  
- The detail page displays:
  - The **full-size image**.
  - The **photo title** (or placeholder text if unavailable).
  - The **author’s name**.
  - A **description** (or placeholder text if unavailable).

### 4. Navigation and Routing
- Implement routing with **React Router**.  
- Define intuitive URLs:
  - `/photos` → for the gallery view.
  - `/photos/:id` → for individual photo details.  
- Ensure smooth navigation between list and detail views.

### 5. API Integration
- Use the official **Lorem Picsum API** endpoints:
  - List photos: `https://picsum.photos/v2/list?page={page}&limit={limit}`
  - Individual photo: `https://picsum.photos/id/{id}/info`
- Handle all **loading**, **error**, and **empty state** scenarios clearly and gracefully.

### 6. Styling and Responsiveness
- Use **Tailwind CSS** for layout and responsive design.
- The app should work smoothly across **desktop, tablet, and mobile** screens.
- Maintain a **clean and minimal UI**, emphasizing functionality over visual complexity.

---

## Architecture Overview

**Main components:**
- `ImageList.jsx` — Displays the photo grid with infinite scroll.
- `ImageCard.jsx` — Reusable photo card component.
- `ImageDetails.jsx` — Shows the full photo and detailed info.
- `usePicsumImages.js` — Custom hook for API fetching with pagination.
- `useInfiniteScroll.js` — Custom hook using `IntersectionObserver` for infinite scrolling.

**Routing:**
- `/photos` -> Photo grid view  
- `/photos/:id` -> Detailed photo view

---

## Tech Stack

| Category           | Tool / Library                            |
|--------------------|-------------------------------------------|
| Frontend Framework | React                                     |
| Routing            | React Router DOM                          |
| Styling            | Tailwind CSS                              |
| API                | Lorem Picsum                              |
| State & Effects    | React Hooks (useState, useEffect, useRef) |

---

## Rubric (Grading Criteria)

| Criteria                     | Description                                                                      | Points |
|------------------------------|----------------------------------------------------------------------------------|--------|
| API Integration          | Successfully fetches data from Lorem Picsum API, handles loading & error states. | 1      |
| Photo Grid/List          | Displays photos in a responsive, well-styled grid/list with author info.         | 2      |
| Infinite Scroll          | Infinite scroll works smoothly with clear loading indicators.                    | 1      |
| Photo Details            | Displays full photo, title, author, description; good UX.                        | 2      |
| Routing & Navigation     | URLs are intuitive and functional.                                               | 1      |
| Styling & Responsiveness | Fully responsive design with clean UI.                                           | 1      |
| Code Quality             | Organized, reusable components, comments, React best practices.                  | 1      |
| Public Hosting           | Deployed to a public hosting service.                                            | 1      |
| Total                    |                                                                                  | 10 |

---

## Deployment
This project can be deployed on (click to open the site):
- [Vercel](https://csc13114-ia02-22120443.vercel.app/)

---

## Summary
This project demonstrates:
- API integration and data fetching in React.
- Infinite scroll using the `IntersectionObserver` API.
- Dynamic routing with React Router.
- Responsive UI design using Tailwind CSS.
- Clean, maintainable React component structure.

---
*Developed by [Trương Lê Anh Vũ - 22120443](https://github.com/tlavu2004/)*  
*For the assignment: “CSC13114 - IA02 - Photo gallery”*
