import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DisplayWorkoutDetails } from "./DisplayWorkoutDetails.jsx";
const queryClient = new QueryClient();

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
