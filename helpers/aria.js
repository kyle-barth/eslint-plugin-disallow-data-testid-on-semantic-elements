const aria = require("aria-query");
const _ = require("lodash");

const elementRoles = aria.elementRoles.entries();
const ariaGenericElements = elementRoles
  .filter((elementRole) => _.flatten(elementRole).includes("generic"))
  .map((elementRole) => elementRole[0].name);

module.exports = {
  ariaGenericElements,
  elementRoles,
};
