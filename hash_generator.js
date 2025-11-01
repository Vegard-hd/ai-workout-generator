const crypto = require("crypto");

// JSON-LD Structured Data Script
const jsonldScript = `{
        "@context": "https://schema.org/",
        "@type": "WebApplication",
        "name": "Outdoor Workout Generator",
        "description": "Generate personalized outdoor workouts with AI. Create custom training plans, track zones, and improve your fitness with intelligent workout generation.",
        "url": "https://outdoorworkoutgenerator.app",
        "applicationCategory": "HealthAndFitnessApplication",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "100"
        },
        "author": {
          "@type": "Organization",
          "name": "Outdoor Workout Generator",
          "url": "https://outdoorworkoutgenerator.app"
        },
        "potentialAction": {
          "@type": "Action",
          "target": "https://outdoorworkoutgenerator.app/",
          "actionPlatform": ["DesktopWebPlatform", "MobileWebPlatform"],
          "result": {
            "@type": "Thing",
            "description": "Generate a custom workout plan"
          }
        }
      }`;

// Plausible window initialization
const plausibleScript = `window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };`;

// Scroll tracking script
const scrollScript = `let hasScrolled = false;

      window.addEventListener("scroll", () => {
        if (!hasScrolled) {
          plausible("scroll");
          hasScrolled = true;
        }
      });`;

const hashJsonld = crypto
  .createHash("sha256")
  .update(jsonldScript)
  .digest("base64");
const hashPlausible = crypto
  .createHash("sha256")
  .update(plausibleScript)
  .digest("base64");
const hashScroll = crypto
  .createHash("sha256")
  .update(scrollScript)
  .digest("base64");

console.log("JSON-LD Structured Data:");
console.log("sha256-" + hashJsonld);
console.log("\nPlausible window initialization:");
console.log("sha256-" + hashPlausible);
console.log("\nScroll tracking:");
console.log("sha256-" + hashScroll);
