import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./i18n";
import "./index.css";

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        type: "module",
      });
      console.log("ServiceWorker registration successful");

      // Request notification permission on iOS
      if (
        window.Notification &&
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        await Notification.requestPermission();
      }

      // Handle PWA installation prompt
      window.addEventListener("beforeinstallprompt", (e: any) => {
        e.preventDefault();
        const installButton = document.querySelector("#install-button");
        if (installButton) {
          installButton.addEventListener("click", () => {
            (e as any).prompt();
          });
        }
      });
    } catch (err) {
      console.error("ServiceWorker registration failed: ", err);
    }
  });
}

// Add iOS PWA prompt
const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
const isInStandaloneMode =
  "standalone" in window.navigator && (window.navigator as any).standalone;

if (isIOS && !isInStandaloneMode) {
  const iosPrompt = document.createElement("div");
  iosPrompt.innerHTML = `
    <div class="ios-prompt fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex items-center justify-between">
      <div>Install this application on your iPhone: tap <span class="text-emerald-600">Share</span> and then <span class="text-emerald-600">Add to Home Screen</span></div>
      <button class="text-gray-500" onclick="this.parentElement.remove()">✕</button>
    </div>
  `;
  document.body.appendChild(iosPrompt);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
