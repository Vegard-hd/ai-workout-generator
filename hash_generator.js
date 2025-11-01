const crypto = require("crypto");

// Script 1: Plausible window init (exact formatting from deployed index.html)
const plausibleScript = `window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };`;

// Script 2: Scroll tracking (exact formatting from deployed index.html)
const scrollScript = `let hasScrolled = false;

      window.addEventListener("scroll", () => {
        if (!hasScrolled) {
          plausible("scroll");
          hasScrolled = true;
        }
      });`;

const hashPlausible = crypto
  .createHash("sha256")
  .update(plausibleScript)
  .digest("base64");
const hashScroll = crypto
  .createHash("sha256")
  .update(scrollScript)
  .digest("base64");

console.log("=== Generated Hashes ===");
console.log("Plausible window initialization:");
console.log("sha256-" + hashPlausible);
console.log("\nScroll tracking:");
console.log("sha256-" + hashScroll);
console.log("\n=== Expected from CSP errors ===");
console.log("sha256-rikP6O8OvZlYRMZkxJ9ZM9m/LxculWr4DxAXvwZAF7c=");
console.log("sha256-aC3TtldQSJT6BYG+YLmdIrmIMN9A3u57ew6QfF5IEzk=");
