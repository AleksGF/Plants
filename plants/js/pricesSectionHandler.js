// Prices section handler
export const pricesSectionHandler = () => {
  const priceItems = document.querySelectorAll('.price_section_prices_content_item');

  const priceItemClickHandler = e => {
    const openBtn = e.target.closest('.price_section_prices_content_item');
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
    if (openBtn && ![...orderBtns].includes(e.target)) toggleActive(e.currentTarget);

    // Order buttons actions
    if ([...orderBtns].includes(e.target)) {
      window.location.replace(`${window.location.href}#contacts`);
    }
  };

  priceItems.forEach(el => {
    el.addEventListener('click', priceItemClickHandler)
  });
};