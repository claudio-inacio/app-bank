import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/shared/components/ui/sonner";
import React from "react";

async function enableMocking() {
  const shouldMock =
    import.meta.env.DEV ||
    import.meta.env.VITE_API_MOCKING === "enabled";

  if (!shouldMock) return;

  const { worker } = await import("../shared/mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

async function bootstrap() {
  await enableMocking();

  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element not found");
  }

  createRoot(root).render(
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  );
}

bootstrap();