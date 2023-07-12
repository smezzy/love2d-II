export interface IUpdatable {
    dead: boolean;
    update(dt: number): void;
    draw(): void;
}