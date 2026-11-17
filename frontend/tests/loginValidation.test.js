import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateLoginFields } from "../src/util/loginValidation.js";

describe("validateLoginFields", () => {
    it("accepts a trimmed email and a password", () => {
        assert.deepEqual(validateLoginFields("  alex@company.com  ", "secret123"), {});
    });

    it("reports a missing email and password", () => {
        assert.deepEqual(validateLoginFields("", ""), {
            email: "Email address is required",
            password: "Password is required",
        });
    });

    it("treats whitespace-only values as missing", () => {
        assert.deepEqual(validateLoginFields("   ", "   "), {
            email: "Email address is required",
            password: "Password is required",
        });
    });

    it("rejects malformed email addresses", () => {
        assert.equal(validateLoginFields("alex@", "secret123").email, "Enter a valid email address");
        assert.equal(validateLoginFields("alex company.com", "secret123").email, "Enter a valid email address");
    });

    it("reports both errors independently", () => {
        assert.deepEqual(validateLoginFields("not-an-email", ""), {
            email: "Enter a valid email address",
            password: "Password is required",
        });
    });
});
