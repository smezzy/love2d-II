import { IUpdatable } from "../updatable";

export class Group<T extends IUpdatable> {
    private objects: Array<T> = [];

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

    add(obj: T) {
        this.objects.push(obj);
    }

    forEach(cb: (o: T) => void) {
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