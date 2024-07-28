const basketList = document.querySelector('.js-basket-list');
const totalPriceLabel = document.querySelector('.js-total');
const clearBasketBtn = document.querySelector('.clear-cart-btn');

const LS_KEY = 'clientBasket';

let currentBasket = JSON.parse(localStorage.getItem(LS_KEY)) ?? [];

if (currentBasket.length) {
  totalPriceLabel.insertAdjacentHTML(
    'afterbegin',
    `Total price = ${getTotalPrice(currentBasket)} грн.
    Вдалий вибір 👍`
  );
  clearBasketBtn.hidden = false;
} else {
  totalPriceLabel.insertAdjacentHTML('afterbegin', 'Your basket is empty');
}

basketList.insertAdjacentHTML('afterbegin', basketMarkup(currentBasket));

clearBasketBtn.addEventListener('click', clearBasket);

basketList.addEventListener('click', handlerChangeQuantity);

/**
 * функція для відстеження кнопок зміни кількості одиниць вибраного товару в корзині
 * @param {*} evn
 * @returns
 */
function handlerChangeQuantity(evn) {
  const currentProduct = evn.target.closest('.cart-item');
  const currentProductId = Number(currentProduct.dataset.productId);
  const currentProductIndex = currentBasket.findIndex(
    ({ id }) => id === currentProductId
  );

  if (evn.target.nodeName !== 'BUTTON') {
    return;
  }

  if (
    Number(evn.target.dataset.buttonId) === -1 &&
    currentBasket[currentProductIndex].qnt > 1
  ) {
    currentBasket[currentProductIndex].qnt -= 1;
    changeQuantity();
  } else if (Number(evn.target.dataset.buttonId) === 1) {
    currentBasket[currentProductIndex].qnt += 1;
    changeQuantity();
  } else if (Number(evn.target.dataset.buttonId) === 0) {
    removeItem(currentBasket[currentProductIndex]);
    if (!currentBasket.length) {
      totalPriceLabel.innerHTML = 'Your basket is empty';
      clearBasketBtn.hidden = true;
    }
  }
}

function changeQuantity() {
  localStorage.setItem(LS_KEY, JSON.stringify(currentBasket));
  basketList.innerHTML = basketMarkup(currentBasket);
  totalPriceLabel.innerHTML = getTotalPrice(currentBasket);
}

function removeItem(idx) {
  currentBasket.splice(idx, 1);
  changeQuantity();
}

function clearBasket() {
  currentBasket = [];
  localStorage.removeItem(LS_KEY);
  clearBasketBtn.hidden = true;
  window.location = '../index.html';
}

function getTotalPrice(arr) {
  return arr.reduce((acc, { price, qnt }) => {
    return (acc += price * qnt);
  }, 0);
}

function basketMarkup(arr) {
  return arr
    .map(
      ({ qnt, price, name, img, id }) => `
       <li class="cart-item" data-product-id="${id}">
           <img class="product-img" src="${img}" alt="${name}" />
           <h2 class="product-title">${name}</h2>
           <p>Quantity = ${qnt}</p>
           <p class="product-price-cart">Total price = ${price * qnt} грн</p>
            <ul class="button-list">
               <li><button class="product-remove-btn" type="button" data-button-id="-1">-1</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='0'>Remove from basket</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='1'>+1</button></li>
            </ul>
       </li>`
    )
    .join('');
}
