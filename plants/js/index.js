console.log(``);

// Remove anchor link
onhashchange = e => {
  history.replaceState(null, "", e.oldURL);
};

// Handle for burger nav menu actions
const burgerMenuHandler = () => {
  const burgerBtn = document.querySelector('.header__nav_burger');
  const navMenu = document.querySelector('.header__nav_menu');
  const closeBtn = navMenu.querySelector('.close_cross');
  const navMenuLinks = navMenu.querySelectorAll('.header__nav_menu_item_link');
  let isNavMenuShows = false;

  const navMenuClickHandler = (e) => {
    if (e.target === burgerBtn) return;

    if (isNavMenuShows
      && (e.target === closeBtn
        || [...navMenuLinks].includes(e.target)
        || !navMenu.contains(e.target))
    ) hideNavMenu();
  };

  const showNavMenu = () => {
    navMenu.style.right = '15px';
    isNavMenuShows = true;
    document.addEventListener('click', navMenuClickHandler);
  };

  const hideNavMenu = () => {
    navMenu.style.right = '-120px';
    isNavMenuShows = false;
    document.removeEventListener('click', navMenuClickHandler);
  }

  burgerBtn.addEventListener('click', showNavMenu);
};

// Change active nav menu item
const changeActiveNavMenuItem = () => {
  const activeNavMenuItemHandler = (e) => {
    const navMenuItems = document.querySelectorAll('.header__nav_menu_item');
    const sections = document.querySelectorAll('section');
    const menuItemsCollection = [...navMenuItems].map(el => {
      const menuItem = el;
      const menuItemName = el.children[0].hash.slice(1);
      const sectionCoords = [...sections].find(el => el.id === menuItemName).getBoundingClientRect();
      return {menuItemName, menuItem, sectionCoords};
    });

    [...menuItemsCollection].forEach((el, ind, arr) => {
      if (el.sectionCoords.top > -150 && el.sectionCoords.top < 150) {
        if (!el.menuItem.classList.contains('active')) {
          arr.forEach(el => el.menuItem.classList.remove('active'));
          el.menuItem.classList.add('active');
        }
      }
    });
  };

  document.addEventListener('scroll', activeNavMenuItemHandler);
};

// Service section buttons actions
const serviceSectionHandler = () => {
  const buttons = document.querySelectorAll('.service_section_nav_menu_item_button');
  const items = document.querySelectorAll('.service_section_content_item');
  const activatedElements = [];

  const buttonClickHandler = e => {
    const action = e.target.dataset.action;

    // Add selected and remove non-selected services to array (max 2)
    if (activatedElements.includes(action)) {
      activatedElements.splice(activatedElements.indexOf(action), 1);
    } else if (activatedElements.length >= 2) {
      activatedElements.splice(0, 2, action);
    } else {
      activatedElements.push(action);
    }

    // Add active class for selected buttons
    [...buttons].forEach(el => {
      if (activatedElements.includes(el.dataset.action)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Add blur for non-selected items
    [...items].forEach(el => {
      const blurElement = el.querySelector('.service_section_content_item_blur');
      if (activatedElements.length && !activatedElements.includes(el.dataset.service)) {
        blurElement.style.width = '100%';
        blurElement.style.height = '100%';
        blurElement.style.left = '0%';
        blurElement.style.top = '0%';
      } else {
        blurElement.style.width = '0%';
        blurElement.style.height = '0%';
        blurElement.style.left = '50%';
        blurElement.style.top = '50%';
      }
    });
  };

  [...buttons].forEach(el => el.addEventListener('click', buttonClickHandler));
};

// Add event listeners after page loaded
window.addEventListener('load', burgerMenuHandler);
window.addEventListener('load', changeActiveNavMenuItem);
window.addEventListener('load', serviceSectionHandler);