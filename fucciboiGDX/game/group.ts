import { GameObject } from "./gameobject";

export class Group {
    private objects: Array<GameObject> = [];

    constructor() { }

    update(dt: number) {
        for (const obj of this.objects) {
            obj.update(dt);
        }
        for (let i = this.objects.length; i > 0; i--) {
            const obj = this.objects[i - 1];
            if (obj.dead) {
                table.remove(this.objects, i);
            }
        }
    }

    add(obj: GameObject) {
        this.objects.push(obj);
    }

    forEach(cb: (o: GameObject) => void) {
        for (const obj of this.objects) {
            cb(obj);
        }
    }

    draw() {
        for (const obj of this.objects) {
            obj.draw();
        }
    }
}