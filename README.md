# Animated Review Slider - React, Vite, JavaScript, Custom CSS, React Slick, Slick Carousel Fundamental Project 7

A **learning-focused React application** that demonstrates two ways to build an image slider: a **custom carousel** from scratch using React hooks, and a **library-based carousel** using React Slick. It is ideal for understanding state management, effects, event handling, and third-party library integration in React. You can try the live demo, clone the repo to run it locally, or reuse the components in your own projects.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-4.1-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React Slick](https://img.shields.io/badge/React%20Slick-0.29-8BC34A)](https://react-slick.neostack.com/)
[![react-icons](https://img.shields.io/badge/react--icons-4.7-21A2F2)](https://react-icons.github.io/react-icons/)

**Live Demo:** [https://slider-arnob.netlify.app/](https://slider-arnob.netlify.app/)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technologies Used](#technologies-used)
3. [Installation & How to Run](#installation--how-to-run)
4. [Environment Variables (.env)](#environment-variables-env)
5. [Project Walkthrough & Features](#project-walkthrough--features)
6. [Component Overview](#component-overview)
7. [Data Structure](#data-structure)
8. [How It Works – Functionality & Code](#how-it-works--functionality--code)
9. [Reusing Components in Other Projects](#reusing-components-in-other-projects)
10. [API, Backend & Routes](#api-backend--routes)
11. [Learning Points & Keywords](#learning-points--keywords)
12. [References & Links](#references--links)
13. [Conclusion](#conclusion)
14. [License](#license)

---

## Project Structure

```
07-slider/
├── index.html              # HTML entry; SEO meta and root div
├── package.json            # Dependencies and scripts (dev, build, preview, lint)
├── vite.config.js          # Vite configuration and React plugin
├── eslint.config.js        # ESLint flat config for React/JSX
├── public/
│   └── vite.svg            # Favicon and default OG image
└── src/
    ├── main.jsx            # React app mount and global CSS import
    ├── App.jsx             # Root component; renders Carousel (or SlickCarousel)
    ├── Carousel.jsx        # Custom carousel (useState, useEffect, useCallback)
    ├── SlickCarousel.jsx    # Carousel using react-slick
    ├── data.js             # Slide data: shortList, list, longList
    └── index.css           # Global styles and carousel/slick styles
```

- **index.html**: Entry HTML; contains meta tags for SEO and a single `<div id="root">` for the React app.
- **main.jsx**: Renders the app with `ReactDOM.createRoot` and imports global `index.css`.
- **App.jsx**: Decides which slider is shown (currently the custom `Carousel`; `SlickCarousel` can be enabled by uncommenting).
- **Carousel.jsx**: Custom slider with prev/next buttons and auto-advance using React state and effects.
- **SlickCarousel.jsx**: Same data displayed via the `react-slick` library with configurable options.
- **data.js**: Exports `shortList`, `list`, and `longList` (arrays of slide objects) for use in either carousel.
- **index.css**: Resets, CSS variables, layout, and styles for both carousels.

---

## Technologies Used

| Technology            | Purpose                                                        |
| --------------------- | -------------------------------------------------------------- |
| **React 18**          | UI components and state management                             |
| **Vite 4**            | Dev server, HMR, and production build                          |
| **JavaScript (ES6+)** | No TypeScript; modules, hooks, and modern syntax               |
| **react-slick**       | Library-based carousel with dots, arrows, autoplay             |
| **slick-carousel**    | Default CSS for react-slick                                    |
| **react-icons**       | Icons (e.g. `FaQuoteRight`, `FiChevronLeft`, `FiChevronRight`) |
| **ESLint**            | Linting for React and React Hooks (flat config)                |

There is **no backend or database**. All slide content is defined in `src/data.js`. The app is a single-page front-end only.

---

## Installation & How to Run

**Prerequisites:** Node.js (e.g. 18+) and npm (or yarn/pnpm).

1. **Clone the repository**

   ```bash
   git clone https://github.com/arnobt78/Slider--React-Fundamental-Project-7.git
   cd Slider--React-Fundamental-Project-7
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Then open the URL shown in the terminal (typically [http://localhost:5173](http://localhost:5173)).

4. **Other scripts**
   - `npm run build` – Production build (output in `dist/`).
   - `npm run preview` – Serve the production build locally.
   - `npm run lint` – Run ESLint on the project.

No environment variables are required to run or build the project.

---

## Environment Variables (.env)

This project **does not use any environment variables**. All configuration is in code (e.g. `data.js`, component state, and `react-slick` settings). There is no API base URL, no keys, and no server-side config.

If you later add features that need env vars (e.g. an API or analytics ID), you can use Vite’s env support:

1. **Create a `.env` file in the project root** (optional; this file is in `.gitignore`):

   ```env
   VITE_API_URL=https://api.example.com
   VITE_ANALYTICS_ID=your-id
   ```

2. **Naming:** Only variables prefixed with `VITE_` are exposed to the client. Use them in code as `import.meta.env.VITE_API_URL`, etc.

3. **Example:** For an optional API base URL you could add in `.env`:

   ```env
   VITE_APP_TITLE=Slide Image Display
   ```

   And in code: `const title = import.meta.env.VITE_APP_TITLE || 'Slider';`

4. **`.env.example` (optional):** You can add a `.env.example` with placeholder keys and document it in the README so others know which vars are optional for extended features. The current app runs without any `.env` file.

---

## Project Walkthrough & Features

### Custom Carousel (`Carousel.jsx`)

- **Data:** Uses `longList` from `data.js` (array of objects with `id`, `image`, `name`, `title`, `quote`).
- **State:** `useState` for the list and for the current slide index (`currentPerson`).
- **Navigation:** Previous/Next buttons call `prevSlide` / `nextSlide`, which update the index with wraparound (modulo).
- **Auto-advance:** `useEffect` runs a `setInterval` every 5 seconds to call `nextSlide`; cleanup clears the interval. `nextSlide` is memoized with `useCallback` so the effect dependency is stable.
- **Layout:** Each slide is absolutely positioned; the active slide is shown via `transform: translateX(...)`, `opacity`, and `visibility` based on index.
- **Accessibility:** Buttons are focusable and usable with keyboard.

### React Slick Carousel (`SlickCarousel.jsx`)

- **Data:** Uses `list` from `data.js` (fewer items; you can switch to `shortList` or `longList` if desired).
- **Configuration:** `react-slick` is configured with `dots`, `infinite`, `autoplay`, `pauseOnHover`, `slidesToShow: 2`, etc. All options are in the `settings` object.
- **Rendering:** `<Slider {...settings}>` wraps a `.map()` over the data; each item is an `<article>` with image, name, title, quote, and an icon.
- **Styling:** `slick-carousel` CSS is imported; project-specific overrides (e.g. arrow color) are in `index.css` under the slick section.

### Switching Between Carousels

In `App.jsx`, the custom carousel is shown by default. To use the Slick carousel instead, comment out `<Carousel />` and uncomment `<SlickCarousel />`. You can also render both in different sections or tabs if you extend the app.

---

## Component Overview

| Component         | File                | Role                                                                       |
| ----------------- | ------------------- | -------------------------------------------------------------------------- |
| **App**           | `App.jsx`           | Root; renders one of the carousels (or both if you change the JSX).        |
| **Carousel**      | `Carousel.jsx`      | Custom slider: state, prev/next, auto-advance, slide list from `longList`. |
| **SlickCarousel** | `SlickCarousel.jsx` | react-slick slider: `list` data and shared styling with Carousel.          |

There are **no routes** (no React Router). The app is a single page that mounts `App` into `#root`.

---

## Data Structure

Slide items are plain objects. All lists in `data.js` use the same shape:

```js
{
  id: number,       // Unique key for React
  image: string,   // Image URL (e.g. from course-api or your CDN)
  name: string,    // Person or item name
  title: string,   // Subtitle or role
  quote: string    // Short text (e.g. testimonial)
}
```

- **shortList**: 1 item (for quick tests).
- **list**: 4 items (used by `SlickCarousel.jsx`).
- **longList**: 8 items (used by `Carousel.jsx`).

You can add more fields (e.g. `link`, `avatar`) and use them in the same components as long as you keep `id` and the fields the components expect (`image`, `name`, `title`, `quote`).

---

## How It Works – Functionality & Code

### Custom carousel: state and navigation

```jsx
const [people] = useState(longList);
const [currentPerson, setCurrentPerson] = useState(0);

const nextSlide = useCallback(() => {
  setCurrentPerson((oldPerson) => (oldPerson + 1) % people.length);
}, [people.length]);

const prevSlide = () => {
  setCurrentPerson(
    (oldPerson) => (oldPerson - 1 + people.length) % people.length,
  );
};
```

- Index is updated with wraparound so the slider loops.
- `nextSlide` is wrapped in `useCallback` so it can be safely used inside `useEffect` for the timer.

### Auto-advance with cleanup

```jsx
useEffect(() => {
  const sliderId = setInterval(() => nextSlide(), 5000);
  return () => clearInterval(sliderId);
}, [nextSlide]);
```

- Every 5 seconds the next slide is shown. The cleanup function prevents multiple intervals if the component re-runs.

### Rendering the active slide (custom carousel)

Each slide is positioned with inline styles; only the active one is fully visible:

```jsx
{
  people.map((person, personIndex) => (
    <article
      key={person.id}
      className="slide"
      style={{
        transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
        opacity: personIndex === currentPerson ? 1 : 0,
        visibility: personIndex === currentPerson ? "visible" : "hidden",
      }}
    >
      <img src={person.image} alt={person.name} className="person-img" />
      <h5 className="name">{person.name}</h5>
      <p className="title">{person.title}</p>
      <p className="text">{person.quote}</p>
      <FaQuoteRight className="icon" />
    </article>
  ));
}
```

### React Slick configuration

```jsx
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: true,
};

return (
  <section className="slick-container">
    <Slider {...settings}>
      {list.map((person) => (
        <article key={person.id}>
          {/* same structure: image, name, title, quote, icon */}
        </article>
      ))}
    </Slider>
  </section>
);
```

You can change `slidesToShow`, `autoplaySpeed`, or add options like `fade: true` as needed.

---

## Reusing Components in Other Projects

1. **Copy components and data**
   - Copy `Carousel.jsx`, `SlickCarousel.jsx`, and `data.js` (or your own data file).
   - Ensure `react-slick` and `slick-carousel` are installed if you use `SlickCarousel`.
   - Install `react-icons` if you keep the quote/chevron icons.

2. **Custom carousel only (no react-slick)**
   - Copy `Carousel.jsx` and `data.js`.
   - Import your data array (same shape: `id`, `image`, `name`, `title`, `quote`).
   - Copy the relevant parts of `index.css` (e.g. `.slider-container`, `.slide`, `.prev`/`.next`, `.person-img`, etc.) into your project’s CSS.

3. **Slick carousel only**
   - Copy `SlickCarousel.jsx` and `data.js`.
   - Install: `npm install react-slick slick-carousel`.
   - Import slick CSS: `import 'slick-carousel/slick/slick.css'; import 'slick-carousel/slick/slick-theme.css';`
   - Copy the `.slick-container` and any overrides from `index.css`.

4. **Different data shape**
   - Keep `id` and the fields you need (e.g. `image`, `name`, `title`, `quote`). Rename or add fields in `data.js` and update the JSX in the component (e.g. `person.heading` instead of `person.name`) and styles as needed.

5. **Props for reusability**
   - You can extend components to accept props, e.g. `data`, `autoPlayInterval`, `showDots`, and pass them from a parent. The current code uses fixed data and intervals for simplicity.

---

## API, Backend & Routes

- **API:** None. All content is from `data.js`. Image URLs in the data point to external hosts (e.g. course-api); there is no project-specific API.
- **Backend:** None. The app is static front-end only; build output can be served by any static host (e.g. Netlify, Vercel).
- **Routes:** There is no client-side routing. The app has a single view: the root component that renders one (or both) carousels. If you add a router later, you would wrap or replace the content inside `App.jsx`.

---

## Learning Points & Keywords

- **React:** Functional components, JSX, props, state, and hooks.
- **Hooks:** `useState`, `useEffect`, `useCallback` (and why dependency arrays matter).
- **State:** Single source of truth for current index; updater form for correct async updates.
- **Side effects:** Timers in `useEffect` and cleanup to avoid leaks.
- **Lists:** Rendering lists with `.map()` and stable `key` (e.g. `id`).
- **Third-party libraries:** Using and styling react-slick.
- **CSS:** Layout (positioning, transform), variables, responsive rules.
- **Accessibility:** Semantic HTML and focusable controls.

**Keywords:** React, carousel, slider, image slider, useState, useEffect, useCallback, react-slick, hooks, Vite, JavaScript, CSS, UI components, learning project, testimonials, front-end.

---

## References & Links

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Slick](https://react-slick.neostack.com/)
- [Slick Carousel (original)](https://kenwheeler.github.io/slick/)
- [react-icons](https://react-icons.github.io/react-icons/)
- **Live Demo:** [https://slider-arnob.netlify.app/](https://slider-arnob.netlify.app/)

---

## Conclusion

This project is a practical way to learn React state and effects by building a custom carousel and comparing it with a library-based one. You can run it locally, switch between carousels in `App.jsx`, change data in `data.js`, and reuse the components or patterns in other apps. No backend or environment variables are required to get started.

Contributions and suggestions are welcome.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
