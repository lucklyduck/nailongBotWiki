---
slug: /dev/freertos
title: FreeRTOS：奶龙怎么同时听、说、动
sidebar_label: FreeRTOS 多任务
---

## 1. 一句话理解

**FreeRTOS 让一块芯片能「同时」做好几件事：它把工作分给几个任务，飞快地轮流执行，忙的、急的先干。**

奶龙一边走路，一边还能听你说「停下」，靠的就是它。小智固件跑在 ESP-IDF 自带的 FreeRTOS 上，ESP32-S3 有两个核，所以有时真的是两个任务同时在跑。

:::nailong
把我想成一个有好几个小脑袋的奶龙：一个专门听，一个专门说，一个专门管腿。小脑袋之间靠**传纸条**（队列）和**举旗子**（事件组）商量事情。
:::

## 2. 五个词就够了

| 词 | 打个比方 | 奶龙里的例子 |
|---|---|---|
| **任务** | 一个小脑袋，只管一件事 | 「听」的任务、「动腿」的任务 |
| **优先级** | 谁更急谁先干，数字越大越急 | 听你说话最急（8），动腿不急（3） |
| **队列** | 排队的纸条箱，先放先取 | 大模型说「跳舞」，就往动作箱里放一张纸条 |
| **事件组** | 一排小旗子，举起哪面就有人去处理 | 听到「你好奶龙」就举起「唤醒」旗 |
| **栈** | 每个小脑袋的草稿本，写满了就会出错 | 写新任务时要给够大小 |

## 3. 奶龙的几个小脑袋

<figure>
  <img className="board-svg" src="/img/dev/freertos-tasks.svg" alt="任务关系图：audio_input 和 opus_codec 通过事件组唤醒 main_event_loop；main_event_loop 里的 MCP 回调把动作放进队列，otto_action 和 otto_sound 从队列里取出执行" />
  <figcaption>任务之间靠事件组和队列配合（示意图）</figcaption>
</figure>

| 任务 | 负责 | 急不急 |
|---|---|---|
| 听（`audio_input`） | 一直听麦克风，等「你好奶龙」 | 最急，晚一点就会漏听 |
| 说（`audio_output`） | 把声音送到喇叭 | 比较急 |
| 大脑（`main_event_loop`） | 管现在是待机、在听还是在说，和服务器收发消息 | 一般 |
| 腿（`otto_action`） | 按动作箱里的纸条转舵机 | 一般，比听和说都低 |
| 音效（`otto_sound`） | 放动作音效 | 一般 |
| 压缩（`opus_codec`） | 把声音压缩 / 解压，方便上网传 | 最不急 |

为什么腿要比听和说「不急」？源码里写着原因：**说话和音效必须能打断舵机，不然走路时声音会一卡一卡的。**

## 4. 「跳个舞」是怎么传到腿上的

1. 大模型决定让奶龙跳舞，调用工具 `self.otto.swing`。
2. 「大脑」收到后，**不自己去转舵机**，只往动作箱里放一张纸条，马上回去干别的。
3. 「腿」从箱子里取出纸条，慢慢转舵机，跳完回到站立姿势。
4. 这期间「听」一直在工作，所以你随时能说「停下」。说「停下」会清空动作箱。

这就是 [添加新动作](/docs/dev/action) 里说「动作在单独的任务里执行」的意思。

## 5. 写代码时记住三条

| 规矩 | 为什么 |
|---|---|
| MCP 工具里别做耗时的事，放进队列交给别的任务 | 卡住「大脑」，就收不到服务器消息了 |
| 等待用 `vTaskDelay(pdMS_TO_TICKS(毫秒))`，别写空循环 | 空循环不让别人干活，还会触发看门狗重启 |
| 新任务的栈给足，一般从 4 KB 起 | 草稿本写满了会直接重启 |

## 6. 看到这些报错怎么办

| 串口日志里 | 意思 | 怎么办 |
|---|---|---|
| `A stack overflow in task xxx` | 任务 xxx 的草稿本写满了 | 调大它的栈 |
| `Task watchdog got triggered` | 有个任务一直不让出 CPU | 找死循环，循环里加 `vTaskDelay` |
| `Guru Meditation Error` | 程序崩了 | 用 `idf.py monitor` 看回溯，它会告诉你哪一行 |

:::nailong
看到「stack overflow」别慌，给那个小脑袋换个大点的草稿本就好。
:::

## 7. 想深入再看

<details>
<summary>完整任务表（优先级、栈、核、源码位置）</summary>

从 `~/otto` 源码里的 `xTaskCreate` 逐个找出来的：

| 任务名 | 优先级 | 栈 | 核 | 源码 |
|---|---|---|---|---|
| `audio_input` | 8 | 6 KB | 0 号核 | `audio/audio_service.cc` |
| `audio_output` | 4 | 4 KB | 不固定 | 同上 |
| `main_event_loop` | 3 | 8 KB | 不固定 | `application.cc` |
| `otto_action` | 3 | 3 KB | 不固定 | `boards/otto-robot/otto_controller.cc` |
| `otto_sound` | 3 | 4 KB | 不固定 | 同上 |
| `opus_codec` | 2 | 26 KB | 不固定 | `audio/audio_service.cc` |

注意：ESP-IDF 里栈大小的单位是**字节**，和原版 FreeRTOS（单位是字）不一样。系统节拍 `CONFIG_FREERTOS_HZ=100`，一个 tick 是 10 ms。

</details>

<details>
<summary>开机顺序</summary>

1. 引导程序加载固件，FreeRTOS 启动，在 `main` 任务里调用 `app_main()`。
2. `app_main()`（`main/main.cc`）初始化 NVS（存 Wi-Fi 和设置），然后调用 `Application::Start()`。
3. `Start()` 依次：初始化屏幕和音频、创建上面那些任务、连 Wi-Fi、检查 OTA 拿服务器配置、选 [通信协议](/docs/dev/protocol)、播放提示音。
4. `app_main()` 返回，之后全靠各个任务干活。

设备状态一共 11 种（`main/device_state.h`）：未知、启动中、配网中、待机、连接中、聆听、说话、升级中、激活中、音频测试、致命错误。

</details>

<details>
<summary>主循环代码：事件组 + Schedule()</summary>

「大脑」大部分时间在睡觉，等事件组里的旗子：

```cpp
auto bits = xEventGroupWaitBits(event_group_, MAIN_EVENT_SCHEDULE |
    MAIN_EVENT_SEND_AUDIO | MAIN_EVENT_WAKE_WORD_DETECTED |
    MAIN_EVENT_VAD_CHANGE | MAIN_EVENT_CLOCK_TICK | MAIN_EVENT_ERROR,
    pdTRUE, pdFALSE, portMAX_DELAY);
```

别的任务想改状态或发网络消息，不能直接动，要用 `Schedule()` 把代码交给「大脑」执行：

```cpp
void Application::Schedule(std::function<void()> callback) {
    {
        std::lock_guard<std::mutex> lock(mutex_);
        main_tasks_.push_back(std::move(callback));
    }
    xEventGroupSetBits(event_group_, MAIN_EVENT_SCHEDULE);
}
```

这样状态只有一个任务在改，不会乱。

</details>

<details>
<summary>动作队列代码</summary>

放纸条（MCP 工具回调里）：

```cpp
OttoActionParams params = {action_type, steps, speed, direction, amount};
xQueueSend(action_queue_, &params, portMAX_DELAY);
```

取纸条（`otto_action` 任务里）：

```cpp
if (xQueueReceive(controller->action_queue_, &params, pdMS_TO_TICKS(1000)) == pdTRUE) {
    // 执行动作，结束后回到站立姿势
}
```

动作箱最多放 10 张纸条；音效箱只放 1 张，新的来了旧的就丢掉。`self.otto.stop` 会先停下当前动作，再用 `xQueueReset` 清空动作箱，最后放一个「站好」的动作。

</details>

<details>
<summary>打印每个任务的 CPU 占用</summary>

`application.cc` 主循环里留了两行，默认注释掉：

```cpp
// SystemInfo::PrintTaskCpuUsage(pdMS_TO_TICKS(1000));
// SystemInfo::PrintTaskList();
```

去掉注释重新编译，串口每 10 秒打印一次任务列表和 CPU 占用。奶龙的 `sdkconfig` 已经打开了需要的选项，不用另外改。

</details>

## 8. 参考资料

- 乐鑫 ESP-IDF 编程指南：[FreeRTOS（IDF）](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.5/esp32s3/api-reference/system/freertos_idf.html)
- [读懂一台端侧语音 AI 的第一步：拆解小智 ESP32 的状态机](https://gitcode.csdn.net/6a2543f410ee7a33f2790087.html)（CSDN）
- [DeepWiki：xiaozhi-esp32 启动流程](https://deepwiki.com/78/xiaozhi-esp32/3.2-system-initialization-and-boot-sequence)（基于上游新版本，函数名和奶龙固件略有不同）
- 奶龙固件源码：`main/main.cc`、`main/application.cc`、`main/audio/audio_service.cc`、`main/boards/otto-robot/otto_controller.cc`
