class GradientGenerator {
  generate(startHexColor, endHexColor, steps) {
    // strips '#' from start of values, if present
    const start = this._sanitize(startHexColor);
    const end = this._sanitize(endHexColor);


    // converts 3 or 6 char hex values to rgb object
    // ex: fff -> { r: 255, g: 255, b: 255 }
    const startRgb = start.length === 6
      ? this._hexToRgb(start)
      : this._hexToRgb(this._fullHex(start));

    const endRgb = end.length === 6
      ? this._hexToRgb(end)
      : this._hexToRgb(this._fullHex(end));

    // what is the range of the gradient across each rgb value?
    const rDelta = startRgb.r - endRgb.r;
    const gDelta = startRgb.g - endRgb.g;
    const bDelta = startRgb.b - endRgb.b;

    // what are the increments to step through across each rgb value?
    const rStep = Math.round(rDelta/(steps - 1));
    const gStep = Math.round(gDelta/(steps - 1));
    const bStep = Math.round(bDelta/(steps - 1));

    // return array
    let gradient = [];

    // starting value goes in first, converted back to hex
    gradient.push(this._rgbToHex(startRgb.r, startRgb.g, startRgb.b));

    // step through and generate each rgb value in gradient,
    // then add its converted hex to return array.
    ((r, g, b) => {
      for (let i = steps - 2; i > 0; i--) {
        r = r - rStep;
        g = g - gStep;
        b = b - bStep;
        gradient.push(this._rgbToHex(r, g, b));
      }
    })(startRgb.r, startRgb.g, startRgb.b);

    // add end hex to reutrn array
    gradient.push(this._rgbToHex(endRgb.r, endRgb.g, endRgb.b));

    return gradient;
  }

  _rgbToHex(r, g, b) {
    const hex = [r, g, b].map(val => {
      val = val.toString(16);
      return val.length === 1 ? `0${val}` : val;
    });

    return `#${hex.join('')}`;
  }

  _hexToRgb(hex) {
    if (hex.length !== 6) return null;

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4), 16);

    return {
      r: r,
      g: g,
      b: b,
    };
  }

  _sanitize(str) {
    return str.charAt(0) !== '#'
      ? str
      : str.replace('#', '');
  }

  _fullHex(shortHex) {
    if (shortHex.length !== 3) return null;

    let parts = shortHex.split('');
    parts.forEach((part, i) => {
      parts[i] = `${part}${part}`;
    });

    return parts.join('');
  }
}

export default new GradientGenerator();
