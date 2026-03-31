export const fakeDelay = (ms = 800) =>
    new Promise((resolve) => setTimeout(resolve, ms));