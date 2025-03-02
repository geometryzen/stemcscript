import { create_int, is_rat, is_sym, one, Rat } from "@stemcmicro/atoms";
import { ExprContext } from "@stemcmicro/context";
import { is_cons_opr_eq_multiply } from "@stemcmicro/helpers";
import { is_cons, U } from "@stemcmicro/tree";
import { factor_polynomial } from "../../factorpoly";
import { is_poly_expanded_form } from "../../is";
import { multiply_items_factoring } from "../../multiply";
import { factor_rat } from "../../pollard";
import { MAXPRIMETAB, primetab } from "../../runtime/constants";

export function factor_again(p1: U, p2: U, $: ExprContext): U {
    if (is_cons(p1) && is_cons_opr_eq_multiply(p1)) {
        const arr: U[] = [];
        p1.tail().forEach((el) => factor_term(arr, el, p2, $));
        return multiply_items_factoring(arr, $);
    }

    const arr: U[] = [];
    factor_term(arr, p1, p2, $);
    return arr[0];
}

function factor_term(arr: U[], arg1: U, arg2: U, $: Pick<ExprContext, "getDirective" | "handlerFor" | "pushDirective" | "popDirective" | "valueOf">): void {
    const p1 = factorize(arg1, arg2, $);
    if (is_cons(p1) && is_cons_opr_eq_multiply(p1)) {
        arr.push(...p1.tail());
        return;
    }

    arr.push(p1);
}

export function factor(poly: U, x: U, $: Pick<ExprContext, "getDirective" | "handlerFor" | "pushDirective" | "popDirective" | "valueOf">): U {
    // console.lg("factor", "poly", `${$.toInfixString(poly)}`, "x", `${x}`);
    if (is_rat(poly) && poly.isInteger()) {
        return factor_rat(poly);
    }

    return factorize(poly, x, $);
}

export function factorize(p: U, x: U, $: Pick<ExprContext, "getDirective" | "handlerFor" | "pushDirective" | "popDirective" | "valueOf">): U {
    if (!p.contains(x)) {
        // console.lg(`Giving up b/c the polynomial does not contain the variable.`);
        return p;
    }

    if (!is_poly_expanded_form(p, x)) {
        // console.lg(`Giving up b/c the polynomial is not in expanded form.`);
        return p;
    }

    if (is_sym(x)) {
        return factor_polynomial(p, x, $);
    } else {
        // console.lg(`Giving up b/c the variable is not a symbol.`);
        return p;
    }
}

// for factoring small integers (2^32 or less)
export function factor_small_number(n: number): Rat[] {
    if (isNaN(n)) {
        throw new Error("number too big to factor");
    }
    const arr: Rat[] = [];
    if (n < 0) {
        n = -n;
    }

    for (let i = 0; i < MAXPRIMETAB; i++) {
        const d = primetab[i];

        if (d > n / d) {
            break;
        }

        let expo = 0;

        while (n % d === 0) {
            n /= d;
            expo++;
        }

        if (expo) {
            arr.push(create_int(d));
            arr.push(create_int(expo));
        }
    }

    if (n > 1) {
        arr.push(create_int(n));
        arr.push(one);
    }
    return arr;
}
