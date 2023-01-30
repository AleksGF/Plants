console.log(`1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service.
2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах.
3. В разделе contacts реализован select с выбором городов.`);

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
    buttons.forEach(el => {
      if (activatedElements.includes(el.dataset.action)) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Add blur for non-selected items
    items.forEach(el => {
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

  buttons.forEach(el => el.addEventListener('click', buttonClickHandler));
};

// Prices section handler
const pricesSectionHandler = () => {
  const priceItems = document.querySelectorAll('.price_section_prices_content_item');

  const priceItemClickHandler = e => {
    const openBtns = document.querySelectorAll('.price_section_prices_content_item_btn');
    const orderBtns = document.querySelectorAll('.price_section_prices_content_item_button');

    const toggleActive = targetItem => {
      priceItems.forEach(item => {
        if (item === targetItem) {
          item.classList.toggle('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    // Open-Close buttons actions
    if ([...openBtns].includes(e.target)) toggleActive(e.currentTarget);

    // Order buttons actions
    if ([...orderBtns].includes(e.target)) {
      window.location.replace(`${window.location.href}#contacts`);
    }
  };

  priceItems.forEach(el => {
    el.addEventListener('click', priceItemClickHandler)
  });
};

// Contact section handler
const contactsHandler = () => {
  const contactsAddresses = [
    {city: 'Canandaigua, NY', phone: '+15853930001', address: '151 Charlotte Street'},
    {city: 'New York City', phone: '+12124560002', address: '9 East 91st Street'},
    {city: 'Yonkers, NY', phone: '+19146780003', address: '511 Warburton Ave'},
    {city: 'Sherrill, NY', phone: '+13159080004', address: '14 WEST Noyes BLVD'}
  ];

  const contactSelectBtn = document.querySelector('.contacts_section_btn');
  let isSelectOpen = false;
  let isContactSelected = false;
  const contactSelectBtnText = contactSelectBtn.querySelector('.contacts_section_btn_text');
  const selectOptionContainer = document.querySelector('.contacts_section_btn_options');
  const addressContainer = document.querySelector('.contacts_section_content');

  const outsideClickHandler = e => {
    if (contactSelectBtn.contains(e.target)) return;
    if (selectOptionContainer.contains(e.target)) return;

    toggleSelectBtn();
  };

  const toggleSelectBtn = () => {
    if (!isSelectOpen) {
      document.addEventListener('click', outsideClickHandler);
    } else {
      document.removeEventListener('click', outsideClickHandler);
    }

    contactSelectBtn.classList.toggle('open');
    isSelectOpen = !isSelectOpen;
  };

  const toggleShowAddress = address => {
    if (address) {
      const cityField = addressContainer.querySelector('.contacts_section_content_cityField');
      const phoneField = addressContainer.querySelector('.contacts_section_content_phoneField');
      const addressField = addressContainer.querySelector('.contacts_section_content_addressField');
      const contactBtn = addressContainer.querySelector('.contacts_section_content_callUs_btn');

      contactSelectBtnText.innerHTML = address.city || 'City';
      cityField.innerHTML = address.city || '';
      phoneField.innerHTML = address.phone ? `${
        address.phone.slice(0, 2)}&nbsp${
        address.phone.slice(2, 5)}&nbsp${
        address.phone.slice(5, 8)}&nbsp${
        address.phone.slice(8)}` : '';
      addressField.innerHTML = address.address || '';

      contactBtn.addEventListener('click', () => {
        window.open(`tel:${address.phone}`);
      });

      contactSelectBtn.classList.add('selected');
      isContactSelected = true;
    } else {
      contactSelectBtn.classList.remove('selected');
      isContactSelected = false;
    }
  }

  contactsAddresses.forEach(address => {
    const cityClickHandler = () => {
      toggleShowAddress(address);
      toggleSelectBtn();
    };

    const element = document.createElement('div');
    element.setAttribute('class', 'contacts_section_btn_optionsItem');
    element.setAttribute('data-city', address.city);
    element.innerHTML = address.city;
    element.addEventListener('click', cityClickHandler);
    selectOptionContainer.append(element);
  });

  const contactSelectHandler = e => {
    if (!isSelectOpen) {
      toggleSelectBtn();
    } else {
      toggleSelectBtn();
      contactSelectBtnText.innerHTML = 'City';
      toggleShowAddress();
    }
  };

  contactSelectBtn.addEventListener('click', contactSelectHandler);
};

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
