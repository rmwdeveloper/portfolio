export default class Brick {
  constructor(args) {
    this.positionX = args.positionX;
    this.positionY = args.positionY;
    this.brickWidth = args.brickWidth;
    this.brickHeight = args.brickHeight;
  }
  render(context, positionX, positionY, brickWidth, brickHeight) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;

    context.save();
    context.translate(0, 30);
    context.beginPath();
    context.strokeStyle = '#000';
    context.fillStyle = 'red';
    context.lineWidth = '6';
    context.rect(this.positionX, this.positionY, this.brickWidth, this.brickHeight);
    context.stroke();
    context.fill();
    context.restore();
  }
}
