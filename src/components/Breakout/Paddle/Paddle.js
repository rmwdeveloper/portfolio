
export default class Paddle {
  constructor(args) {
    this.position = args.position;
  }
  render(keys, context) {
    console.log(this);
    if (keys.left) {
      this.rotate('LEFT');
    }
    if (keys.right) {
      this.rotate('RIGHT');
    }
    context.save();
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#FDfC0A';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(10, 10);
    context.lineTo(5, 7);
    context.lineTo(-5, 7);
    context.lineTo(-10, 10);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
}
