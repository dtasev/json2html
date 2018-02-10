module.exports = {
    Parser: Parser
}
/**
 * JSON to HTML parser.
 * 
 * Copyright 2018 Dimitar Tasev
 * 
 * Permission to use, copy, modify, and/or distribute this software for any purpose 
 * with or without fee is hereby granted, provided that the above copyright notice 
 * and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, 
 * OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA
 * OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, 
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * @author Dimitar Tasev 2018
*/
function Parser() { }
/**
* Convert the JSON to HTML. 
* - Usage:
* ```
* const description = {
*   "div":{
*       "className":"style1",
*       "children":[{
*          "input":{
*               "id": "username-input-id",
*               "type": "text",
*               "onclick": "my-func-name()", //or just my-func-name, without quotation marks
*           }
*       },{
*           "input":{
*               "id": "password-input-id",
*               "type": "password"
*           }
*       }]
*   }
* }
* ```
* Notable syntax is:
* - Top level element:
* ```
* {
* "div":
*      // NOTE: properties here MUST match the properties available to the HTML element
*      "className": "...",
*       // will do nothing, as div doesn't support title
*      "title":"..." 
*      "..."
* }
* ```
* - Child elements
* ```
* {
* "div":
*   "className": "my-div-style",
*   // the list is used to preserve the order of the children
*   "children":[{
*       "a":{
*           "text":"Apples",
*           "className": "my-styles"
*       }
*   },{
*       "input":{
*           "className": "my-input-style"
*       }
*   }]
* }
* ```
* @param dict Dictionary containing the description of the HTML
*/
Parser.json2html = function (dict) {
    const [parent_elem, props] = Parser.getParent(dict);

    Object.keys(props).forEach(function (key) {
        if (key === "children") {
            for (const p of props["children"]) {
                parent_elem.appendChild(Parser.json2html(p));
            }
        } else if (key === "onclick" && parent_elem.tagName !== "BUTTON") {
            // there's no need to do this for buttons, the onclick attribute is present for them
            parent_elem.setAttribute("onclick", props[key]);
        } else {
            parent_elem[key] = props[key];
        }
    });

    return parent_elem;
}

/**
 * Create an HTML element from the key in the dictionary, return the values
 * @param dict Dictionary with 1 key, and some values
 * @returns HTMLElement of the key in the dictionary, and all of its values
 */
Parser.getParent = function (dict) {
    let parent_elem, props;
    // get the first key in the dictionary
    Object.keys(dict).forEach(function (key) {
        parent_elem = document.createElement(key);
        props = dict[key];
    });
    return [parent_elem, props];
}
