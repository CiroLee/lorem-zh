import wordsZh from './constants/words-zh';
import { IRange, ILoremZhConfig } from './types/lorem-zh';

export default class LoremZh {
  public random: number;
  public data: string[];
  // 常用句尾标点符号：。 ？ ！
  public commonTrailPunctutations = ['\u3002', '\uff1f', '\uff01']; // 。？！
  private maxLength: number;
  constructor(config: ILoremZhConfig) {
    if (typeof config.random !== 'number' || !this.validNumber(config.random)) {
      throw Error('config.ramdom must be a number or it is invalid');
    }
    this.random = config.random || 10;
    this.data = config.dataSource || wordsZh;
    this.maxLength = this.data.length;
  }
  // 对num函数的类型守卫封装, 主要用在sentence, paragraph函数
  private randomLength(range?: number | IRange): number {
    if (!range || (typeof range === 'number' && this.validNumber(range))) {
      return range ? Math.floor(range) : this.num([1, this.random]);
    }
    return this.num(range as IRange);
  }
  // 验证数字是否有有效数字
  private validNumber(num: number): boolean {
    if (isNaN(num)) {
      console.warn(`num is ${num}, it is not a number`);
      return false;
    }
    if (num === Infinity || num === -Infinity) {
      console.warn('num should not be Infinity. please check!');
      return false;
    }
    return true;
  }
  /**
   * @desc 返回[min, max]之间的随机数, 包含min和max
   */
  num(range: [number, number]): number {
    const _min = Math.abs(Math.ceil(Math.min(...range)));
    const _max = Math.abs(Math.floor(Math.max(...range)));
    return Math.floor(Math.random() * (_max - _min + 1) + _min);
  }
  /**
   * @desc 随机返回数组中的某个元素
   */
  randomArrayItem<T>(arr: T[]): T {
    return arr[this.num([0, arr.length - 1])];
  }
  /**
   * @desc 随机返回一个汉字
   */
  letter(): string {
    return this.data[this.num([0, this.maxLength])];
  }
  /**
   * @desc 随机生成一个词
   */
  word(range?: number | IRange): string {
    const len = this.randomLength(range);
    let word = '';
    for (let i = 0; i < len; i++) {
      word += this.letter();
    }
    return word;
  }
  /**
   * @desc 随机生成句子
   */
  sentence(range: number | IRange = 1): string {
    let scentence = '';
    const len = this.randomLength(range);
    for (let i = 0; i < len; i = i + 1) {
      const wordNum = this.num([1, this.random]);
      scentence += `${this.word(wordNum)}\uff0c`;
    }
    return scentence.replace(/\uff0c$/g, this.randomArrayItem(this.commonTrailPunctutations));
  }
  /**
   * @desc 随机生成段落
   */
  paragraph(range: number | IRange = 1): string {
    let paragraph = '';
    const len = this.randomLength(range);
    for (let i = 0; i < len; i = i + 1) {
      paragraph += this.sentence(this.randomLength());
    }
    return paragraph;
  }
}
