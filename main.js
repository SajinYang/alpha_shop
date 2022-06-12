const products = [{
  id: '1',
  name: '破壞補丁修身牛仔褲',
  price: 3999
}, {
  id: '2',
  name: '刷色直筒牛仔褲',
  price: 1299
}]

const form = document.querySelector('.form-panel')
const formParts = form.querySelectorAll('.part')
const stepsControl = document.querySelector('.step-control')
const steps = stepsControl.querySelectorAll('.step')
const btnControl = document.querySelector('.form-btn')
const btn = btnControl.querySelectorAll('.btn')
const cartOrder = document.getElementById('cart-order')
const formContent = document.querySelector('.part-2')
const freightFee = document.querySelector('.freight-fee')
const amountPrice = document.querySelector('.amount-price')
const dhlDelivery = document.querySelector('.dhl')
const normalDelivery = document.querySelector('.normal')
const navToolsContainer = document.querySelector('.nav-tools-container')
const html = document.querySelector('#html')
const modeIcon = document.querySelector('.mode')

let step = 0
let total = 0
let deliveryFee = ''

// step 步驟
function handleBtnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary')) {
    if (step === 2) {
      return
    }
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    if (step === 0) {
      return
    }
    const preStep = steps[step - 1]
    nowStep.classList.remove('active')
    preStep.classList.remove('checked')
    preStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnStatus()
}

// 表單上一步、下一步變化
function setBtnStatus(e) {
  const btnOutline = document.querySelector('.btn-outline')
  const btnPrimary = document.querySelector('.btn-primary')
  if (step === 0) {
    btnOutline.classList.remove('step-2')
    btnPrimary.classList.remove('step-2')
  } else {
    btnOutline.classList.add('step-2')
    btnPrimary.classList.add('step-2')
  }

  if (step === 2) {
    btnPrimary.innerHTML = `確認下單`
  } else {
    btnPrimary.innerHTML = `下一步&rarr;`
  }
}

// 單品項金額計算
function getCartOrderSubtotal(e) {
  const quantity = e.target.parentElement.children[1]
  let quantityValue = Number(quantity.innerText)
  const subTotal = e.target.parentElement.nextElementSibling
  const productId = e.target.dataset.id
  const price = products.find(e => e.id === productId).price

  if (e.target.matches('.btn-plus')) {
    quantityValue++
    const subTotalValue = quantityValue * price
    quantity.innerHTML = `<span class="quantity">${quantityValue}</span>`
    subTotal.innerHTML = `<div class="product-subtotal">$ ${(subTotalValue).toLocaleString()}</div>`
    // total += Number((subTotal.innerText).match(/\d+/g).join(''))
    total += price
  } else if (e.target.matches('.btn-reduce') && quantityValue > 0) {
    quantityValue--
    const subTotalValue = quantityValue * price
    quantity.innerHTML = `<span class="quantity">${quantityValue}</span>`
    subTotal.innerHTML = `<div class="product-subtotal">$ ${(subTotalValue).toLocaleString()}</div>`
    total -= price
  }
  amountPrice.innerText = `$${total}`
}


// 運費金額計算
function getDeliveryFee(e) {

  if (e.target.matches('.dhl')) {
    if (deliveryFee >= 500) {
      return
    }
    freightFee.innerText = `$500`
    deliveryFee = 500
    total += 500
    console.log(dhlDelivery)
    dhlDelivery.classList.add('border-black')
    normalDelivery.classList.remove('border-black')
  } else if (e.target.matches('.normal')) {
    if (deliveryFee >= 500) {
      deliveryFee = 0
      total -= 500
    }
    freightFee.innerText = `免費`
    dhlDelivery.classList.remove('border-black')
    normalDelivery.classList.add('border-black')
  }
  amountPrice.innerText = `$${total}`
}



// 深色、一般模式切換
function changeMode(e) {
  const target = e.target
  if (target.matches('.light-mode')) {
    html.dataset.theme = 'dark'
    modeIcon.innerHTML = `<use href="public/icon/sun.svg#sun"></use>`
    target.classList.remove('light-mode')
    target.classList.add('dark-mode')
  } else if (target.matches('.dark-mode')) {
    html.dataset.theme = 'light'
    modeIcon.innerHTML = `<use href="public/icon/moon.svg#Layer_1"></use>`
    target.classList.remove('dark-mode')
    target.classList.add('light-mode')
  }
}


btnControl.addEventListener('click', handleBtnControlClicked)
cartOrder.addEventListener('click', getCartOrderSubtotal)
formContent.addEventListener('click', getDeliveryFee)
navToolsContainer.addEventListener('click', changeMode)