const queryString = require('query-string');
import {escape} from 'html-escaper';

/**
 * Loosely based on YUI's sub function.
 * 
 * Performs `{placeholder}` substitution on a string. The object passed as the 
 * second parameter provides values to replace the `{placeholder}`s.
 * `{placeholder}` token names must match property names of the object. For example,
 * 
 *`var greeting = Y.Lang.sub("Hello, {who}!", { who: "World" });`
 *
 * `{placeholder}` tokens that are undefined on the object map will be left 
 * intact (leaving unsightly `{placeholder}`'s in the output string). 
 *
 * @method sub
 * @param {string} s String to be modified.
 * @param {object} o Object containing replacement values.
 * @return {string} the substitute result.

 */

const SUBREGEX         = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g;

const sub = function(s, o) {
    return s.replace(SUBREGEX, function (match, key) {
        return o[key] === undefined ? match : escape(o[key]);
    });
};

/*
 */
let request = queryString.parse(location.search);
let el = document.body
let html = el.innerHTML;
html = sub(html, request);
el.innerHTML = html;