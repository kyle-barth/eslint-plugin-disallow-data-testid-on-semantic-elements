import { JSXAttribute, JSXElement, JSXIdentifier } from 'estree-jsx';

export const getElement = (node: unknown) =>
  ((node as JSXElement).openingElement.name as JSXIdentifier).name;

export const getAttributes = (node: unknown) =>
  (node as JSXElement).openingElement.attributes.map(
    (attr) => (attr as JSXAttribute).name.name as string
  );
