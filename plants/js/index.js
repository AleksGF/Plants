import {burgerMenuHandler} from "./burgerMenuHandler.js";
import {changeActiveNavMenuItem} from "./changeActiveNavMenuItem.js";
import {serviceSectionHandler} from "./serviceSectionHandler.js";
import {pricesSectionHandler} from "./pricesSectionHandler.js";
import {contactsHandler} from "./contactsHandler.js";

// Add event listeners after page loaded
const handlers = [
  burgerMenuHandler,
  changeActiveNavMenuItem,
  serviceSectionHandler,
  pricesSectionHandler,
  contactsHandler
];

handlers.forEach((handler) => {
  window.addEventListener('load', handler);
});

// Remove anchor link
onhashchange = e => {
  history.replaceState(null, "", e.oldURL);
};