import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";

import app from "../app.js";

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve) => server.close(resolve));
});

describe("api basics", () => {
    it("reports a healthy status", async () => {
        const response = await fetch(`${baseUrl}/health`);

        assert.equal(response.status, 200);
        assert.equal((await response.json()).status, "ok");
    });

    it("returns json for unknown routes", async () => {
        const response = await fetch(`${baseUrl}/api/does-not-exist`);

        assert.equal(response.status, 404);
        assert.match((await response.json()).message, /not found/i);
    });

    it("rejects anonymous access to protected routes", async () => {
        const response = await fetch(`${baseUrl}/api/tasks`);

        assert.equal(response.status, 401);
    });
});

describe("cors", () => {
    it("allows configured origins", async () => {
        const response = await fetch(`${baseUrl}/api/tasks`, {
            method: "OPTIONS",
            headers: {
                Origin: "https://task-manager-pi-eight-72.vercel.app",
                "Access-Control-Request-Method": "GET",
            },
        });

        assert.equal(
            response.headers.get("access-control-allow-origin"),
            "https://task-manager-pi-eight-72.vercel.app"
        );
    });

    it("does not allow arbitrary vercel deployments", async () => {
        const response = await fetch(`${baseUrl}/api/tasks`, {
            method: "OPTIONS",
            headers: {
                Origin: "https://some-other-app.vercel.app",
                "Access-Control-Request-Method": "GET",
            },
        });

        assert.equal(response.headers.get("access-control-allow-origin"), null);
    });
});

describe("auth validation", () => {
    it("rejects an invalid email on login", async () => {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "not-an-email", password: "secret123" }),
        });

        assert.equal(response.status, 400);
    });

    it("requires a name on signup", async () => {
        const response = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "someone@example.com", password: "secret123" }),
        });

        assert.equal(response.status, 400);
    });

    it("enforces the minimum password length", async () => {
        const response = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Someone", email: "someone@example.com", password: "123" }),
        });

        assert.equal(response.status, 400);
    });

    it("protects the image upload endpoint", async () => {
        const response = await fetch(`${baseUrl}/api/auth/upload-image`, { method: "POST" });

        assert.equal(response.status, 401);
    });
});
