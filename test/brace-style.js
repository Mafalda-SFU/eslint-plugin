/**
 * @fileoverview Tests for one-true-brace rule.
 * @author Ian Christian Myers
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {RuleTester} = require('eslint');

const rule = require('../lib/rules/brace-style.js');


/**
 * Prevents leading spaces in a multiline template literal from appearing in the
 * resulting string
 * @param {string[]} strings The strings in the template literal
 * @param {any[]} values The interpolation values in the template literal.
 * @returns {string} The template literal, with spaces removed from all lines
 */
function unIndent(strings, ...values)
{
  const text = strings
    .map((s, i) => (i === 0 ? s : values[i - 1] + s))
    .join('');
  const lines = text.replace(/^\n/u, '').replace(/\n\s*$/u, '')
    .split('\n');
  const lineIndents = lines.filter(line => line.trim())
    .map(line => line.match(/ */u)[0].length);
  const minLineIndent = Math.min(...lineIndents);

  return lines.map(line => line.slice(minLineIndent)).join('\n');
}


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 6}});

ruleTester.run('brace-style', rule, {
  invalid: [
    {
      code: unIndent`
        try {
          bar();
        }
        catch (e) {
        }
        finally {
        }`,
      errors: [
        {line: 1, messageId: 'sameLineOpen', type: 'Punctuator'},
        {line: 4, messageId: 'sameLineOpen', type: 'Punctuator'},
        {line: 6, messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'try \n{\n  bar();\n}\ncatch (e) \n{\n}\nfinally \n{\n}'
    },
    {
      code: unIndent`
        switch(x) { case 1:
          bar(); }
      `,
      errors: [
        {line: 1, messageId: 'sameLineOpen', type: 'Punctuator'},
        {line: 1, messageId: 'blockSameLine', type: 'Punctuator'},
        {line: 2, messageId: 'singleLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'switch(x) \n{\n case 1:\n  bar(); \n}'
    },
    {
      code: 'if (a) { \nb();\n } else { \nc();\n }',
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineClose', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'if (a) \n{ \nb();\n }\n else \n{ \nc();\n }'
    },
    {
      code: unIndent`
        if (foo) {
          baz();
        } else if (bar) {
          baz();
        }
        else {
          qux();
        }`,
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineClose', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'if (foo) \n{\n  baz();\n}\n else if (bar) \n{\n  baz();\n}\nelse'
      + ' \n{\n  qux();\n}'
    },
    {
      code: unIndent`
        if (foo)
        { poop();
        }
        else if (bar) {
          baz();
        } else if (thing) {
          boom();
        }
        else {
          qux();
        }
      `,
      errors: [
        {messageId: 'blockSameLine', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineClose', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'if (foo)\n{\n poop();\n}\nelse if (bar) \n{\n  baz();\n}\n else '
      + 'if (thing) \n{\n  boom();\n}\nelse \n{\n  qux();\n}'
    },
    {
      code: 'if (foo)\n{\n  bar(); }',
      errors: [
        {messageId: 'singleLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'if (foo)\n{\n  bar(); \n}'
    },
    {
      code: 'try\n{\n  somethingRisky();\n} catch (e)\n{\n  handleError()\n}',
      errors: [
        {messageId: 'sameLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: 'try\n{\n  somethingRisky();\n}\n catch (e)\n{\n  handleError()\n'
      + '}'
    },

    // allowSingleLine: true
    {
      code: 'if (foo)\n{ poop();\n} \nelse if (bar) {\nbaz();\n} else if '
      + '(thing) {\nboom();\n}\nelse {\nqux();\n}',
      errors: [
        {messageId: 'blockSameLine', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineClose', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline', {allowSingleLine: true}],
      output: 'if (foo)\n{\n poop();\n} \nelse if (bar) \n{\nbaz();\n}\n else '
      + 'if (thing) \n{\nboom();\n}\nelse \n{\nqux();\n}'
    },

    {
      code: 'if (foo)\n{\n bar\n.baz }',
      errors: [{messageId: 'singleLineClose', type: 'Punctuator'}],
      options: ['allman-multiline'],
      output: 'if (foo)\n{\n bar\n.baz \n}'
    },
    {
      code: 'if (foo) { bar\n.baz }',
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'blockSameLine', type: 'Punctuator'},
        {messageId: 'singleLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline', {allowSingleLine: true}],
      output: 'if (foo) \n{\n bar\n.baz \n}'
    },
    {
      code: 'class Foo{\n}',
      errors: [{messageId: 'sameLineOpen', type: 'Punctuator'}],
      options: ['allman-multiline'],
      output: 'class Foo\n{\n}'
    },
    {
      code: '(class {\n})',
      errors: [{messageId: 'sameLineOpen', type: 'Punctuator'}],
      options: ['allman-multiline'],
      output: '(class \n{\n})'
    },

    /*
     * class static blocks
     *
     * Note about the autofix: this rule only inserts linebreaks and removes
     * linebreaks. It does not aim to produce code with a valid indentation.
     * Indentation and other formatting issues are expected to be fixed by
     * `indent` and other rules in subsequent iterations.
     */
    {
      code: unIndent`
        class C
        {
          static{
            foo;
          }
        }
      `,
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: unIndent`
        class C
        {
          static
        {
            foo;
          }
        }
      `,
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static
          {foo;
          }
        }
      `,
      errors: [
        {messageId: 'blockSameLine', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: unIndent`
        class C
        {
          static
          {
        foo;
          }
        }
      `,
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static
          {
            foo;}
        }
      `,
      errors: [
        {messageId: 'singleLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: unIndent`
        class C
        {
          static
          {
            foo;
        }
        }
      `,
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static{foo;}
        }
      `,
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'},
        {messageId: 'blockSameLine', type: 'Punctuator'},
        {messageId: 'singleLineClose', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: unIndent`
        class C
        {
          static
        {
        foo;
        }
        }
      `,
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static{}
        }
      `,
      errors: [
        {messageId: 'sameLineOpen', type: 'Punctuator'}
      ],
      options: ['allman-multiline'],
      output: unIndent`
        class C
        {
          static
        {}
        }
      `,
      parserOptions: {ecmaVersion: 2022}
    }
  ],

  valid: [
    {code: 'if (foo)\n{\n}\nelse\n{\n}', options: ['allman-multiline']},
    {
      code: 'try\n{\n bar();\n}\ncatch (e)\n{\n baz(); \n}',
      options: ['allman-multiline']
    },

    // allowSingleLine: true
    {
      code: 'if (foo) {}\nelse {}',
      options: ['allman-multiline', {allowSingleLine: true}]
    },
    {
      code: 'try {  bar(); }\ncatch (e) { baz();  }',
      options: ['allman-multiline', {allowSingleLine: true}]
    },
    {
      code: 'var foo = () => { return; }',
      options: ['allman-multiline', {allowSingleLine: true}],
      parserOptions: {ecmaVersion: 6}
    },
    {
      code: 'switch(x) \n{ \n case 1: \nbar(); \n }\n ',
      options: ['allman-multiline']
    },
    {
      code: 'switch(x) {}',
      options: ['allman-multiline', {allowSingleLine: true}]
    },
    {
      code: 'class Foo\n{\n}',
      options: ['allman-multiline']
    },
    {
      code: '(class\n{\n})',
      options: ['allman-multiline']
    },
    {
      code: 'class\nFoo\n{\n}',
      options: ['allman-multiline']
    },
    {
      code: 'class Foo {}',
      options: ['allman-multiline', {allowSingleLine: true}]
    },
    {
      code: '(class {})',
      options: ['allman-multiline', {allowSingleLine: true}]
    },

    // class static blocks
    {
      code: unIndent`
        class C
        {
          static
          {
            foo;
          }
        }
      `,
      options: ['allman-multiline'],
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static
          {}
        }
      `,
      options: ['allman-multiline'],
      parserOptions: {ecmaVersion: 2022}
    },
    {
      code: unIndent`
        class C
        {
          static {}

          static { foo; }

          static
          { foo; }
        }
      `,
      options: ['allman-multiline', {allowSingleLine: true}],
      parserOptions: {ecmaVersion: 2022}
    },

    // allman-multiline
    {
      code: unIndent`
        try
        {
          bar();
        }
        catch (
          e
        ) {}
        finally
        {}
      `,
      options: ['allman-multiline']
    },
    {
      code: 'switch(\n  x\n) {\ncase 1: \nbar();\n}\n ',
      options: ['allman-multiline']
    },
    {
      code: unIndent`
        if (
          a
        ) {
          b();
        }
        else
        {
          c();
        }
      `,
      options: ['allman-multiline']
    },
    {
      code: unIndent`
        if (
          foo
        ) {
          baz();
        }
        else if (
          bar
        ) {
          baz();
        }
        else
        {
          qux();
        }
      `,
      options: ['allman-multiline']
    },
    {
      code: unIndent`
        if (
          foo
        )
        {
          poop();
        }
        else if (
          bar
        ) {
          baz();
        }
        else if (
          thing
        ) {
          boom();
        }
        else
        {
          qux();
        }
      `,
      options: ['allman-multiline']
    },
    {
      code: 'if (\n  foo\n)\n{\n  bar();\n}',
      options: ['allman-multiline']
    },
    {
      code: 'try\n{\n  somethingRisky();\n}\ncatch (\ne\n)\n{\n  handleError()'
      + '\n}',
      options: ['allman-multiline']
    },
    {
      code: 'if (\nfoo\n)\n{\n  bar\n  .baz\n}',
      options: ['allman-multiline']
    }
  ]
});
