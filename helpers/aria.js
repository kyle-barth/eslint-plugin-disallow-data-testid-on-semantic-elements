import * as aria from "aria-query";
import _ from "lodash";

export const elementRoles = aria.elementRoles.entries();
export const ariaGenericElements = elementRoles
  .filter((elementRole) => _.flatten(elementRole).includes("generic"))
  .map((elementRole) => elementRole[0].name);
