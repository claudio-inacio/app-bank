// src/main.tsx
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

enableMocking().then(() => {
    import("react-dom/client").then(({ createRoot }) => {
        import("./App").then(({ default: App }) => {
            const root = document.getElementById("root");
            if (!root) throw new Error("Root element not found");
            createRoot(root).render(<App />);
        });
    });
});