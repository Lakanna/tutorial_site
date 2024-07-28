// *************Практика*************** \\
// Застосувати готові стилі з файлу style.css
// Потрібно створити інтернет-магазин в якому буде 2 сторінки.

// Сторінка Home має:
// 1 Містити картки товарів
// (приклад однієї картки https://prnt.sc/klV2uzLIcG8w)
// 2 На списку товарів реалізовано делегування подій на додавання товару в кошик
// 3 Для додавання товару в кошик використовуй LS
// 4 Під час додавання контролюй кількість доданих товарів, для цього створи в об'єкті доданого товару новий ключ quantity

// Сторінка Checkout має:
// 1 Список карток доданих товарів, кожна картка має містити кількість куплених товарів та загальна вартість за даний товар.
// (приклад однієї картки https://prnt.sc/ssZA4rzw1x9L)
// 2 Повідомлення про загальну вартість покупки, якщо кошик порожній, то повідомлення "Your basket is empty"
// 3 Кнопку для очищення кошика, після натискання на неї всі товари видаляються, а користувача перенаправляємо на сторінку Home

const products = [
  {
    id: 3,
    img: 'https://static.dnipro-m.ua/cache/products/1335/catalog_origin_325102.jpg',
    name: 'Шліфмашина',
    price: 1299,
    description:
      'Кутова шліфувальна машина Dnipro-M GS-98 – модель, яка поєднує в собі оптимальне співвідношення потужності, ваги та мобільності. Конструкція шліфмашини сприяє зручній та надійній роботі, навіть однією рукою. Низький рівень шуму та вібрації, двопозиційне розташування додаткової рукоятки під кутом 100 градусів, мінімізує втому під час шліфування.',
  },
  {
    id: 4,
    img: 'https://static.dnipro-m.ua/cache/products/8284/catalog_origin_322127.jpg',
    name: 'Пила',
    price: 11049,
    description:
      'Мобільна акумуляторна ланцюгова пила DCS-200BC DUAL призначена для обрізання зайвих гілок, спилювання дерев та чагарника, заготівлі дров, покрою будматеріалів та демонтажних робіт. Її просто використовувати у будь-яких місцях: на висоті, на виїзних роботах, у лісі або саду. При цьому Вам не потрібно буде турбуватися про підключення до мережі.',
  },
  {
    id: 5,
    img: 'https://static.dnipro-m.ua/cache/products/2024/catalog_origin_323413.jpg',
    name: 'Рівень',
    price: 897,
    description:
      'Рівень серії ProVision виробництва DNIPRO-M має не тільки високу точність вимірювань і чудові захисні властивості, а й надає максимальний комфорт користувачеві в процесі експлуатації.',
  },
  {
    id: 6,
    img: 'https://static.dnipro-m.ua/cache/products/6566/catalog_origin_316315.jpg',
    name: 'Тример',
    price: 3699,
    description:
      'Тример електричний Dnipro-M 110 призначений для покосу густої трави, а також кущів з діаметром стовбура до 10 мм.',
  },
  {
    id: 7,
    img: 'https://static.dnipro-m.ua/cache/products/6483/catalog_origin_325859.jpg',
    name: 'Мотокоса',
    price: 11049,
    description:
      "Мотокоса Dnipro-M 43 призначена для покосу трави, чагарників, бур'янів, газонів, а також для заготівлі сіна в невеликих масштабах.    Використовується для польових робіт на садовій ділянці площею до 2000 м2.",
  },
  {
    id: 8,
    img: 'https://static.dnipro-m.ua/cache/products/2745/catalog_origin_319770.jpg',
    name: 'Генератор',
    price: 10890,
    description:
      'Бензиновий генератор GX-25 номінальною потужністю 2,5 кВт забезпечить автономність побутових приладів на дачі або у приватному будинку. Ви зможете одночасно підключити до нього освітлення, холодильник, зарядку телефону, ноутбук та водяний насос.',
  },
];

const LS_KEY = 'clientBasket';

const productList = document.querySelector('.js-product-list');

productList.insertAdjacentHTML('afterbegin', createMarkup(products));

productList.addEventListener('click', handlerAddToBasket);

function handlerAddToBasket(evn) {
  if (!evn.target.classList.contains('js-add-product-btn')) {
    return;
  }

  const basket = JSON.parse(localStorage.getItem(LS_KEY)) ?? [];
  const indexProduct = Number(
    evn.target.closest('.js-product-card').dataset.productId
  );

  const currentProduct = products.find(({ id }) => id === indexProduct);
  const indexCurrentProduct = basket.findIndex(({ id }) => id === indexProduct);

  if (indexCurrentProduct === -1) {
    currentProduct.qnt = 1;
    basket.push(currentProduct);
  } else {
    basket[indexCurrentProduct].qnt += 1;
  }

  localStorage.setItem(LS_KEY, JSON.stringify(basket));
}

function createMarkup(arr) {
  return arr
    .map(
      ({ description, price, name, img, id }) => `
     <li class="product-card js-product-card" data-product-id=${id}>
          <img class="product-img" src="${img}" alt="${name}" />
          <h2 class="product-title">${name}</h2>
          <p class="product-description">${description}</p>
          <p class="product-price">Priсe ${price} грн</p>
          <button class="product-add-btn js-add-product-btn" type="button">Add to basket</button>
      </li>`
    )
    .join('');
}
