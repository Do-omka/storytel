"use strict";

document.addEventListener('DOMContentLoaded', function (e) {
  var popuplvl = 0;

  if (document.querySelector('.popup')) {
    document.querySelectorAll('.popup').forEach(function (popup) {
      popup.addEventListener('click', function (e) {
        if (e.target === popup) {
          popup.classList.remove('_popup');
          popuplvl--;

          if (popuplvl < 1) {
            document.querySelector('body').classList.remove('overflow');
          }
        }
      });
    });
  }

  function toPopup(popup) {
    if (popup && !popup.classList.contains('_popup')) {
      popup.classList.add('_popup');
      popuplvl++;
      document.querySelector('body').classList.add('overflow');
    }
  }

  if (document.querySelector('[data-popup]')) {
    document.querySelectorAll('[data-popup]').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        var popup;

        if (elem.getAttribute('data-popup') === 'this') {
          popup = elem;
        } else if (document.querySelector(elem.getAttribute('data-popup'))) {
          popup = document.querySelector(elem.getAttribute('data-popup'));
        }

        toPopup(popup);
      });
    });
  }

  if (document.querySelector('[data-popup-close]')) {
    document.querySelectorAll('[data-popup-close]').forEach(function (close) {
      close.addEventListener('click', function (e) {
        if (e.target.closest('._popup')) {
          var popup = e.target.closest('._popup');
          popup.classList.remove('_popup');
          popuplvl--;

          if (popuplvl < 1) {
            document.querySelector('body').classList.remove('overflow');
          }
        }
      });
    });
  }

  document.addEventListener('scroll', function (e) {
    if (document.querySelector('.header')) {
      if (window.pageYOffset > 0) {
        document.querySelector('.header').classList.add('_stuck');
      } else {
        document.querySelector('.header').classList.remove('_stuck');
      }
    }
  });

  if (document.querySelector('[data-active]')) {
    document.querySelectorAll('[data-active]').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        elem.getAttribute('data-active').split(', ').forEach(function (target) {
          switch (target) {
            case 'this':
              elem.classList.toggle('_active');
              break;

            case 'parent':
              elem.parentElement.classList.toggle('_active');
              break;

            default:
              if (document.querySelector(target)) {
                document.querySelector(target).classList.toggle('_active');
              }

              break;
          }
        });
      });
    });
  }

  if (document.querySelector('[data-radio-uncheck]')) {
    document.querySelectorAll('[data-radio-uncheck]').forEach(function (elem) {
      elem.addEventListener('click', function (e) {
        elem.getAttribute('data-radio-uncheck').split(', ').forEach(function (target) {
          if (document.querySelector('[data-radio-name="' + target + '"]')) {
            document.querySelectorAll('[data-radio-name="' + target + '"]').forEach(function (radio) {
              radio.classList.remove('_active');
            });
          }
        });
        elem.getAttribute('data-radio-for').split(', ').forEach(function (target) {
          if (document.querySelector('[data-radio-id="' + target + '"]')) {
            document.querySelectorAll('[data-radio-id="' + target + '"]').forEach(function (radio) {
              radio.classList.add('_active');
            });
          }
        });
      });
    });
  }

  if (document.querySelector('input')) {
    document.querySelectorAll('input').forEach(function (elem) {
      elem.addEventListener('invalid', function (e) {
        elem.classList.add('_required');
        elem.addEventListener('blur', function (e) {
          elem.classList.remove('_required');
        });
      });
    });
  }

  if (document.querySelector('input.file-input')) {
    document.querySelectorAll('input.file-input').forEach(function (input) {
      var label = input.closest('label'),
          title = label.querySelector('.file-title'),
          placeholder = title.innerHTML;
      input.closest('form').addEventListener('reset', function (e) {
        title.innerHTML = placeholder;
      });
      input.addEventListener('change', function (e) {
        title.textContent = input.files[0].name;
      });
    });
  }

  if (document.querySelector('form.form')) {
    document.querySelectorAll('form.form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ajax = new XMLHttpRequest(),
            data = new FormData(form);

        ajax.onloadend = function () {
          if (ajax.readyState === 4 && ajax.status === 200) {
            form.reset();
          } else {
            alert('Упс... что-то пошло не так.');
          }
        };

        ajax.open(form.getAttribute('method'), form.getAttribute('action'));
        ajax.send(data);
      });
    });
  }
});
//# sourceMappingURL=about.js.map