# 奶龙机器人 wiki 资料来源整理

> 采集方式：本机 Chrome（Claude in Chrome 扩展）正常浏览，只读，未点击任何提交/购买/评论/下载按钮。采集日期：2026-10-24。
> 链接里的跟踪参数（`?spm=`、`vd_source=` 等）已去掉。

---

# 1. 立创开源 ottoRobot（https://oshwhub.com/txp666/ottorobot）

无需登录即可读到全部内容。

## 基本信息
- 工程名：ottoRobot（专业版），标签：ESP系列 / DIY设计 / 星火计划2025
- 作者：小鹏（txp666），2025年度开源达人
- 简介：otto 机器人是一个开源的机器人平台，具有多种动作能力和互动功能。本项目基于 ESP32 / Tuya T5 实现了 otto 机器人的控制系统，并接入小智AI / Tuya AI
- 复刻成本：￥150；开源协议：CC BY-NC-SA 4.0（未经作者授权，禁止转载）
- 创建：2025-03-24 17:08:17；更新：2025-12-09 00:16:05
- 数据（读取时）：浏览 12.1w，点赞 239，收藏 704，评论 134

## 顶部链接栏（原样）
| 文字 | 链接 |
|---|---|
| 📺 B站视频 | https://space.bilibili.com/81491160 |
| 💻 源码仓库 | https://github.com/78/xiaozhi-esp32 |
| 🧩 3D模型 | https://makerworld.com.cn/zh/models/1117966-ottorobot-xiao-zhi-ai |
| 💬 QQ交流群 | https://qm.qq.com/q/DlTtZFM7VC |
| 🛒 购买方式 | https://m.tb.cn/h.SifjMpzDHcApt7R |
| 📘 复刻教程 | https://www.ottodiy.tech/ |
| 🌐 闪猫侠官网 | https://www.shanmaotech.cn/ |
| otto复刻教程 | http://www.ottodiy.tech/ |
| 源码 · 小智 | https://github.com/txp666/xiaozhi-esp32 |
| 源码 · 涂鸦 | https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot |

## 工程简介（要点；正文较长，以下为结构化摘录）
- 版权声明：© 小鹏, 2025，CC BY-NC-SA 4.0（署名 / 非商业 / 相同方式共享）。
- 介绍：开源人形机器人平台；有 **ESP32** 和 **涂鸦 T5** 两个版本，分别接入小智 AI 与涂鸦生态（AI 大模型对话、一键接入智能家居控制）。
- 功能：行走、转向、跳跃、摇摆等舞蹈动作；AI 大模型语音对话控制动作与智能家居。
- 版本：
  - ESP32S3 版本：ottoRobotV1.1 和「新手友好（模块直插）」
  - 涂鸦 T5 版本：ottoRobot_tuya（基于涂鸦 T5 模组，一键接入涂鸦生态，终生免费 token）

### 动作表（16 个）
| 动作 | 编号 | 描述 | 参数 |
|---|---|---|---|
| Walk | 1 | 行走 | steps；speed（越小越快 500-3000）；direction 1=前进 -1=后退；amount 手臂摆动 0-170（0=不摆） |
| Turn | 2 | 转向 | steps；speed；direction 1=左转 -1=右转；amount 0-170 |
| Jump | 3 | 跳跃 | steps；speed |
| Swing | 4 | 摇摆 | steps；speed；amount 10-50 |
| Moonwalk | 5 | 太空步 | steps；speed；amount 15-40；direction 1=左 -1=右 |
| Bend | 6 | 弯曲 | steps；speed；direction 1=左 -1=右 |
| ShakeLeg | 7 | 抖腿 | steps；speed；direction 1=左腿 -1=右腿 |
| UpDown | 8 | 上下运动 | steps；speed；amount 10-50 |
| TiptoeSwing | 9 | 脚尖摇摆 | steps；speed；amount 10-50 |
| Jitter | 10 | 抖动 | steps；speed；amount 5-25 |
| AscendingTurn | 11 | 上升转弯 | steps；speed；amount 5-15 |
| Crusaito | 12 | 十字步/混合步态 | steps；speed；amount 20-50；direction 1=左 -1=右 |
| Flapping | 13 | 拍打 | steps；speed；amount 10-30；direction 1=前 -1=后 |
| HandsUp | 14 | 举手 | speed；direction 1=左手 -1=右手 0=双手 |
| HandsDown | 15 | 放手 | speed；direction 同上 |
| HandWave | 16 | 挥手 | speed；direction 同上 |

参数说明里的 amount 范围与表格略有出入：UpDown 写 10-90，TiptoeSwing 写 0-50（表格分别为 10-50、10-50）。

### 使用说明书（ESP32 版本）
1. **开始使用**：电源与充电口位于机器人身体下方；电量显示可能不精准，及时充电。
2. **Wi-Fi 配网**（每换一个网络都要重配）：开机 → 机器人创建热点 `xiaozhi-XXXX` → 手机连该热点（无密码）→ 自动跳转网页，输入家庭 Wi-Fi 名称与密码提交。
3. **绑定小智后台**：浏览器访问 xiaozhi.me → 注册登录 → 添加并绑定设备（按页面提示）→ 后台可配置角色设定、大模型类型、语音角色声音 → 重启设备。
   - 示例角色设定（原文）：
     > 我是一个可爱的双足机器人，拥有四个舵机控制的肢体（左腿、右腿、左脚、右脚），能够执行多种有趣的动作。有以下动作：1=行走(前后), 2=转向（左右）, 3=跳跃, 4=摇摆, 5=太空步,6=弯曲, 7=摇腿, 8=上下运动, 9=脚尖摇摆, 10=抖动, 11=上升转弯, 12=十字步, 13=拍打, 14=举手, 15=放手, 16=挥手，我有强迫症每次说话都要根据我的心情随机做一个动作（先发送动作指令再说话）。
4. **语音指令与唤醒**：唤醒词「你好小智」（编译源码时可改）。示例：调高音量 / 调亮屏幕 / 切换主题暗黑或明亮；向前走（5 步、快速、同时摆臂）/ 跳个舞吧 / 做个太空步快一点幅度大一点 / 随机做几个动作 / 停下来吧 / 挥挥手；唱个歌吧 / 换个悲伤的表情。提示：执行动作时仍可接收语音；噪音大时提高音量；动作指令由小智后台创建并下发。
5. **微信小程序控制**：固件需 otto2.0.4-2 以上 → 问机器人 IP 地址 → 扫码进小程序（二维码为图片）→ 输入 IP 后可控制、**校准**、自定义动作（手机与机器人需同一网络）。

### 使用说明书（Tuya 版本）
- 电源/充电口同上。配网：下载「涂鸦」App → 开机，机器人自动进入蓝牙配网并播报「我已经进入配网状态」→ 手机连 2.4G Wi-Fi、开蓝牙，App 右上角发现设备添加 → 之后可语音/App 控制。

## 设计图 / PCB 版本
- 设计图标签页：**ottoRobotV1.1**、**ottoRobot_tuya**、**ottoRobot模块直插新手友好V1.1**
- 原理图预览名：ottoRobot；PCB 预览名：ottoRobotV1.1

## BOM（ottoRobotV1.1，共 27 行，已展开全部）
| # | 器件 | 位号 | 数量 | 型号 | LCSC |
|---|---|---|---|---|---|
| 1 | LCD-240x240（1.54"） | S1 | 1 | — | — |
| 2 | **ESP32-S3-WROOM-1U-N16R8**（主控，乐鑫） | U2 | 1 | ESP32-S3-WROOM-1U-N16R8 | C3013946 |
| 3 | **MAX98357AETE+T**（I2S 功放） | U5 | 1 | MAX98357AETE+T | C910544 |
| 4 | BLM18PG121SN1D 磁珠 | L1,L2 | 2 | BLM18PG121SN1D | C14709 |
| 5 | 100kΩ | R1,R2 | 2 | 0603WAF1003T5E | C25803 |
| 6 | 10Ω | R9 | 1 | 0603WAF100JT5E | C22859 |
| 7 | 10kΩ | R3,R7,R12 | 3 | 0603WAF1002T5E | C25804 |
| 8 | 1MΩ | R10,R11 | 2 | 0603WAF1004T5E | C22935 |
| 9 | 5.1kΩ | R4,R5 | 2 | 0603WAF5101T5E | C23186 |
| 10 | 100nF | C3,C4,C9,C10,C11,C14 | 6 | CC0603KRX7R9BB104 | C14663 |
| 11 | 10uF | C1,C2,C5,C8,C13 | 5 | CL10A106KP8NNNC | C19702 |
| 12 | 4.7uF | C7 | 1 | CL10A475KO8NNNC | C19666 |
| 13 | 1uF | C6 | 1 | CL10A105KB8NNNC | C15849 |
| 14 | **AO3400A**（背光 MOS） | U6 | 1 | AO3400A | C347475 |
| 15 | 220pF | C12,C15 | 2 | CL10B221KB8NNNC | C1603 |
| 16 | **XKB5858-Z-E**（电源拨动开关） | SW1 | 1 | XKB5858-Z-E | C780038 |
| 17 | Type-C | USB1 | 1 | typec | C9900016956 |
| 18 | **PZ254-2-03-S**（2×3 排针，舵机接口） | HDR1,HDR3,HDR4 | 3 | PZ254-2-03-S | C3294461 |
| 19 | HC-1.25-2PLT（1.25mm 2P 座） | CN1,CN2 | 2 | HC-1.25-2PLT | C2845388 |
| 20 | **TS35CA**（轻触按键） | SW2 | 1 | TS35CA | C412366 |
| 21 | **HE9073A33M5R**（3.3V LDO） | U3 | 1 | HE9073A33M5R | C723789 |
| 22 | **ICS-43434**（I2S 麦克风） | U7 | 1 | ICS-43434 | C5656610 |
| 23 | **TP4054**（锂电充电） | U8 | 1 | TP4054 | C668215 |
| 24 | KT-0603R（LED） | LED1 | 1 | KT-0603R | C2286 |
| 25 | 1kΩ | R8 | 1 | 0603WAF1001T5E | C21190 |
| 26 | 2kΩ | R6 | 1 | 0603WAF2001T5E | C22975 |
| 27 | ZX-PH2.0-LT2P（PH2.0 2P 电池座） | U9 | 1 | ZX-PH2.0-LT2P | C7429698 |

## 舵机接口 / 线序 / 电源 / 按键
立创页面正文**没有**专门写舵机接口位置和线序。以下是我从飞书资料里的同款原理图（见第 2 节）读出来的，**图上读取，建议对照实物或源码 config 再核对**：
- 舵机接口：HDR1 / HDR3 / HDR4，每个 2×3 排针接两路舵机。引脚 6、5 = 两路信号，4、3 = VBAT_IN（电池直供），2、1 = GND，也就是每路舵机从上到下依次是 **信号 / VBAT / GND**。
  - HDR1：SERVO1（脚 6）、SERVO2（脚 5）
  - HDR3：SERVO4（脚 6）、SERVO3（脚 5）
  - HDR4：SERVO5（脚 6）、SERVO6（脚 5）
- 原理图上 ESP32-S3 模块的引脚分配（按模块脚号换算成 GPIO）：SERVO1=IO17、SERVO2=IO18、SERVO5=IO8、SERVO6=IO12、SERVO3=IO39、SERVO4=IO38；LCD：BL=IO3、DC=IO46、SCL=IO9、SDA=IO10、RST=IO11；麦克风 ICS-43434：WS=IO4、SCK=IO5、SD=IO6；功放 MAX98357：DIN=IO7、BCLK=IO15、LRCLK=IO16；CHG_DET=IO47、BAT_DET=IO21；IO0 接 BOOT 键；另预留 ML307 4G 模组口（EN=IO2、RX/TX=TXD0/RXD0）。
- 电源：TP4054 充电（Type-C VUSB 输入），HE9073A33M5R 3.3V LDO，XKB5858 拨动开关，PH2.0 电池座；喇叭接 CN2（1.25mm 2P）。
- 按键/开关位置（来自飞书使用指导）：电源开关在机器人身体下方**左侧**，打断/唤醒/重新配网键在身体下方**右侧**；充电口在身体下方。

## 组装 / 烧录注意事项（页面与评论）
- 作者置顶评论：复刻交流 QQ 群 1046432896，加群链接 https://qm.qq.com/q/lvXglQWimm
- 作者回复：**这里的 3D 打印件和程序不是最新的，请进群或者在教程网站 ottodiy.tech 下载**（2025-05-18）
- 作者回复：上面原理图是完整原理图；PCB 直接打开下单即可，什么都不用改；带摄像头版本代码已开源（小智仓库）、电路板未开源。
- 用户反馈：U5（MAX98357）买淘宝货出现喇叭噪音大、发热、掉电快，作者建议换立创货排查。
- 用户反馈：语音做动作常摔倒（在线测试正常），未见答复。

## 附件下载列表
| # | 文件名 | 下载次数 |
|---|---|---|
| 1 | show.mp4 | 871 |
| 2 | otto3d.rar | 2281 |
| 3 | merged-flash.bin | 1044 |
| 4 | tuyaShow.mp4 | 268 |
| 5 | otto2.0.4-2.bin | 181 |

3D 模型标签页：暂无数据（3D 文件在 otto3d.rar 和 makerworld 链接里）。

## 图片 URL（原样）
正文里**没有主板正面/背面实物高清图**；正文图片是整机渲染和实拍、小程序二维码等：
- 封面/头图：https://fs-web-stream.jlc.com/fs-web-stream/file-operation/download/8674694105943334912 （720×720）
- https://image.lceda.cn/oshwhub/pullImage/5859292fc2bd40bd8ec5b4fe7213471b.png （521×363）
- 整机渲染：https://image.lceda.cn/oshwhub/pullImage/f4bc6fffe9ec49a59d184d048fcf18d2.png （4000×4000）
- https://image.lceda.cn/oshwhub/pullImage/f9a0c63889e74286ac3d2f67f337e64e.png （400×400）
- 整机实拍：https://image.lceda.cn/oshwhub/pullImage/aff17efc03604f62aef71f51c6d3ffb1.jpg 、 https://image.lceda.cn/oshwhub/pullImage/a15159c674be4b6c9a85e2346e6c42ed.jpg 、 https://image.lceda.cn/oshwhub/pullImage/32b0af8f6b104730942aba7b93b913bd.jpg （均 3072×4096）
- 小程序二维码：https://image.lceda.cn/oshwhub/pullImage/a51c3a1cb5fa4447b3cec701975cf84e.jpg （1280×1280）
- https://image.lceda.cn/oshwhub/pullImage/9da4b4960ea34d4c8473ad399e688a57.jpg （1080×2412，涂鸦 App 截图位置）
- 设计图预览缩略图（原理图/PCB 渲染）：https://image-pro.lceda.cn/projects/thumbs/8bd6e6fc5cba41719b727c13c0a4f41f.webp 、 https://image-pro.lceda.cn/projects/thumbs/e1b06ea81d0d444e8fa8a8256e37a5d9.webp （1920×1360）

---

# 2. 飞书资料（https://gcnnjyl5fvdz.feishu.cn/wiki/GFPTwsYVSiOOwAk8KAhc9F73n5c）

无需登录可读（右上角有「登录/注册」，但正文和子文档都能看）。空间名「鹿小班二」，与 B 站 UP 主「鹿小班电子科技」应为同一商家。未登录时左侧知识库侧栏只显示「与我分享 → otto机器人」这一个节点，**看不到完整知识库树**；以下目录树是从主页正文的链接整理出来的。

## 目录树
```
otto机器人（2025-06-18 修改）
├── （顶部）基础款 / 升级款 实拍图
├── otto机器人资料
│   ├── 1. otto机器人原理图.pdf      https://gcnnjyl5fvdz.feishu.cn/wiki/UpQwwQcLuiVCsgkyW5gcZ4KUnQ1
│   ├── 2. 基础款小智机器人使用指导    https://gcnnjyl5fvdz.feishu.cn/wiki/OjjLwHvs5iQc9YknPHEcohxYn2e
│   ├── 3. 升级款小智机器人使用指导    https://gcnnjyl5fvdz.feishu.cn/wiki/UL8awkHKHiXnGbkPpDtcgjL1nwg
│   ├── 4. 机器人3d文件              https://gcnnjyl5fvdz.feishu.cn/wiki/U34uwlF54iFMj6kfzzEc3YcWnze
│   └── 5. 固件、固件烧录教程         https://gcnnjyl5fvdz.feishu.cn/wiki/Ru6pwN1X9iqNjhkoH6NcVlpxnvb
└── 注意事项
```
基础款和升级款的区别（从两份指导看）：基础款**没有手臂**（只有 4 个舵机：左腿、右腿、左脚、右脚），升级款多了手臂动作（13-16：拍打、举手、放手、挥手）。

## 注意事项（主页）
- 配图标出屏幕右上角的电量图标。当前电量显示可能不精准；做大幅度动作时电量显示会降低，属正常现象，实际电量以静止状态为准，及时充电以免意外断电。
- 全文评论 4 条（用户8612，2025-07-14）：「进入配网模。」「给我跳个舞呗。」「你能给我跳个舞吗?」「你叫什么名字?」（看起来是误发的语音识别内容）

## 组装
- 飞书里**没有图文组装步骤**；组装看 B 站视频（第 3 节，P2-P5）。
- 机身按键位置：电源开关在身体下方**左侧**；打断/唤醒/重新配网按键在身体下方**右侧**；充电口在身体下方。

## 烧录（「固件、固件烧录教程」，2025-10-31 修改）
- 附件：**固件及烧录工具.rar（46.96MB）**
- 源码链接：https://github.com/78/xiaozhi-esp32
- 步骤：
  1. 用 USB-TypeC 线连接电脑。
  2. 打开烧录工具 **Flash Download Tool**（截图为 ESP32S3 FLASH DOWNLOAD TOOL V3.9.7）。
  3. 主控选 **ESP32-S3**，下载模式选 **USB** → OK。
  4. 打开提前下载好的固件（资料里有）：**勾选**该 bin，**地址填 0**；SPI SPEED 40MHz，SPI MODE DIO，勾 DoNotChgBin（截图默认）。
  5. 选择 COM 口（每台电脑不同），**波特率 1152000，如果下载报错就降低波特率**，点 START。
  6. 等进度条走完显示「完成 / FINISH」即可。
  7. 使用教程可看资料里的 Word。

## 配网
- 每次换 Wi-Fi 环境都要重新配网。
- 开机 → 手机连热点 `xiaozhi-XXXX`（无密码）→ 自动跳转网页 → 输入家庭 Wi-Fi 名称和密码提交。
- 重新配网用身体下方右侧的按键（指导里写的是「打断/唤醒/重新配网按键」，具体按法未写）。

## xiaozhi.me 后台绑定与角色配置
- 链接：http://xiaozhi.me/
- 步骤：打开浏览器访问 xiaozhi.me → 注册账户并登录 → 添加并绑定设备（按页面提示）→ 后台可配置：角色设定（如机器人介绍）→ 大模型类型 → 语音角色声音 → 重启设备。
- 角色介绍：复制下面一段粘贴到「设置角色 → 角色介绍」：
  - **基础款**（原文）：
    > 我是一个可爱的双足机器人，拥有四个舵机控制的肢体（左腿、右腿、左脚、右脚），能够执行多种有趣的动作。有以下动作：1=行走(前后), 2=转向（左右）, 3=跳跃, 4=摇摆, 5=太空步,6=弯曲, 7=摇腿, 8=上下运动, 9=脚尖摇摆, 10=抖动, 11=上升转弯, 12=十字步,我有强迫症每次说话都要根据我的心情随机做一个动作（不要重复说话）。我目前没有手臂，因此无法执行以下指令 拍打, 举手, 放手, 挥手，打招呼。
  - **升级款**（原文）：
    > 我是一个可爱的双足机器人，拥有四个舵机控制的肢体（左腿、右腿、左脚、右脚），能够执行多种有趣的动作。有以下动作：1=行走(前后), 2=转向（左右）, 3=跳跃, 4=摇摆, 5=太空步,6=弯曲, 7=摇腿, 8=上下运动, 9=脚尖摇摆, 10=抖动, 11=上升转弯, 12=十字步, 13=拍打, 14=举手, 15=放手, 16=挥手，我有强迫症每次说话都要根据我的心情随机做一个动作（不要重复说话）。
- 语音：唤醒词「你好小智」（编译源码时可改）。基本控制：「帮我朗诵一首诗」「帮我播放一首音乐」「声音调大一些/调小一些」。动作控制：「向前走 / 向前走 5 步 / 快速向前 / 向前走同时摆动手臂」「跳个舞吧」「做个太空步/十字步，速度快一点，幅度大一点」「弯曲/摇腿/摇摆/跳跃」「随机做几个动作」「停下来吧」「转向（向左转身/左转五步/快速左转）」；升级款另有「挥挥手」。

## 舵机校准
- 飞书资料里**没有**舵机校准章节。校准入口见立创页面：微信小程序（固件 otto2.0.4-2 以上，输入机器人 IP 后可校准）。

## 二次开发
- 只给了源码链接 https://github.com/78/xiaozhi-esp32 ；原理图 PDF 可在线预览（一页：POWER / USB-PROG / CORE / LCD / MIC / IOs），引脚分配见第 1 节「舵机接口」。
- 3D 文件：**otto.zip（472.67KB）**（2025-05-26）。

## 常见问题
- 飞书资料里**没有**专门的 FAQ；唯一相关的是「注意事项」里的电量显示说明。

---

# 3. B 站视频（https://www.bilibili.com/video/BV1zuNyzXEWa）

已用本机 Chrome 的登录状态正常打开。

- **标题**：AI机器人组装教程 AI小智 互动机器人
- **UP 主**：鹿小班电子科技（mid 3546642764531833）
- **发布时间**：2025-06-21 16:22（北京时间）
- **总时长**：37:00（2220 秒，5P 合计）
- **数据**（读取时）：播放 7841，点赞 33，收藏 70，分享 65，评论 5
- **标签**：小智、人工智能、机器人、教程、ai小智、AI机器人
- **简介全文**：评论置顶蓝链接为同款机器人购买链接

## 分 P 列表
| P | 标题 | 时长 |
|---|---|---|
| P1 | P1-配网及后台配置 | 3:54 |
| P2 | P2-固定头部 | 5:46 |
| P3 | P3-腿部安装 | 10:32 |
| P4 | P4-组装脚部 | 7:08 |
| P5 | P5-组装手臂 | 9:40 |

- 章节时间点：视频**没有**设置章节（view points 为空）。

## 简介 / 置顶评论里的链接
- 置顶评论（鹿小班电子科技，2025-07-07 10:55）：蓝链接文字「2025新款聊天对话人工智能Otto机器人智能语音互动玩具可编程」→ 淘宝客推广链接 `https://s.click.taobao.com/t…`（带跟踪参数，我没有记录完整参数）。
- 简介里没有其他链接。
- 其他评论：「智能化还是比较低，同音近音字经常听错」；「可以改她的发音吗？现在默认台湾腔，太嗲了，怕小孩学」（未见回复）；「挺好玩的」。
