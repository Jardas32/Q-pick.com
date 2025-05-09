const storege = JSON.parse(localStorage.getItem('card')) || [];
const favoritStorege = JSON.parse(localStorage.getItem('favorits')) || [];
const cart = document.querySelector('.cart');
const maps = document.querySelector('.maps');
const oplata = document.querySelector('.oplata');
const korzinatext = document.querySelector('.korzinatext');
const totalPrice = document.querySelector('.totalPrice');
const bgcart = document.querySelector('.bgcart');
const interesCount = document.querySelector('.interesCount');
interesCount.textContent = favoritStorege.length;

function quantityPrice() {
    let total = storege.reduce((pre, item) => {
       return pre + item.price * item.quantity;

    },0)

    totalPrice.textContent = total.toLocaleString('ru-Ru') + ' ₸';
}

function renderCard() {

if(storege.length <= 0) {
    bgcart.style.alignItems = `center`;
    cart.style.display = `none`;
    maps.style.display = `none`;
    oplata.style.display = `none`;
    korzinatext.style.display = 'none';
    let emptycart = document.createElement('div');
    emptycart.setAttribute('class', 'emptycart');

    let imgempty = document.createElement('img');
    imgempty.setAttribute('class', 'imgempty');
    imgempty.setAttribute('src', `img/cartEmpty.png`);
    
    let emptytext = document.createElement('p')
    emptytext.setAttribute('class', 'emptytext');
    emptytext.textContent = 'Корзина пуста';

    let textispravit = document.createElement('p');
    textispravit.setAttribute('class', 'ispravit');
    textispravit.textContent = 'Но это никогда не поздно исправить :)';
    

    let acatalog = document.createElement('a');
    acatalog.setAttribute('href', 'index.html');
    acatalog.setAttribute('class', 'aCatalog');

    let bgcatalog = document.createElement('button');
    bgcatalog.setAttribute('class', 'bgcatalog');
    bgcatalog.textContent = 'В каталог товаров';
    
    bgcart.append(emptycart);
    emptycart.append(imgempty);
    emptycart.append(emptytext);
    emptycart.append(textispravit);
    emptycart.append(acatalog);
    acatalog.append(bgcatalog);
  
}

    cart.innerHTML = ``;
    document.querySelector('.countCart').textContent = storege.length;
    if(storege) {
        storege.forEach((el, index) => {
            let {id, img, title, price, quantity = 1} = el;
            let pricequantity = price * quantity;
            let priceString = pricequantity.toLocaleString('ru-Ru') + ' ₸';

            let newCart = document.createElement('div');
            newCart.setAttribute('class', 'newcard');
            newCart.setAttribute('id', id);
            newCart.innerHTML = `
            <img class="imgcard" src="${img}" alt="product">
            <p class="titlecard">${title}</p>
            <span class="pricecard">${priceString}</span>
            <div class="quantity">
             <button class="btMinus" data-index="${index}">-</button>
             <input class="inputValue" value="${quantity}">
             <button class="btPlus" data-index="${index}">+</button>
            </div>
            <img class="cardClosed" src="img/cardclosed.png" alt="closed">
            `;

            cart.appendChild(newCart);

        })
    }
    quantityPrice();
}

cart.addEventListener('click', (e) => {
    const cardPosition = e.target.getAttribute('data-index');
    const index = e.target.dataset.index;

    if(e.target.classList.contains('btPlus')) {
        storege[index].quantity++;
    }else if(e.target.classList.contains('btMinus')) {
            storege[index].quantity--;
        if(storege[index].quantity <= 0) {
            storege.splice(index, 1);
        }

    }else if(e.target.classList.contains('cardClosed') || cardPosition !== null) {
        storege.splice(cardPosition, 1);
    }

    localStorage.setItem('card', JSON.stringify(storege));
    renderCard();

});

renderCard();

//const btopen = document.querySelector('.btOpen');
//const spans1 = document.querySelector('.spans1');
//const spans2 = document.querySelector('.spans2');
//const spans3 = document.querySelector('.spans3');

//btopen.addEventListener('click', () => {
//   spans1.classList.toggle('open');
//   spans2.classList.toggle('open');
//   spans3.classList.toggle('open');
   
//});



