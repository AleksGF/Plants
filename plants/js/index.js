import {burgerMenuHandler} from "./burgerMenuHandler";
import {changeActiveNavMenuItem} from "./changeActiveNavMenuItem";
import {serviceSectionHandler} from "./serviceSectionHandler";
import {pricesSectionHandler} from "./pricesSectionHandler";
import {contactsHandler} from "./contactsHandler";

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

console.log(`1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service.
2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах.
3. В разделе contacts реализован select с выбором городов.`);