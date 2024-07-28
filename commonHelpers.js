import"./assets/styles-e61fb95b.js";const s=document.querySelector(".js-basket-list"),o=document.querySelector(".js-total"),c=document.querySelector(".clear-cart-btn"),l="clientBasket";let t=JSON.parse(localStorage.getItem(l))??[];t.length?(o.insertAdjacentHTML("afterbegin",`Total price = ${d(t)} грн.
    Вдалий вибір 👍`),c.hidden=!1):o.insertAdjacentHTML("afterbegin","Your basket is empty");s.insertAdjacentHTML("afterbegin",b(t));c.addEventListener("click",f);s.addEventListener("click",p);function p(e){const r=e.target.closest(".cart-item"),a=Number(r.dataset.productId),n=t.findIndex(({id:i})=>i===a);e.target.nodeName==="BUTTON"&&(Number(e.target.dataset.buttonId)===-1&&t[n].qnt>1?(t[n].qnt-=1,u()):Number(e.target.dataset.buttonId)===1?(t[n].qnt+=1,u()):Number(e.target.dataset.buttonId)===0&&(g(t[n]),t.length||(o.innerHTML="Your basket is empty",c.hidden=!0)))}function u(){localStorage.setItem(l,JSON.stringify(t)),s.innerHTML=b(t),o.innerHTML=d(t)}function g(e){t.splice(e,1),u()}function f(){t=[],localStorage.removeItem(l),c.hidden=!0,window.location="../index.html"}function d(e){return e.reduce((r,{price:a,qnt:n})=>r+=a*n,0)}function b(e){return e.map(({qnt:r,price:a,name:n,img:i,id:m})=>`
       <li class="cart-item" data-product-id="${m}">
           <img class="product-img" src="${i}" alt="${n}" />
           <h2 class="product-title">${n}</h2>
           <p>Quantity = ${r}</p>
           <p class="product-price-cart">Total price = ${a*r} грн</p>
            <ul class="button-list">
               <li><button class="product-remove-btn" type="button" data-button-id="-1">-1</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='0'>Remove from basket</button></li>
               <li><button class="product-remove-btn" type="button" data-button-id='1'>+1</button></li>
            </ul>
       </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
