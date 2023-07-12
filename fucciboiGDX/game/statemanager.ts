import { GameObject } from "./gameobject";
import { Group } from "./group";
import { State } from "./state";

export class StateManager {
  private states: LuaTable<string, State>;
  private transtitions: Group<GameObject>;
  private currentState: State;

  constructor() {
    this.states = new LuaTable();
    this.transtitions = new Group<GameObject>();
    // this.transtitions = new Group<Transtitions>()
  }

  add(state: State) {
    this.states.set(state.name, state);
  }

  getState(stateName: string) {
    return this.states.get(stateName);
  }

  switchState(state: string | State) {
    const nextState: State =
      state instanceof State ? state : this.states.get(state);

    if (this.currentState !== undefined) {
      if (this.currentState.active) {
        this.currentState.onExit(nextState);
        this.states.delete(this.currentState.name);
      }
    }

    const lastState = this.currentState;
    this.currentState = nextState;
    nextState.onEnter(lastState);
  }

  update(dt: number): void {
    for (const [_, state] of this.states) {
      if (state.active || state.persistentUpdate) {
        state.update(dt);
      }
    }
  }

  draw(): void {
    for (const [_, state] of this.states) {
      if (state.active || state.persistentDraw) {
        state.draw();
      }
    }
  }
}
