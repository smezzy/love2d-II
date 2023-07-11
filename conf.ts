package.path += "libraries/?.lua";

love.conf = (t) => {
    t.window.title = "typescript teste";
    t.window.width = 1280;
    t.window.height = 720;
    t.window.resizable = true;
}
