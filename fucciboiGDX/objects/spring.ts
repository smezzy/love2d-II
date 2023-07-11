
export class Spring {
    private x: number = 0;
    private tension: number = 500;
    private dampening: number = 20;
    private targetX: number = 0;
    private velocity: number = 0;

    constructor() { }

    update(dt: number) {
        const a = - this.tension * (this.x - this.targetX) - this.dampening * this.velocity
        this.velocity += a * dt;
        this.x += this.velocity * dt;
    }

    pull(force: number, tension: number = 500, dampening: number = 20) {
        this.tension = tension;
        this.dampening = dampening;
        this.velocity += force;
    }
}