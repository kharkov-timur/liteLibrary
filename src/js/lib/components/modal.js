import $ from '../core';

$.prototype.calcScroll = function() {
  let div = document.createElement("div");

  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollWidth;
};

$.prototype.modal = function () {
  const modalDialog = document.querySelectorAll('.modal-dialog');
  for (let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute('data-target');
    $(this[i]).click((e) => {
      e.preventDefault();
      $(target).fadeIn(500, 'flex');
      document.body.style.overflow = 'hidden';
      const scroll = this.calcScroll();
      document.body.style.marginRight = `${scroll}px`;
      modalDialog.forEach(item => {
        item.style.marginRight = `${scroll}px`;
      })
    });
  }

  const closeElements = document.querySelectorAll('[data-close]');
  closeElements.forEach(elem => {
   $(elem).click(() => {
     $('.modal').fadeOut(500);
     document.body.style.overflow = '';
     document.body.style.marginRight = '0';
     modalDialog.forEach(item => {
       item.style.marginRight = `0`;
     })
   });
  });

  $('.modal').click(e => {
    if (e.target.classList.contains('modal')) {
      $('.modal').fadeOut(500);
      document.body.style.overflow = '';
      document.body.style.marginRight = '0';
      modalDialog.forEach(item => {
        item.style.marginRight = `0`;
      })
    }
  });
};

$('[data-toggle="modal"]').modal();