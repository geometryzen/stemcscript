import { Sym } from "../tree/sym/Sym";
import { is_nil, nil, U } from "../tree/tree";

/**
 * It's possible that we will use a different representation for our knowledge about symbols.
 * The fact that this mirrors the predicates in the higher levels is coincidental.
 * i.e. Don't merge the two.
 */
export interface Props extends Record<string, boolean> {
    antihermitian: boolean,
    algebraic: boolean;
    commutative: boolean,
    complex: boolean,
    extended_negative: boolean,
    extended_nonnegative: boolean,
    extended_nonpositive: boolean,
    extended_nonzero: boolean,
    extended_positive: boolean,
    finite: boolean,
    hermitian: boolean,
    hypercomplex: boolean,
    hyperreal: boolean,
    imaginary: boolean,
    infinite: boolean,
    infinitesimal: boolean,
    integer: boolean;
    irrational: boolean;
    negative: boolean,
    noninteger: boolean;
    nonnegative: boolean,
    nonpositive: boolean,
    nonzero: boolean,
    positive: boolean,
    rational: boolean,
    real: boolean,
    transcendental: boolean,
    zero: boolean
}

const DEFAULT_PROPS: Props = Object.freeze({
    antihermitian: false,
    algebraic: true,
    commutative: true,
    complex: true,
    extended_negative: false,
    extended_nonnegative: true,
    extended_nonpositive: false,
    extended_nonzero: true,
    extended_positive: true,
    finite: true,
    hermitian: true,
    hypercomplex: true,
    hyperreal: true,
    imaginary: false,
    infinite: false,
    infinitesimal: false,
    integer: false,
    irrational: false,
    negative: false,
    noninteger: false,
    nonnegative: true,
    nonpositive: false,
    nonzero: true,
    positive: false,
    rational: true,
    real: true,
    transcendental: false,
    zero: false
});

/**
 * 
 */
export interface SymTab {
    clear(): void;
    getProps(sym: Sym | string): Props;
    setProps(sym: Sym, overrides: Partial<Props>): void;
    /**
     * Returns NIL if the symbol is not bound to anything.
     */
    getValue(sym: Sym | string): U;
    setValue(sym: Sym, value: U): void;
    entries(): { sym: Sym, value: U }[];
    delete(sym: Sym): void;
}

export function createSymTab(): SymTab {
    const props_from_key: Map<string, Props> = new Map();
    const value_from_key: Map<string, U> = new Map();
    const sym_from_key: Map<string, Sym> = new Map();

    const theTab: SymTab = {
        clear(): void {
            props_from_key.clear();
            value_from_key.clear();
            sym_from_key.clear();
        },
        getProps(sym: Sym | string): Props {
            if (typeof sym === 'string') {
                const props = props_from_key.get(sym);
                if (props) {
                    return props;
                }
                else {
                    return DEFAULT_PROPS;
                }
            }
            else {
                return this.getProps(sym.key());
            }
        },
        setProps(sym: Sym, overrides: Partial<Props>): void {
            const key = sym.key();
            if (overrides) {
                const props = Object.freeze(Object.assign({ ...this.getProps(sym) }, implications(overrides)));
                props_from_key.set(key, props);
                sym_from_key.set(key, sym);
            }
            else {
                props_from_key.delete(key);
            }
        },
        getValue(sym: Sym | string): U {
            if (typeof sym === 'string') {
                const value = value_from_key.get(sym);
                if (value) {
                    return value;
                }
                else {
                    return nil;
                }
            }
            else {
                return this.getValue(sym.key());
            }
        },
        setValue(sym: Sym, value: U): void {
            const key = sym.key();
            if (is_nil(value)) {
                value_from_key.delete(key);
            }
            else {
                value_from_key.set(key, value);
                sym_from_key.set(key, sym);
            }
        },
        entries(): { sym: Sym, value: U }[] {
            const bs: { sym: Sym, value: U }[] = [];
            value_from_key.forEach(function (value: U, key: string) {
                const sym = sym_from_key.get(key);
                if (sym) {
                    if (is_nil(value)) {
                        // Ignore.
                    }
                    else {
                        bs.push({ sym, value });
                    }
                }
                else {
                    throw new Error();
                }
            });
            return bs;
        },
        delete(sym: Sym): void {
            const key = sym.key();
            props_from_key.delete(key);
            value_from_key.delete(key);
            sym_from_key.delete(key);
        }
    };
    return theTab;
}

/**
 * Returns a copy of the overrides where the implications of the overrides are made explicit.
 * 
 * zero => infinitesimal
 * zero => nonzero = false
 * 
 * @param overrides 
 */
function implications(overrides: Partial<Props>): Partial<Props> {
    const props: Partial<Props> = { ...overrides };
    if (typeof props.infinite === 'boolean') {
        if (props.infinite) {
            props.finite = false;
            props.infinitesimal = false;
            props.integer = false;
            props.nonzero = true;
            props.real = false;
            props.zero = false;
        }
    }
    if (typeof props.infinitesimal === 'boolean') {
        if (props.infinitesimal) {
            props.finite = true;
            props.infinite = false;
            props.nonzero = true;
            props.real = false;
        }
    }
    if (typeof props.zero === 'boolean') {
        if (props.zero) {
            props.infinitesimal = true;
            props.integer = true;
            props.nonzero = false;
            props.negative = false;
            props.positive = false;
        }
    }
    return props;
}
