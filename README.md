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
*  Line breaks form a fundamental way of partitioning the documents.  The only       types of lines breaking into these subcategories:
   ..* Opening 
