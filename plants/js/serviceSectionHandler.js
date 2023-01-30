// Service section buttons actions
export const serviceSectionHandler = () => {
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