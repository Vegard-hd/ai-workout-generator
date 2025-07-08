import { expect, test } from "bun:test";

const userInput = JSON.parse(
  `{"activity":"Cycling","duration":150,"focus":"Threshold","freshness":"Well Rested","motivation":"Just want to get it done"}`,
);

// Define your base URL - adjust port if your app runs on a different one
const BASE_URL = "http://localhost:3008";

test("should successfully generate a workout via POST request", async () => {

  const response = await fetch(`${BASE_URL}/api/generateworkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput), // Send the userInput object as a JSON string
  });

  expect(response.ok).toBe(true); // Check if the request was successful (status 200-299)

  // You can add more assertions here, for example, to check the response body:
  // const responseData = await response.json();
  // expect(responseData.workout).toBeDefined();
  // expect(responseData.workout.description).toContain(userInput.activity);
});
