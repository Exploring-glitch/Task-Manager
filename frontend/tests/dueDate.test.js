import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDueDate, toDueDateISOString, toDueDateInputValue } from "../src/util/dueDate.js";

describe("due dates", () => {
    it("keeps current UTC-midnight values on the chosen day", () => {
        assert.equal(toDueDateInputValue("2026-11-05T00:00:00.000Z"), "2026-11-05");
    });

    it("recovers legacy local-midnight values from ahead of UTC", () => {
        assert.equal(toDueDateInputValue("2026-11-04T18:30:00.000Z"), "2026-11-05");
    });

    it("recovers legacy local-midnight values from behind UTC", () => {
        assert.equal(toDueDateInputValue("2026-11-05T05:00:00.000Z"), "2026-11-05");
    });

    it("writes date-only input at UTC midnight", () => {
        assert.equal(toDueDateISOString("2026-11-05"), "2026-11-05T00:00:00.000Z");
    });

    it("formats usable values and hides unusable ones", () => {
        assert.equal(formatDueDate("2026-11-05"), "5th Nov 2026");
        assert.equal(formatDueDate("not-a-date"), "");
        assert.equal(formatDueDate(""), "");
    });
});
