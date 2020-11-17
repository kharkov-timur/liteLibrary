import $ from '../core';

$.prototype.animateOverTime = function (dur, cb, fin) {
  let timeStart;

  function _animateOverTime(time) {
    if (!timeStart) timeStart = time;
    let timeElapsed = time - timeStart;
    let complection = Math.min(timeElapsed / dur, 1);

    cb(complection);

    if (timeElapsed < dur) {
      requestAnimationFrame(_animateOverTime);
    } else {
      if (typeof fin === 'function') {
        fin();
      }
    }
  }

  return _animateOverTime;
};

$.prototype._fadeIn = function(dur, display, fin, i) {
    this[i].style.display = display;

    const _fadeIn = (complection) => {
      this[i].style.opacity = complection;
    };

    const ani = this.animateOverTime(dur, _fadeIn, fin);
    requestAnimationFrame(ani);
};

$.prototype._fadeOut = function(dur, fin, i) {
    const _fadeOut = (complection) => {
      this[i].style.opacity = 1 - complection;
      if (complection === 1) {
        this[i].style.display = 'none';
      }
    };

    const ani = this.animateOverTime(dur, _fadeOut, fin);
    requestAnimationFrame(ani);
}

$.prototype.fadeIn = function (dur, display = 'block', fin) {
  for (let i = 0; i < this.length; i++) {
    this._fadeIn(dur, display, fin, i);
  }
  return this;
};

$.prototype.fadeOut = function (dur, fin) {
  for (let i = 0; i < this.length; i++) {
    this._fadeOut(dur, fin, i)
  }
  return this;
};

$.prototype.fadeToggle = function (dur, display = 'block', fin) {
  for (let i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === 'none') {
      this._fadeIn(dur, display, fin, i);
    } else {
      this._fadeOut(dur, fin, i)
    }
  }

  return this;
};