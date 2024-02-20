import { is_map, Map, Sym } from "math-expression-atoms";
import { ExprContext } from "math-expression-context";
import { cons, Cons, nil, U } from "math-expression-tree";
import { Extension, ExtensionEnv, FEATURE, mkbuilder, TFLAGS, TFLAG_HALT, TFLAG_NONE } from "../../env/ExtensionEnv";
import { hash_for_atom } from "../../hashing/hash_info";
import { listform } from "../../helpers/listform";
import { print_str } from "../../print/print";
import { defs, PrintMode, PRINTMODE_SEXPR } from "../../runtime/defs";

function verify_map(x: Map): Map | never {
    if (is_map(x)) {
        return x;
    }
    else {
        throw new Error();
    }
}

class DictionaryExtension implements Extension<Map> {
    // Create an exemplar of the atom we control to discover it's name for hashing purposes.
    readonly #atom: Map = verify_map(new Map([]));
    readonly #hash: string = hash_for_atom(verify_map(this.#atom));
    readonly dependencies: FEATURE[] = ['Map'];
    constructor() {
        // Nothing to see here.
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test(atom: Map, opr: Sym, env: ExprContext): boolean {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binL(atom: Map, opr: Sym, rhs: U, expr: ExprContext): U {
        return nil;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binR(atom: Map, opr: Sym, lhs: U, expr: ExprContext): U {
        return nil;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(expr: Map, opr: Sym, argList: Cons, env: ExprContext): U {
        throw new Error("Method not implemented.");
    }
    iscons(): false {
        return false;
    }
    operator(): never {
        throw new Error();
    }
    get hash() {
        return this.#hash;
    }
    get name() {
        return 'DictionaryExtension';
    }
    evaluate(dictionary: Map, argList: Cons): [TFLAGS, U] {
        return this.transform(cons(dictionary, argList));
    }
    transform(expr: U): [TFLAGS, U] {
        // We actually need to dig into the entries...
        return [is_map(expr) ? TFLAG_HALT : TFLAG_NONE, expr];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    valueOf(dictionary: Map, $: ExtensionEnv): U {
        throw new Error("DictionaryExtension.valueOf() method not implemented.");
    }
    isKind(x: U): x is Map {
        return is_map(x);
    }
    subst(expr: Map, oldExpr: U, newExpr: U): U {
        if (this.isKind(oldExpr)) {
            if (expr.equals(oldExpr)) {
                return newExpr;
            }
        }
        return expr;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toHumanString(dictionary: Map, $: ExprContext): string {
        throw new Error("DictionaryExtension.toInfixString() method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toInfixString(dictionary: Map, $: ExprContext): string {
        throw new Error("DictionaryExtension.toInfixString() method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toLatexString(dictionary: Map, $: ExprContext): string {
        return print_dictionary_latex(dictionary, $);
    }
    toListString(dictionary: Map, $: ExprContext): string {
        // While the following implementation requires refactoring due to some technical weaknesses,
        // the basic idea is good. The function to print the dictionary should be owned by this extension.
        const printMode: PrintMode = defs.printMode;
        defs.setPrintMode(PRINTMODE_SEXPR);
        try {
            return print_dictionary(dictionary, $);
        }
        finally {
            defs.setPrintMode(printMode);
        }
    }
}

export const map_extension_builder = mkbuilder(DictionaryExtension);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function print_dictionary(dictionary: Map, $: ExprContext): string {
    let str = '';
    str += print_str('{');
    try {
        const entries: [key: U, value: U][] = dictionary.entries;
        const n = entries.length;
        const pairs: string[] = [];
        for (let i = 0; i < n; i++) {
            const key = entries[i][0];
            const value = entries[i][1];
            const keyStr = listform(key, $);
            const valStr = listform(value, $);
            pairs.push(`${keyStr} ${valStr}`);
        }
        str += pairs.join(' ');
    }
    finally {
        str += print_str('}');
    }
    return str;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function print_dictionary_latex(dictionary: Map, $: ExprContext): string {
    let str = '';

    str += '\\begin{lstlisting}[language=python]';

    // https://tex.stackexchange.com/questions/530880/how-to-represent-a-python-print-like-dictionary-in-latex-text

    str += ' \\end{lstlisting}';

    return str;
}
