export default class Brick {
  constructor(args) {
    this.position = args.position;
    this.brickWidth = args.brickWidth;
    this.brickHeight = args.brickHeight;
  }
  render(context) {
    console.log('render');
    context.save();
    context.translate(0, 30);
    context.beginPath();
    context.strokeStyle = '#000';
    context.fillStyle = 'red';
    context.lineWidth = '6';
    context.rect(this.position.x, this.position.y, this.brickWidth, this.brickHeight);
    context.stroke();
    context.fill();
    context.restore();
  }
}
