import { ariaGenericElements } from './aria';

const genericElements = ariaGenericElements.toString().replace(',', ', ');
const genericError = `data-testid is disallowed on any ARIA generic element [e.g. ${genericElements}], that has a role or ARIA attribute, use byRole('', { ... }) or another appropriate query selection method instead.
For more information on best practices for querying elements: https://testing-library.com/docs/queries/about`;

const semanticError = `data-testid is disallowed on any semantic element, use byRole('', { ... }) or another appropriate query selection method instead.
For more information on best practices for querying elements: https://testing-library.com/docs/queries/about`;

export const errors = {
  genericError,
  semanticError,
};
