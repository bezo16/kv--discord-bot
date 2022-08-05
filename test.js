/* eslint-disable */
const objtest = {c: 3}
const obj = { a: 1, b: 2, ...objtest};
const { a, b, c } = obj;

function logNums({a,b,c}) {
    console.log(a,b,c)
}

logNums(obj)
