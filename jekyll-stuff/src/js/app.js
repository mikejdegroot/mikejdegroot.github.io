/* global TimelineLite */
/* global Quint */

$(() => {

  const $gaSummary = $('.gaSumarry');
  const $name = $('.name');
  const $bangerDesc = $('.projoTwoDesc');
  const $spotlightDesc = $('.projoFourDesc');
  const $projoOneSquare = $('.projoOneSquare');
  const $projoOneIntro = $('.projoOneIntro');
  const $projoOneDesc = $('.projoOneDesc');
  const $projoThreeSquare = $('.projoThreeSquare');
  const $projoThreeIntro = $('.projoThreeIntro');
  const $projoThreeDesc = $('.projoThreeDesc');

  //Burger menu animation with greensock / gsap
  var menu = $('.menu'),
    menuitem1 = $('.menu__item--1'),
    menuitem2 = $('.menu__item--2'),
    menuitem3 = $('.menu__item--3'),
    speed = 0.15;

  $projoOneSquare.on('mouseover', () => {
    $projoOneIntro.addClass('hidden');
    $projoOneDesc.removeClass('hidden');
  });

  $projoOneSquare.on('mouseout', () => {
    $projoOneIntro.removeClass('hidden');
    $projoOneDesc.addClass('hidden');
  });


  $projoThreeSquare.hover( function() {
    $projoThreeIntro.toggleClass('hidden');
    $projoThreeDesc.toggleClass('hidden');
  });



  $(window).scroll(updateHeader).trigger('scroll'); //run the update header function on scroll

  function updateHeader() {
    // const viewportHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const tripleHeight = ($('#blackOverlay').height()*3);


    if(scrollTop <= 650){
      $name.show();
      $gaSummary.hide();
      $bangerDesc.hide();
      $spotlightDesc.hide();
    } else if(scrollTop <= 1600) {
      $gaSummary.show();
      $name.hide();
      $bangerDesc.hide();
      $spotlightDesc.hide();
    } else if(scrollTop <= 2800) {
      $bangerDesc.show();
      $spotlightDesc.hide();
    } else if(scrollTop <= 4100){
      $spotlightDesc.show();
      $bangerDesc.hide();
    } else {
      $gaSummary.hide();
      $spotlightDesc.hide();
      $bangerDesc.hide();
    }
    $('#blackOverlay').css('opacity',scrollTop/tripleHeight);

  }


  //instantiate  timeline
  var tl = new TimelineLite({paused: true}); //pause default
  //collapse burger
  tl.to(menuitem1, speed, {top: 20, ease: Quint.easeOut}, 'label--1')
  .to(menuitem3, speed, {top: -20, ease: Quint.easeOut}, 'label--1')
  //rotate all burger items
  .to([menuitem1, menuitem2, menuitem3], speed, {rotation: -90, ease: Quint.easeOut})
  //expand burger
  .to(menuitem1, speed, {left: 20, ease: Quint.easeOut}, 'label--2')
  .to(menuitem3, speed, {right: 20, ease: Quint.easeOut}, 'label--2');



  // play timeline on click, reverse animation for navbar if active
  menu.click(function() {
    $(this).toggleClass('active');

    if ( $(this).hasClass('active') ) {
      tl.play();
    } else {
      tl.reverse();
    }
  });


  $('nav a').on('click',scrollToSection);
  $('h1 span').on('click',scrollToSection);
  //scroll to selection on nav, then close the nav
  function scrollToSection() {
    const section = $(this).attr('href');
    $('body').animate({
      scrollTop: $(section).offset().top -$('header').height()
    }, 800, () => {
      menu.removeClass('active');
      tl.reverse();
    });
  }



});
