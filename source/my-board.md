# 奶龙机器人内容核对记录

本文是 Wiki 的维护资料，教程正文见 source/docs/。

## 1. 本次依据

- 固件：[NaiLongFirmware](https://github.com/cccatnipent/NaiLongFirmware) 的 nailong-firmware，基础版本 2.4.2、ESP-IDF v5.5.5、nailong-otto 变体。
- 公开版验证：2026-11-19 完整构建、82 项固件测试与 4 项配置测试通过；来源见仓库 VALIDATION.md。
- 现有验证：四舵机基线有用户正常使用反馈；自定义唤醒、回答选图和普通笑声有运行日志。
- 候选修订：边笑边走、语音只停动作、BOOT 打断后继续监听。主机测试及构建有记录，完整实机验收待补。
- IDE：Catnip Forge v2.0.0 的开发示例、随源码使用手册及 Hello World 工程。

不把另一份旧固件、历史样机照片或构建成功记录当作当前功能已实测的证据。

## 2. 硬件与实现

| 项目 | 当前说明 |
|---|---|
| 主控 | ESP32-S3，16 MB Flash、8 MB Octal PSRAM |
| 舵机 | 右腿 39、右脚 38、左腿 17、左脚 18，奶龙变体关闭手臂 |
| 麦克风 | WS 4、SCK 5、DIN 6 |
| 功放 | DOUT 7、BCLK 15、LRCK 16 |
| 屏幕 | ST7789，240×240；背光 3、MOSI 10、CLK 9、DC 46、RST 11、CS 12 |
| 电源检测 | 固件沿用充电检测 GPIO21、电池 ADC2_CH3，实物线路仍需核对 |
| 图片 | 9 张 RGB565 场景图，不是逐情绪单色贴图 |
| 笑声 | 本地约 5 秒，资源名 nl_laugh.ogg |
| 唤醒 | ni hao nai long，阈值 10%，资源索引实际值 0.1 |
| 动作 | self.otto.action 统一接口，另有自定义舵机序列 |
| 局域网 | 设备端 8080/ws；不提供完整语音对话后台 |
| 构建 | 在 nailong-firmware/ 执行 python scripts/build_nailong.py；公开版已移除个人身份覆盖 |
| 分区 | partitions/v2/16m.csv，应用 0x20000，资源 0x800000 |

## 3. 发布前待补

1. IDE 公开仓库与发布包、奶龙可烧录固件下载地址；固件与 server 源码已公开。
2. 公开版烧录与升级验证；通用配置构建已通过。
3. 候选停止、组合动作、两种传输与配套 server 的实机记录。
4. 控制台截图、唤醒与误停率、电源检测线路核对。
5. IDE 发布包包含示例及依赖的复核。

公开材料不包含个人 MAC、UUID、设备 token、API Key、整机 Flash 或 NVS 备份。
