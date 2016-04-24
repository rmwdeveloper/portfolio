import React, {Component, PropTypes} from 'react';


export default class FlatSurfaceShader extends Component {

  constructor(props) {
    super(props);
    this.points = [];
    this.unitSize = (window.innerWidth + window.innerHeight) / 20;
    this.numPointsX = Math.ceil(window.innerWidth / this.unitSize) + 1;
    this.numPointsY = Math.ceil(window.innerHeight / this.unitSize) + 1;
    this.unitWidth = Math.ceil(window.innerWidth / (this.numPointsX - 1));
    this.unitHeight = Math.ceil(window.innerHeight / (this.numPointsY - 1));
    this.refreshTimeout = 10000;
    this.randomize = this.randomize.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }
  componentDidMount() {
    window.onload = this.onLoad;
    window.onresize = this.onResize;
  }
  /*
   onLoad() creates an svg and appends it to the div rendered by this component.
   */
  onLoad() {
    let y = 0;
    let x = 0;
    let i = 0;
    let n = 0;
    const { numPointsX, numPointsY, points, unitWidth, unitHeight } = this;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    this._bg.appendChild(svg);
    for (y; y < numPointsY; y++) {
      for (x; x < numPointsX; x++) {
        points.push({x: unitWidth * x, y: unitHeight * y, originX: unitWidth * x, originY: unitHeight * y});
      }
    }

    this.randomize();

    console.log('points', points);

    for (i; i < points.length; i++) {
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
        for (n; n < 2; n++) {
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
    this.refresh();
  }
  onResize() {
    this._bg.remove();
    clearTimeout(this.refreshTimeout);
    this.onLoad();
  }
  randomize() {
    let i = 0;
    const { points, unitWidth, unitHeight, numPointsX, numPointsY } = this;
    for (i; i < points.length; i++) {
      if (points[i].originX !== 0 && points[i].originX !== unitWidth * (numPointsX - 1)) {
        points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2;
      }
      if (points[i].originY !== 0 && points[i].originY !== unitHeight * (numPointsY - 1)) {
        points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2;
      }
    }
  }
  refresh() {
    let i = 0;
    const { points } = this;
    this.randomize();
    for ( i; i < this._bg.childNodes.length; i++) {
      const polygon = this._bg.childNodes[i];
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
