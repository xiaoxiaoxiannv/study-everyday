const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai)

const assert = chai.assert;
const deepClone = require('../clone.js')

describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone)
    });
    it('能够复制基本类型', () => {
        const n = 123;
        const n2 = deepClone(n)
        assert(n === n2);
        const s = '123';
        const s2 = deepClone(s)
        assert(s === s2);
        const b = true;
        const b2 = deepClone(b)
        assert(b === b2);
        const u = undefined;
        const u2 = deepClone(u)
        assert(u === u2);
        const empty = null;
        const empty2 = deepClone(empty)
        assert(empty === empty2);
        const symbol = Symbol();
        const symbol2 = deepClone(symbol)
        assert(symbol === symbol2);
    });
    describe('对象', () => {
        it('能够复制普通对象', () => {
            const a = {name: '盼盼', child: {name: '小盼盼'}};
            const a2 = deepClone(a)
            assert(a !== a2);
            assert(a.name == a2.name);
            assert(a.child !== a2.child);
            assert(a.child.name === a2.child.name)
        })
        it('能够复制数组对象', () => {
            const a = [[11, 12], [21, 22], [31, 32]]
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a[0] !== a2[0])
            assert(a[1] !== a2[1])
            assert(a[2] !== a2[2])
            assert.deepEqual(a, a2)
        })
        it('能够复制函数', () => {
            const a = function (x, y) {
                return x + y;
            }
            a.xxx = {yyy: {zzz: 1}}
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.xxx !== a2.xxx)
            assert(a.xxx.yyy !== a2.xxx.yyy)
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
            assert(a(1, 2) === a2(1, 2))
        })
        it('环也能复制', () => {
            const a = {name: '盼盼'}
            a.self = a;
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.name === a2.name)
            assert(a.self !== a2.self)
        })
    })
})