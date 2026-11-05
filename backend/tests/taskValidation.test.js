import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertChecklistStructureUnchanged } from "../src/utils/taskValidation.js";

describe("checklist structure guard", () => {
    it("allows members to change completion only", () => {
        const current = [
            { text: "First step", completed: false },
            { text: "Second step", completed: false },
        ];

        assert.doesNotThrow(() =>
            assertChecklistStructureUnchanged(current, [
                { text: "First step", completed: true },
                { text: "Second step", completed: false },
            ])
        );
    });

    it("rejects renamed, reordered, added and removed items", () => {
        const current = [
            { text: "First step", completed: false },
            { text: "Second step", completed: false },
        ];

        for (const incoming of [
            [
                { text: "Renamed", completed: false },
                { text: "Second step", completed: false },
            ],
            [
                { text: "Second step", completed: false },
                { text: "First step", completed: false },
            ],
            [{ text: "First step", completed: false }],
            [
                { text: "First step", completed: false },
                { text: "Second step", completed: false },
                { text: "Extra step", completed: false },
            ],
        ]) {
            assert.throws(
                () => assertChecklistStructureUnchanged(current, incoming),
                /only update checklist completion/
            );
        }
    });
});
