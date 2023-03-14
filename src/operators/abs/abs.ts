import { complex_conjugate } from '../../complex_conjugate';
import { Directive, ExtensionEnv } from '../../env/ExtensionEnv';
import { imu } from '../../env/imu';
import { exp } from '../../exp';
import { equaln, is_num_and_gt_zero } from '../../is';
import { Native } from '../../native/Native';
import { native_sym } from '../../native/native_sym';
import { is_base_of_natural_logarithm } from '../../predicates/is_base_of_natural_logarithm';
import { is_negative } from '../../predicates/is_negative';
import { is_negative_number } from '../../predicates/is_negative_number';
import { has_clock_form, has_exp_form } from '../../runtime/find';
import { is_abs, is_add, is_multiply, is_power } from '../../runtime/helpers';
import { oneAsFlt } from '../../tree/flt/Flt';
import { caddr, cadr } from '../../tree/helpers';
import { half, one, two } from '../../tree/rat/Rat';
import { Tensor } from '../../tree/tensor/Tensor';
import { car, is_cons, items_to_cons, U } from '../../tree/tree';
import { imag } from '../imag/imag';
import { is_imu } from '../imu/is_imu';
import { is_num } from '../num/is_num';
import { is_pi } from '../pi/is_pi';
import { is_rat } from '../rat/is_rat';
import { real } from '../real/real';
import { simplify, simplify_trig } from '../simplify/simplify';
import { is_tensor } from '../tensor/is_tensor';

export const ABS = native_sym(Native.abs);
//(docs are generated from top-level comments, keep an eye on the formatting!)

/* abs =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
x

General description
-------------------
Returns the absolute value of a real number, the magnitude of a complex number, or the vector length.

*/

/*
 Absolute value of a number,or magnitude of complex z, or norm of a vector

  z    abs(z)
  -    ------

  a    a

  -a    a

  (-1)^a    1

  exp(a + i b)  exp(a)

  a b    abs(a) abs(b)

  a + i b    sqrt(a^2 + b^2)

Notes

  1. Handles mixed polar and rectangular forms, e.g. 1 + exp(i pi/3)

  2. jean-francois.debroux reports that when z=(a+i*b)/(c+i*d) then

    abs(numerator(z)) / abs(denominator(z))

     must be used to get the correct answer. Now the operation is
     automatic.
*/

/**
 * We take the general view that expr is a vector of an inner product space. Every inner product gives rise to a norm,
 * called the canonical or induced norm, where the norm of a vector v is defined by:
 * 
 * abs(v) = sqrt(inner(v, v))
 * 
 * For real numbers, the inner product of v with itself reduces to the square of v.
 * For complex numbers, the inner product requires taking the conjugate of the second.
 * For our use of tensors as a vector, we also take the conjugate of the second.
 * 
 * https://en.wikipedia.org/wiki/Inner_product_space
 * 
 * For real numbers,    inner(x,y) = x * y
 * For complex numbers, inner(x,y) = x * conj(y) 
 * 
 */
/*
export function abs(x: U, $: ExtensionEnv): U {
    console.lg(`abs x=${print_list(x, $)}`);
    const A = $.inner(x, x);
    console.lg(`A=${print_list(A, $)}`);
    const B = $.power(A, half);
    return B;
}
*/

/**
 * What should be the role of these generic functions?
 * They cannot be the entry point if the system is extensible regarding atoms.
 */
export function abs(x: U, $: ExtensionEnv): U {
    // console.lg("abs", $.toSExprString(x));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hook = function (retval: U, description: string): U {
        // console.lg(`abs ${render_as_infix(x, $)} => ${render_as_infix(retval, $)} @ ${description}`);
        return retval;
    };

    // Just to prove that the argument is not re-assigned.
    const expr: U = x;

    if ($.is_zero(expr)) {
        return hook(expr, "A");
    }

    if ($.isOne(expr)) {
        return hook(expr, "B");
    }

    if (is_negative_number(expr)) {
        return hook($.negate(expr), "C");
    }

    if (is_num_and_gt_zero(expr)) {
        return hook(expr, "D");
    }

    if (is_pi(expr)) {
        return hook(expr, "E1");
    }

    // ??? should there be a shortcut case here for the imaginary unit?
    if (is_imu(expr)) {
        return hook(one, "E2");
    }

    // now handle decomposition cases ----------------------------------------------

    // we catch the "add", "power", "multiply" cases first,
    // before falling back to the
    // negative/positive cases because there are some
    // simplification thay we might be able to do.
    // Note that for this routine to give a correct result, this
    // must be a sum where a complex number appears.
    // If we apply this to "a+b", we get an incorrect result.
    // Note that addition of multivectors is handled in a different operator.
    if (is_cons(expr) && is_add(expr)) {
        // console.lg("abs", $.toInfixString(expr));
        // If it looks vaguely like a complex number perhaps?
        if (has_clock_form(expr, expr, $) || has_exp_form(expr, $) || expr.contains(imu)) {

            // console.lg(`z? => ${$.toInfixString(expr)}`);

            const z = expr;
            // const z = rect(expr, $); // convert polar terms, if any

            // console.lg(`z => ${$.toInfixString(z)}`);

            const x = real(z, $);
            // console.lg(`x => ${$.toInfixString(x)}`);
            const y = imag(z, $);
            const xx = $.power(x, two);
            const yy = $.power(y, two);
            const zz = $.add(xx, yy);
            const abs_z = $.power(zz, half);
            // console.lg(`x => ${$.toInfixString(x)}`)
            // console.lg(`y => ${$.toInfixString(y)}`)
            const retval = simplify_trig(abs_z, $);
            return hook(retval, "F");
        }
    }

    if (is_cons(expr) && is_power(expr) && equaln(car(expr.cdr), -1)) {
        // console.lg("abs of -1 to some expo", $.toInfixString(expr));
        // console.lg("detected abs(minus one to some power) and returning 1");
        // -1 to any power
        // abs( (-1)^x ) = sqrt( (-1)^x * (-1)^x ) = sqrt( 1^x ) = 1
        return hook($.getNativeDirective(Directive.evaluatingAsFloat) ? oneAsFlt : one, "G");
    }

    // abs(base^expo) is equal to abs(base)^expo IF expo is positive.
    // TODO: This needs more flexibility because (1/a)^(1/m) = a^(-1/m)
    // console.lg("expr", render_as_sexpr(expr, $));
    if (is_cons(expr) && is_power(expr)) {
        // console.lg("abs of an exponential", $.toInfixString(expr));
        const base = cadr(expr);
        const expo = caddr(expr);
        if (is_num(expo)) {
            if (is_num_and_gt_zero(expo)) {
                const abs_base = abs(base, $);
                return hook($.power(abs_base, expo), "H");
            }
            if (is_rat(expo)) {
                // const a = base;
                // const m = expo.numer();
                // const n = expo.denom();
                // Let m = numer(expo), n = denom(expo), with n > 0. m is any integer.
                // abs(a^(m/n)) = abs((a^(1/n))^m) = abs(a^(1/n))^m, for all m (positive, negative, zero)
                // Notice that if m = +1, we get abs(a^(1/n)) = abs(a^(1/n))^1, which leads to infinite recursion.
                // If a is a Num that is non-negative then we can take the n-th root and it will be positive.
                // Under these conditions abs(a^(1/n)) = a^(1/n) and abs(a^(m/n)) = a^(m/n)
                if (is_num(base) && !base.isNegative()) {
                    return hook($.power(base, expo), "I");
                }
            }
        }
    }

    // abs(e^something)
    const base = cadr(expr);
    if (is_power(expr) && is_base_of_natural_logarithm(base)) {
        // exponential
        return hook(exp(real(caddr(expr), $), $), "I");
    }

    if (is_cons(expr) && is_multiply(expr)) {
        // console.lg("abs", $.toInfixString(expr));
        // product
        // abs(a * b * c ...) = abs(a) * abs(b) * abs(c) ...
        const binary_multiply = (lhs: U, rhs: U) => $.multiply(lhs, rhs);
        return hook(expr.tail().map($.abs).reduce(binary_multiply), "J");
    }

    // abs(abs(x)) => abs(x) (abs is a projection operator).
    if (is_cons(expr) && is_abs(expr)) {
        return hook(expr, "K");
    }

    if (is_tensor(expr)) {
        const retval = abs_tensor(expr, $);
        return hook(retval, "L");
    }

    if (is_negative(expr) || (is_cons(expr) && is_add(expr) && is_negative(cadr(expr)))) {
        const neg_expr = $.negate(expr);
        return hook(items_to_cons(ABS, neg_expr), "M");
    }

    // But we haven't handled the sum of terms.
    if (is_cons(expr) && is_add(expr)) {
        // TODO: This should probably be the implementation in all cases.
        // Everything else is just an optimization.
        // By selecting only sums of terms, we are narrowing ourselves down to
        // trying to remove the abs function by applying the Cauchy-Schwartz equality,
        // hoping for the case that all terms are positive.
        // https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality
        // return hook($.valueOf(simplify($.power($.inner(expr, expr), half), $)), "N");
        return hook(items_to_cons(ABS, expr), "N");
    }
    else {
        // Here we have given up and simply wrap the expression.
        // Perhaps the real question is whether expr is a vector in an inner product space.
        return hook(items_to_cons(ABS, expr), "O");
    }
}

// also called the "norm" of a vector
export function abs_tensor(M: Tensor, $: ExtensionEnv): U {
    if (M.ndim !== 1) {
        throw new Error('abs(tensor) with tensor rank > 1');
    }
    // 
    const K = simplify(M, $);
    // TODO: We need to be careful here. The conjugate operation really belongs inside the inner operation for tensors.
    return $.valueOf(simplify($.power($.inner(K, complex_conjugate(K, $)), half), $));
}
