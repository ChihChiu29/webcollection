function createSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}

class Style {
    lineColor = '#545961';
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
        this.styleObj = style;

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
                <polygon points="10 0, 10 7, 0 3.5" fill="${this.styleObj.lineColor}" />
            </marker>
            <marker id="endarrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 10 3.5, 0 7" fill="${this.styleObj.lineColor}" />
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
    }

    // Abstract.
    addTo(renderer) { }
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
        renderer.addElement(this.getElement(), this.Z_VALUE);
    }

    getElement() {
        const elem = createSvgElement('line');
        elem.setAttribute('x1', this.fromX);
        elem.setAttribute('y1', this.fromY);
        elem.setAttribute('x2', this.toX);
        elem.setAttribute('y2', this.toY);
        elem.setAttribute('stroke', '#000');
        elem.setAttribute('stroke-width', 2);
        elem.setAttribute('marker-end', 'url(#endarrow)');
        return elem;
    }
}

class Rect extends Shape {
    addTo(renderer) {
        const elem = createSvgElement('rect');
        elem.setAttribute('x', 120);
        elem.setAttribute('width', 100);
        elem.setAttribute('height', 100);

        renderer.addElement(elem);
    }
}