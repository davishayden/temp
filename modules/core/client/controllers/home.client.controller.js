(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    $timeout(function() { $('body').addClass('loaded'); }, 100);
    $timeout(function() { $('.bvw').addClass('fade'); }, 2500);
    $timeout(function() { $('.motto span:last-child').addClass('fade'); }, 3500);
    var aboutPos = $('.mission').offset().top;

    function toggleContent() {
      $('.cd-folding-panel').toggleClass('is-open');
      $('.cd-main').toggleClass('fold-is-open');
    }
    $scope.goToAbout = function() {
      toggleContent();
      $('.menuIcon').removeClass('open');
      $timeout(function() {
        $('main').animate({scrollTop: aboutPos}, 2000);
        return false;
      }, 500);
    };
    $scope.toggleMenu = function() {
      toggleContent();
      $('.menuIcon').toggleClass('open');
    };
    $scope.openContact = function() {
      $scope.toggleMenu();
      $scope.openContactNoMenu();
    };
    $scope.openContactNoMenu = function() {
      $('.modal.contact').openModal({
        dismissible: true,
        opacity: 0.35,
        in_duration: 1250,
        out_duration: 1250,
        ready: function() {
          Materialize.fadeInImage('img.mailbox');
          Materialize.showStaggeredList('.info.row');
        },
        complete: function() {
          $('.row.info > *').css('opacity', '0');
          $('img.mailbox').css('opacity', '0');
        }
      });
    };
    $scope.closeModal = function() { $('.modal.contact').closeModal(); };

    var scrollFire = function(options) {
      var didScroll = false;
      $('main').on('scroll', function() { didScroll = true; });
      setInterval(function() {
        if (didScroll) {
          didScroll = false;
          var windowScroll = window.pageYOffset + window.innerHeight;
          for (var i = 0 ; i < options.length; i++) {
            var value = options[i];
            var selector = value.selector, offset = value.offset, callback = value.callback;
            var currentElement = document.querySelector(selector);
            if (currentElement !== null) {
              var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
              if (windowScroll > (elementOffset + offset)) {
                if (value.done !== true) {
                  if (typeof(callback) === 'function') {
                    callback.call(this);
                  } else if (typeof(callback) === 'string') {
                    var callbackFunc = new Function(callback);
                    callbackFunc();
                  }
                  value.done = true;
                }
              }
            }
          }
        }
      }, 100);
    };
    var options = [
      {selector: '.mission', offset: 200, callback: function() {
        Materialize.showStaggeredList('.mission');
      }},
      {selector: '.other', offset: 200, callback: function() {
        Materialize.fadeInImage('.other img');
        Materialize.showStaggeredList('.other .section');
      }},
      {selector: '.long-term', offset: 175, callback: function() {
        Materialize.fadeInImage('.long-term img');
        Materialize.showStaggeredList('.long-term .section');
      }},
      {selector: '.vacation', offset: 175, callback: function() {
        Materialize.fadeInImage('.vacation img');
        Materialize.showStaggeredList('.vacation .section');
      }},
      {selector: '.owners', offset: 175, callback: function() {
        Materialize.fadeInImage('.owners img');
        Materialize.showStaggeredList('.owners .section');
      }},
    ];
    scrollFire(options);
  }
}());
