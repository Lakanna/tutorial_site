import"./assets/styles-e61fb95b.js";const i=document.querySelector(".js-basket-list"),a=document.querySelector(".js-total"),u=document.querySelector(".clear-cart-btn"),c="clientBasket";let t=JSON.parse(localStorage.getItem(c))??[];i.insertAdjacentHTML("afterbegin",l(t));u.addEventListener("click",p);i.addEventListener("click",m);function m(e){const r=e.target.closest(".cart-item"),o=Number(r.dataset.productId);console.log(o);const n=t.findIndex(({id:d})=>d===o);console.dir(n),e.target.nodeName==="BUTTON"&&(console.dir(e.target),Number(e.target.dataset.buttonId)===-1&&t[n].qnt>1?(t[n].qnt-=1,localStorage.setItem(c,JSON.stringify(t)),i.innerHTML=l(t),a.innerHTML=s(t)):Number(e.target.dataset.buttonId)===1?(t[n].qnt+=1,localStorage.setItem(c,JSON.stringify(t)),i.innerHTML=l(t),a.innerHTML=s(t)):Number(e.target.dataset.buttonId)===0&&(g(t[n]),t.length||(a.innerHTML="Your basket is empty",u.hidden=!0)))}function g(e){t.splice(e,1),localStorage.setItem(c,JSON.stringify(t)),i.innerHTML=l(t),a.innerHTML=s(t)}function p(){t=[],localStorage.removeItem(c),u.hidden=!0,window.location="../index.html"}function s(e){return e.reduce((r,{price:o,qnt:n})=>r+=o*n,0)}function l(e){return e.map(({qnt:r,price:o,name:n,img:d,id:b})=>`
       <li class="cart-item" data-product-id="${b}">
           <img class="product-img" src="${d}" alt="${n}" />
           <h2 class="product-title">${n}</h2>
           <p>Quantity = ${r}</p>
           <p class="product-price-cart">Total price = ${o*r} грн</p>
            <ul class="button-list">
               <li><button class="product-remove-btn" type="button" data-button-id="-1">-1</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='0'>Remove from basket</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='1'>+1</button></li>
            </ul>
       </li>`).join("")}t.length?(a.insertAdjacentHTML("afterbegin",s(t)),u.hidden=!1):a.insertAdjacentHTML("afterbegin","Your basket is empty");
//# sourceMappingURL=commonHelpers.js.map
