import { assert_rat, assert_sym, create_flt, create_sym, Flt, is_num, is_tensor, Sym } from "math-expression-atoms";
import { Cons, nil, U } from "math-expression-tree";
import { Directive } from "../env/ExtensionEnv";
import { assert_cons } from "../tree/cons/assert_cons";
import { broadcast, ConsFunction, eval_nonstop, floatfunc, get_binding, lookup, restore_symbol, save_symbol, set_symbol, value_of } from "./eigenmath";
import { isimaginaryunit } from "./isimaginaryunit";
import { ProgramControl } from "./ProgramControl";
import { ProgramEnv } from "./ProgramEnv";
import { ProgramIO } from "./ProgramIO";
import { ProgramStack } from "./ProgramStack";
import { draw_formula, emit_list, height, set_emit_small_font, SvgRenderConfig, width } from "./render_svg";

interface DrawContext {
    /**
     * -Math.PI
     */
    tmin: number;
    /**
     * +Math.PI
     */
    tmax: number;
    /**
     * -10
     */
    xmin: number;
    /**
     * +10
     */
    xmax: number;
    /**
     * -10
     */
    ymin: number;
    /**
     * +10
     */
    ymax: number;
}

const I_LOWER = create_sym("i");
const J_LOWER = create_sym("j");
// const X_LOWER = create_sym("x");

const DRAW_LEFT_PAD = 200;
const DRAW_RIGHT_PAD = 100;

const DRAW_TOP_PAD = 10;
const DRAW_BOTTOM_PAD = 40;

const DRAW_XLABEL_BASELINE = 30;
const DRAW_YLABEL_MARGIN = 15;

function draw_args(argList: Cons, env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack): [F: U, varName: Sym, n: number] {
    const F = argList.item0;
    const varName = assert_sym(argList.item1);
    const item2 = argList.item2;
    try {
        $.push(item2);
        value_of(env, ctrl, $);
        const N = $.pop();
        try {
            if (N.isnil) {
                return [F, varName, DRAW_WIDTH + 1];
            }
            else {
                return [F, varName, assert_rat(N).toNumber()];
            }
        }
        finally {
            N.release();
        }
    }
    finally {
        item2.release();
    }
}

export function make_eval_draw(io: Pick<ProgramIO, 'listeners'>): ConsFunction {

    return function (expr: Cons, env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack): void {
        assert_cons(expr);
        if (ctrl.getDirective(Directive.drawing)) {
            // Do nothing
        }
        else {
            ctrl.pushDirective(Directive.drawing, 1);
            try {
                const [F, varName, n] = draw_args(expr.argList, env, ctrl, $);
                /*
                if (!(is_sym(T) && env.hasUserFunction(T))) {
                    T = X_LOWER;
                }
                */

                save_symbol(assert_sym(varName), env);
                try {
                    const dc: DrawContext = {
                        tmax: +Math.PI,
                        tmin: -Math.PI,
                        xmax: +10,
                        xmin: -10,
                        ymax: +10,
                        ymin: -10
                    };
                    setup_trange(env, ctrl, $, dc);
                    setup_xrange(env, ctrl, $, dc);
                    setup_yrange(env, ctrl, $, dc);

                    setup_final(F, assert_sym(varName), env, ctrl, $, dc);

                    const points: { t: number; x: number; y: number }[] = [];

                    // TODO: Why do we use the theta range? How do we ensure integrity across function calls?
                    draw_pass1(F, varName, n, points, env, ctrl, $, dc);
                    draw_pass2(F, varName, points, env, ctrl, $, dc);

                    const outbuf: string[] = [];

                    const ec: SvgRenderConfig = {
                        useImaginaryI: isimaginaryunit(get_binding(I_LOWER, env)),
                        useImaginaryJ: isimaginaryunit(get_binding(J_LOWER, env))
                    };
                    emit_graph(points, $, dc, ec, outbuf);

                    const output = outbuf.join('');

                    broadcast(output, io);
                }
                finally {
                    restore_symbol(env);
                }
            }
            finally {
                ctrl.popDirective();
            }
        }

        $.push(nil); // return value
    };
}

function setup_trange(env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    dc.tmin = -Math.PI;
    dc.tmax = Math.PI;

    let p1: U = lookup(create_sym("trange"), env);
    $.push(p1);
    eval_nonstop(env, ctrl, $);
    floatfunc(env, ctrl, $);
    p1 = $.pop()!;

    if (!is_tensor(p1) || p1.ndim !== 1 || p1.dims[0] !== 2)
        return;

    const p2 = p1.elems[0];
    const p3 = p1.elems[1];

    if (!is_num(p2) || !is_num(p3)) {
        return;
    }

    dc.tmin = p2.toNumber();
    dc.tmax = p3.toNumber();
}

function setup_xrange(env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    dc.xmin = -10;
    dc.xmax = 10;

    let p1: U = lookup(create_sym("xrange"), env);
    $.push(p1);
    eval_nonstop(env, ctrl, $);
    floatfunc(env, ctrl, $);
    p1 = $.pop()!;

    if (!is_tensor(p1) || p1.ndim !== 1 || p1.dims[0] !== 2) {
        return;
    }

    const p2 = p1.elems[0];
    const p3 = p1.elems[1];

    if (!is_num(p2) || !is_num(p3))
        return;

    dc.xmin = p2.toNumber();
    dc.xmax = p3.toNumber();
}

function setup_yrange(env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    dc.ymin = -10;
    dc.ymax = 10;

    let p1: U = lookup(create_sym("yrange"), env);
    $.push(p1);
    eval_nonstop(env, ctrl, $);
    floatfunc(env, ctrl, $);
    p1 = $.pop()!;

    if (!is_tensor(p1) || p1.ndim !== 1 || p1.dims[0] !== 2) {
        return;
    }

    const p2 = p1.elems[0];
    const p3 = p1.elems[1];

    if (!is_num(p2) || !is_num(p3))
        return;

    dc.ymin = p2.toNumber();
    dc.ymax = p3.toNumber();
}

function draw_pass1(F: U, varName: Sym, n: number, points: { t: number; x: number; y: number }[], env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {
    const n_minus_one = n - 1;
    for (let i = 0; i < n; i++) {
        const t = dc.tmin + (dc.tmax - dc.tmin) * i / n_minus_one;
        sample(F, varName, t, points, env, ctrl, $, dc);
    }
}

function draw_pass2(F: U, varName: Sym, points: { t: number; x: number; y: number }[], env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    const n = points.length - 1;

    for (let i = 0; i < n; i++) {

        const t1 = points[i].t;
        const t2 = points[i + 1].t;

        const x1 = points[i].x;
        const x2 = points[i + 1].x;

        const y1 = points[i].y;
        const y2 = points[i + 1].y;

        if (!inrange(x1, y1) && !inrange(x2, y2)) {
            continue;
        }

        const dt = t2 - t1;
        const dx = x2 - x1;
        const dy = y2 - y1;

        const m = Math.floor(Math.sqrt(dx * dx + dy * dy));

        for (let j = 1; j < m; j++) {
            const t = t1 + dt * j / m;
            sample(F, varName, t, points, env, ctrl, $, dc);
        }
    }
}

function setup_final(F: U, varName: Sym, env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    set_symbol(varName, create_flt(dc.tmin), nil, env);

    $.push(F);
    eval_nonstop(env, ctrl, $);
    const Fmin = $.pop();

    if (!is_tensor(Fmin)) {
        dc.tmin = dc.xmin;
        dc.tmax = dc.xmax;
    }
}

function sample(F: U, varName: Sym, t: number, points: { t: number; x: number; y: number }[], env: ProgramEnv, ctrl: ProgramControl, $: ProgramStack, dc: DrawContext): void {

    let X: U = create_flt(t);

    set_symbol(assert_sym(varName), X, nil, env);

    $.push(F);
    eval_nonstop(env, ctrl, $);
    floatfunc(env, ctrl, $);
    let Y = $.pop();
    try {
        if (is_tensor(Y)) {
            X = Y.elems[0];
            Y = Y.elems[1];
        }

        if (!is_num(X) || !is_num(Y)) {
            return;
        }

        const xUnscaled = X.toNumber();
        const yUnscaled = Y.toNumber();

        if (!isFinite(xUnscaled) || !isFinite(yUnscaled)) {
            return;
        }

        const x = DRAW_WIDTH * (xUnscaled - dc.xmin) / (dc.xmax - dc.xmin);
        const y = DRAW_HEIGHT * (yUnscaled - dc.ymin) / (dc.ymax - dc.ymin);

        const point = { t: t, x: x, y: y };

        points.push(point);
    }
    finally {
        Y.release();
    }
}

function emit_graph(draw_array: { t: number; x: number; y: number }[], $: ProgramStack, dc: DrawContext, ec: SvgRenderConfig, outbuf: string[]): void {

    const h = DRAW_TOP_PAD + DRAW_HEIGHT + DRAW_BOTTOM_PAD;
    const w = DRAW_LEFT_PAD + DRAW_WIDTH + DRAW_RIGHT_PAD;

    const heq = "height='" + h + "'";
    const weq = "width='" + w + "'";

    outbuf.push("<svg " + heq + weq + ">");

    emit_axes(dc, outbuf);
    emit_box(dc, outbuf);
    emit_labels($, dc, ec, outbuf);
    emit_points(draw_array, dc, outbuf);

    outbuf.push("</svg>");
}

function emit_axes(dc: DrawContext, outbuf: string[]): void {

    const x = 0;
    const y = 0;

    const dx = DRAW_WIDTH * (x - dc.xmin) / (dc.xmax - dc.xmin);
    const dy = DRAW_HEIGHT - DRAW_HEIGHT * (y - dc.ymin) / (dc.ymax - dc.ymin);

    if (dx > 0 && dx < DRAW_WIDTH)
        draw_line(dx, 0, dx, DRAW_HEIGHT, 0.5, outbuf); // vertical axis

    if (dy > 0 && dy < DRAW_HEIGHT)
        draw_line(0, dy, DRAW_WIDTH, dy, 0.5, outbuf); // horizontal axis
}

function emit_box(dc: DrawContext, outbuf: string[]): void {
    const x1 = 0;
    const x2 = DRAW_WIDTH;

    const y1 = 0;
    const y2 = DRAW_HEIGHT;

    draw_line(x1, y1, x2, y1, 0.5, outbuf); // top line
    draw_line(x1, y2, x2, y2, 0.5, outbuf); // bottom line

    draw_line(x1, y1, x1, y2, 0.5, outbuf); // left line
    draw_line(x2, y1, x2, y2, 0.5, outbuf); // right line
}

function emit_labels($: ProgramStack, dc: DrawContext, ec: SvgRenderConfig, outbuf: string[]): void {
    set_emit_small_font();
    emit_list(new Flt(dc.ymax), $, ec);
    const YMAX = $.pop()!;
    let x = DRAW_LEFT_PAD - width(YMAX) - DRAW_YLABEL_MARGIN;
    let y = DRAW_TOP_PAD + height(YMAX);
    draw_formula(x, y, YMAX, outbuf);

    set_emit_small_font();
    emit_list(new Flt(dc.ymin), $, ec);
    const YMIN = $.pop();
    x = DRAW_LEFT_PAD - width(YMIN) - DRAW_YLABEL_MARGIN;
    y = DRAW_TOP_PAD + DRAW_HEIGHT;
    draw_formula(x, y, YMIN, outbuf);

    set_emit_small_font();
    emit_list(new Flt(dc.xmin), $, ec);
    const XMIN = $.pop();
    x = DRAW_LEFT_PAD - width(XMIN) / 2;
    y = DRAW_TOP_PAD + DRAW_HEIGHT + DRAW_XLABEL_BASELINE;
    draw_formula(x, y, XMIN, outbuf);

    set_emit_small_font();
    emit_list(new Flt(dc.xmax), $, ec);
    const XMAX = $.pop();
    x = DRAW_LEFT_PAD + DRAW_WIDTH - width(XMAX) / 2;
    y = DRAW_TOP_PAD + DRAW_HEIGHT + DRAW_XLABEL_BASELINE;
    draw_formula(x, y, XMAX, outbuf);
}

function emit_points(draw_array: { t: number; x: number; y: number }[], $: DrawContext, outbuf: string[]): void {

    const n = draw_array.length;

    for (let i = 0; i < n; i++) {

        let x = draw_array[i].x;
        let y = draw_array[i].y;

        if (!inrange(x, y)) {
            continue;
        }

        x += DRAW_LEFT_PAD;
        y = DRAW_HEIGHT - y + DRAW_TOP_PAD;

        const xeq = "cx='" + x + "'";
        const yeq = "cy='" + y + "'";

        outbuf.push("<circle " + xeq + yeq + "r='1.5' style='stroke:black;fill:black'/>\n");
    }
}

function draw_line(x1: number, y1: number, x2: number, y2: number, t: number, outbuf: string[]): void {
    x1 += DRAW_LEFT_PAD;
    x2 += DRAW_LEFT_PAD;

    y1 += DRAW_TOP_PAD;
    y2 += DRAW_TOP_PAD;

    const x1eq = "x1='" + x1 + "'";
    const x2eq = "x2='" + x2 + "'";

    const y1eq = "y1='" + y1 + "'";
    const y2eq = "y2='" + y2 + "'";

    outbuf.push("<line " + x1eq + y1eq + x2eq + y2eq + "style='stroke:black;stroke-width:" + t + "'/>\n");
}

const DRAW_WIDTH = 300;
const DRAW_HEIGHT = 300;

export function inrange(x: number, y: number): boolean {
    return x > -0.5 && x < DRAW_WIDTH + 0.5 && y > -0.5 && y < DRAW_HEIGHT + 0.5;
}
