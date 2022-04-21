import wordsZh from './constants/words-zh';
import lastNamesZh from './constants/lastnames-zh';
import { IRange, ILoremZhConfig } from './types/lorem-zh';

export default class LoremZh {
  public random: number;
  public data: string[];
  public lastNamesData: string[];
  private maxLength: number; // 常用汉字数组最大长度
  private lastNamesMaxLength: number; // 姓数组最大长度
  // 常用句尾标点符号：。 ？ ！
  public commonTrailPunctutations = ['\u3002', '\uff1f', '\uff01']; // 。？！
  constructor(
    config: ILoremZhConfig = {
      random: 10,
      dataSource: wordsZh,
      lastNamseSource: lastNamesZh,
    }
  ) {
    if (typeof config.random !== 'number' || !this.validNumber(config.random)) {
      throw Error('config.ramdom must be a number or it is invalid');
    }
    this.random = config.random;
    this.data = config.dataSource as string[];
    this.lastNamesData = config.lastNamseSource as string[];
    this.maxLength = this.data.length - 1;
    this.lastNamesMaxLength = this.lastNamesData.length - 1;
  }
  // 对num函数的类型守卫封装, 主要用在sentence, paragraph函数
  private randomLength(range?: number | IRange): number {
    if (!range || (typeof range === 'number' && this.validNumber(range))) {
      return range ? Math.floor(range) : this.integer([1, this.random]);
    }
    return this.integer(range as IRange);
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
  private integer(range: [number, number]): number {
    const _min = Math.abs(Math.ceil(Math.min(...range)));
    const _max = Math.abs(Math.floor(Math.max(...range)));
    return Math.floor(Math.random() * (_max - _min + 1) + _min);
  }
  /**
   * @desc 随机返回数组中的某个元素
   */
  private randomArrayItem<T>(arr: T[]): T {
    return arr[this.integer([0, arr.length - 1])];
  }
  /**
   * @desc 随机返回一个汉字
   */
  letter(): string {
    return this.data[this.integer([0, this.maxLength])];
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
  sentence(range?: number | IRange): string {
    let scentence = '';
    const len = this.randomLength(range);
    for (let i = 0; i < len; i = i + 1) {
      const wordNum = this.integer([1, this.random]);
      scentence += `${this.word(wordNum)}\uff0c`;
    }
    return scentence.replace(/\uff0c$/g, this.randomArrayItem(this.commonTrailPunctutations));
  }
  /**
   * @desc 随机生成段落
   */
  paragraph(range?: number | IRange): string {
    let paragraph = '';
    const len = this.randomLength(range);
    for (let i = 0; i < len; i = i + 1) {
      paragraph += this.sentence(this.randomLength());
    }
    return paragraph;
  }
  /**
   * @desc 随机返回一个中文姓
   */
  lastName(): string {
    return this.lastNamesData[this.integer([0, this.lastNamesMaxLength])];
  }
  names(range?: number | IRange): string {
    let names = '';
    const len = this.randomLength(range);
    for (let i = 0; i < len; i = i + 1) {
      const lastName = this.lastName();
      let name = '';
      // 姓1~2个字, 名在1~2个字， 3个字以上的姓， 名最多3个字, 这样看起来更像人名...
      if (lastName.length < 3) {
        name = this.word([1, 2]);
      } else {
        name = this.word([1, 3]);
      }
      names += `${lastName}${name},`;
    }

    return names.replace(/,$/g, '');
  }
}
