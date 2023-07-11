import { Spring } from "fucciboiGDX/objects/spring";
import { Group } from "./group";
import * as Timer from "hump";

export abstract class GameObject {
    public x: number = 0;
    public y: number = 0;
    public angle: number = 0;
    public ox: number = 0;
    public oy: number = 0;
    public sx: number = 1;
    public sy: number = 1;
    public vx: number = 0;
    public vy: number = 0;
    public dead: boolean = false;

    public timer: Timer = Timer();
    protected spring: Spring = new Spring();
    protected group?: Group;

    constructor(x: number, y: number, group?: Group) {
        this.x = x;
        this.y = y;

        if (group !== undefined) {
            group.add(this);
            this.group = group;
        }
    }

    update(dt: number) {
        this.timer.update(dt);
        this.spring.update(dt);
    }

    draw() { }

    angleTo(angle: number) { }

    rotateTowards(obj: GameObject) { }

    overlapsPoint(px: number, py: number) { }
}