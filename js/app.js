'use strict';

/* global TimelineLite */
/* global Quint */

$(function () {

  var $gaSummary = $('.gaSumarry');
  var $name = $('.name');
  var $bangerDesc = $('.projoTwoDesc');
  var $spotlightDesc = $('.projoFourDesc');
  var $projoOneSquare = $('.projoOneSquare');
  var $projoOneIntro = $('.projoOneIntro');
  var $projoOneDesc = $('.projoOneDesc');
  var $projoThreeSquare = $('.projoThreeSquare');
  var $projoThreeIntro = $('.projoThreeIntro');
  var $projoThreeDesc = $('.projoThreeDesc');
  var $contacts = $('.contacts');

  //Burger menu animation with greensock / gsap
  var menu = $('.menu'),
      menuitem1 = $('.menu__item--1'),
      menuitem2 = $('.menu__item--2'),
      menuitem3 = $('.menu__item--3'),
      speed = 0.15;

  $projoOneSquare.on('mouseover', function () {
    $projoOneIntro.addClass('hidden');
    $projoOneDesc.removeClass('hidden');
  });

  $projoOneSquare.on('mouseout', function () {
    $projoOneIntro.removeClass('hidden');
    $projoOneDesc.addClass('hidden');
  });

  $projoThreeSquare.hover(function () {
    $projoThreeIntro.toggleClass('hidden');
    $projoThreeDesc.toggleClass('hidden');
  });

  $(window).scroll(updateHeader).trigger('scroll'); //run the update header function on scroll

  function updateHeader() {
    // const viewportHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    // const tripleHeight = ($('#blackOverlay').height()*3);
    var screenWidth = $(window).width();

    if (scrollTop <= 650 && screenWidth > 780) {
      $name.show();
      $gaSummary.hide();
      $bangerDesc.hide();
      $spotlightDesc.hide();
      $contacts.hide();
    } else if (scrollTop <= 1600 && screenWidth > 780) {
      $gaSummary.show();
      $name.hide();
      $bangerDesc.hide();
      $spotlightDesc.hide();
      $contacts.hide();
    } else if (scrollTop <= 2800 && screenWidth > 780) {
      $bangerDesc.show();
      $spotlightDesc.hide();
      $contacts.hide();
    } else if (scrollTop <= 4000 && screenWidth > 780) {
      // console.log(scrollTop);
      $spotlightDesc.show();
      $bangerDesc.hide();
      $contacts.hide();
    } else if (scrollTop >= 4000 && screenWidth > 780) {
      // console.log(scrollTop);
      $contacts.show();
      $spotlightDesc.show();
      $bangerDesc.hide();
    } else if (screenWidth > 780) {
      $contacts.hide();
      $gaSummary.hide();
      $spotlightDesc.hide();
      $bangerDesc.hide();
    }
    // $('#blackOverlay').css('opacity',scrollTop/tripleHeight);
    // console.log(scrollTop);
    if (scrollTop >= 4000 && scrollTop <= 4600) {
      menuitem1.css({ 'background-color': 'black' });
      menuitem2.css({ 'background-color': 'black' });
      menuitem3.css({ 'background-color': 'black' });
    } else {
      menuitem1.css({ 'background-color': 'white' });
      menuitem2.css({ 'background-color': 'white' });
      menuitem3.css({ 'background-color': 'white' });
    }
  }

  //instantiate  timeline
  var tl = new TimelineLite({ paused: true }); //pause default
  //collapse burger
  tl.to(menuitem1, speed, { top: 20, ease: Quint.easeOut }, 'label--1').to(menuitem3, speed, { top: -20, ease: Quint.easeOut }, 'label--1')
  //rotate all burger items
  .to([menuitem1, menuitem2, menuitem3], speed, { rotation: -90, ease: Quint.easeOut })
  //expand burger
  .to(menuitem1, speed, { left: 20, ease: Quint.easeOut }, 'label--2').to(menuitem3, speed, { right: 20, ease: Quint.easeOut }, 'label--2');

  // play timeline on click, reverse animation for navbar if active
  menu.click(function () {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

  $('nav a').on('click', scrollToSection);
  $('h1 span').on('click', scrollToSection);
  //scroll to selection on nav, then close the nav
  function scrollToSection() {
    var section = $(this).attr('href');
    $('body').animate({
      scrollTop: $(section).offset().top - $('header').height()
    }, 800, function () {
      menu.removeClass('active');
      tl.reverse();
    });
  }
});