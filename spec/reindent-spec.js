"use babel";
import Reindent from "../lib/reindent";


describe("reindent", () => {
    const FILE_NAME = "fixture.py";
    let buffer = null;
    let editor = null;
    let editorElement = null;
    let reindent = null;

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

        waitsForPromise(() => {
            const packages = atom.packages.getAvailablePackageNames();
            let languagePackage;

            if (packages.indexOf("language-python") > -1) {
                languagePackage = "language-python";
            } else if (packages.indexOf("MagicPython") > -1) {
                languagePackage = "MagicPython";
            }

            return atom.packages.activatePackage(languagePackage);
        });

        reindent = new Reindent();
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
                reindent.reindent();
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "print(x)");
            });

            /*
            with open(filename) as f:
                f.read()
            */
            it("reindents a with statement", () => {
                editor.insertText("with open(filename) as f:\n f.read()\n");
                editor.selectAll();
                reindent.reindent();
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "f.read()");
            });
        });
    });
});
