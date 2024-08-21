'user strict'
$(document).ready(function(){
    // $(window).on('scroll', function () {
    $('.chat-list').on('scroll', function () {
        /* header active on scroll more than n px*/
        if ($(this).scrollTop() >= 60) {
            $('body').addClass('header-sticky')
        } else {
            $('body').removeClass('header-sticky')
        }
    });

    var botContainerPre='<div class="chat-message chat-message-recipient animated fadeIn">'+
					'<div class="chat-icon"></div>';
    var botContainerPost='</div>';

    var userContainerPre='<div class="chat-message chat-message-sender animated fadeInRight">'+
                            '<div class="chat-icon"></div>'+
                            '<div class="chat-message-wrapper">'+
                                '<div class="chat-message-content">'; 
    var userContainerPost='</div></div></div>';

    var messageWrapPre = '<div class="chat-message-wrapper">'
    var messageWrapPost = '</div>';
    
    var messageWrapNoGutterPre = '<div class="chat-message-wrapper no-pad">'
    var messageWrapNoGutterPost = '</div>';

    var messageContentPre = '<div class="chat-message-content">'
    var messageContentPost = '</div>';

    var topMessageWrapPre = '<div class="top-navs">'
    var topMessageWrapPost = '</div>';

    var topMessageTextPre = '<div class="top-text">'
    var topMessageTextPost = '</div>';

    var topMessageListPre = '<ul class="fullnav">'
    var topMessageListPost = '</ul>';

    var topMessageListItemPre = '<li class="lvl1">'
    var topMessageListItemPost = '</li>';
})