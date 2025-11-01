const crypto = require("crypto");

// Exact scripts from your index.html
const script1 = `window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };`;

const script2 = `let hasScrolled = false;

      window.addEventListener("scroll", () => {
        if (!hasScrolled) {
          plausible("scroll");
          hasScrolled = true;
        }
      });`;

const hash1 = crypto.createHash("sha256").update(script1).digest("base64");
const hash2 = crypto.createHash("sha256").update(script2).digest("base64");

console.log("Script 1 (window.plausible):");
console.log("sha256-" + hash1);
console.log("\nScript 2 (scroll tracking):");
console.log("sha256-" + hash2);
