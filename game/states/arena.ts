import { State } from "fucciboiGDX/game/state";

export class Arena extends State {
    override onEnter(from?: State | undefined): void {
        print(`hi from ${this.name}`);
    }
    override onExit(to?: State | undefined): void {
        print(`bye from ${this.name}`);
    }
    override update(dt: number): void {
        throw new Error("Method not implemented.");
    }
    override draw(): void {
        throw new Error("Method not implemented.");
    }
    constructor(name: string) {
        super(name);
    }
}