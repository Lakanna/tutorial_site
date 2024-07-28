const basketList = document.querySelector('.js-basket-list');
const totalPriceLabel = document.querySelector('.js-total');
const clearBasketBtn = document.querySelector('.clear-cart-btn');

const LS_KEY = 'clientBasket';

let currentBasket = JSON.parse(localStorage.getItem(LS_KEY)) ?? [];

basketList.insertAdjacentHTML('afterbegin', basketMarkup(currentBasket));

clearBasketBtn.addEventListener('click', clearBasket);
basketList.addEventListener('click', handlerButton);

function handlerButton(evn) {
  const currentProduct = evn.target.closest('.cart-item');
  const currentProductId = Number(currentProduct.dataset.productId);
  console.log(currentProductId);
  const currentProductIndex = currentBasket.findIndex(
    ({ id }) => id === currentProductId
  );
  console.dir(currentProductIndex);

  if (evn.target.nodeName !== 'BUTTON') {
    return;
  }

  console.dir(evn.target);
  if (
    Number(evn.target.dataset.buttonId) === -1 &&
    currentBasket[currentProductIndex].qnt > 1
  ) {
    currentBasket[currentProductIndex].qnt -= 1;
    localStorage.setItem(LS_KEY, JSON.stringify(currentBasket));
    basketList.innerHTML = basketMarkup(currentBasket);
    totalPriceLabel.innerHTML = getTotalPrice(currentBasket);
  } else if (Number(evn.target.dataset.buttonId) === 1) {
    currentBasket[currentProductIndex].qnt += 1;
    localStorage.setItem(LS_KEY, JSON.stringify(currentBasket));
    basketList.innerHTML = basketMarkup(currentBasket);
    totalPriceLabel.innerHTML = getTotalPrice(currentBasket);
  } else if (Number(evn.target.dataset.buttonId) === 0) {
    removeItem(currentBasket[currentProductIndex]);
    if (!currentBasket.length) {
      totalPriceLabel.innerHTML = 'Your basket is empty';
      clearBasketBtn.hidden = true;
    }
  }
}

function removeItem(idx) {
  currentBasket.splice(idx, 1);
  localStorage.setItem(LS_KEY, JSON.stringify(currentBasket));
  basketList.innerHTML = basketMarkup(currentBasket);
  totalPriceLabel.innerHTML = getTotalPrice(currentBasket);
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

if (currentBasket.length) {
  totalPriceLabel.insertAdjacentHTML(
    'afterbegin',
    getTotalPrice(currentBasket)
  );
  clearBasketBtn.hidden = false;
} else {
  totalPriceLabel.insertAdjacentHTML('afterbegin', 'Your basket is empty');
}
