import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DisplayWorkoutDetails } from "./DisplayWorkoutDetails.jsx";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import React from "react";

const queryClient = new QueryClient();

if (import.meta.env.MODE === "development") {
  console.log("is why did you render should be live");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/workouts/:workoutId"
          element={<DisplayWorkoutDetails />}
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("app")
);
