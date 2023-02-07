// Contact section handler
export const contactsHandler = () => {
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

      contactBtn.onclick = () => {
        window.open(`tel:${address.phone}`);
      }

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