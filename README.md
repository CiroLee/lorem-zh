# lorem-zh

lorem-zh 或许是最轻量的用来生成随机中文片段的`Javascript`工具包。使用`Typescript`编写， API 简单易用，且拥有良好的类型提示， 适用于浏览器和 NodeJs。

## 安装

```shell
npm install lorem-zh
```

## 使用

```typescript
// ESM
import LoremZh from 'lorem-zh';
// CommonJS
const LoremZh = require('lorem-zh');
```

```typescript
const loremZh = new LoremZh();

// e.g. 随机返回一个词
loremZh.word();
```

## 参数

```typescript
import data from 'xxxx';
const loremZh = new LoremZh({
  random: 10,
  dataSource: data,
});

// index.d.ts
interface ILoremZhConfig {
  random: number; // 基础随机数， 相关随机计算基于random参数，默认为10
  dataSource?: string[]; // 常用字数据源，默认为内置的2500中文常用字表
  lastNamseSource?: string[]; // 姓氏数据源 默认为内置的常见姓氏表
}
```

## API

| 名称                                                              | 描述                                                                                                                                                                                           |
| ----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| letter(): string                                                  | 随机返回一个汉字                                                                                                                                                                               |
| word(range?: number \| [IRange](./src/types/lorem-zh.ts)): string | [range: Optional] 随机返回一个词。range 为 number 时， 词由 range 个汉字组成; range 为范围数组([min, max]), 字数随机在[min, max]之间。未传参数时，将基于全局参数 random 随机确定字数           |
| sentence(range?: number \| [IRange](./src/types/lorem-zh.ts)) )   | [range: Optional] 随机返回一个句子。range 为 number 时， 句子由 range 个词组成; range 为范围数组([min, max]), 词的数量随机在[min, max]之间。未传参数时，将基于全局参数 random 随机确定数量     |
| paragraph(range?: number \| [IRange](./src/types/lorem-zh.ts) )   | [range: Optional] 随机返回一个段落。range 为 number 时， 段落由 range 个句子组成; range 为范围数组([min, max]), 句子的数量随机在[min, max]之间。未传参数时，将基于全局参数 random 随机确定数量 |
| lastName(): string                                                | 随机返回一个中文姓氏                                                                                                                                                                           |
| names(range?: number \| [IRange](./src/types/lorem-zh.ts))        | [range: Optional] 随机返回中文姓名。range 为 number 时, 返回 range 个姓名；range 为范围数组[min, max]时，个数随机在[min, max]之间；为传参时， 将基于全局参数 random 随机确定个数。             |

## NOTE

内置的常用 2500 中文汉字来自：https://www.zdic.net/zd/zb/cc1/

内置常见姓氏来自： https://baike.sogou.com/v673516.htm
