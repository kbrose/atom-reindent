"use babel";

import { CompositeDisposable } from "atom"; // eslint-disable-line
import Reindent from "./reindent";

export default {
    config: {
    },

    activate() {
        this.reindent = new Reindent();
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.commands.add("atom-text-editor",
            { "reindent:reindent": () => this.reindent.reindent() }));
    },
};
