import { randomInt, createRandomPicker } from './random.js';

export function generate(title, {
  corpus,
  min = 6000, // 文章最少字数
  max = 10000, // 文章最多字数
} = {}) {
  // 文章长度设置为 min ~ max 之间的随机数
  const articleLength = randomInt(min, max);

  const { famous, bosh_before, bosh, said, conclude } = corpus;
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(item => {
    return createRandomPicker(item);
  });

  const article = [];
  let totalLength = 0;

  while(totalLength < articleLength) {
    // 如果文章内容字数未超过文章要求长度，继续添加
    let section = ''; // 添加段落
    const sectionLength = randomInt(200, 500); // 段落长度设置为 200 ~ 500 之间的随机数
    // 当段落内容字数未超过段落要求长度，或段落不是以句号（。）和问号（？）结尾，继续添加
    while(section.length < sectionLength || !/[。？]$/.test(section)) {
      // 取 0 ~ 100 之间的随机数
      const n = randomInt(0, 100);
      if(n < 20) { // 20% 的概率生成名人名言
        section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude});
      } else if(n < 50) { // 80% 的概率生成废话，且 30% 的概率在废话前面加上前置从句
        section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title});
      } else { // 50% 的概率生成不带前置从句的废话
        section += sentence(pickBosh, {title})
      }
    }
    // 段落结束，更新文章总长度
    totalLength += section.length;
    // 将段落存放到文章列表中
    article.push(section);
  }
  // 将文章返回，文章是段落数组形式
  return article;
}

/**
 * 
 * @param {*} pick 随机获取数组内容的函数
 * @param {*} replacer 存放替换占位符的对象，如果 replacer[key] 是一个 pick 函数，执行它随机取一条替换占位符，否则直接替换占位符
 */
function sentence(pick, replacer) {
  let ret = pick(); // 返回一个句子文本
  for(const key in replacer) {
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret;
}