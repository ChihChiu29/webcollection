function createSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}

class Style {
    borderWidth = 2;
    fillOpacity = 0.2;
    lineColor = '#545961';
    linkWidth = 2;
}

/**
 * Helper to draw an SVG. Create one per draw action.
 */
class SVGRenderer {
    constructor(hostElement,
        left = 0, top = 0, width = 640, height = 480,
        style = new Style(),
    ) {
        this.hostElement = hostElement;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.style = style;

        this.elements = [];
    }

    addElement(element, zValue) {
        element.zValue = zValue;
        this.elements.push(element);
    }

    draw() {
        let svgElement = this.hostElement.querySelector('svg');
        if (svgElement) {
            svgElement.remove();
        }
        svgElement = createSvgElement('svg');
        svgElement.setAttribute('viewBox', `${this.left} ${this.top} ${this.width} ${this.height}`);

        const defsElement = createSvgElement('defs');
        defsElement.innerHTML = `
            <marker id="startarrow" markerWidth="10" markerHeight="7" refX ="10" refY ="3.5" orient="auto">
                <polygon points="10 0, 10 7, 0 3.5" fill="${this.style.lineColor}" />
            </marker>
            <marker id="endarrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 10 3.5, 0 7" fill="${this.style.lineColor}" />
            </marker>
        `;
        svgElement.append(defsElement);

        for (const element of this.elements) {
            svgElement.append(element);
        }

        this.hostElement.append(svgElement);
    }
}

class Shape {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
        this.bgColor = '#f5f3ed';
    }

    addTo(renderer) {
        const elem = this.getElement();
        elem.setAttribute('stroke', renderer.style.lineColor);
        elem.setAttribute('stroke-width', renderer.style.borderWidth);
        elem.setAttribute('fill', this.bgColor);
        elem.setAttribute('fill-opacity', renderer.style.fillOpacity);
        renderer.addElement(elem, this.Z_VALUE);
    }

    getElement() {
        throw new Error('not implemented');
    }
}

class Link {
    constructor(fromX, fromY, toX, toY) {
        this.fromX = fromX;
        this.fromY = fromY;
        this.toX = toX;
        this.toY = toY;
    }

    Z_VALUE = 99;

    addTo(/* SVGRenderer */renderer) {
        const elem = this.getElement();
        elem.setAttribute('stroke', renderer.style.lineColor);
        elem.setAttribute('stroke-width', renderer.style.linkWidth);
        renderer.addElement(elem, this.Z_VALUE);
    }

    getElement() {
        const elem = createSvgElement('line');
        elem.setAttribute('x1', this.fromX);
        elem.setAttribute('y1', this.fromY);
        elem.setAttribute('x2', this.toX);
        elem.setAttribute('y2', this.toY);
        elem.setAttribute('marker-end', 'url(#endarrow)');
        return elem;
    }
}

class Rect extends Shape {
    constructor() {
        super();
    }

    getElement() {
        const elem = createSvgElement('rect');
        elem.setAttribute('x', this.x);
        elem.setAttribute('y', this.y);
        elem.setAttribute('width', this.width);
        elem.setAttribute('height', this.height);
        elem.setAttribute('rx', 5);
        elem.setAttribute('ry', 5);
        return elem;
    }
}