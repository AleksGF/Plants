// Handle for burger nav menu actions
export const burgerMenuHandler = () => {
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