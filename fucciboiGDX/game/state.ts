export abstract class State {
    private _name: string;
    public get name(): string { return this._name }
    private set name(v: string) { this._name = v }

    private _active: boolean;
    public get active(): boolean { return this._active }
    protected set active(v: boolean) { this._active = v }

    private _persitentUpdate: boolean;
    public get persistentUpdate(): boolean { return this._persitentUpdate }
    protected set persistentUpdate(bool: boolean) { this._persitentUpdate = bool }

    private _persistentDraw: boolean;
    public get persistentDraw(): boolean { return this._persistentDraw }
    protected set persistentDraw(bool: boolean) { this._persitentUpdate = bool }

    constructor(name: string) {
        this.name = name;
        this.active = true;
        this.persistentUpdate = false;
    }

    abstract onEnter(from?: State): void;

    abstract onExit(to?: State): void;

    abstract update(dt: number): void;

    abstract draw(): void;

}
