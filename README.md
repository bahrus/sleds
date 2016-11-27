# sleds

sleds stands for streamable, lazy evaluated declarative syntax.  It is a small subset of Typescript.  

With Fetch's support for streaming http requests, and with the limitations of the original JSON being apparent, leading to such initiatives as [JSON 5] (http://json5.org/), it is worth taking a fresh look to see if we can design something which meets the demands of the progressive web application era.

The syntax must meet each of these guidelines:

*  Limit the allowed syntax to the minimal level needed to support rich data structures, while supporting fast parsing.
*  Allow data to be streamed in chunks, and parsed "progressively."
*  Evaluating sleds documents should, like JSON, have zero side-effects

The rules of allowable sleds syntax are as follows:

*  The only allowed key words are const, import, export, and as
*  The only allowed operators are =, ===, !==, ?, :, and +
*  Only braces {} and brackets [], no parenthesis, except inside a literal string
*  String literals must use the tick symbol ``.  Literal tags are not allowed.  The lack of parenthesis rule means other expressions found inside literal tags also are not allowed. [Lift this somewhat?]
*  Line breaks form a fundamental way of partitioning the documents.  The only allowed types of lines fall into these categories:
      * Blank lines
      * Opening comments line that starts with /**
      * Body comment that starts with *
      * Closing comment line that starts with */
      * [Declare statments? -- TBD]
      * Const declaration (opening).  If the constant is a primitive or a reference to a previously defined element, then the line must end with a semicolon.  If it is the beginning of a literal object definition, then the line must have the form "const name = {".  If it is the beginning of an array, it must have the form "const name = [".  Spaces surrounding the equal sign are optional. Multiple declarations not allowed on one line.
      * One line per property declaration if the value is a primitive or previously defined element.  If it is declaring a subjection, then it must be of the form:  "propName: {", and likewise "propName: [" for an array.  If the value is a string, then it must start with the tick to mark the beginning of the string.  The string may encompass multiple lines, but the end of the string should be a line ending with the tick.
      * References to previously existing constants must refer to constants defined previously in the document, or a previously imported sled document, or to an element derived from the global namespace (window or global), including . selectors.  So this is okay:
      const myConstant = window.location.href;
      But the parser must ensure that each sub part of the expression is not a property getter (which could have side effects during  execution);
      
        
