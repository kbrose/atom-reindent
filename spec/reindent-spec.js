"use babel";
import Reindent from "../lib/reindent";


describe("reindent", () => {
    let buffer = null;
    let editor = null;
    let editorElement = null;
    let reindent = null;

    beforeEach(() => {
        waitsForPromise(() => {
            return atom.packages.activatePackage("language-python");
        });

        waitsForPromise(() => {
            return atom.packages.activatePackage("language-javascript");
        });

        reindent = new Reindent();
    });

    describe("reindents python files (non-bracketed language)", () => {

        beforeEach(() => {
            waitsForPromise(() =>
                atom.workspace.open("../../fixture.py").then((ed) => {
                    editorElement = atom.views.getView(ed);
                    editor = ed;
                    editor.setSoftTabs(true);
                    editor.setTabLength(4);
                    buffer = editor.buffer;
                }),
            );
        });

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

    describe("reindents javascript files (bracketed language)", () => {

        beforeEach(() => {
            waitsForPromise(() =>
                atom.workspace.open("../../fixture.js").then((ed) => {
                    editorElement = atom.views.getView(ed);
                    editor = ed;
                    editor.setSoftTabs(true);
                    editor.setTabLength(4);
                    buffer = editor.buffer;
                }),
            );
        });

        describe("indents with colons", () => {
            /*
            if (test) {
                doSomething();
            }
            */
            it("reindents an if statement", () => {
                editor.insertText("if (test) {\n   doSomething();\n }\n");
                editor.selectAll();
                reindent.reindent();
                expect(buffer.lineForRow(1)).toBe(" ".repeat(4) + "doSomething();");
                expect(buffer.lineForRow(2)).toBe("}");
                atom.updateProcessEnv();
                throw JSON.stringify(process.env);
            });

            /*
            for (let i = 0; i < n; i += 1) {
               console.log(i)
            }
             noIndentHere();
            */
            it("reindents after closing bracket", () => {
                editor.insertText(("for (let i = 0; i < n; i += 1) {\n"
                                   + "   console.log(i)\n"
                                   + "}\n"
                                   + " noIndentHere();\n"));
                editor.selectAll();
                reindent.reindent();
                expect(buffer.lineForRow(3)).toBe("noIndentHere();");
            });
        });
    });
});
