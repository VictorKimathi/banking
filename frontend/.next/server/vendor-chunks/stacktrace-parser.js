"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/stacktrace-parser";
exports.ids = ["vendor-chunks/stacktrace-parser"];
exports.modules = {

/***/ "(ssr)/./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parse: () => (/* binding */ parse)\n/* harmony export */ });\nvar UNKNOWN_FUNCTION = '<unknown>';\n/**\n * This parses the different stack traces and puts them into one format\n * This borrows heavily from TraceKit (https://github.com/csnover/TraceKit)\n */\n\nfunction parse(stackString) {\n  var lines = stackString.split('\\n');\n  return lines.reduce(function (stack, line) {\n    var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);\n\n    if (parseResult) {\n      stack.push(parseResult);\n    }\n\n    return stack;\n  }, []);\n}\nvar chromeRe = /^\\s*at (.*?) ?\\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\\/|[a-z]:\\\\|\\\\\\\\).*?)(?::(\\d+))?(?::(\\d+))?\\)?\\s*$/i;\nvar chromeEvalRe = /\\((\\S*)(?::(\\d+))(?::(\\d+))\\)/;\n\nfunction parseChrome(line) {\n  var parts = chromeRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line\n\n  var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line\n\n  var submatch = chromeEvalRe.exec(parts[2]);\n\n  if (isEval && submatch != null) {\n    // throw out eval line/column and use top-most line/column number\n    parts[2] = submatch[1]; // url\n\n    parts[3] = submatch[2]; // line\n\n    parts[4] = submatch[3]; // column\n  }\n\n  return {\n    file: !isNative ? parts[2] : null,\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: isNative ? [parts[2]] : [],\n    lineNumber: parts[3] ? +parts[3] : null,\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\nvar winjsRe = /^\\s*at (?:((?:\\[object object\\])?.+) )?\\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\\d+)(?::(\\d+))?\\)?\\s*$/i;\n\nfunction parseWinjs(line) {\n  var parts = winjsRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[2],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[3],\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\nvar geckoRe = /^\\s*(.*?)(?:\\((.*?)\\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\\[native).*?|[^@]*bundle)(?::(\\d+))?(?::(\\d+))?\\s*$/i;\nvar geckoEvalRe = /(\\S+) line (\\d+)(?: > eval line \\d+)* > eval/i;\n\nfunction parseGecko(line) {\n  var parts = geckoRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;\n  var submatch = geckoEvalRe.exec(parts[3]);\n\n  if (isEval && submatch != null) {\n    // throw out eval line/column and use top-most line number\n    parts[3] = submatch[1];\n    parts[4] = submatch[2];\n    parts[5] = null; // no column when eval\n  }\n\n  return {\n    file: parts[3],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: parts[2] ? parts[2].split(',') : [],\n    lineNumber: parts[4] ? +parts[4] : null,\n    column: parts[5] ? +parts[5] : null\n  };\n}\n\nvar javaScriptCoreRe = /^\\s*(?:([^@]*)(?:\\((.*?)\\))?@)?(\\S.*?):(\\d+)(?::(\\d+))?\\s*$/i;\n\nfunction parseJSC(line) {\n  var parts = javaScriptCoreRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[3],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[4],\n    column: parts[5] ? +parts[5] : null\n  };\n}\n\nvar nodeRe = /^\\s*at (?:((?:\\[object object\\])?[^\\\\/]+(?: \\[as \\S+\\])?) )?\\(?(.*?):(\\d+)(?::(\\d+))?\\)?\\s*$/i;\n\nfunction parseNode(line) {\n  var parts = nodeRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[2],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[3],\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RhY2t0cmFjZS1wYXJzZXIvZGlzdC9zdGFjay10cmFjZS1wYXJzZXIuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQStEOztBQUUvRCwyREFBMkQ7O0FBRTNEOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCLDRCQUE0Qjs7QUFFNUIsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNtX2JhbmtpbmcvLi9ub2RlX21vZHVsZXMvc3RhY2t0cmFjZS1wYXJzZXIvZGlzdC9zdGFjay10cmFjZS1wYXJzZXIuZXNtLmpzPzkzYjYiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFVOS05PV05fRlVOQ1RJT04gPSAnPHVua25vd24+Jztcbi8qKlxuICogVGhpcyBwYXJzZXMgdGhlIGRpZmZlcmVudCBzdGFjayB0cmFjZXMgYW5kIHB1dHMgdGhlbSBpbnRvIG9uZSBmb3JtYXRcbiAqIFRoaXMgYm9ycm93cyBoZWF2aWx5IGZyb20gVHJhY2VLaXQgKGh0dHBzOi8vZ2l0aHViLmNvbS9jc25vdmVyL1RyYWNlS2l0KVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0YWNrU3RyaW5nKSB7XG4gIHZhciBsaW5lcyA9IHN0YWNrU3RyaW5nLnNwbGl0KCdcXG4nKTtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZShmdW5jdGlvbiAoc3RhY2ssIGxpbmUpIHtcbiAgICB2YXIgcGFyc2VSZXN1bHQgPSBwYXJzZUNocm9tZShsaW5lKSB8fCBwYXJzZVdpbmpzKGxpbmUpIHx8IHBhcnNlR2Vja28obGluZSkgfHwgcGFyc2VOb2RlKGxpbmUpIHx8IHBhcnNlSlNDKGxpbmUpO1xuXG4gICAgaWYgKHBhcnNlUmVzdWx0KSB7XG4gICAgICBzdGFjay5wdXNoKHBhcnNlUmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH0sIFtdKTtcbn1cbnZhciBjaHJvbWVSZSA9IC9eXFxzKmF0ICguKj8pID9cXCgoKD86ZmlsZXxodHRwcz98YmxvYnxjaHJvbWUtZXh0ZW5zaW9ufG5hdGl2ZXxldmFsfHdlYnBhY2t8PGFub255bW91cz58XFwvfFthLXpdOlxcXFx8XFxcXFxcXFwpLio/KSg/OjooXFxkKykpPyg/OjooXFxkKykpP1xcKT9cXHMqJC9pO1xudmFyIGNocm9tZUV2YWxSZSA9IC9cXCgoXFxTKikoPzo6KFxcZCspKSg/OjooXFxkKykpXFwpLztcblxuZnVuY3Rpb24gcGFyc2VDaHJvbWUobGluZSkge1xuICB2YXIgcGFydHMgPSBjaHJvbWVSZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBpc05hdGl2ZSA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ25hdGl2ZScpID09PSAwOyAvLyBzdGFydCBvZiBsaW5lXG5cbiAgdmFyIGlzRXZhbCA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ2V2YWwnKSA9PT0gMDsgLy8gc3RhcnQgb2YgbGluZVxuXG4gIHZhciBzdWJtYXRjaCA9IGNocm9tZUV2YWxSZS5leGVjKHBhcnRzWzJdKTtcblxuICBpZiAoaXNFdmFsICYmIHN1Ym1hdGNoICE9IG51bGwpIHtcbiAgICAvLyB0aHJvdyBvdXQgZXZhbCBsaW5lL2NvbHVtbiBhbmQgdXNlIHRvcC1tb3N0IGxpbmUvY29sdW1uIG51bWJlclxuICAgIHBhcnRzWzJdID0gc3VibWF0Y2hbMV07IC8vIHVybFxuXG4gICAgcGFydHNbM10gPSBzdWJtYXRjaFsyXTsgLy8gbGluZVxuXG4gICAgcGFydHNbNF0gPSBzdWJtYXRjaFszXTsgLy8gY29sdW1uXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpbGU6ICFpc05hdGl2ZSA/IHBhcnRzWzJdIDogbnVsbCxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogaXNOYXRpdmUgPyBbcGFydHNbMl1dIDogW10sXG4gICAgbGluZU51bWJlcjogcGFydHNbM10gPyArcGFydHNbM10gOiBudWxsLFxuICAgIGNvbHVtbjogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gIH07XG59XG5cbnZhciB3aW5qc1JlID0gL15cXHMqYXQgKD86KCg/OlxcW29iamVjdCBvYmplY3RcXF0pPy4rKSApP1xcKD8oKD86ZmlsZXxtcy1hcHB4fGh0dHBzP3x3ZWJwYWNrfGJsb2IpOi4qPyk6KFxcZCspKD86OihcXGQrKSk/XFwpP1xccyokL2k7XG5cbmZ1bmN0aW9uIHBhcnNlV2luanMobGluZSkge1xuICB2YXIgcGFydHMgPSB3aW5qc1JlLmV4ZWMobGluZSk7XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwYXJ0c1syXSxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogW10sXG4gICAgbGluZU51bWJlcjogK3BhcnRzWzNdLFxuICAgIGNvbHVtbjogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gIH07XG59XG5cbnZhciBnZWNrb1JlID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/KD86XnxAKSgoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZXx3ZWJwYWNrfHJlc291cmNlfFxcW25hdGl2ZSkuKj98W15AXSpidW5kbGUpKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFxzKiQvaTtcbnZhciBnZWNrb0V2YWxSZSA9IC8oXFxTKykgbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbC9pO1xuXG5mdW5jdGlvbiBwYXJzZUdlY2tvKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gZ2Vja29SZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBpc0V2YWwgPSBwYXJ0c1szXSAmJiBwYXJ0c1szXS5pbmRleE9mKCcgPiBldmFsJykgPiAtMTtcbiAgdmFyIHN1Ym1hdGNoID0gZ2Vja29FdmFsUmUuZXhlYyhwYXJ0c1szXSk7XG5cbiAgaWYgKGlzRXZhbCAmJiBzdWJtYXRjaCAhPSBudWxsKSB7XG4gICAgLy8gdGhyb3cgb3V0IGV2YWwgbGluZS9jb2x1bW4gYW5kIHVzZSB0b3AtbW9zdCBsaW5lIG51bWJlclxuICAgIHBhcnRzWzNdID0gc3VibWF0Y2hbMV07XG4gICAgcGFydHNbNF0gPSBzdWJtYXRjaFsyXTtcbiAgICBwYXJ0c1s1XSA9IG51bGw7IC8vIG5vIGNvbHVtbiB3aGVuIGV2YWxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlsZTogcGFydHNbM10sXG4gICAgbWV0aG9kTmFtZTogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICBhcmd1bWVudHM6IHBhcnRzWzJdID8gcGFydHNbMl0uc3BsaXQoJywnKSA6IFtdLFxuICAgIGxpbmVOdW1iZXI6IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogbnVsbCxcbiAgICBjb2x1bW46IHBhcnRzWzVdID8gK3BhcnRzWzVdIDogbnVsbFxuICB9O1xufVxuXG52YXIgamF2YVNjcmlwdENvcmVSZSA9IC9eXFxzKig/OihbXkBdKikoPzpcXCgoLio/KVxcKSk/QCk/KFxcUy4qPyk6KFxcZCspKD86OihcXGQrKSk/XFxzKiQvaTtcblxuZnVuY3Rpb24gcGFyc2VKU0MobGluZSkge1xuICB2YXIgcGFydHMgPSBqYXZhU2NyaXB0Q29yZVJlLmV4ZWMobGluZSk7XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwYXJ0c1szXSxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogW10sXG4gICAgbGluZU51bWJlcjogK3BhcnRzWzRdLFxuICAgIGNvbHVtbjogcGFydHNbNV0gPyArcGFydHNbNV0gOiBudWxsXG4gIH07XG59XG5cbnZhciBub2RlUmUgPSAvXlxccyphdCAoPzooKD86XFxbb2JqZWN0IG9iamVjdFxcXSk/W15cXFxcL10rKD86IFxcW2FzIFxcUytcXF0pPykgKT9cXCg/KC4qPyk6KFxcZCspKD86OihcXGQrKSk/XFwpP1xccyokL2k7XG5cbmZ1bmN0aW9uIHBhcnNlTm9kZShsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IG5vZGVSZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlsZTogcGFydHNbMl0sXG4gICAgbWV0aG9kTmFtZTogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICBhcmd1bWVudHM6IFtdLFxuICAgIGxpbmVOdW1iZXI6ICtwYXJ0c1szXSxcbiAgICBjb2x1bW46IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogbnVsbFxuICB9O1xufVxuXG5leHBvcnQgeyBwYXJzZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parse: () => (/* binding */ parse)\n/* harmony export */ });\nvar UNKNOWN_FUNCTION = '<unknown>';\n/**\n * This parses the different stack traces and puts them into one format\n * This borrows heavily from TraceKit (https://github.com/csnover/TraceKit)\n */\n\nfunction parse(stackString) {\n  var lines = stackString.split('\\n');\n  return lines.reduce(function (stack, line) {\n    var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);\n\n    if (parseResult) {\n      stack.push(parseResult);\n    }\n\n    return stack;\n  }, []);\n}\nvar chromeRe = /^\\s*at (.*?) ?\\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\\/|[a-z]:\\\\|\\\\\\\\).*?)(?::(\\d+))?(?::(\\d+))?\\)?\\s*$/i;\nvar chromeEvalRe = /\\((\\S*)(?::(\\d+))(?::(\\d+))\\)/;\n\nfunction parseChrome(line) {\n  var parts = chromeRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line\n\n  var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line\n\n  var submatch = chromeEvalRe.exec(parts[2]);\n\n  if (isEval && submatch != null) {\n    // throw out eval line/column and use top-most line/column number\n    parts[2] = submatch[1]; // url\n\n    parts[3] = submatch[2]; // line\n\n    parts[4] = submatch[3]; // column\n  }\n\n  return {\n    file: !isNative ? parts[2] : null,\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: isNative ? [parts[2]] : [],\n    lineNumber: parts[3] ? +parts[3] : null,\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\nvar winjsRe = /^\\s*at (?:((?:\\[object object\\])?.+) )?\\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\\d+)(?::(\\d+))?\\)?\\s*$/i;\n\nfunction parseWinjs(line) {\n  var parts = winjsRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[2],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[3],\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\nvar geckoRe = /^\\s*(.*?)(?:\\((.*?)\\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\\[native).*?|[^@]*bundle)(?::(\\d+))?(?::(\\d+))?\\s*$/i;\nvar geckoEvalRe = /(\\S+) line (\\d+)(?: > eval line \\d+)* > eval/i;\n\nfunction parseGecko(line) {\n  var parts = geckoRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;\n  var submatch = geckoEvalRe.exec(parts[3]);\n\n  if (isEval && submatch != null) {\n    // throw out eval line/column and use top-most line number\n    parts[3] = submatch[1];\n    parts[4] = submatch[2];\n    parts[5] = null; // no column when eval\n  }\n\n  return {\n    file: parts[3],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: parts[2] ? parts[2].split(',') : [],\n    lineNumber: parts[4] ? +parts[4] : null,\n    column: parts[5] ? +parts[5] : null\n  };\n}\n\nvar javaScriptCoreRe = /^\\s*(?:([^@]*)(?:\\((.*?)\\))?@)?(\\S.*?):(\\d+)(?::(\\d+))?\\s*$/i;\n\nfunction parseJSC(line) {\n  var parts = javaScriptCoreRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[3],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[4],\n    column: parts[5] ? +parts[5] : null\n  };\n}\n\nvar nodeRe = /^\\s*at (?:((?:\\[object object\\])?[^\\\\/]+(?: \\[as \\S+\\])?) )?\\(?(.*?):(\\d+)(?::(\\d+))?\\)?\\s*$/i;\n\nfunction parseNode(line) {\n  var parts = nodeRe.exec(line);\n\n  if (!parts) {\n    return null;\n  }\n\n  return {\n    file: parts[2],\n    methodName: parts[1] || UNKNOWN_FUNCTION,\n    arguments: [],\n    lineNumber: +parts[3],\n    column: parts[4] ? +parts[4] : null\n  };\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc3RhY2t0cmFjZS1wYXJzZXIvZGlzdC9zdGFjay10cmFjZS1wYXJzZXIuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0RBQStEOztBQUUvRCwyREFBMkQ7O0FBRTNEOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCLDRCQUE0Qjs7QUFFNUIsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNtX2JhbmtpbmcvLi9ub2RlX21vZHVsZXMvc3RhY2t0cmFjZS1wYXJzZXIvZGlzdC9zdGFjay10cmFjZS1wYXJzZXIuZXNtLmpzPzMwYzQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFVOS05PV05fRlVOQ1RJT04gPSAnPHVua25vd24+Jztcbi8qKlxuICogVGhpcyBwYXJzZXMgdGhlIGRpZmZlcmVudCBzdGFjayB0cmFjZXMgYW5kIHB1dHMgdGhlbSBpbnRvIG9uZSBmb3JtYXRcbiAqIFRoaXMgYm9ycm93cyBoZWF2aWx5IGZyb20gVHJhY2VLaXQgKGh0dHBzOi8vZ2l0aHViLmNvbS9jc25vdmVyL1RyYWNlS2l0KVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0YWNrU3RyaW5nKSB7XG4gIHZhciBsaW5lcyA9IHN0YWNrU3RyaW5nLnNwbGl0KCdcXG4nKTtcbiAgcmV0dXJuIGxpbmVzLnJlZHVjZShmdW5jdGlvbiAoc3RhY2ssIGxpbmUpIHtcbiAgICB2YXIgcGFyc2VSZXN1bHQgPSBwYXJzZUNocm9tZShsaW5lKSB8fCBwYXJzZVdpbmpzKGxpbmUpIHx8IHBhcnNlR2Vja28obGluZSkgfHwgcGFyc2VOb2RlKGxpbmUpIHx8IHBhcnNlSlNDKGxpbmUpO1xuXG4gICAgaWYgKHBhcnNlUmVzdWx0KSB7XG4gICAgICBzdGFjay5wdXNoKHBhcnNlUmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH0sIFtdKTtcbn1cbnZhciBjaHJvbWVSZSA9IC9eXFxzKmF0ICguKj8pID9cXCgoKD86ZmlsZXxodHRwcz98YmxvYnxjaHJvbWUtZXh0ZW5zaW9ufG5hdGl2ZXxldmFsfHdlYnBhY2t8PGFub255bW91cz58XFwvfFthLXpdOlxcXFx8XFxcXFxcXFwpLio/KSg/OjooXFxkKykpPyg/OjooXFxkKykpP1xcKT9cXHMqJC9pO1xudmFyIGNocm9tZUV2YWxSZSA9IC9cXCgoXFxTKikoPzo6KFxcZCspKSg/OjooXFxkKykpXFwpLztcblxuZnVuY3Rpb24gcGFyc2VDaHJvbWUobGluZSkge1xuICB2YXIgcGFydHMgPSBjaHJvbWVSZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBpc05hdGl2ZSA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ25hdGl2ZScpID09PSAwOyAvLyBzdGFydCBvZiBsaW5lXG5cbiAgdmFyIGlzRXZhbCA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ2V2YWwnKSA9PT0gMDsgLy8gc3RhcnQgb2YgbGluZVxuXG4gIHZhciBzdWJtYXRjaCA9IGNocm9tZUV2YWxSZS5leGVjKHBhcnRzWzJdKTtcblxuICBpZiAoaXNFdmFsICYmIHN1Ym1hdGNoICE9IG51bGwpIHtcbiAgICAvLyB0aHJvdyBvdXQgZXZhbCBsaW5lL2NvbHVtbiBhbmQgdXNlIHRvcC1tb3N0IGxpbmUvY29sdW1uIG51bWJlclxuICAgIHBhcnRzWzJdID0gc3VibWF0Y2hbMV07IC8vIHVybFxuXG4gICAgcGFydHNbM10gPSBzdWJtYXRjaFsyXTsgLy8gbGluZVxuXG4gICAgcGFydHNbNF0gPSBzdWJtYXRjaFszXTsgLy8gY29sdW1uXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpbGU6ICFpc05hdGl2ZSA/IHBhcnRzWzJdIDogbnVsbCxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogaXNOYXRpdmUgPyBbcGFydHNbMl1dIDogW10sXG4gICAgbGluZU51bWJlcjogcGFydHNbM10gPyArcGFydHNbM10gOiBudWxsLFxuICAgIGNvbHVtbjogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gIH07XG59XG5cbnZhciB3aW5qc1JlID0gL15cXHMqYXQgKD86KCg/OlxcW29iamVjdCBvYmplY3RcXF0pPy4rKSApP1xcKD8oKD86ZmlsZXxtcy1hcHB4fGh0dHBzP3x3ZWJwYWNrfGJsb2IpOi4qPyk6KFxcZCspKD86OihcXGQrKSk/XFwpP1xccyokL2k7XG5cbmZ1bmN0aW9uIHBhcnNlV2luanMobGluZSkge1xuICB2YXIgcGFydHMgPSB3aW5qc1JlLmV4ZWMobGluZSk7XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwYXJ0c1syXSxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogW10sXG4gICAgbGluZU51bWJlcjogK3BhcnRzWzNdLFxuICAgIGNvbHVtbjogcGFydHNbNF0gPyArcGFydHNbNF0gOiBudWxsXG4gIH07XG59XG5cbnZhciBnZWNrb1JlID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/KD86XnxAKSgoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZXx3ZWJwYWNrfHJlc291cmNlfFxcW25hdGl2ZSkuKj98W15AXSpidW5kbGUpKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFxzKiQvaTtcbnZhciBnZWNrb0V2YWxSZSA9IC8oXFxTKykgbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbC9pO1xuXG5mdW5jdGlvbiBwYXJzZUdlY2tvKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gZ2Vja29SZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBpc0V2YWwgPSBwYXJ0c1szXSAmJiBwYXJ0c1szXS5pbmRleE9mKCcgPiBldmFsJykgPiAtMTtcbiAgdmFyIHN1Ym1hdGNoID0gZ2Vja29FdmFsUmUuZXhlYyhwYXJ0c1szXSk7XG5cbiAgaWYgKGlzRXZhbCAmJiBzdWJtYXRjaCAhPSBudWxsKSB7XG4gICAgLy8gdGhyb3cgb3V0IGV2YWwgbGluZS9jb2x1bW4gYW5kIHVzZSB0b3AtbW9zdCBsaW5lIG51bWJlclxuICAgIHBhcnRzWzNdID0gc3VibWF0Y2hbMV07XG4gICAgcGFydHNbNF0gPSBzdWJtYXRjaFsyXTtcbiAgICBwYXJ0c1s1XSA9IG51bGw7IC8vIG5vIGNvbHVtbiB3aGVuIGV2YWxcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlsZTogcGFydHNbM10sXG4gICAgbWV0aG9kTmFtZTogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICBhcmd1bWVudHM6IHBhcnRzWzJdID8gcGFydHNbMl0uc3BsaXQoJywnKSA6IFtdLFxuICAgIGxpbmVOdW1iZXI6IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogbnVsbCxcbiAgICBjb2x1bW46IHBhcnRzWzVdID8gK3BhcnRzWzVdIDogbnVsbFxuICB9O1xufVxuXG52YXIgamF2YVNjcmlwdENvcmVSZSA9IC9eXFxzKig/OihbXkBdKikoPzpcXCgoLio/KVxcKSk/QCk/KFxcUy4qPyk6KFxcZCspKD86OihcXGQrKSk/XFxzKiQvaTtcblxuZnVuY3Rpb24gcGFyc2VKU0MobGluZSkge1xuICB2YXIgcGFydHMgPSBqYXZhU2NyaXB0Q29yZVJlLmV4ZWMobGluZSk7XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaWxlOiBwYXJ0c1szXSxcbiAgICBtZXRob2ROYW1lOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuICAgIGFyZ3VtZW50czogW10sXG4gICAgbGluZU51bWJlcjogK3BhcnRzWzRdLFxuICAgIGNvbHVtbjogcGFydHNbNV0gPyArcGFydHNbNV0gOiBudWxsXG4gIH07XG59XG5cbnZhciBub2RlUmUgPSAvXlxccyphdCAoPzooKD86XFxbb2JqZWN0IG9iamVjdFxcXSk/W15cXFxcL10rKD86IFxcW2FzIFxcUytcXF0pPykgKT9cXCg/KC4qPyk6KFxcZCspKD86OihcXGQrKSk/XFwpP1xccyokL2k7XG5cbmZ1bmN0aW9uIHBhcnNlTm9kZShsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IG5vZGVSZS5leGVjKGxpbmUpO1xuXG4gIGlmICghcGFydHMpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlsZTogcGFydHNbMl0sXG4gICAgbWV0aG9kTmFtZTogcGFydHNbMV0gfHwgVU5LTk9XTl9GVU5DVElPTixcbiAgICBhcmd1bWVudHM6IFtdLFxuICAgIGxpbmVOdW1iZXI6ICtwYXJ0c1szXSxcbiAgICBjb2x1bW46IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogbnVsbFxuICB9O1xufVxuXG5leHBvcnQgeyBwYXJzZSB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/stacktrace-parser/dist/stack-trace-parser.esm.js\n");

/***/ })

};
;