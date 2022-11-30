import { RuleTester } from 'eslint'

import * as errors from '../helpers/errors'
import rule from './data-testid'

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
})

const genReactFunc = (JSX: string) => `const func2 = () => {
  return ${JSX};
}`

ruleTester.run(
    'eslint-plugin-disallow-data-testid-on-semantic-elements',
    rule,
    {
        valid: [
            {
                code: genReactFunc(`<div></div>`),
            },
            {
                code: genReactFunc(`<div data-testid="test"></div>`),
            },
        ],

        invalid: [
            {
                code: genReactFunc(
                    `<div data-testid="test" role="test"></div>`
                ),
                errors: [
                    {
                        message: errors.genericError,
                    },
                ],
            },
            {
                code: genReactFunc(
                    `<div data-testid="test" aria-label="test"></div>`
                ),
                errors: [
                    {
                        message: errors.genericError,
                    },
                ],
            },
            {
                code: genReactFunc(
                    `<div data-testid="test" role="test" aria-label="test"></div>`
                ),
                errors: [
                    {
                        message: errors.genericError,
                    },
                ],
            },
            {
                code: genReactFunc(`<ul data-testid="test" role="test"></ul>`),
                errors: [
                    {
                        message: errors.semanticError,
                    },
                ],
            },
        ],
    }
)
