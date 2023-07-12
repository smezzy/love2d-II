/** @noResolution */
declare module "anim8"
{
    import { Texture } from "love.graphics";
    import { Quad } from "love.graphics";
    import { Transform } from "love.math";


    class Animation {
        frames: Quad[];
        durations: number[];
        intervals: number[];
        totalDuration: number;
        onLoop: (this: void, self: Animation, loops: number) => void;
        timer: number;
        position: number;
        status: "playing" | "paused";
        flippedH: boolean;
        flippedV: boolean;

        /**
         * Creates a new animation identical to the current one. The only difference is that its internal counter is reset to 0 (it's on the first frame).
         * 
         * @returns New animation identical to the current one
         */
        clone(): Animation;
        /**
         * Flips an animation horizontally (left goes to right and viceversa). This means that the frames are simply drawn differently, nothing more.
         * 
         * Note that this method does not create a new animation. If you want to create a new one, use the `clone` method.
         * 
         * This method returns the animation, so you can do things like `let a = anim8.newAnimation(g(1,'1-10'), 0.1).flipH()` or `let b = a.clone().flipV()`.
         * 
         * @returns self
         */
        flipH(): Animation;
        /**
         * Flips an animation vertically (top goes to bottom and viceversa). This means that the frames are simply drawn differently, nothing more.
         * 
         * Note that this method does not create a new animation. If you want to create a new one, use the `clone` method.
         * 
         * This method returns the animation, so you can do things like `let a = anim8.newAnimation(g(1,'1-10'), 0.1).flipH()` or `let b = a.clone().flipV()`.
         * 
         * @returns self
         */
        flipV(): Animation;
        /**
         * Use this inside `love.update(dt)` so that your animation changes frames according to the time that has passed.
         * 
         * @param dt passed time from last update
         */
        update(dt: number): void;
        /**
         * Pause current animation
         */
        pause(): void;
        /**
         * Unpause current animation
         */
        resume(): void;
        /**
         * Moves the animation to a given frame (frames start counting in 1).
         * 
         * @param position frame num
         */
        gotoFrame(position: number): void;
        /**
         * Draws the current frame in the specified coordinates with the right angle, scale, offset & shearing. These parameters work exactly the same way as in `love.graphics.draw`. The only difference is that they are properly recalculated when the animation is flipped horizontally, vertically or both. See `getFrameInfo` below for more details.
         * 
         * @param spritesheet A Texture (Image or Canvas) to texture the Quad with.
         * @param x The position to draw the object (x-axis). Default is 0.
         * @param y The position to draw the object (y-axis). Default is 0.
         * @param r Orientation (angle in radians). Default is 0.
         * @param sx Scale factor (x-axis). Default is 1.
         * @param sy Scale factor (y-axis). Default is equal to `sx`
         * @param ox Origin offset (x-axis). Default is 0.
         * @param oy Origin offset (y-axis). Default is 0.
         * @param kx Shearing factor (x-axis). Default is 0.
         * @param ky Shearing factor (x-axis). Default is 0.
         */
        draw(spritesheet: Texture, x?: number, y?: number, r?: number, sx?: number, sy?: number, ox?: number, oy?: number, kx?: number, ky?: number): void;
        /**
         * Draws the current frame in the specified coordinates with the right angle, scale, offset & shearing. These parameters work exactly the same way as in `love.graphics.draw`. The only difference is that they are properly recalculated when the animation is flipped horizontally, vertically or both. See `getFrameInfo` below for more details.
         * 
         * @param spritesheet A Texture (Image or Canvas) to texture the Quad with.
         * @param transform Transformation object.
         */
        draw(spritesheet: Texture, transform: Transform): void;
        /**
         * Returns the width and height of the current frame of the animation. This method assumes the frames passed to the animation are all quads (like the ones created by a grid).
         *
         * @returns width and height of the current frame of the animation 
         */
        getDimensions(): LuaMultiReturn<[number, number]>;
        /**
         * Moves the animation to its last frame and then pauses it.
         */
        pauseAtEnd(): void;
        /**
         * Moves the animation to its first frame and then pauses it.
         */
        pauseAtStart(): void;
        /**
         * This function returns the parameters that would be passed to `love.graphics.draw` when drawing this animation: `frame, x, y, r, sx, sy, ox, oy, kx, ky`.
         * @param x The position to draw the object (x-axis). Default is 0.
         * @param y The position to draw the object (y-axis). Default is 0.
         * @param r Orientation (angle in radians). Default is 0.
         * @param sx Scale factor (x-axis). Default is 1.
         * @param sy Scale factor (y-axis). Default is equal to `sx`
         * @param ox Origin offset (x-axis). Default is 0.
         * @param oy Origin offset (y-axis). Default is 0.
         * @param kx Shearing factor (x-axis). Default is 0.
         * @param ky Shearing factor (x-axis). Default is 0.
         * @returns `frame, x, y, r, sx, sy, ox, oy, kx, ky`
         */
        getFrameInfo(x: number, y: number, r?: number, sx?: number, sy?: number, ox?: number, oy?: number, kx?: number, ky?: number): LuaMultiReturn<[Quad, number, number, number, number, number, number, number, number, number]>
        /**
         * This functions returns the parameters that would be passed to `love.graphics.draw` when drawing this animation: `frame, transform`.
         * @param transform Transformation object.
         * @returns `frame, transform`
         */
        getFrameInfo(transform: Transform): LuaMultiReturn<[Quad, Transform]>;
    }

    interface Grid {
        /**
         * Returns an array of frames (Quads) from requested coordinates
         * 
         * `Grid:getFrames()` accepts an arbitrary number of parameters. They can be either numbers or strings.
         * 
         * - Each two numbers are interpreted as quad coordinates in the format (column, row). This way, `grid:getFrames(3,4)` will return the frame in column 3, row 4 of the grid. There can be more than just two: `grid:getFrames(1,1, 1,2, 1,3)` will return the frames in `{1,1}`, `{1,2}` and `{1,3}` respectively.
         * - Using numbers for long rows or columns is tedious - so grids also accept strings indicating range plus a row/column index. Diferentiating rows and columns is based on the order in which the range and index are provided. A row can be fetch by calling `grid:getFrames('range', rowNumber)` and a column by calling `grid:getFrames(columnNumber, 'range')`. The previous column of 3 elements, for example, can be also expressed like this: `grid:getFrames(1,'1-3')`. Again, there can be more than one string-index pair (`grid:getFrames(1,'1-3', '2-4',3)`)
         * - It's also possible to combine both formats. For example: `grid:getFrames(1,4, 1,'1-3')` will get the frame in {1,4} plus the frames 1 to 3 in column 1
         * 
         * @param coordinates pairs of [x;y] coordinates of requested frames (quads). `[1,1]` is the top-left tile in grid.
         * 
         * @returns an array of frames (Quads) from requested coordinates
         */
        getFrames(...coordinates: (number | string)[]): Quad[];
        /**
         * Returns an array of quads from requested coordinates. Same as Grid:getFrames();
         * 
         * Accepts an arbitrary number of parameters. They can be either numbers or strings.
         * 
         * - Each two numbers are interpreted as quad coordinates in the format (column, row). This way, `grid:getFrames(3,4)` will return the frame in column 3, row 4 of the grid. There can be more than just two: `grid:getFrames(1,1, 1,2, 1,3)` will return the frames in `{1,1}`, `{1,2}` and `{1,3}` respectively.
         * - Using numbers for long rows or columns is tedious - so grids also accept strings indicating range plus a row/column index. Diferentiating rows and columns is based on the order in which the range and index are provided. A row can be fetch by calling `grid:getFrames('range', rowNumber)` and a column by calling `grid:getFrames(columnNumber, 'range')`. The previous column of 3 elements, for example, can be also expressed like this: `grid:getFrames(1,'1-3')`. Again, there can be more than one string-index pair (`grid:getFrames(1,'1-3', '2-4',3)`)
         * - It's also possible to combine both formats. For example: `grid:getFrames(1,4, 1,'1-3')` will get the frame in {1,4} plus the frames 1 to 3 in column 1
         * 
         * @param coordinates pairs of [x;y] coordinates of requested frames (quads). `[1,1]` is the top-left tile in grid. 
         * 
         * @returns an array of quads from requested coordinates
         */
        (this: void, ...coordinates: (number | string)[]): Quad[];
    }

    /**
     * Construct a new Grid
     * @noself
     * 
     * @param frameWidth width (in pixels) of the animation frame (Quad)
     * @param frameHeight height (in pixels) of the animation frame (Quad)
     * @param imageWidth width (in pixels) of the spritesheet image. In LÖVE you can get it by calling image:getWidth()
     * @param imageHeight height (in pixels) of the spritesheet image. In LÖVE you can get it by calling image:getHeight()
     * @param left x coordinate of top-left pixel of frame. Default is 0.
     * @param top y coordinate of top-left pixel of frame. Default is 0.
     * @param border width (in pixels) of border between tiles.
     * 
     * @returns new Grid
     */
    function newGrid(this: void, frameWidth: number, frameHeight: number, imageWidth: number, imageHeight: number, left?: number, top?: number, border?: number): Grid;
    /**
     * Construct a new animation
     * @noself
     * 
     * @param frames an array of frames (Quads in LÖVE argot). You could provide your own quad array if you wanted to, but using a grid to get them is very convenient.
     * @param durations a number or a table. When it's a number, it represents the duration of all frames in the animation. When it's a table, it can represent different durations for different frames. You can specify durations for all frames individually, like this: `{0.1, 0.5, 0.1}` or you can specify durations for ranges of frames: `{['3-5']=0.2}`.
     * @param onLoop  optional parameter which can be a function or a string representing one of the animation methods. It does nothing by default. If specified, it will be called every time an animation "loops". It will have two parameters: the animation instance, and how many loops have been elapsed. The most usual value (apart from none) is the string 'pauseAtEnd'. It will make the animation loop once and then pause and stop on the last frame 
     */
    function newAnimation(this: void, frames: Quad[], durations: number[] | { [key in number | string]: number }, onLoop?: (this: void, self: Animation, loops_number: number) => any | string): Animation;
}