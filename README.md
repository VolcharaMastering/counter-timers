# Counters & Timers — Test Task

**Stack:** React, TypeScript, Vite, Zustand, SCSS

## Overview

A small single-page React application that demonstrates a counter with button-specific pauses and an automatic decrement behavior after 10s of inactivety.

The app is designed to be simple, scalable and easy to read. All timer logic is centralized in a Zustand store and the timer utilities are implemented as small reusable factories.

## Test task

Create a small web React application with the following functionality:

1. There's a counter set by default to 0.
2. There're 3 buttons with the following increasing value: 1, 2 and 3

-   If user has clicked on a button -> the counter increases by the increasing value of the button.
-   Upon clicking on a button, it's disabled for 0.5 \* <increasing value> seconds. For example, the button with increasing value = 1 will be disabled for 0.5s upon clicking. In other words, it could be clicked once in 0.5s. Likewise, the button with 3 is available to be clicked once in 1.5s.

3. If the counter is not increased for 10s (i.e. no button is clicked), it starts decreasing with a rate of 1 per 1s. So, the counter with the value = 15 will be decreasing for 15s 'til it reaches 0.

-   If the counter had reached 0, it stops decreasing.
-   If the button is clicked, then the decreasing process is stopped and the counter increased by the increasing value of the button clicked. If now no button is clicked for 10s again, then the counter will start decreasing again.
    Please create a separate GitHub repo for the solution.
    Use React best practices in your codebase. Assume that the number of buttons can be changed, as well as their increasing values and timers' parameters. Make sure you don't need to re-write a lot of code if you get such requirement changes.
    Put some minimal arbitrary styles so that the application doesn't look super ugly.
    The application should be runnable by a single npm/yarn/etc command.

## Goals

-   Keep business logic in a single place (Zustand store).
-   Allow easy change of number of buttons, their values, and timing parameters without modifying core logic (change buttonQuantity in App.tsx).
-   Minimize unnecessary React re-renders by using Zustand selectors.
-   Provide small timer utilities (`createSingleTimeout` and `createSingleInterval`).

## Project structure

```
src/
├─ components/
│  ├─ Counter/Counter.tsx
│  └─ CustomButton/CustomButton.tsx
├─ stores/
│  └─ counterStore.ts
├─ utils/
│  ├─ createSingleTimeout.ts
│  └─ createSingleInterval.ts
├─ App.tsx
├─ main.tsx
└─ styles/
   └─ (SCSS files)
```

## How to run

1. Clone the repository:

```bash
git clone git@github.com:VolcharaMastering/counter-timers.git
cd counter-timers
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start development server:

```bash
npm run dev
# or
yarn dev
```

Open the URL returned by Vite (default: `http://localhost:5173`).

## Scripts (package.json)

-   `dev` — development server
-   `build` — production build
-   `preview` — preview production build
-   `lint` - start linter
