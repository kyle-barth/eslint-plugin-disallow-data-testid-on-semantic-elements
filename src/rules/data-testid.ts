import { Rule } from 'eslint';
import { Node } from 'estree';

import {
  ariaGenericElements,
  getAttributes,
  getElement,
  errors,
} from '../helpers';

const containsARIAAttributes = (attributes: string[]) =>
  attributes.toString().replace(',', '').indexOf('aria') > -1 ||
  attributes.includes('role');

const containsTestId = (attributes: string[]) =>
  attributes.includes('data-testid') || attributes.includes('data-test-id');

const genericElement = (element: string) =>
  ariaGenericElements.includes(element);

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
      JSXElement: (node: Node) => {
        const element = getElement(node);
        const attributes = getAttributes(node);

        if (
          genericElement(element) &&
          containsTestId(attributes) &&
          containsARIAAttributes(attributes)
        ) {
          context.report({
            node: node,
            message: errors.genericError,
          });
        }

        if (!genericElement(element) && containsTestId(attributes)) {
          context.report({
            node: node,
            message: errors.semanticError,
          });
        }
      },
    };
  },
};

export = rule;
