export type Channel = {
  name: string;
  url: string;
  billing: string;
  price: string;
  rating: number;
  note: string;
};

export type Platform = {
  name: string;
  links: { label: string; url: string }[];
  customRatio: boolean;
  note: string;
};

export const CHANNELS: Channel[] = [
  { name: "65535", url: "https://my.65535.space/register?aff=U2RF7SAVFLP3", billing: "按次计费", price: "0.038–0.100", rating: 10, note: "支持异步协议，多个渠道，低价组超分 4K，稳定组原生 4K。可查看出图记录，支持香蕉生图。" },
  { name: "APIQIK 主站", url: "https://www.apiqik.com/auth/register?ref=ZTXo", billing: "按量计费", price: "￥3 / M", rating: 10, note: "Codex 分组便宜但仅 1K，4K 需 Azure / SP / GPT 分组；速度快。参考图多时按量计费成本较高。" },
  { name: "apilio（柏拉图）", url: "https://api.apilio.ai/register?aff=zkhB140656", billing: "按次计费", price: "0.060", rating: 9, note: "4K 生图已恢复，速度很快。" },
  { name: "Change2Pro", url: "https://forkc2p.com/register?aff=WCYL3GENQDLL", billing: "按次计费", price: "0.020–0.100", rating: 9, note: "渠道多，支持原生 4K 与香蕉生图。" },
  { name: "AI派", url: "https://aipaiai.cn/register?aff=rEMO", billing: "按次计费", price: "0.050–0.060", rating: 8, note: "1K、4K 价格相同，但速度不稳定。" },
  { name: "Drag API", url: "https://dragtokens.com/sign-up?aff=pIZw", billing: "按次计费", price: "0.050–0.100", rating: 8, note: "原生 4K，约 0.1 / 次。" },
  { name: "JBB 金贝贝", url: "https://cn.jbbt.cc/sign-up?aff=MRdP", billing: "按次计费", price: "0.060–0.080", rating: 8, note: "4K 为超分而非原生；每天 10:00 有红包雨，交流区有小游戏。" },
  { name: "JuCodex", url: "https://jucodex.com/register?aff=7TVO", billing: "按次计费", price: "0.060–0.120", rating: 8, note: "注册送 ￥2 额度，支持原生 4K；需使用网站生图工作台。" },
  { name: "Meinianda AI", url: "https://meinianda.top/sign-up?aff=CJbT", billing: "按次计费", price: "0.030–0.060", rating: 8, note: "4K 价格便宜，速度快，综合体验推荐。" },
  { name: "MikotoPro", url: "https://api.mikoto.vip/register?aff=SGQGHCBKSKRL", billing: "按次计费", price: "0.020–0.080", rating: 8, note: "1K 分组 0.02 / 张，4K 0.08 / 张。" },
  { name: "onehop", url: "https://onehop.ai/invite/68CSRD", billing: "按量计费", price: "￥1.5 / M", rating: 8, note: "仅支持 1K，适合文生图；2K、4K 会切换为香蕉模型。" },
  { name: "ProxyAI", url: "https://cn.proxy2it.com/register?aff=36XEVVMQWVBJ", billing: "按次计费", price: "0.050–0.120", rating: 8, note: "低价组 0.05 但仅 1K；稳定组原生 4K，0.12 / 张。" },
  { name: "square api", url: "https://api.squarefaceicon.org/sign-up?aff=rr98", billing: "按次计费", price: "0.050–0.080", rating: 8, note: "0.05 为超分 4K，0.08 为原生 4K。" },
  { name: "摸鱼AI", url: "https://moyuu.cc/register?aff=ANO9", billing: "按次计费", price: "0.012–0.104", rating: 8, note: "支持原生 4K，速度尚可，支持香蕉生图。" },
  { name: "漫小白", url: "https://api.manxiaobai.online/register?aff=m8AZ", billing: "按次计费", price: "0.020–0.108", rating: 8, note: "渠道多，支持原生 4K；建议使用网站工作台，支持香蕉生图。" },
  { name: "球球", url: "https://qiuqiutoken.com/sign-up?aff=Dt1z", billing: "按量计费", price: "￥1.9 / M", rating: 8, note: "按量、按次均有；视觉生成专用分组价格低但仅 1K，支持香蕉与 Grok。" },
  { name: "ApiMart", url: "https://aishuch.com/register?aff=imMT49", billing: "按次计费", price: "0.059–0.147", rating: 7, note: "近期稳定一些；网站内有出图记录，但价格上涨。" },
  { name: "Grsai", url: "https://grsai.com/", billing: "按次计费", price: "0.060", rating: 7, note: "其他博主评价较稳，当前可用性请以站点为准。" },
  { name: "不吃坤肉（生图版）", url: "https://img.yunfei.best/sign-up?aff=2u5b", billing: "按次计费", price: "0.020–0.060", rating: 7, note: "价格低、速度不错，但 4K 分组已下线。" },
  { name: "倾梦", url: "https://aiapi.317ak.com/sign-up?aff=fYjB", billing: "按次计费", price: "0.010", rating: 7, note: "价格很低，但不是原生 4K。" },
];

export const PLATFORMS: Platform[] = [
  { name: "大雄画布", links: [{ label: "夸克网盘", url: "https://pan.quark.cn/s/060e5b3d7849" }, { label: "GitHub", url: "https://github.com/hero8152/Infinite-Canvas/tree/main" }, { label: "作者 B 站", url: "https://space.bilibili.com/78652351" }], customRatio: true, note: "支持多个中转站，界面好看，操作丝滑，支持在线生成。" },
  { name: "GPT Image Playground", links: [{ label: "在线使用", url: "https://gpt-image-playground.cooksleep.dev/" }, { label: "GitHub", url: "https://github.com/CookSleep/gpt_image_playground" }], customRatio: true, note: "适合不想本地安装的用户，在线体验完整。" },
  { name: "麻衣画布", links: [{ label: "百度网盘", url: "https://pan.baidu.com/s/1mR_s6TcO6cyX5LN2WYxIZQ?pwd=yrdn" }, { label: "作者 B 站", url: "https://space.bilibili.com/28347006" }], customRatio: true, note: "功能丰富，已支持自定义比例，偶尔会卡。" },
];
