"use babel";


describe("reindent", () => {
    const FILE_NAME = "fixture.py";
    let buffer = null;
    let editor = null;
    let packageActivatePromise = null;
    let editorElement = null;

    executeReindent = ((callback) => {
        atom.commands.dispatch(editorElement, 'reindent:reindent');
        waitsForPromise(() => {
            return packageActivatePromise;
        });
        return runs(callback);
    });

    beforeEach(() => {
        waitsForPromise(() =>
            atom.workspace.open(FILE_NAME).then((ed) => {
                editorElement = atom.views.getView(ed);
                editor = ed;
                editor.setSoftTabs(true);
                editor.setTabLength(4);
                buffer = editor.buffer;
            }),
        );

        packageActivatePromise = atom.packages.activatePackage("reindent");
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
                console.log(editor.getSelectedText())
                executeReindent(function() {
                    expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "print(x)");
                });
            });

            /*
            with open(filename) as f:
                f.read()
            */
            it("reindents a with statement", () => {
                editor.insertText("with open(filename) as f:\n f.read()\n");
                editor.selectAll();
                executeReindent(function() {
                    expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "f.read()");
                });
            });
        });
    });
});
