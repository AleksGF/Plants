console.log(`
`);

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

// Add event listeners after page loaded
window.addEventListener('load', burgerMenuHandler);
window.addEventListener('load', changeActiveNavMenuItem);