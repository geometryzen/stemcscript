/* eslint-disable @typescript-eslint/no-unused-vars */
import { create_int, create_sym, create_tensor, Str } from "@stemcmicro/atoms";
import { Native, native_sym } from "@stemcmicro/native";
import { items_to_cons, nil, U } from "@stemcmicro/tree";
import {
    Add,
    AnnAssign,
    Assign,
    astFromParse,
    Attribute,
    BinOp,
    BitOr,
    BitXor,
    Call,
    ClassDef,
    Compare,
    Dict,
    Div,
    Ellipsis,
    ExpressionStatement,
    ForStatement,
    FunctionDef,
    IfStatement,
    ImportFrom,
    Index,
    List,
    LShift,
    Module,
    Mult,
    Name,
    Num,
    parse,
    Pow,
    Print,
    ReturnStatement,
    RShift,
    Slice,
    SourceKind,
    Statement,
    Str as PythonString,
    Sub,
    Subscript,
    UnaryOp,
    Visitor
} from "typhon-lang";
import { FltTokenParser } from "./FltTokenParser";
import { IntTokenParser } from "./IntTokenParser";
import { PyParseOptions } from "./PyParseOptions";

export const ASSIGN = native_sym(Native.assign);
export const COMPONENT = native_sym(Native.component);
export const MATH_ADD = native_sym(Native.add);
export const MATH_DIV = native_sym(Native.divide);
export const MATH_INNER = native_sym(Native.inner);
export const MATH_LCO = native_sym(Native.lco);
export const MATH_MUL = native_sym(Native.multiply);
export const MATH_OUTER = native_sym(Native.outer);
export const MATH_POW = native_sym(Native.pow);
export const MATH_RCO = native_sym(Native.rco);
export const MATH_SUB = native_sym(Native.subtract);

class PythonVisitor implements Visitor {
    readonly stack: U[] = [];
    annAssign(annassign: AnnAssign): void {
        throw new Error("Method not implemented.");
    }
    assign(assign: Assign): void {
        assign.targets.forEach((target) => {
            target.accept(this);
        });
        assign.value.accept(this);
        const rhs = this.stack.pop() as U;
        const lhs = this.stack.pop() as U;
        this.stack.push(items_to_cons(ASSIGN, lhs, rhs));
    }
    attribute(attribute: Attribute): void {
        throw new Error("Method not implemented.");
    }
    binOp(be: BinOp): void {
        be.lhs.accept(this);
        be.rhs.accept(this);
        const rhs = this.stack.pop() as U;
        const lhs = this.stack.pop() as U;
        switch (be.op) {
            case Add: {
                this.stack.push(items_to_cons(MATH_ADD, lhs, rhs));
                break;
            }
            case Sub: {
                this.stack.push(items_to_cons(MATH_SUB, lhs, rhs));
                break;
            }
            case Mult: {
                this.stack.push(items_to_cons(MATH_MUL, lhs, rhs));
                break;
            }
            case Div: {
                this.stack.push(items_to_cons(MATH_DIV, lhs, rhs));
                break;
            }
            case Pow: {
                this.stack.push(items_to_cons(MATH_POW, lhs, rhs));
                break;
            }
            case BitXor: {
                this.stack.push(items_to_cons(MATH_OUTER, lhs, rhs));
                break;
            }
            case BitOr: {
                this.stack.push(items_to_cons(MATH_INNER, lhs, rhs));
                break;
            }
            case LShift: {
                this.stack.push(items_to_cons(MATH_LCO, lhs, rhs));
                break;
            }
            case RShift: {
                this.stack.push(items_to_cons(MATH_RCO, lhs, rhs));
                break;
            }
            default: {
                throw new Error(JSON.stringify(be, null, 2));
                // break;
            }
        }
    }
    callExpression(ce: Call): void {
        const name = create_sym(ce.func.id?.value as string);
        const args: U[] = [];
        ce.args.forEach((arg) => {
            arg.accept(this);
            args.push(this.stack.pop() as U);
        });
        this.stack.push(items_to_cons(name, ...args));
    }
    classDef(classDef: ClassDef): void {
        throw new Error("Method not implemented.");
    }
    compareExpression(ce: Compare): void {
        throw new Error("Method not implemented.");
    }
    dict(dict: Dict): void {
        throw new Error("Method not implemented.");
    }
    expressionStatement(es: ExpressionStatement): void {
        es.value.accept(this);
    }
    functionDef(functionDef: FunctionDef): void {
        const name = create_sym(functionDef.name.value);
        const params: U[] = [];
        functionDef.args.args.forEach((paramDef) => {
            paramDef.name.accept(this);
            params.push(this.stack.pop() as U);
        });
        const stmts: U[] = [];
        functionDef.body.forEach((stmt) => {
            stmt.accept(this);
            stmts.push(this.stack.pop() as U);
        });
        const lambda = items_to_cons(create_sym("lambda"), items_to_cons(...params), ...stmts);
        this.stack.push(items_to_cons(create_sym("define"), name, lambda));
    }
    ifStatement(ifs: IfStatement): void {
        throw new Error("Method not implemented.");
    }
    importFrom(importFrom: ImportFrom): void {
        throw new Error("Method not implemented.");
    }
    list(list: List): void {
        const elements: U[] = [];
        list.elts.forEach((elt) => {
            elt.accept(this);
            elements.push(this.stack.pop() as U);
        });
        this.stack.push(create_tensor(elements));
    }
    module(module: Module): void {
        module.body.forEach((stmt: Statement) => {
            stmt.accept(this);
        });
    }
    name(name: Name): void {
        // name.id.range;
        // name.id.value;
        this.stack.push(create_sym(name.id.value));
    }
    num(num: Num): void {
        const value = num.n.value;
        // const range = num.n.range;
        // Ranges are given a s line and column, so we need a converter to get offset.
        // range.begin;
        if (value.isInt()) {
            this.stack.push(create_int(value.value as number));
        } else if (value.isFloat()) {
            this.stack.push(new FltTokenParser().parse(value.text as string, 0, 0));
        } else if (value.isLong()) {
            this.stack.push(new IntTokenParser().parse(value.text as string, 0, 0));
        } else {
            throw new Error();
        }
    }
    print(print: Print): void {
        throw new Error("Method not implemented.");
    }
    returnStatement(rs: ReturnStatement): void {
        if (rs.value) {
            rs.value.accept(this);
        } else {
            this.stack.push(nil);
        }
    }
    str(str: PythonString): void {
        // str.s.range;
        const value = str.s.value;
        this.stack.push(new Str(value, 0, 0));
    }
    subscript(se: Subscript): void {
        se.value.accept(this);
        const value = this.stack.pop() as U;
        if (se.slice instanceof Ellipsis) {
            throw new Error();
        }
        if (se.slice instanceof Index) {
            se.slice.value.accept(this);
            const index = this.stack.pop() as U;
            this.stack.push(items_to_cons(COMPONENT, value, index));
        }
        if (se.slice instanceof Name) {
            throw new Error();
        }
        if (se.slice instanceof Slice) {
            throw new Error();
        }
    }
    unaryOp(unaryExpr: UnaryOp): void {
        throw new Error("Method not implemented.");
    }
    forStatement(fs: ForStatement): void {
        throw new Error("Method not implemented.");
    }
}

export function py_parse(sourceText: string, options?: PyParseOptions): { trees: U[]; errors: Error[] } {
    const node = parse(sourceText, SourceKind.File);
    if (typeof node === "object") {
        const stmts: Statement[] = astFromParse(node);
        const mod = new Module(stmts);
        const visitor = new PythonVisitor();
        mod.accept(visitor);
        const trees: U[] = [];
        while (visitor.stack.length > 0) {
            trees.push(visitor.stack.pop() as U);
        }
        trees.reverse();
        return { trees, errors: [] };
    } else {
        throw new Error();
    }
}
