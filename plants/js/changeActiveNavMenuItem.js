// Change active nav menu item
export const changeActiveNavMenuItem = () => {
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