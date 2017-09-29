$(function(){
  $('.nav-toggle').on('click', function () {
    var navigationTriggers = $('.nav-toggle, .nav-menu')
    navigationTriggers.toggleClass('is-active')
  })
})
