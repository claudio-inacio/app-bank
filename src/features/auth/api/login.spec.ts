import { describe, expect, it } from "vitest";
import { login } from "./login";

describe("login api", () => {
    it("deve autenticar com credenciais válidas", async () => {
        const response = await login({
            document: "234.120.130-05",
            password: "123123",
        });
        expect(response.user.name).toBe("Claudio");
        expect(response.token).toBe("dmSlUHP0qPXQZKPudGmZjT7rdYYjOMFvyz8T6PXLmw5jitpx6kKumoM6WKzAbaTC");
        expect(response.balance).toBe(3000);
    });

    it("deve falhar com credenciais inválidas", async () => {
        await expect(
            login({
                document: "123.456.789-00",
                password: "000000",
            })
        ).rejects.toThrow();
    });
});