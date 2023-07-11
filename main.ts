import { Group } from "fucciboiGDX/game/group"
import { Circle } from "fucciboiGDX/objects/circle";
import { getDimensions } from "love.graphics";

const group = new Group()

love.load = () => {
}

love.update = (dt: number) => {
    const [x, y] = love.mouse.getPosition();
    if (love.mouse.isDown(1)) {
        for (let i = 0; i < 1; i++) {
            group.add(new Circle(x, y));
        }
    }
    if (love.keyboard.isDown("a")) {
        group.forEach((o) => {
            o.dead = true;
        })
    }
    group.update(dt);
}

love.draw = () => {
    group.draw();
    love.graphics.print(`${love.timer.getFPS()}`, 0, 0);
}