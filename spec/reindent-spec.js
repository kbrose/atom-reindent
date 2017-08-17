"use babel";

import Reindent from "../lib/main";

describe("reindent", () => {
    const FILE_NAME = "fixture.py";
    let buffer = null;
    let editor = null;
    let packageActivatePromise = null;
    let editorView = null;

    beforeEach(() => {
        waitsForPromise(() =>
            atom.workspace.open(FILE_NAME).then((ed) => {
                editor = ed;
                editor.setSoftTabs(true);
                editor.setTabLength(4);
                buffer = editor.buffer;

                packageActivatePromise = atom.packages.activatePackage("reindent")

                editor.insertText("asdf\n");
                editor.selectAll();

                editorView = atom.views.getView(editor);
                atom.commands.dispatch(editorView, 'reindent:reindent')
                waitsForPromise(function() {
                    return packageActivatePromise;
                });
                editor.selectAll();
                editor.delete()

            }),
        );


        // atom.commands.dispatch(editor, 'reindent:reindent')
        // waitsForPromise(function() {
        //     return packageActivatePromise;
        // });
    });

    // Aligned with opening delimiter
    describe("reindents python files", () => {
        describe("indents with colons", () => {
            /*
            for x in y:
                print(x)
            */
            it("reindents a for loop", () => {
                editor.insertText("for x in y:\n     print(x)\n");
                editor.selectAll();
                console.log(editor)
                atom.commands.dispatch(editorView, 'reindent:reindent')
                // waitsForPromise(function() {
                //     return packageActivatePromise;
                // });
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "print(x)");
            });

            /*
            with open(filename) as f:
                f.read()
            */
            it("reindents a with statement", () => {
                editor.insertText("with open(filename) as f:\n f.read()\n");
                editor.selectAll();
                atom.commands.dispatch(editorView, 'reindent:reindent')
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "f.read()");
            });
        });
    });
});
