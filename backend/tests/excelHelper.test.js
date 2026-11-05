import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDateOnly } from "../src/utils/excelHelper.js";

describe("formatDateOnly", () => {
    it("keeps current UTC-midnight values on the chosen day", () => {
        assert.equal(formatDateOnly("2026-11-05T00:00:00.000Z"), "2026-11-05");
    });

    it("recovers legacy local-midnight values from ahead of UTC", () => {
        assert.equal(formatDateOnly("2026-11-04T18:30:00.000Z"), "2026-11-05");
    });

    it("recovers legacy local-midnight values from behind UTC", () => {
        assert.equal(formatDateOnly("2026-11-05T05:00:00.000Z"), "2026-11-05");
    });

    it("returns N/A for missing or invalid values", () => {
        assert.equal(formatDateOnly(null), "N/A");
        assert.equal(formatDateOnly("not-a-date"), "N/A");
    });
});
