"use babel";

export default class Reindent {
    reindent() {
        // make this all one undo/redo-able event
        atom.workspace.getActiveTextEditor().transact(
            function () {
                this.editor = atom.workspace.getActiveTextEditor();
                const lineEnding = this.editor.getBuffer().getPreferredLineEnding();

                // For whatever reason this particular method
                // was not republished at the editor level, and
                // the above work incorrectly when the cursor
                // is at the end of a line.
                this.editor.selections[0].selectLine();

                // remove the last newline char from selection
                this.editor.selectLeft();

                let selectedTextLines = this.editor.getSelectedText().split(lineEnding);

                if (!selectedTextLines.length) {
                    return;
                }

                // Delete the currently selected text. The documentation says:
                //    For *each* selection, if the selection is empty,
                //    delete the character following the cursor.
                //    Otherwise delete the selected text.
                // but the documentation for editor.getSelectedText() says:
                //    Get the selected text of the *most recently added* selection.
                // (emphasis mine in both quotes) so that's a little concerning...
                this.editor.delete();

                let editorElement = atom.views.getView(this.editor)

                for (let row = 0; row < selectedTextLines.length; row += 1) {
                    const line = selectedTextLines[row];

                    if (row == 0) {
                        this.editor.insertText(line);
                    } else {
                        this.editor.insertText(line.replace(/^\s+/,""));
                    }

                    if (row+1 < selectedTextLines.length) {
                        atom.commands.dispatch(editorElement, "editor:newline");
                    }
                }
            }
        )
    }
}
