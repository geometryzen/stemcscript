import { assert } from "chai";
import { create_int, create_sym } from "math-expression-atoms";
import { Native, native_sym } from "math-expression-native";
import { items_to_cons } from "math-expression-tree";
import { StackU } from "../src/env/StackU";
import { flatten_items } from "../src/stack/flatten_items";

const a = create_sym("a");
const b = create_sym("b");
const c = create_sym("c");
const d = create_sym("d");
const e = create_sym("e");
const x = create_sym("x");
const y = create_sym("y");
const z = create_sym("z");
const ADD = native_sym(Native.add);
const MUL = native_sym(Native.multiply);

describe("flatten_items", function () {
    it("[]", function () {
        const stack = new StackU();
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 0);
    });
    it("[x]", function () {
        const stack = new StackU();
        stack.push(x);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 1);
        assert.strictEqual(stack.getAt(0).equals(x), true);
    });
    it("[x, y]", function () {
        const stack = new StackU();
        stack.push(x);
        stack.push(y);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 2);
        assert.strictEqual(stack.getAt(0).equals(x), true);
        assert.strictEqual(stack.getAt(1).equals(y), true);
    });
    it("[(+ x y)]", function () {
        const stack = new StackU();
        stack.push(items_to_cons(ADD, x, y));
        assert.strictEqual(stack.length, 1);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 2);
        assert.strictEqual(stack.getAt(0).equals(x), true);
        assert.strictEqual(stack.getAt(1).equals(y), true);
    });
    it("[(+ x y), z]", function () {
        const stack = new StackU();
        stack.push(items_to_cons(ADD, x, y));
        stack.push(z);
        assert.strictEqual(stack.length, 2);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 3);
        assert.strictEqual(stack.getAt(0).equals(x), true);
        assert.strictEqual(stack.getAt(1).equals(y), true);
        assert.strictEqual(stack.getAt(2).equals(z), true);
    });
    it("[(* x y)]", function () {
        const stack = new StackU();
        const expr = items_to_cons(MUL, x, y);
        stack.push(expr);
        assert.strictEqual(stack.length, 1);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 1);
        // console.lg("stack[0] => ",`${stack.getAt(0)}`);
        assert.strictEqual(stack.getAt(0).equals(expr), true);
    });
    it("[a, b, (+ x y), z]", function () {
        const stack = new StackU();
        stack.push(a);
        stack.push(b);
        stack.push(items_to_cons(ADD, x, y));
        stack.push(z);
        assert.strictEqual(stack.length, 4);
        flatten_items(2, ADD, stack);
        assert.strictEqual(stack.length, 5);
        assert.strictEqual(stack.getAt(0).equals(a), true);
        assert.strictEqual(stack.getAt(1).equals(b), true);
        assert.strictEqual(stack.getAt(2).equals(x), true);
        assert.strictEqual(stack.getAt(3).equals(y), true);
        assert.strictEqual(stack.getAt(4).equals(z), true);
    });
    it("[(+ (+ (+ (+ a b) c) d) e)]", function () {
        const stack = new StackU();
        const ab = items_to_cons(ADD, a, b);
        const abc = items_to_cons(ADD, ab, c);
        const abcd = items_to_cons(ADD, abc, d);
        const abcde = items_to_cons(ADD, abcd, e);
        stack.push(abcde);
        assert.strictEqual(stack.length, 1);
        flatten_items(0, ADD, stack);
        // console.lg("stack[0] => ", `${stack.getAt(0)}`);
        assert.strictEqual(stack.length, 5);
        assert.strictEqual(stack.getAt(0).equals(a), true);
        assert.strictEqual(stack.getAt(1).equals(b), true);
        assert.strictEqual(stack.getAt(2).equals(c), true);
        assert.strictEqual(stack.getAt(3).equals(d), true);
        assert.strictEqual(stack.getAt(4).equals(e), true);
    });
    it("[x, (+ (+ (+ (+ a b) c) d) e)]", function () {
        const stack = new StackU();
        stack.push(x);
        const ab = items_to_cons(ADD, a, b);
        const abc = items_to_cons(ADD, ab, c);
        const abcd = items_to_cons(ADD, abc, d);
        const abcde = items_to_cons(ADD, abcd, e);
        stack.push(abcde);
        assert.strictEqual(stack.length, 2);
        flatten_items(1, ADD, stack);
        // console.log("stack[] => ", `${stack.getAt(0)}`);
        assert.strictEqual(stack.length, 6);
        assert.strictEqual(stack.getAt(0).equals(x), true);
        assert.strictEqual(stack.getAt(1).equals(a), true);
        assert.strictEqual(stack.getAt(2).equals(b), true);
        assert.strictEqual(stack.getAt(3).equals(c), true);
        assert.strictEqual(stack.getAt(4).equals(d), true);
        assert.strictEqual(stack.getAt(5).equals(e), true);
    });
    it("[x, (+ (+ (+ (+ a b) c) d) e), y]", function () {
        const stack = new StackU();
        stack.push(x);
        const ab = items_to_cons(ADD, a, b);
        const abc = items_to_cons(ADD, ab, c);
        const abcd = items_to_cons(ADD, abc, d);
        const abcde = items_to_cons(ADD, abcd, e);
        stack.push(abcde);
        stack.push(y);
        assert.strictEqual(stack.length, 3);
        flatten_items(1, ADD, stack);
        // console.log("stack[] => ", `${stack.getAt(0)}`);
        assert.strictEqual(stack.length, 7);
        assert.strictEqual(stack.getAt(0).equals(x), true);
        assert.strictEqual(stack.getAt(1).equals(a), true);
        assert.strictEqual(stack.getAt(2).equals(b), true);
        assert.strictEqual(stack.getAt(3).equals(c), true);
        assert.strictEqual(stack.getAt(4).equals(d), true);
        assert.strictEqual(stack.getAt(5).equals(e), true);
        assert.strictEqual(stack.getAt(6).equals(y), true);
    });
    it("[(+ a (* -1 b) (* -1 c))]", function () {
        const stack = new StackU();
        stack.push(a);
        const negB = items_to_cons(MUL, create_int(-1), b);
        stack.push(negB);
        const negC = items_to_cons(MUL, create_int(-1), c);
        stack.push(negC);
        assert.strictEqual(stack.length, 3);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 3);
        // console.lg("stack[0] => ",`${stack.getAt(0)}`);
        assert.strictEqual(stack.getAt(0).equals(a), true);
        assert.strictEqual(stack.getAt(1).equals(negB), true);
        assert.strictEqual(stack.getAt(2).equals(negC), true);
    });
    it("[(+ (+ a (* -1 b)) (* -1 c))]", function () {
        const stack = new StackU();
        const negB = items_to_cons(MUL, create_int(-1), b);
        const aMinusB = items_to_cons(ADD, a, negB);
        const negC = items_to_cons(MUL, create_int(-1), c);
        const aMinusBminusC = items_to_cons(ADD, aMinusB, negC);
        stack.push(aMinusBminusC);
        assert.strictEqual(stack.length, 1);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 3);
        assert.strictEqual(stack.getAt(0).equals(a), true);
        assert.strictEqual(stack.getAt(1).equals(negB), true);
        assert.strictEqual(stack.getAt(2).equals(negC), true);
    });
    it("[a+b*(c+(d+e))]", function () {
        const stack = new StackU();
        const de = items_to_cons(ADD, d, e);
        const cde = items_to_cons(ADD, c, de);
        const bcde = items_to_cons(MUL, b, cde);
        const abcde = items_to_cons(ADD, a, bcde);
        stack.push(abcde);
        assert.strictEqual(stack.length, 1);
        flatten_items(0, ADD, stack);
        assert.strictEqual(stack.length, 2);
        assert.strictEqual(stack.getAt(0).equals(a), true);
        const expect1 = items_to_cons(MUL, b, items_to_cons(ADD, c, d, e)); // Not bcde!
        assert.strictEqual(stack.getAt(1).equals(expect1), true);
    });
});