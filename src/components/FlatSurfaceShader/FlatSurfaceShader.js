import React, {Component, PropTypes} from 'react';


export default class FlatSurfaceShader extends Component {

  constructor(props) {
    super(props);
    this.refreshDuration = 10000;
    this.randomize = this.randomize.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.createSvg = this.createSvg.bind(this);
    this.setShaderProperties = this.setShaderProperties.bind(this);
    this.createPolygons = this.createPolygons.bind(this);
  }
  componentDidMount() {
    window.onload = this.onLoad;
    window.onresize = this.onResize;
  }
  componentWillUnmount() {
    window.clearTimeout(this.refreshTimeout);
    if (this.svg) {
      this.svg.remove();
    }
  }
  /*
   onLoad() creates an svg and appends it to the div rendered by this component.
   */
  onLoad() {
    this.svg = this.createSvg();
    this._bg.appendChild(this.svg);
    this.setShaderProperties();
    this.randomize();
    this.createPolygons();
    this.refresh();
  }
  onResize() {
    this.svg.remove();
    clearTimeout(this.refreshTimeout);
    this.onLoad();
  }
  setShaderProperties() {
    this.unitSize = (window.innerWidth + window.innerHeight) / 20;
    this.numPointsX = Math.ceil(window.innerWidth / this.unitSize) + 1;
    this.numPointsY = Math.ceil(window.innerHeight / this.unitSize) + 1;
    this.unitWidth = Math.ceil(window.innerWidth / (this.numPointsX - 1));
    this.unitHeight = Math.ceil(window.innerHeight / (this.numPointsY - 1));
    this.points = [];
    for (let y = 0; y < this.numPointsY; y++) {
      for (let x = 0; x < this.numPointsX; x++) {
        this.points.push({x: this.unitWidth * x, y: this.unitHeight * y, originX: this.unitWidth * x, originY: this.unitHeight * y});
      }
    }
  }
  createSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    return svg;
  }
  createPolygons() {
    const { points, numPointsX, numPointsY, unitHeight, unitWidth, svg } = this;
    window.t0 = this;
    for (let i = 0; i < points.length; i++) {
      window.i = i;
      if (points[i].originX !== unitWidth * (numPointsX - 1) && points[i].originY !== unitHeight * (numPointsY - 1)) {
        const topLeftX = points[i].x;
        const topLeftY = points[i].y;
        const topRightX = points[i + 1].x;
        const topRightY = points[i + 1].y;
        const bottomLeftX = points[i + numPointsX].x;
        const bottomLeftY = points[i + numPointsX].y;
        const bottomRightX = points[i + numPointsX + 1].x;
        const bottomRightY = points[i + numPointsX + 1].y;

        const random = Math.floor(Math.random() * 2);
        for (let n = 0; n < 2; n++) {
          const polygon = document.createElementNS(svg.namespaceURI, 'polygon');

          if (random === 0) {
            if (n === 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + bottomRightX + ',' + bottomRightY);
            } else if (n === 1) {
              polygon.point1 = i;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
            }
          } else if (random === 1) {
            if (n === 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + 1;
              polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY);
            } else if (n === 1) {
              polygon.point1 = i + numPointsX;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
            }
          }
          polygon.setAttribute('fill', 'rgba(0,0,0,' + (Math.random() / 3) + ')');
          const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
          animate.setAttribute('fill', 'freeze');
          animate.setAttribute('attributeName', 'points');
          animate.setAttribute('dur', this.refreshDuration + 'ms');
          animate.setAttribute('calcMode', 'linear');
          polygon.appendChild(animate);
          svg.appendChild(polygon);
        }
      }
    }
  }
  randomize() {
    const { points, unitWidth, unitHeight, numPointsX, numPointsY } = this;
    for (let i = 0; i < points.length; i++) {
      if (points[i].originX !== 0 && points[i].originX !== unitWidth * (numPointsX - 1)) {
        points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2;
      }
      if (points[i].originY !== 0 && points[i].originY !== unitHeight * (numPointsY - 1)) {
        points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2;
      }
    }
  }
  refresh() {
    const { points } = this;
    this.randomize();
    for (let i = 0; i < this.svg.childNodes.length; i++) {
      const polygon = this.svg.childNodes[i];
      const animate = polygon.childNodes[0];
      if (animate.getAttribute('to')) {
        animate.setAttribute('from', animate.getAttribute('to'));
      }
      animate.setAttribute('to', points[polygon.point1].x + ',' + points[polygon.point1].y + ' ' +
        points[polygon.point2].x + ',' + points[polygon.point2].y + ' ' + points[polygon.point3].x +
        ',' + points[polygon.point3].y);
      animate.beginElement();
    }
    this.refreshTimeout = setTimeout(() => {this.refresh();}, this.refreshDuration);
  }
  render() {
    const styles = require('./FlatSurfaceShader.scss');
    return (
      <div ref={(c) => this._bg = c} className={styles.flatSurfaceShader}></div>
    );
  }
}

FlatSurfaceShader.propTypes = { refreshDuration: PropTypes.number.isRequired };
