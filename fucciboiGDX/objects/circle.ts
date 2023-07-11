import { GameObject } from "fucciboiGDX/game/gameobject";
import { Group } from "fucciboiGDX/game/group";
import { circle, transformPoint } from "love.graphics";
import { random, triangulate } from "love.math";

export class Circle extends GameObject {
    public radius: number = 2;

    constructor(x: number, y: number, group?: Group) {
        super(x, y, group);
        this.vx = -random() * 500;
        this.vy = -random() * 500;
        // this.timer.every(0.5, () => this.radius *= 2, 5);

        this.timer.tween(0.2, this, { sx: 16 }, "out-cubic", () => { this.dead = true });
    }

    override update(dt: number): void {
        super.update(dt);
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    override draw(): void {
        circle("fill", this.x, this.y, this.radius);
    }
}