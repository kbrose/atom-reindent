"use babel";

import Reindent from "../lib/reindent";

describe("reindent", () => {
    const FILE_NAME = "fixture.py";
    let buffer = null;
    let editor = null;
    let pythonIndent = null;

    beforeEach(() => {
        waitsForPromise(() =>
            atom.workspace.open(FILE_NAME).then((ed) => {
                editor = ed;
                editor.setSoftTabs(true);
                editor.setTabLength(4);
                buffer = editor.buffer;
            }),
        );

        waitsForPromise(() =>
            atom.packages.activatePackage("reindent").then(() => {
                reindent = new Reindent();
            }),
        );
    });

    // Aligned with opening delimiter
    describe("reindents python files", () => {
        describe("indents with colons", () => {
            /*
            for x in y:
                print(x)
            */
            it("reindents a for loop", () => {
                editor.insertText("for x in y:\n  print(x)");
                editor.selectAll();
                reindent.reindent();
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4));
            });

            /*
            with open(filename) as f:
                f.read()
            */
            it("reindents a with statement", () => {
                editor.insertText("with open(filename) as f:\n f.read()");
                editor.selectAll();
                reindent.reindent();
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4));
            });
        });
    });
});
