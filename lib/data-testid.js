import * as aria from "../helpers/aria";
import * as errors from "../helpers/errors";

const attributesContainsARIA = (attributes) =>
  attributes.toString().replace(",", "").indexOf("aria") > -1;

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces best practices with data-testid by disallowing it on elements with semantic meaning or ARIA generic elements with ARIA attributes.",
    },
  },
  create: function (context) {
    return {
      JSXElement(node) {
        const element = node.openingElement.name.name;
        const attributes = node.openingElement.attributes.map(
          (attr) => attr.name.name
        );

        if (
          aria.ariaGenericElements.includes(element) &&
          attributes.includes("data-testid") &&
          (attributes.includes("role") || attributesContainsARIA(attributes))
        ) {
          context.report({
            node: node,
            message: errors.genericError,
          });
        }

        if (
          !aria.ariaGenericElements.includes(element) &&
          attributes.includes("data-testid")
        ) {
          context.report({
            node: node,
            message: errors.semanticError,
          });
        }
      },
    };
  },
};
