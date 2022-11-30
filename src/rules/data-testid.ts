import { Rule } from 'eslint'

import { ariaGenericElements } from '../helpers/aria'
import * as errors from '../helpers/errors'

const containsARIA = (attributes: string[]) =>
    attributes.toString().replace(',', '').indexOf('aria') > -1 ||
    attributes.includes('role')

const containsTestId = (attributes: string[]) =>
    attributes.includes('data-testid') || attributes.includes('data-test-id')

const genericElement = (element: string) =>
    ariaGenericElements.includes(element)

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        docs: {
            description:
                'Enforces best practices with data-testid by disallowing it on elements with semantic meaning or ARIA generic elements with ARIA attributes.',
        },
    },
    create: (context) => {
        return {
            JSXElement: (node) => {
                const element = node.openingElement.name.name
                const attributes = node.openingElement.attributes.map(
                    (attr) => attr.name.name
                )

                if (
                    genericElement(element) &&
                    containsTestId(attributes) &&
                    containsARIA(attributes)
                ) {
                    context.report({
                        node: node,
                        message: errors.genericError,
                    })
                }

                if (!genericElement(element) && containsTestId(attributes)) {
                    context.report({
                        node: node,
                        message: errors.semanticError,
                    })
                }
            },
        }
    },
}

export = rule
