import { newAnimation, newGrid } from "anim8";
import { GameObject } from "fucciboiGDX/game/gameobject";
import { Group } from "fucciboiGDX/game/group";
import { circle } from "love.graphics";
import { random } from "love.math";

export class Circle extends GameObject {
    public radius: number = 16;

    constructor(x: number, y: number) {
        super(x, y);
        this.vx = -random() * 500;
        this.vy = -random() * 500;
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