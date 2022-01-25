let modalQt = 1
let cart = []
let modalkey = 0

const c = (el) => document.querySelector(el)
const cs = (el) => document.querySelectorAll(el)

cakeJson.map((item, index) => {
    let cakeItem = document.querySelector('.models .cake-item').cloneNode(true)

    cakeItem.setAttribute('data-key',index)

    //NOME DO BOLO
    cakeItem.querySelector('.cake-item--name').innerHTML = item.name
    //desc 
    cakeItem.querySelector('.cake-item--desc').innerHTML = item.description
    //preço
    cakeItem.querySelector('.cake-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    //imagem do bolo
    cakeItem.querySelector('.cake-item--img img').src = item.img

    cakeItem.querySelector('a').addEventListener('click',(e) => {

        e.preventDefault()

        let key = e.target.closest('.cake-item').getAttribute('data-key')

        modalQt = 1
        modalKey = key

       //pegando as informações do bolo
       c('.cakeInfo h1').innerHTML = cakeJson[key].name
       c('.cakeInfo--desc').innerHTML = cakeJson[key].description
       c('.cakeBig img').src = cakeJson[key].img
       c('.cakeInfo--actualPrice').innerHTML = `R$ ${cakeJson[key].price.toFixed(2)}`

       c('.cakeInfo--size.selected').classList.remove('selected')

       cs('.cakeInfo--size').forEach((size, sizeIndex) => {
           
            if(sizeIndex == 2){
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = cakeJson[key].sizes[sizeIndex]

        })

        c('.cakeInfo--qt').innerHTML = modalQt

        //colocar opacidade
        c('.cakeWindowArea').style.opacity = 0
        c('.cakeWindowArea').style.display = "flex"
        setTimeout(() =>{
            c('.cakeWindowArea').style.opacity = 1
        },200)
    })
    c('.cake-area').append(cakeItem)
})

function closeModal(){
    c('.cakeWindowArea').style.opacity = 0
    setTimeout(()=>{
        c('.cakeWindowArea').style.display = 'none'
    },500)
}
cs('.cakeInfo--cancelButton, .cakeInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal)
})
//botoões mais e menos
c('.cakeInfo--qtmais').addEventListener('click',()=>{
    modalQt++
    c('.cakeInfo--qt').innerHTML = modalQt
})

c('.cakeInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){
        modalQt--
        c('.cakeInfo--qt').innerHTML = modalQt
    }
})

//tamanho dos bolos
cs('.cakeInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click',(e) =>{
        c('.cakeInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

//AÇOES DO CARRINHO
c('.cakeInfo--addButton').addEventListener('click',()=>{

    let size = parseInt(c('.cakeInfo--size.selected').getAttribute('data-key'))

    let identifier = cakeJson[modalKey].id+'@'+size

    let key = cart.findIndex((item)=>item.identifier == identifier)
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:cakeJson[modalKey].id,
            size,
            qt:modalQt
        });
    }
    closeModal()
    updateCart()
})

function updateCart(){
    if(cart.length > 0 ){
        c('aside').classList.add('show')
        c('.cart').innerHTML = ''

        for(let i in cart){
            let cakeItem = cakeJson.find((item)=>item.id == cart[i].id)

            let cartItem = c('.models .cart--item').cloneNode(true)

            cartItem.querySelector('img').src = cakeItem.img

            //preenchendo o cakeName com template string
            let cakeName = `${cakeItem.name}`

            //preenchendo as informações
            cartItem.querySelector('.cart--item-nome').innerHTML = cakeName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            c('.cart').append(cartItem)
        }
    } else{
        c('aside').classList.remove('show')
    }
}
