const fp = require('lodash/fp');

// word wild web    W. W. W
// 分割成数组 --> 提取数组每一项的首字母 --> 转换成大写 --> 拼接成字符串

const f = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.upperFirst), fp.split(' '))

console.log(f('word wild web')) 