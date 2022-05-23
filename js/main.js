$('.contact_trigger').click(function (e){
    e.preventDefault()
    $('.contact_modal').fadeIn()
})

$('.close_modal').click(function (e){
    e.preventDefault()
    $('.contact_modal').fadeOut()
})
