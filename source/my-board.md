# 奶龙机器人信息提取

提取时间：2026-10-24。来源和可信度：

| 来源 | 内容 | 可信度 |
|---|---|---|
| 本机源码 `~/otto`（howtion0/otto，PROJECT_VER 2.0.16） | 引脚、屏幕、音频、唤醒词、MCP 工具、编译烧录方式 | 高（实际在用的固件） |
| ottodiy.tech：downloads / assembly / bom / build-guide / soldering-guide / usage / faq | 官方固件、BOM、组装、焊接、配网 | 高（官方） |
| 黑客松照片 11 张、演示视频 3 段、PPT 3 份、知乎稿 docx | 外观、颜色、展示形态、项目背景 | 高（实物） |
| 立创开源 oshwhub.com/txp666/ottorobot | 简介、27 行 BOM、动作表、使用说明、附件列表 | 高（用本机 Chrome 阅读，见 `sources.md`） |
| 飞书资料（鹿小班二）| 原理图 PDF、基础款/升级款使用指导、烧录教程、角色介绍原文 | 高（同上）；舵机排针线序是从原理图图片读的，中 |
| B 站 BV1zuNyzXEWa（鹿小班电子科技，37:00，5P）| P1 配网后台、P2 头部、P3 腿、P4 脚、P5 手臂 | 只有分 P 标题，步骤细节需看视频 |

## 1. 基本信息

- 名称：奶龙机器人；项目名 知造 ZhiForge（灵魂匹配局）
- 场合：2026 知乎黑客松 · 校园新锐季，社交灵魂局赛道，队伍 catnipent
- 本体：小智 AI Otto 双足机器人（txp666 / 闪猫科技 OttoDIY V1.1），四舵机、无手臂
- 外观：三只样机 —— 黄色奶龙 ×1～2、灰白看山 ×2～3；均为蓝色脚、白色腿；屏幕在胸口，被双手抱着
- 外壳预览：model.zhiforge.org「奶龙 · 结构观察室」，标注「6 个 STL，黄色外壳 / 白色双腿 / 四个关节」

## 2. 核心器件

| 功能 | 型号 | 来源 |
|---|---|---|
| 主控 | ESP32-S3-WROOM-1U-N16R8（外接天线版，16 MB Flash，8 MB Octal PSRAM）；ottodiy 说板载天线版也能用 | 立创 BOM + sdkconfig |
| 充电 | TP4054，Type-C 输入，KT-0603R 充电指示灯 | 立创 BOM |
| 稳压 | HE9073A33M5R 3.3 V LDO | 立创 BOM |
| 电源开关 | XKB5858-Z-E 拨动开关（SW1），身体下方左侧 | 立创 BOM + 飞书 |
| 按键 | TS35CA（SW2，IO0），身体下方右侧：打断 / 唤醒 / 重新配网 | 立创 BOM + 飞书 |
| 舵机排针 | PZ254-2-03-S 2×3 ×3（HDR1/HDR3/HDR4），每个接两路舵机 | 立创 BOM |
| 接口座 | 喇叭 CN2（HC-1.25 2P），电池 U9（PH2.0 2P） | 立创 BOM |
| 舵机 | SG90 9g 180° ×4 | BOM（套件 6 个，奶龙不用手臂 2 个） |
| 屏幕 | 1.54" 240×240，ST7789，SPI mode 3，颜色反转 | config.h |
| 麦克风 | ICS-43434 / INMP441，I2S | BOM |
| 功放 | MAX98357A，I2S | BOM |
| 喇叭 | 2828 4Ω 3W，1.25 端子 | BOM |
| 电池 | 103450 2000 mAh（1.25）或双 18650 3.7 V 2200 mAh（PH2.0） | BOM |
| 开关 | 5.8×5.8 侧按自锁 | BOM |
| BOOT 键 | 3.3×4.5×6H 贴片轻触，GPIO0 | BOM + config.h |

## 3. 引脚（main/boards/otto-robot/config.h）

| 信号 | GPIO |
|---|---|
| 右腿 / 右脚 / 左腿 / 左脚 舵机 | 39 / 38 / 17 / 18 |
| 左手 / 右手 舵机 | -1（未用） |
| 麦克风 WS / SCK / DIN | 4 / 5 / 6 |
| 功放 DOUT / BCLK / LRCK | 7 / 15 / 16 |
| 屏幕 背光 / MOSI / CLK / DC / RST / CS | 3 / 10 / 9 / 46 / 11 / 12 |
| BOOT 按键 | 0 |
| 充电检测 | 21 |
| 电池电压 | ADC2 通道 3 |

音频：输入 16 kHz，输出 24 kHz，I2S simplex。

### 舵机排针（原理图图片读取，中等可信）

每个 2×3 排针接两路舵机，每路从上到下（脚 6/5 → 4/3 → 2/1）依次是 **信号 / VBAT（电池直供）/ GND**。

| 排针 | 脚 6 信号 | 脚 5 信号 |
|---|---|---|
| HDR1 | SERVO1 = IO17 左腿 | SERVO2 = IO18 左脚 |
| HDR3 | SERVO4 = IO38 右脚 | SERVO3 = IO39 右腿 |
| HDR4 | SERVO5 = IO8（手臂，奶龙不用） | SERVO6 = IO12（手臂，奶龙不用） |

原理图另有：CHG_DET=IO47、BAT_DET=IO21，与固件 config.h（充电检测 GPIO21、电池 ADC2_CH3）**对不上**，以固件为准，待确认。另预留 ML307 4G 口（EN=IO2）。

## 4. 固件

| | 官方 Otto 固件 | 奶龙定制固件 |
|---|---|---|
| 版本 | v2.5.3（2026-10-19） | 2.0.16 |
| 唤醒词 | 你好小智 | 你好奶龙（MultiNet7 `ni hao nai long`，阈值 20%） |
| 构建 | ESP-IDF v6.0.2（txp666/xiaozhi-esp32） | ESP-IDF v5.5.5，`idf.py build`，自动用 sdkconfig.defaults.otto |
| 烧录 | 合并 bin，地址 0x0，921600 | `idf.py flash`（含 generated_assets.bin） |
| 分区 | — | partitions/v1/16m.csv |
| 表情 | 21 个重绘表情 | 240×240 单色「看山」表情 + 动作贴图，21 个表情名 |
| 特有 | 微信小程序控制/校准（≥2.0.4-2） | `self.otto.laugh` 奶龙大笑；音量默认 100；Otto Master 本地联调 |
| OTA 默认 | — | https://api.tenclass.net/xiaozhi/ota/（xiaozhi.me） |

## 5. 设备端 MCP 工具（奶龙固件）

laugh、walk_forward、turn_left、jump、swing、moonwalk、bend、shake_leg、updown、stop、set_trim、get_trims、get_status、self.battery.get_level；hands_* 仅在配置手臂时注册。

## 6. 开源协议与社区

- 立创工程 ottoRobot：© 小鹏 2025，**CC BY-NC-SA 4.0**（署名 / 非商业 / 相同方式共享），作者称未经授权禁止转载。
- 复刻交流 QQ 群 1046432896；作者提醒立创页面上的 3D 件和固件不是最新，以 ottodiy.tech 为准。
- 飞书资料与 B 站视频来自商家「鹿小班电子科技」（基础款 = 无手臂 4 舵机，升级款 = 带手臂）。

## 7. 待确认

1. 奶龙 / 看山外壳 STL 的下载地址和打印参数
2. 外壳与 Otto 机身底座的固定方式
3. 主板是自己焊的立创开源板还是买的套件板（鹿小班基础款？）；PCB 版本
4. howtion0/otto 仓库是否公开（决定 wiki 里能否直接给 clone 地址）
5. 奶龙固件是否有现成的合并 bin 可供下载
6. xiaozhi.me 上实际用的角色设定、音色、模型
7. 微信小程序是否兼容奶龙固件
8. 充电检测 / 电池检测引脚：原理图 IO47/IO21 与固件 GPIO21/ADC2_CH3 不一致
9. 奶龙固件里按键在已联网状态下怎么进入重新配网
