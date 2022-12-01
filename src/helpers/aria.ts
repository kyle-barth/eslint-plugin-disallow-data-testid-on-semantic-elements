import { elementRoles as rawElementRoles } from 'aria-query';
import _ from 'lodash';

export const elementRoles = rawElementRoles.entries();
export const ariaGenericElements = elementRoles
  .filter((elementRole) => Array.from(elementRole[1]).includes('generic'))
  .map((elementRole) => elementRole[0].name);
