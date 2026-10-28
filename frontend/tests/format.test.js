import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatNumber } from "../src/util/format.js";

describe("formatNumber", () => {
    it("adds thousands separators", () => {
        assert.equal(formatNumber(1234567), "1,234,567");
        assert.equal(formatNumber(999), "999");
    });

    it("keeps the fractional part", () => {
        assert.equal(formatNumber(1234.5), "1,234.5");
    });

    it("handles numeric strings and negatives", () => {
        assert.equal(formatNumber("2500"), "2,500");
        assert.equal(formatNumber(-4200), "-4,200");
    });

    it("returns an empty string for unusable input", () => {
        assert.equal(formatNumber(null), "");
        assert.equal(formatNumber(undefined), "");
        assert.equal(formatNumber(""), "");
        assert.equal(formatNumber("not a number"), "");
    });
});
