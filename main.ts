import { Group } from "fucciboiGDX/game/group"
import { State } from "fucciboiGDX/game/state";
import { StateManager } from "fucciboiGDX/game/statemanager";
import { Circle } from "fucciboiGDX/objects/circle";
import { Arena } from "game/states/arena";

love.graphics.setNewFont('assets/fonts/PixelOperator.ttf', 16);

const group = new Group<Circle>();

love.load = () => {
    const mainState = new StateManager();
    mainState.add(new Arena("Arena"));
    mainState.switchState('Arena');
}

love.update = (dt: number) => {
    const [x, y] = love.mouse.getPosition();
    if (love.mouse.isDown(1)) {
        for (let i = 0; i < 1; i++) {
            group.add(new Circle(x, y));
        }
    }
    if (love.keyboard.isDown("a")) {
        group.forEach(o => {
            o.radius = 10;
        })
    }
    group.update(dt);
}

love.draw = () => {
    group.draw();
    love.graphics.print(`vsfd aqui eh rock ${love.timer.getFPS()}`, 0, 0);
}
