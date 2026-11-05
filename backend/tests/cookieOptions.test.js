import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCookieOptions } from "../src/config/config.js";

describe("cookie options", () => {
    it("treats the first forwarded protocol as the browser connection", () => {
        const options = getCookieOptions({
            headers: { "x-forwarded-proto": "https, http" },
        });

        assert.equal(options.secure, true);
        assert.equal(options.sameSite, "none");
        assert.equal(options.httpOnly, true);
    });

    it("keeps local development cookies first-party", () => {
        const options = getCookieOptions({ headers: {} });

        assert.equal(options.secure, false);
        assert.equal(options.sameSite, "lax");
    });
});
