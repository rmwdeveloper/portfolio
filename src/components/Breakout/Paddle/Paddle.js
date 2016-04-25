
export default class Paddle {
  constructor(args) {
    this.position = args.position;
    this.speed = 20;
    this.width = 115;
  }
  move(direction, screen) {
    if (direction === 'LEFT' && (this.position.x >= 15)) {
      this.position.x -= this.speed;
    }
    if (direction === 'RIGHT' && (this.position.x + this.width <= screen.width)) {
      this.position.x += this.speed;
    }
    if (direction === 'UP' && (this.position.y >= screen.height / 2.5)) {
      this.position.y -= this.speed;
      console.log('up', this.position.y, screen.height);
    }
    if (direction === 'DOWN' && (this.position.y <= screen.height / 1.15)) {
      this.position.y += this.speed;
      console.log('down', this.position.y, screen.height);
    }
  }
  render(keys, context, screen) {
    if (keys.left) {
      this.move('LEFT', screen);
    }
    if (keys.right) {
      this.move('RIGHT', screen);
    }
    if (keys.up) {
      this.move('UP', screen);
    }
    if (keys.down) {
      this.move('DOWN', screen);
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
