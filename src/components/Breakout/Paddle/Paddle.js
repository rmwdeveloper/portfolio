
export default class Paddle {
  constructor(args) {
    this.position = args.position;
    this.velocity = {
      x: 0,
      y: 0
    };

    this.speed = 20;
    this.inertia = 0.99;
  }
  move(direction) {
    this.velocity.x -= Math.sin(-1 * Math.PI / 180) * this.speed;
    this.velocity.y -= Math.cos(-1 * Math.PI / 180) * this.speed;
    if (direction === 'LEFT') {
      this.position.x -= this.speed;
    }
    if (direction === 'RIGHT') {
      this.position.x += this.speed;
    }
    if (direction === 'UP') {
      this.position.y -= this.speed;
    }
    if (direction === 'DOWN') {
      this.position.y += this.speed;
    }
  }
  render(keys, context) {
    console.log(this);
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
    context.moveTo(0, -15);
    context.fillRect(0, 0, 115, 15);
    context.stroke();
    context.restore();
  }
}
