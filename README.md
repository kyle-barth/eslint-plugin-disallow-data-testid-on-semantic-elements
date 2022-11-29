## Follow up on the use of `.parentElement` chains in `ui-components` tests.

Example:

```js
const details = header.parentElement?.parentElement?.parentElement;
```

I've done some further investigation on this [here](https://github.com/DigitalInnovation/onyx/issues/4020), and I have detailed all 19 occurrences of where this is happening thus far in `ui-components` to better understand why this pattern has come about.

## Firstly, here are my two main concerns with this pattern:

1. It can be hard to tell what's actually being selected or how - in `accordion.spec.tsx` (1. the link above), it has 3 `.parentElements` when it looks like it should have 4 when looking at the source code. How this is working isn't important - what is important is it's hard to read.

2. Test is tied down to the implementation. As component structure changes, be it with future changes to the component or some props being provided to it etc, you have to then go update the test. `site-stripe.spec.tsx` (2. in the link above) - is a good show of this, the `.parentElement` chain has to change to select the same element in the same test because a different prop was provided which changes the structure of the component.

## Why has this pattern come about?

This has been an unforeseen result of the introduction of the ESLint rule disallowing `data-testid`. There are many other valid (and preferred) ways of selecting elements... _usually_. But as stated in this [article](https://betterprogramming.pub/why-you-should-avoid-testing-react-components-with-test-ids-ee50d20d37d2) (which might have also influenced us to make this decision in the first place), "in some cases it’s unavoidable", and with at least 18, maybe all 19 of the occurrences in `ui-components` I feel `data-testid` is the only method of selection - other than these `.parentElement` chains.

"It’s important to test our components in the same way users would interact with them" - this is right, but sometimes we will want to test something the user does not interact with, e.g. the user doesn't select random wrapping div's to see if they are scrollable for example.

I think removing the only way of selecting non-interactive, non-semantic, purely structural parts of the page, where no other method of selection makes sense and ultimately tie down the test to the implementation, we are going to see this pattern pile up.

The problem this leaves us with is we don't want to see `data-testid` get misused again just to select everything.

## Potential solution

Below I have an example of the basic structure for a custom ESLint rule where we could only allow `data-testid` for particular elements. This could be built up as simple or complex as we feel fit. E.g some elements we should never use `data-testid` on such as a `<li>` tag or an `<img>` tag, but others like a `<div>` it could be allowed on and provide useful error messages as shown in the example.

### Custom ESLint Rule:

```js
const validElements = ["list", "of", "valid", "elements"];

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallows use of data-testid on select elements",
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
          !validElements.includes(element) &&
          attributes.includes("data-testid")
        ) {
          context.report({
            node: node,
            message: `data-testid attribute is not allowed on ${element}`,
          });
        }
      },
    };
  },
};
```

Worth noting also - if we are concerned about `data-testid`'s cluttering up prod for whatever reason - we can always easily remove them as part of our [build step](https://dpericich.medium.com/removing-data-test-attributes-from-react-production-dom-5ea4ea018acc).
