import { is_tensor, one, zero } from 'math-expression-atoms';
import { Cons, is_cons, U } from 'math-expression-tree';
import { condense } from '../../condense';
import { Directive, ExtensionEnv } from '../../env/ExtensionEnv';
import { divide } from '../../helpers/divide';
import { inverse } from '../../helpers/inverse';
import { is_num_and_negative } from '../../predicates/is_negative_number';
import { is_add, is_multiply, is_power } from '../../runtime/helpers';
import { caddr, cadr } from '../../tree/helpers';
import { gcd } from '../gcd/gcd';

export function Eval_rationalize(expr: Cons, $: ExtensionEnv): U {
    // const infix = render_as_infix(expr, $);
    // console.lg("infix", infix);
    const arg = cadr(expr);
    // console.lg("arg", render_as_infix(arg, $));
    const value = $.valueOf(arg);
    // console.lg("value", render_as_infix(value, $));
    return rationalize_factoring(value, $);
}

export function rationalize_factoring(argList: U, $: Pick<ExtensionEnv, 'add' | 'factorize' | 'multiply' | 'power' | 'subtract' | 'pushDirective' | 'popDirective' | 'valueOf'>): U {
    $.pushDirective(Directive.factoring, 1);
    try {
        return yyrationalize(argList, $);
    }
    finally {
        $.popDirective();
    }
}

function yyrationalize(arg: U, $: Pick<ExtensionEnv, 'add' | 'factorize' | 'multiply' | 'power' | 'subtract' | 'pushDirective' | 'popDirective' | 'valueOf'>): U {
    // console.lg(`yyrationalize ${render_as_infix(arg, $)}`);
    if (is_tensor(arg)) {
        return __rationalize_tensor(arg, $);
    }

    // defs.expanding = false;

    if (!is_add(arg)) {
        return arg;
    }

    // get common denominator
    const commonDenominator = multiply_denominators(arg, $);

    // console.lg(`commonDenominator ${render_as_infix(commonDenominator, $)}`);

    // multiply each term by common denominator
    let temp: U = zero;
    if (is_cons(arg)) {
        temp = arg
            .tail()
            .reduce(
                (acc: U, term: U) => $.add(acc, $.multiply(commonDenominator, term)),
                temp
            );
    }
    // collect common factors
    // divide by common denominator
    // console.lg(`temp ${print_expr(temp, $)}`);
    const condensed = condense(temp, $);
    // console.lg(`condensed ${print_expr(condensed, $)}`);
    const rationalized = divide(condensed, commonDenominator, $);
    // console.lg(`rationalized ${print_expr(rationalized, $)}`);
    return rationalized;
}

function multiply_denominators(p: U, $: Pick<ExtensionEnv, 'factorize' | 'multiply' | 'power' | 'subtract' | 'valueOf' | 'pushDirective' | 'popDirective'>): U {
    if (is_add(p)) {
        return p
            .tail()
            .reduce(
                (acc: U, el: U) => multiply_denominators_term(el, acc, $),
                one
            );
    }
    return multiply_denominators_term(p, one, $);
}

function multiply_denominators_term(p: U, p2: U, $: Pick<ExtensionEnv, 'factorize' | 'multiply' | 'power' | 'subtract' | 'valueOf' | 'pushDirective' | 'popDirective'>): U {
    if (is_multiply(p)) {
        return p
            .tail()
            .reduce((acc, el) => multiply_denominators_factor(el, acc, $), p2);
    }

    return multiply_denominators_factor(p, p2, $);
}

function multiply_denominators_factor(p: U, p2: U, $: Pick<ExtensionEnv, 'factorize' | 'multiply' | 'power' | 'subtract' | 'valueOf' | 'pushDirective' | 'popDirective'>): U {
    if (!is_power(p)) {
        return p2;
    }

    const arg2 = p;

    p = caddr(p);

    // like x^(-2) ?
    if (is_num_and_negative(p)) {
        return __lcm(p2, inverse(arg2, $), $);
    }

    // like x^(-a) ?
    if (is_multiply(p) && is_num_and_negative(cadr(p))) {
        return __lcm(p2, inverse(arg2, $), $);
    }

    // no match
    return p2;
}

function __rationalize_tensor(p1: U, $: Pick<ExtensionEnv, 'add' | 'factorize' | 'multiply' | 'power' | 'subtract' | 'pushDirective' | 'popDirective' | 'valueOf'>): U {

    if (!is_tensor(p1)) {
        // might be zero
        return p1;
    }

    const elems = p1.mapElements(function (x) {
        return rationalize_factoring(x, $);
    });

    return p1.withElements(elems);
}

function __lcm(p1: U, p2: U, $: Pick<ExtensionEnv, 'factorize' | 'multiply' | 'power' | 'subtract' | 'valueOf' | 'pushDirective' | 'popDirective'>): U {
    return divide($.multiply(p1, p2), gcd(p1, p2, $ as ExtensionEnv), $);
}
