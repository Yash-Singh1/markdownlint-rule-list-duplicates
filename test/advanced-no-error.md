- \`names\` is a required \`Array\` of \`String\` values that identify the rule in output messages and config. ![Abc](https://example.com/example.png)
- \`description\` is a required \`String\` value that describes the rule in output messages.
- \`information\` is an optional (absolute) \`URL\` of a link to more information about the rule.
- \`tags\` is a required \`Array\` of \`String\` values that groups related rules for easier customization.
- \`function\` is a required synchronous \`Function\` that implements the rule and is passed two parameters:
  - \`params\` is an \`Object\` with properties that describe the content being analyzed:
    - \`name\` is a \`String\` that identifies the input file/string.
    - \`tokens\` is an \`Array\` of [\`markdown-it\` \`Token\` objects](https://markdown-it.github.io/markdown-it/#Token)
      with added \`line\` and \`lineNumber\` properties.
    - \`lines\` is an \`Array\` of \`String\` values corresponding to the lines of the input file/string.
    - \`frontMatterLines\` is an \`Array\` of \`String\` values corresponding to any front matter (not present in \`lines\`).
    - \`config\` is an \`Object\` corresponding to the rule's entry in \`options.config\` (if present).
  - \`onError\` is a function that takes a single \`Object\` parameter with one required and four optional properties:
    - \`lineNumber\` is a required \`Number\` specifying the 1-based line number of the error.
    - \`details\` is an optional \`String\` with information about what caused the error.
    - \`context\` is an optional \`String\` with relevant text surrounding the error location.
    - \`range\` is an optional \`Array\` with two \`Number\` values identifying the 1-based column and length of the error.
    - \`fixInfo\` is an optional \`Object\` with information about how to fix the error (all properties are optional, but
      at least one of \`deleteCount\` and \`insertText\` should be present; when applying a fix, the delete should be
      performed before the insert):
      - \`lineNumber\` is an optional \`Number\` specifying the 1-based line number of the edit.
      - \`editColumn\` is an optional \`Number\` specifying the 1-based column number of the edit.
      - \`deleteCount\` is an optional \`Number\` specifying the number of characters to delete (the value \`-1\` is used to delete the line).
      - \`insertText\` is an optional \`String\` specifying the text to insert. \`\n\` is the platform-independent way to add
        a line break; line breaks should be added at the beginning of a line instead of at the end).

abc

- yo
- kid
- we are cool
