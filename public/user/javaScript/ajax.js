function addToWishlist(proId) {
    fetch('/addWishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proId })
    })
      .then(res => res.json())
      .then(data => { 
        if(data.alreadyExist){
          swal("Product already in wishlist")
        }else{
        $("#wishlistColour"+proId).css("background-color","#7B3F00"); 
        $('#wishlistColourSingle'+proId).css("background-color","#7B3F00"); 
        swal("", "Product added to wishlist", "success")
        console.log('success') }
        })
      .catch(error => {
        console.log(error.message)
        swal("You need to login first for adding product to wishlist", {
            buttons: ["Cancel", 'Go to Login']
          }).then((response) => {
            if(response){
            location.href = '/login'
            }
          })
      });
  }

function removeWishlist(proId) {

   swal({
      title:"Remove Item",
      text:"Do you want to remove the item from wishlist",
      icon:'warning',
      buttons:["Cancel","remove"]
    }).then((ok)=>{
        if(ok){
            fetch('/removeWishlist', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ proId })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    location.reload()
                })
                .catch(e => console.log(e))
                .finally(() => console.log('all done'))
        }
    })

}



function addToCart(proId) {
    
    $.ajax({
        url: '/addToCart/' + proId,
        method: 'post',
        success: (response) => {
            if(response.loginPage){
                swal("You need to login first for adding product to cart", {
                    buttons: ["Cancel",'Go to Login']
                  }).then((response)=>{
                    if(response){
                        location.href='/login'
                    }
                  })
            }
            if (response.status) {   
                let count = $('#cart-count').html()
                count = parseInt(count) + 1
                $('#cart-count').html(count)
            }
        }
    })
}

function changeQuantity(proId, count) {
    $.ajax({
        url: '/changeProductQuantity',
        data: {
            proId: proId,
            count: count
        },
        method: 'POST',
        success: (response) => {
            if(response.loginPage){
                swal("You need to login first for adding product to cart", {
                    buttons: ["Cancel",'Go to Login']
                  }).then((response)=>{
                    location.href='/login'
                  })
            }
            if (response.status) {

                let countt = $('#cart-count').html()
                countt = parseInt(countt) + count
                $('#cart-count').html(countt)

                let countbox = $('#quantityDisplay' + proId).val()
                countbox = parseInt(countbox) + count
                $('#quantityDisplay' + proId).val(countbox)

                if (countbox === 1) {
                    $('#reduce-btn' + proId).addClass('d-none')
                } else {
                    $('#reduce-btn' + proId).removeClass('d-none')
                }

                let price = $('#productPrice' + proId).html().replace(/^\D+/g, '')
                $('#productTotal' + proId).html('₹' + (countbox * price))

                let totalCartPrice = $('#totalCartPrice').html().replace(/^\D+/g, '')
                totalCartPrice = parseInt(totalCartPrice)
                console.log(count * price);
                $('#totalCartPrice').html('₹' + (totalCartPrice + (count * price)))
            }
        }
    })
}


function removeFromCart(proId) {
    swal({
        title:"Remove?",
        text:"Do you want to remove this item from cart",
        icon:'warning',
        buttons:["Cancel","Yes"]
      }).then((ok)=>{
            if(ok){
                $.ajax({
                    url: '/removeProductCart',
                    data: {
                        proId: proId
                    },
                    method: 'POST',
                    success: (response) => {
                        console.log('done');
                        location.reload()
                        // $('#productRow').del
                    }
                })
            }
      })
}

let applied = false;
let Percentage;
let Code;
let newCode
let totalCartPrice;
let decreased;

$('#couponApplyForm').submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/couponSubmit',
        method: 'post',
        data: $('#couponApplyForm').serialize(),
        success: (response) => {
            let totalCartPrice = $('#totalCartPrice').html().replace(/^\D+/g, '')
            totalCartPrice = parseInt(totalCartPrice)
            if (response == null) {
                if (applied == true) {
                    $('#totalCartPrice').html('₹' + Math.floor((totalCartPrice + decreased)))
                    applied = false
                }
                $('#appliedMessage').addClass('d-none')
                $('#invalidMessage').removeClass('d-none')
            } else {
                if (applied == false) {
                    Percentage = response.percentage
                    Code = response.code
                    decreased = (totalCartPrice * response.percentage / 100)
                    $('#totalCartPrice').html('₹' + Math.round((totalCartPrice - decreased)))
                    $('#invalidMessage').addClass('d-none')
                    applied = true;
                } else {
                    newCode = response.code;
                    if (Code != newCode) {
                        totalCartPrice = $('#totalCartPrice').html().replace(/^\D+/g, '')
                        totalCartPrice = parseInt(totalCartPrice)
                        totalCartPrice = totalCartPrice + decreased;
                        Percentage = response.percentage
                        Code = response.code
                        decreased = (totalCartPrice * response.percentage / 100)
                        $('#totalCartPrice').html('₹' + Math.round((totalCartPrice - decreased)))
                        $('#invalidMessage').addClass('d-none')
                    }
                }
                $('#appliedMessage').removeClass('d-none')
            }
        }
    })
})


// function checkout() {
//     let total = document.getElementById('totalCartPrice').innerHTML
//     $.ajax({
//         url: '/checkout',
//         data: {
//             total : total
//         },
//         method: 'POST',
//         success:(data)=>{
//             console.log(data);  
//             location.href = '/checkout'
//         }
//     })
// }



$('#placeOrderForm').submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/placeOrder',
        method: 'post',
        data: $('#placeOrderForm').serialize(),
        success: (response) => {
            if (response.paymentMethod == false) {
                $('#paymentMsg').removeClass('d-none')
                $('#addressMsg').removeClass('d-none')
            }
            if (response.codSuccess) {
                location.href = '/confirmation'
            } else if (response.status) {
                razorPayment(response)
            }
        }
    })
})

function razorPayment(order) {
    var options = {
        'key': 'rzp_test_byX4xjQdkJOyzX',
        'amount': order.amount,
        'currency': 'INR',
        'name': 'weare foods',
        'description': 'weare food cash transaction',
        'order_id': order.id,
        'handler': (response) => {
            verifyPayment(response, order)
        },
        'prefill': {
            'name': 'user',
            'contact': '9999999999',
            'email': 'user@gmail.com'
        },
        'notes': {
            'address': 'Razorpay Corporate Office'
        },
        'theme': {
            'color': '#F37254'
        }
    }
    var rzp1 = new Razorpay(options)
    rzp1.open()

}

function verifyPayment(payment, order) {
    $.ajax({
        url: '/verifyPayment',
        data: {
            payment,
            order
        },
        method: 'post',
        success: (response) => {
            if (response.status) {
                location.href = '/confirmation'
            } else {
                alert('payment failed')
            }
        }
    })
}


$('#changeOrderStatus').submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/admin/changeOrderStatus',
        method: 'post',
        data: $('#changeOrderStatus').serialize(),
        success: (response) => {
            alert('order changed successfully')
        }
    })
})





//filter and pagination

    
