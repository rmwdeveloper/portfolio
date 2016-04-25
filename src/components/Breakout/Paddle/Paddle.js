
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
    context.strokeStyle = '#000';
    context.fillStyle = 'red';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.fillRect(0, 0, 115, 15);
    context.stroke();
    context.restore();
  }
}
