
export default class Paddle {
  constructor(args) {
    this.position = args.position;
    this.speed = 20;
    this.width = 115;
  }
  move(direction) {
    if (direction === 'LEFT' && (this.position.x >= 15)) {
      this.position.x -= this.speed;
    }
    if (direction === 'RIGHT' && (this.position.x + this.width <= this.screen.width)) {
      this.position.x += this.speed;
    }
    if (direction === 'UP' && (this.position.y >= this.screen.height / 2.5)) {
      this.position.y -= this.speed;
    }
    if (direction === 'DOWN' && (this.position.y <= this.screen.height / 1.15)) {
      this.position.y += this.speed;
    }
  }
  render(keys, context, screen) {
    this.screen = screen;
    if (keys.left) {
      this.move('LEFT');
    }
    if (keys.right) {
      this.move('RIGHT');
    }
    if (keys.up) {
      this.move('UP');
    }
    if (keys.down) {
      this.move('DOWN');
    }
    context.save();
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = '#000';
    context.fillStyle = 'red';
    context.fillRect(0, 0, this.width, 15);
    context.stroke();
    context.restore();
  }
}
