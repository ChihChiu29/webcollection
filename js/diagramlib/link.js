
/**
 * A straight link.
 */
class LinkStraight extends Link {
  // @Implement
  getElements(/* Style */style) {
    const elem = createSvgElement('line');
    elem.setAttribute('x1', this.from.x);
    elem.setAttribute('y1', this.from.y);
    elem.setAttribute('x2', this.to.x);
    elem.setAttribute('y2', this.to.y);
    if (this.hasArrow) {
      elem.setAttribute('marker-end', 'url(#endarrow)');
    }
    return [elem];
  }
}

class LinkDoubleCurved extends Link {
  constructor() {
    super();

    // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
    this.middle = undefined;
    this.ctrl = undefined;
  }

  // @Implement
  getElements(/* Style */style) {
    if (!this.middle) {
      this.middle = this.from;
    }
    if (!this.ctrl) {
      this.ctrl = this.from;
    }

    const elem = createSvgElement('path');
    elem.setAttribute('d', `M ${this.from.x} ${this.from.y} Q ${this.ctrl.x} ${this.ctrl.y}, ${this.middle.x} ${this.middle.y} T ${this.to.x} ${this.to.y}`);
    if (this.hasArrow) {
      elem.setAttribute('marker-end', 'url(#endarrow)');
    }
    return [elem];
  }
}
