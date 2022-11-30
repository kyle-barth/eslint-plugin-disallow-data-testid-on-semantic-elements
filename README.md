# eslint-plugin-disallow-data-testid-on-semantic-elements

Enforces best practices with `data-testid` as dictated by the React-Testing-Library Docs, by disallowing it on elements with semantic meaning or ARIA generic elements with ARIA attributes.

- [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [React-Testing-Library Docs](https://testing-library.com/docs/queries/bytestid/)
- [aria-query](https://github.com/A11yance/aria-query)

```html
✅ Valid - ARIA Generic element, so isn't a better way of selecting element from test
<div data-testid="test">
    ...
</div>

❌ Invalid - element has ARIA semantic attributes, and should be selected with them 
<div data-testid="test" role="something" aria-label="howdy">
    ...
</div>

❌ Invalid - semantic element's should avoid use of data-testid 
<ul data-testid="test">
    ...
</ul>

❌ Invalid - same as above, alternate spelling 
<ul data-test-id="test">
    ...
</ul>
```

# Installation
```bash
pnpm i -D eslint-plugin-disallow-data-testid-on-semantic-elements
# OR
yarn add --dev eslint-plugin-disallow-data-testid-on-semantic-elements
# OR
npm i --save-dev eslint-plugin-disallow-data-testid-on-semantic-elements
```

## Functional Requirements for ESLint rule

- Allows `data-testid`'s use on any ARIA generic element, this uses [aria-query](https://www.npmjs.com/package/aria-query) for the current accessibility web standards.
- If an ARIA generic element has a role or any ARIA attribute, disallow use of `data-testid`
- should provide descriptive error messages for correct `data-testid` usage on semantic and generic elements.
- Same rules for `data-test-id` to account for typos!

## References

General project structure / best practices taken from [eslint-plugin-tutorial](https://github.com/Quramy/eslint-plugin-tutorial)