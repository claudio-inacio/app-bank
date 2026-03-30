import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { Toaster } from "@/shared/components/ui/sonner.tsx";




async function enableMocking() {
    if (import.meta.env.DEV) {
        const { worker } = await import("../shared/mocks/browser");
        await worker.start({
            onUnhandledRequest: "bypass",
        });
    }
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <App />
            <Toaster />
        </React.StrictMode>
    );
});