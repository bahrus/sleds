# Sleds

SLEDS stands for streamable, lazy evaluated declarative syntax.  It is a small subset of Typescript.  

With Fetch's support for streaming http requests, and with the limitations of the original JSON being apparent, leading to such initiatives as [JSON 5] (http://json5.org/), it is worth taking a fresh look to see if we can design something which meets the demands, and can take advantage of, the expectations and capabilities of the Progressive Web aApplication era.

The syntax must meet each of these guidelines:

*  Limit the allowed syntax to the minimal level needed to support readable, maintainable rich data structures, while supporting fast parsing.  
*  Allow data to be streamed in chunks, and parsed "progressively."
*  Evaluating sleds documents should, like JSON, have zero side-effects.
*  Like JSON, the syntax should be simple enough to be parseable in multiple languages with minimal effort.

The rules of allowable sleds syntax for non "minified" sleds documents are as follows:

*  The only allowed key words are const, import, export, and as
*  The only allowed operators are =, ===, !==, ?, :, and +
*  Only braces {} and brackets [], no parenthesis, except inside a literal string
*  String literals must use the tick symbol ``.  Literal tags are not allowed.  The lack of parenthesis rule means other expressions found inside literal tags also are not allowed. [Lift this somewhat?]
*  Line breaks form a fundamental way of partitioning the documents.  The only allowed types of lines fall into these categories:
      * Blank lines
      * Opening comments lines that start with /*
      * Body comment lines can contain anything other than */
      * Closing comment lines that end with */
      * [Declare statments? -- TBD]
      * Const declaration (opening).  If the constant is a primitive or a reference to a previously defined element, then the line must end with a semicolon.  If it is the beginning of a literal object definition, then the line must have the form "[export] const name = {".  If it is the beginning of an array, it must have the form "[export] const name = [".  Spaces surrounding the equal sign are optional. Multiple declarations are not allowed on one line.
      * One line per property declaration if the value is a primitive or previously defined element.  If it is declaring a subjection, then it must be of the form:  "propName: {", and likewise "propName: [" for an array.  If the value is a string, then it must start with the tick to mark the beginning of the string.  The string may encompass multiple lines, but the end of the string should be a line ending with the tick.
      * References to previously existing constants must refer to constants defined previously in the document, or a previously imported sled document, or to an element derived from the global namespace (window or global), including . selectors.  So this is okay:
      const myConstant = window.location.href;
      But the parser must ensure that each sub part of the expression is not a property getter (which could have side effects during  execution);

The allowed minified sleds syntax is slightly more restrictive, eliminating optional spaces where possible (including indentation).  These rules can improve the parsing performance as there is less "guess work" needed.  The parsing API must allow the consumer to specify whether the document should be expected in minified form to take advantage of these small optimizations. 

# Hello world sleds document

Let's say we create a typescript document, helloWorld.ts: 

```typescript
export const myMessage = `Hello, world`;
```

Parsing this document can take the following form at its simplest:

```javascript
const documentString = readString('helloWorld.ts'); //readString is some application function which retrieves the contents of helloWorld.ts.

const targetObj = {};
const document = sleds.assign(targetObj, documentString);
console.log(targetObj);
// {myMessage: 'Hello, world'}
```

As we see, the constant definitions inside a sled document become properties of the target object.  If a non trivial object is passed into the parsedObj, then by default, the parser will override properties that already existed in the original object, and add the new ones.

For example, using the same document above, if instead we passed in this target object:

```javascript
const targetObj = {myMessage: false, foo: 'bar'}
```

the resultiing targetObj after assigning the sled document would be:

```javascript
{
    myMessage: 'Hello, world',
    foo: 'bar'
}
```

The example above is the simplest use api, where an entire string dump of the source document is passed in.  Alternative signatures should be available where the document is passed in as a [stream] (https://streams.spec.whatwg.org/).

