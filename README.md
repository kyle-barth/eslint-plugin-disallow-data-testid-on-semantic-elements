# eslint-plugin-disallow-data-testid-on-semantic-elements

Enforces best practices with `data-testid` by disallowing it on elements with semantic meaning or ARIA generic elements with ARIA attributes.

## Functional Requirements for ESLint rule

- Allows `data-testid`'s use on any ARIA generic element, this uses [aria-query](https://www.npmjs.com/package/aria-query) for the current accessibility web standards.
- If an ARIA generic element has a role or any ARIA attribute, disallow use of `data-testid`
- should provide descriptive error messages for correct `data-testid` usage on semantic and generic elements.
- Same rules for `data-test-id` to account for typos!
