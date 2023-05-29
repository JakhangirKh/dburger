const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'img/crazy.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'img/light.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'img/cheseeburger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 31000,
        img: 'img/dBurger.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

/* Кноки корзины внизу страницы */
const productBtns = document.querySelectorAll('.card__item_btn'),
    /* Общий блок меню корзины */
    productMenu = document.querySelector('.basket__inner'),
    /* кнопка корзины в навигации */
    basketBtn = document.querySelector('.basket'),
    /* Кнопка крестик в меню корзины */
    closeBasket = document.querySelector('.close'),
    /* Меню заказа внутри блока корзины */
    menuList = document.querySelector('.basket__list'),
    /* Стоимость общего заказа */
    totalPriceMenu = document.querySelector('.basket__down_price'),
    /* Кол-во общих заказов */
    productCount = document.querySelector('.basket__span'),
    closebg = document.querySelector('.body');




productBtns.forEach((item) => {
    item.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(btn) {

    let parent = btn.closest('.card'),
        parentId = parent.getAttribute('id');

    product[parentId].amount++;

    basket();
}


function basket() {

    let productArr = [],
        totalCount = 0;
    console.log(productArr);

    for (const key in product) {
        const pk = product[key];
        const productCard = document.querySelector(`#${pk.name.toLowerCase()}`),
            productIndicator = productCard.querySelector('.card__span')


        if (pk.amount) {
            productArr.push(pk)
            productIndicator.classList.add('active')
            productCount.classList.add('active')
            // totalCount = totalCount + pk.amount
            totalCount += pk.amount
            productIndicator.innerHTML = pk.amount;
        } else {
            productIndicator.classList.remove('active')
            productIndicator.innerHTML = 0;
        }
        productCount.innerHTML = totalCount;

    }
    menuList.innerHTML = ''

    for (let i = 0; i < productArr.length; i++) {
        menuList.innerHTML += menuItemBurger(productArr[i])
    }

    totalPriceMenu.innerHTML = totalSumProduct();

}


// basketBtn.addEventListener('click', () => {
//     productMenu.classList.toggle('active')
// })

// closeBasket.addEventListener('click', () => {
//     productMenu.classList.remove('active')
// })

document.addEventListener('click', event => {
    const clickBur = event.composedPath().includes(closeBasket)
    const productProMenu = event.composedPath().includes(productMenu)
    const clickCon = event.composedPath().includes(basketBtn)

    if (clickCon) {
        productMenu.classList.toggle('active')
    } else if (clickBur) {
        productMenu.classList.remove('active')
    } else if (productProMenu) {
        productMenu.classList.add('active')
    } else {
        productMenu.classList.remove('active')
    }
})


function menuItemBurger(productItem) {

    const { name, totalSum, amount, img } = productItem;

    return `       <div class="basket__list">
    <div class="basket__list_item">
        <div class="basket__list_left">
            <img src="${img}" alt="crazy">
            <div class="basket__list_desc">
                <h4 class="basket__list_desc-title">${name}</h4>
                <p class="basket__list_desc-text">${totalSum} сум</p>
            </div>
        </div>
        <div class="basket__btns" id="${name.toLowerCase()}__card">
            <button class="basket__btn minus" data-symbol="-">-</button>
            <output class="basket__count">${amount}</output>
            <button class="basket__btn plus" data-symbol="+">+</button>
        </div>
    </div>
</div>`

}

function totalSumProduct() {
    let totalSum = 0;
    
    for (const key in product) {
        totalSum += product[key].totalSum
        
    }
    return totalSum;
}



window.addEventListener('click', (e) => {
    const btn = e.target;


    if (btn.classList.contains('basket__btn')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.basket__btns')
        console.log(attr);
        console.log(parent);

        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0]
            if (attr == '+') {
                product[idProduct].amount++;
            } else if (attr == '-') {
                product[idProduct].amount--;
            }
            basket()
        }
    }



})



