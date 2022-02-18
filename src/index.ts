import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const relLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        'use for iff if then else end where with select implies': t.controlKeyword,
        'in not and or xor': t.operatorKeyword,
        'def': t.definitionKeyword,
        include: t.moduleKeyword,
        'as from': t.keyword,
        Boolean: t.bool,
        None: t.null,
        VariableName: t.variableName,
        PropertyName: t.propertyName,
        Comment: t.lineComment,
        BlockComment: t.blockComment,
        Number: t.number,
        String: t.string,
        FormatString: t.special(t.string),
        UpdateOp: t.updateOperator,
        ArithOp: t.arithmeticOperator,
        CompareOp: t.compareOperator,
        AssignOp: t.definitionOperator,
        At: t.meta,
        '( )': t.paren,
        '[ ]': t.squareBracket,
        '{ }': t.brace,
        '.': t.derefOperator,
        ', ;': t.separator,
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
})

export function rel() {
  return new LanguageSupport(relLanguage)
}
