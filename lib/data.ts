export type Channel = {
  name: string;
  url: string;
  billing: string;
  price: string;
  rating: number;
  note: string;
  highlights?: { text: string; color: "blue" | "red"; url?: string; code?: boolean }[];
};

export type Platform = {
  name: string;
  links: { label: string; url: string }[];
  customRatio: boolean;
  note: string;
};

export const CHANNELS: Channel[] = [
  { name: "65535", url: "https://my.65535.space/register?aff=U2RF7SAVFLP3", billing: "按次计费", price: "0.038-0.100", rating: 10, note: "支持异步协议，多个渠道，低价组超分4K，稳定组原生4K。而且网站里还能看到出图记录，夯！支持香蕉生图" },
  { name: "apilio（柏拉图）", url: "https://api.apilio.ai/register?aff=zkhB140656", billing: "按次计费", price: "0.060", rating: 9, note: "4K生图已恢复，很快" },
  { name: "Change2Pro", url: "https://forkc2p.com/register?aff=WCYL3GENQDLL", billing: "按次计费", price: "0.020-0.100", rating: 9, note: "渠道也很多，支持原生4K，支持香蕉生图" },
  { name: "AI派", url: "https://aipaiai.cn/register?aff=rEMO", billing: "按次计费", price: "0.050-0.060", rating: 8, note: "1K4K价格一样，但速度不稳定，时快时慢" },
  { name: "Drag API", url: "https://dragtokens.com/sign-up?aff=pIZw", billing: "按次计费", price: "0.050-0.100", rating: 8, note: "原生4K，0.1/次" },
  { name: "JBB 金贝贝", url: "https://cn.jbbt.cc/sign-up?aff=MRdP", billing: "按次计费", price: "0.060-0.080", rating: 8, note: "4K是超分，不是原生，每天10:00有红包雨，交流区里也有小游戏，赌徒狂喜" },
  { name: "JuCodex", url: "https://jucodex.com/register?aff=7TVO", billing: "按次计费", price: "0.060-0.120", rating: 8, note: "注册送￥2额度，支持原生4K，但要使用网站生图工作台，画布软件会超时且扣费", highlights: [{ text: "但要使用网站", color: "blue" }, { text: "生图工作台", color: "blue", url: "https://image.jucodex.com/" }, { text: "，画布软件会超时且扣费", color: "blue" }, { text: "，支持香蕉生图", color: "blue" }] },
  { name: "Meinianda AI", url: "https://meinianda.top/sign-up?aff=CJbT", billing: "按次计费", price: "0.030-0.060", rating: 8, note: "4K价格算是非常便宜的，速度也很快，很推荐" },
  { name: "MikotoPro", url: "https://api.mikoto.vip/register?aff=SGQGHCBKSKRL", billing: "按次计费", price: "0.020-0.080", rating: 8, note: "1K分组0.02一张，4K0.08" },
  { name: "ProxyAI", url: "https://cn.proxy2it.com/register?aff=36XEVVMQWVBJ", billing: "按次计费", price: "0.050-0.120", rating: 8, note: "低价组0.05，只能1K。稳定组原生4K，0.12/张" },
  { name: "square api", url: "https://api.squarefaceicon.org/sign-up?aff=rr98", billing: "按次计费", price: "0.050-0.080", rating: 8, note: "0.05是超分4K，0.08是原生4K" },
  { name: "摸鱼AI", url: "https://moyuu.cc/register?aff=ANO9", billing: "按次计费", price: "0.012-0.104", rating: 8, note: "支持原生4K，速度也还行，支持香蕉生图" },
  { name: "漫小白", url: "https://api.manxiaobai.online/register?aff=m8AZ", billing: "按次计费", price: "0.020-0.108", rating: 8, note: "渠道多，支持原生4K，但要使用网站生图工作台，画布软件会超时且扣费，支持香蕉生图", highlights: [{ text: "但要使用网站", color: "blue" }, { text: "生图工作台", color: "blue", url: "https://api.manxiaobai.online/brand-preview/create/" }, { text: "，画布软件会超时且扣费", color: "blue" }, { text: "，支持香蕉生图", color: "blue" }] },
  { name: "ApiMart", url: "https://aishuch.com/register?aff=imMT49", billing: "按次计费", price: "0.059-0.147", rating: 7, note: "最近稳了点，网站内有出图记录，但涨价了" },
  { name: "Grsai", url: "https://grsai.com/", billing: "按次计费", price: "0.060", rating: 7, note: "其他博主有很多推这个的，说比较稳，我积分用完了，没再测了" },
  { name: "不吃坤肉(生图版)", url: "https://img.yunfei.best/sign-up?aff=2u5b", billing: "按次计费", price: "0.020-0.060", rating: 7, note: "价格低，速度也不错，但4K分组下线了" },
  { name: "倾梦", url: "https://aiapi.317ak.com/sign-up?aff=fYjB", billing: "按次计费", price: "0.010", rating: 7, note: "价格超低，但不是原生4K" },
  { name: "APIQIK 主站", url: "https://www.apiqik.com/auth/register?ref=ZTXo", billing: "按量计费", price: "￥3/M", rating: 10, note: "谨慎充值，按量计费的，codex分组比较便宜，但只能1K，4K要用azure/sp/gpt分组，速度很快，这个是综合体验最好的，如果经常用很多参考图的话，按量计费会很贵，建议尝试按次计费的站，单张图生图或文生图可以用", highlights: [{ text: "codex分组", color: "blue" }, { text: "azure/sp/gpt分组", color: "blue" }, { text: "如果经常用很多参考图的话，按量计费会很贵，建议尝试按次计费的站", color: "red" }] },
  { name: "onehop", url: "https://onehop.ai/invite/68CSRD", billing: "按量计费", price: "￥1.5/M", rating: 8, note: "仅支持1K，适合文生图使用，基本都在1分钱以下，2K和4K会变成香蕉模型，很奇怪" },
  { name: "球球", url: "https://qiuqiutoken.com/sign-up?aff=Dt1z", billing: "按量计费", price: "￥1.9/M", rating: 8, note: "按量和按次计费都有，视觉生成专用-gpt_image-codex分组价格非常低，基本都在1分钱以下，但只能1K，适合文生图使用。其他分组有4K但并不稳定。\n还支持香蕉和grok模型", highlights: [{ text: "视觉生成专用-gpt_image-codex", color: "blue", code: true }] },
];
export const PLATFORMS: Platform[] = [
  { name: "大雄画布", links: [{ label: "夸克网盘", url: "https://pan.quark.cn/s/060e5b3d7849" }, { label: "GitHub", url: "https://github.com/hero8152/Infinite-Canvas/tree/main" }, { label: "作者 B 站", url: "https://space.bilibili.com/78652351" }], customRatio: true, note: "支持多个中转站，界面好看，操作丝滑，支持在线生成。" },
  { name: "GPT Image Playground", links: [{ label: "在线使用", url: "https://gpt-image-playground.cooksleep.dev/" }, { label: "GitHub", url: "https://github.com/CookSleep/gpt_image_playground" }], customRatio: true, note: "适合不想本地安装的用户，在线体验完整。" },
  { name: "麻衣画布", links: [{ label: "百度网盘", url: "https://pan.baidu.com/s/1mR_s6TcO6cyX5LN2WYxIZQ?pwd=yrdn" }, { label: "作者 B 站", url: "https://space.bilibili.com/28347006" }], customRatio: true, note: "功能丰富，已支持自定义比例，偶尔会卡。" },
];
