import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

// 定义帮助内容
const sections = [
  {
    header: '狗屁不通文章生成器',
    content: '生成一篇狗屁不通的文章',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章标题',
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章最少字数',
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章最多字数',
      },
    ],
  },
];

const usage = commandLineUsage(sections);

// 配置命令行参数
const optionDefinitions = [
  {name: 'help'},
  {name: 'title', type: String},
  {name: 'min', type: Number},
  {name: 'max', type: Number},
]

const options = commandLineArgs(optionDefinitions); // 获取命令行输入

if('help' in options) {
  console.log(usage);
  process.exit();
}

export { options }