// Checks to see if the page is loaded and if not ensures that the code for all of the buttons will automatically work 
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}


function ready(){
//  Finding all remove buttons 
var removeBtns = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeBtns.length; i++){
    let btn = removeBtns[i]
    btn.addEventListener('click', removeItem)
    }
// Find purchase button
let purchaseBtn = document.getElementsByClassName('btn-purchase')[0]
if (purchaseBtn) {
    purchaseBtn.addEventListener('click', clearCart)
}

function removeItem(remove){
    let pushBtn = remove.target
    pushBtn.parentElement.parentElement.remove()
    updateTotal()
}

function clearCart(clear){
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let total = document.getElementsByClassName('cart-total')[0]
while ( cartItems.hasChildNodes(), total.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
    total.removeChild(total.firstChild)
}
}
let inputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < inputs.length; i++){
    let input = inputs[i]
    input.addEventListener('change', updateInput)
}

let cartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i < cartButtons.length; i++){
    let btn = cartButtons[i]
    btn.addEventListener('click', addToCart)
}
}

function addToCart(addItem){
let btn = addItem.target
let item = btn.parentElement.parentElement
let name = item.getElementsByClassName('shop-item-title')[0].innerHTML
let price = item.getElementsByClassName('shop-item-price')[0].innerHTML
let img = item.getElementsByClassName('shop-item-image')[0].src
putInCart(name, price, img)
updateTotal()

}

function putInCart(name, price, img){
    let row = document.createElement('div')
    row.classList.add('cart-row')
    let items = document.getElementsByClassName('cart-items')[0]
    let itemNames = items.getElementsByClassName('cart-item-title')
    for (var i = 0; i < itemNames.length; i++){
        if (itemNames[i].innerText == name){
         alert('item already in cart')
         return
        }
    }
    let rowContent =`
     <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width="100" height="100">
        <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
        row.innerHTML = rowContent
    items.append(row)
    row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem)
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateInput)
}

function updateInput(update){
    let input = update.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

function updateTotal(){
    
    // establishing the cart
    let cart = document.getElementsByClassName('cart-items')[0]
    // individual rows
    let rows = cart.getElementsByClassName('cart-row')
    let total = 0
    // looping over all the prices and quantities in the rows
    for (var i = 0; i < rows.length; i++){
        let row = rows[i]
        let prices = row.getElementsByClassName('cart-price')[0]
        let quantities = row.getElementsByClassName('cart-quantity-input')[0]
        // turns string into a float
        let price = parseFloat(prices.innerHTML.replace('$',''))
        let quantity = quantities.value
        total = total + (price * quantity)
    }
    total = Math.round(total *100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total
}
