# reindent

Quickly re-indent your code!

![demo.gif](https://raw.githubusercontent.com/kbrose/atom-reindent/master/resources/demo.gif)

<sub><sup>(You will also need the [`python-indent`](https://atom.io/packages/python-indent) package to achieve this exact behavior with Python files.)</sup></sub>

Change the length of that variable name with impunity! Update your soft indentation length! Fix your co-workers mess! Fix *your* mess!

## Usage

Highlight the lines of code you want to re-indent, and activate the re-indent command either through the command palette (`ctrl-shift-p`) or by using the keybinding `ctrl-shift-r`.

## How?

This package:

* expands your selection to include full lines,
* splits the selected text along the file's newline (or `\n` if the file's newline character is unknown),
* *deletes that text*,
* re-inserts the text one line at a time with all preceding and trailing whitespace removed, running the command `editor:newline` after each line is inserted to automatically set the indentation level for the next line.

This package relies on Atom's built-in auto-indentation which is usually derived from a language package. *If the language package doesn't do a good job of indenting your code, then this package will not either.* In particular, languages with white-space based syntax (e.g. Python and Make) might have trouble.

The editor will take the first line of your selection as the base indentation level. Consider the code below:

```
for x in y:
 print(x)
```

If you highlight only the second line (`print(x)`) and reindent, then nothing will happen. You have to include the line `for x in y:` in your selection.

----------

![](https://travis-ci.org/kbrose/atom-reindent.svg?branch=master)

https://github.com/kbrose/atom-reindent
