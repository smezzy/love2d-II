type EasingType = 'linear' | 'quad' | 'cubic' | 'quart' | 'quint' | 'sine' | 'expo' | 'circ' | 'back' | 'bounce' | 'elastic' | 'in-quad' | 'in-cubic' | 'in-quart' | 'in-quint' | 'in-sine' | 'in-expo' | 'in-circ' | 'in-back' | 'in-bounce' | 'in-elastic' | 'out-quad' | 'out-cubic' | 'out-quart' | 'out-quint' | 'out-sine' | 'out-expo' | 'out-circ' | 'out-back' | 'out-bounce' | 'out-elastic' | 'out-in-quad' | 'out-in-cubic' | 'out-in-quart' | 'out-in-quint' | 'out-in-sine' | 'out-in-expo' | 'out-in-circ' | 'out-in-back' | 'out-in-bounce' | 'out-in-elastic' | 'in-out-quad' | 'in-out-cubic' | 'in-out-quart' | 'in-out-quint' | 'in-out-sine' | 'in-out-expo' | 'in-out-circ' | 'in-out-back' | 'in-out-bounce' | 'in-out-elastic';

declare type Handle = {
    time?: number;
    during?: Function;
    after?: Function;
    limit?: number;
    count?: number;
}

declare interface Timer {
    /**
     * Updates the timer
     * @param dt elapsed time
     */
    update(dt: number): void;
    /**
     * Schedule a function. The function will be executed after `delay` seconds have elapsed, given that `update(dt)` is called every frame.
     * 
     * @param delay Number of seconds the function will be delayed.
     * @param after The function to be delayed. 
     * @returns The timer `handle`. See also {@link cancel | Timer.cancel }.
     * 
     * Note:
     * 
     * There is no guarantee that the delay will not be exceeded, it is only guaranteed that the function will not be executed before the delay has passed.
     * 
     * `after` will receive itself as only parameter. This is useful to implement periodic behavior (see the example).
     * 
     * @example
     * 
     * ```ts
     * // grant the player 5 seconds of immortality
     * player.isInvincible = true;
     * Timer.after(5, () => player.isInvincible = false);
     * ```
     * ```ts
     * 
     * // print "foo" every second. See also {@link every | Timer.every }
     * Timer.after(1, (cb: Function) => { 
     *    print("foo"); 
     *    Timer.after(1, cb); 
     * });
     * ```
     */
    after(delay: number, after: (func?: Function) => void): Handle;
    /**
     * Execute a function that can be paused without causing the rest of the program to be suspended.
     * func will receive a function - wait - to do interrupt the script (but not the whole program) as only argument.
     * The function prototype of wait is: wait(delay).
     * @param func Script to execute.
     * @returns A timer handle.
     * 
     * @example
     * 
     * ```ts
     * Timer.script((wait: Function) => {
     *    print("Now"); 
     *    wait(1);
     *    print("After one second");
     *    wait(1);
     *    print("Bye!");
     * });
     * 
     * // useful for splash screens
     * Timer.script((wait:Function)
     *    Timer.tween(0.5, splash.pos, {x: 300}, 'in-out-quad');
     *    wait(5); // show the splash for 5 seconds
     *    Timer.tween(0.5, slpash.pos, {x: 800}, 'in-out-quad');
     * end)
     * 
     * Timer.script((wait: Function) => {
     *    while(true) {
     *       spawnShip();
     *       wait(1/1-produtionSpeed);
     *    }
     * });
     * 
     * // Jumping with timer.script
     * this.timers.script((wait: Function) => {
     *    const w = 1/2;
     *    this.jumping = true;
     *    this.timer.tween(w*2, this, {z: -8}, "out-cubic", () => {
     *        this.timer.tween(w*2, this, {z: 0}, "in-cubic");
     *    });
     *    this.quad = this.quads.jump[0];
     *    wait(w);
     * 
     *    this.quad = this.quads.jump[1];
     *    wait(w);
     * 
     *    this.quad = this.quads.jump[2];
     *    wait(w);
     * 
     *    this.quad = this.quads.jump[3];
     *    wait(w);
     * 
     *    this.jumping = false;
     *    this.z = 0;
     * })
     * ```
     */
    script(func: (wait: Function) => void): Handle;
    /**
     *  Add a function that will be called `count` times every `delay` seconds.
     * 
     * If `count`is omitted the function will be called until it returns `false` or {@link cancel | Timer.cancel(handle) } or {@link clear | Timer.clear()}
     * is called on the timer instance.
     * 
     * @param delay Number of seconds between two consecutive function calls.
     * @param func The function to be called periodically.
     * @param count Number of times the function is to be called (optional).
     * 
     * @example 
     * 
     * ```ts
     * // toggle light on and off every second
     * Timer.every(1, () => lamp.toggleLight());
     * 
     * // launch 5 fighters in quick succession (using a timer instance)
     * mothershipTimer.every(0.3, () => self.launchFighter(), 5);
     * 
     * // flicker player's image as long as he is invincible
     * Timer.every(0.1, () => {
     *     player.flipImage();
     *     return player.isInvincible;
     * })
     * ```
     */
    every(delay: number, func: () => void, count?: number): void;
    /**
     * Run `func(dt)` for the next `delay` seconds. The function is called every time `update(dt)` is called.
     * Optionally run `after()` once `delay` seconds have passed.
     * 
     * `after()` will receive itself as only parameter.
     * 
     * @param period Number of seconds the func will be called.
     * @param func The function to be called on `update(dt)`.
     * @param after A function to be called after delay seconds (optional).
     * 
     * Note:
     * You should not add new timers in `func(dt)`, as this can lead to random crashes.
     * 
     * @example
     * 
     * ```ts
     * Timer.during(5, (dt: number) => animation:update(dt));
     * 
     * // shake the camera for one second
     * const [origX, origY] = camera.position();
     * Timer.during(1, () => {
     *     camera.lookAt(origX + math.random(-2,2), origY + math.random(-2,2));
     * }, () => {
     *     // reset camera position
     *     camera.lookAt(origX, origY);
     * })
     * 
     * player.isInvincible = true;
     * // flash player for 3 seconds
     * let t = 0
     * player.timer.during(3, (dt: number) => {
     *     t += dt;
     *     player.visible = (t % .2) < .1;
     * }, () => {
     *     // make sure the player is visible after three seconds
     *     player.visible = true;
     *     player.isInvincible = false;
     * })
     * ```
     */
    during(period: number, func: (dt: number) => void, after?: (self: Function) => void): void;
    /**
     * Prevent a timer from being executed in the future.
     * 
     * @param handle The function to be canceled.
     * 
     * @example
     * 
     * ```ts
     * function tick() {
     *      print('tick... tock...');
     * }
     * const handle = Timer.every(1, tick);
     * // later
     * Timer.cancel(handle) // NOT: Timer.cancel(tick)
     * 
     * // using a timer instance
     * function tick() {
     *     print('tick... tock...');
     * }
     * const handle = menuTimer.every(1, tick);
     * // later
     * menuTimer.cancel(handle);
     * ```
     */
    cancel(handle: Handle): void;
    /**
     * Remove all timed and periodic functions. Functions that have not yet been executed will discarded.
     * 
     * @param this 
     * 
     * @example
     * 
     * ```ts
     * Timer.clear();
     * 
     * menuTimer.clear();
     * ```
     */
    clear(): void;
    /**
     * {@link https://en.wikipedia.org/wiki/Inbetweening | Tweening } (short for in-betweening) is the process that happens between two defined states. 
     * For example, a tween can be used to gradually fade out a graphic or move a text message to the center of the screen. 
     * For more information why tweening should be important to you, check out this great talk on {@link https://www.youtube.com/watch?v=Fy0aCDmgnxg | juicy games}.
     * 
     * @param duration Duration of the tween
     * @param subject Object to be tweened.
     * @param target Target values.
     * @param method Tweening method, defaults to 'linear' {@link https://hump.readthedocs.io/en/latest/timer.html#tweening-methods | see here}
     * @param after Function to execute after the tweeen has finished.
     * @param args Additional arguments to the tweening function.
     * @returns A timer handle.
     */
    tween(duration: number, subject: object, target: { [key: string]: number }, method?: EasingType, after?: () => void, ...args: any[]): Handle;
}

interface TimerConstructor {
    (this: void): Timer;
}

/**
 * @noResolution
 */
declare module "hump" {
    /**
     * Timer module from hump/timer.lua
     * ```ts
     * import * as Timer from "hump";
     * const timer = Timer();
     * ```
     * `hump.timer` offers a simple interface to schedule the execution of functions. It is possible to run functions after and for some amount of time.
     * For example, a timer could be set to move critters every 5 seconds or to make the player invincible for a short amount of time.
     * 
     * In addition to that, `hump.timer` offers various tweening functions that make it easier to produce juicy games.
     */
    const Timer: TimerConstructor;
    export = Timer;
}
