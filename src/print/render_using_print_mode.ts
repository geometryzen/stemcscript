import { PrintMode, PRINTMODE_ASCII, PRINTMODE_HUMAN, PRINTMODE_INFIX, PRINTMODE_LATEX, PRINTMODE_SEXPR } from "../runtime/defs";
import { U } from "../tree/tree";
import { PrintConfig } from "./print";
import { render_as_ascii } from "./render_as_ascii";
import { render_as_human } from "./render_as_human";
import { render_as_infix } from "./render_as_infix";
import { render_as_latex } from "./render_as_latex";
import { render_as_sexpr } from "./render_as_sexpr";

export function render_using_print_mode(expr: U, printMode: PrintMode, $: PrintConfig): string {
    switch (printMode) {
        case PRINTMODE_ASCII: return render_as_ascii(expr, $);
        case PRINTMODE_HUMAN: return render_as_human(expr, $);
        case PRINTMODE_INFIX: return render_as_infix(expr, $);
        case PRINTMODE_LATEX: return render_as_latex(expr, $);
        case PRINTMODE_SEXPR: return render_as_sexpr(expr, $);
        default: throw new Error(printMode);
    }
}
