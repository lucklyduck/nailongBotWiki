---
slug: /dev/mcp-tool
title: 添加 MCP 工具
sidebar_label: 添加 MCP 工具
---

## 1. 简介

MCP 工具是“大模型能调用的固件函数”。先做一个小练习：在已有动作控制器中增加 `self.otto.stand`，让奶龙回到站立位置。

本节代码用于 NaiFirmware。先完成 [源码编译](/docs/flash/build)，再新建自己的 Git 分支。

## 2. 注册工具

打开 `main/boards/otto-robot/otto_controller.cc`，在 `RegisterMcpTools()` 中、其他 `AddTool` 旁添加：

~~~cpp
mcp_server.AddTool(
    "self.otto.stand", "让机器人回到站立位置", PropertyList(),
    [this](const PropertyList&) -> ReturnValue {
        QueueAction(ACTION_HOME, 1, 1000, 1, 0);
        return std::string("已安排归位");
    });
~~~

| 部分 | 作用 |
|---|---|
| `self.otto.stand` | 唯一工具名 |
| 中文描述 | 告诉模型什么时候调用 |
| `PropertyList()` | 本例无参数 |
| 回调 | 只排队，不在这里等待舵机走完 |

“已安排归位”不是“已经站好”。想知道实际结果，还要看日志和实物。

## 3. 编译和验证

1. 执行 `python scripts/build_nailong.py`，成功后烧录。
2. 在后台人设里加入“让我站好时调用 `self.otto.stand`”。
3. 重启连接，确认模型发现新工具。
4. 先架空机器人，小幅偏离站姿后说“站好”，检查调用、归位和停止行为。

本例是开发练习，尚未作为发布功能编译、上机验收。

## 4. 耗时工具怎么写

普通动作排队后可以立即返回。像本地笑声这样的工具，需要等播放结束才回答模型，应参考 `nailong_actions.cc` 的 `AddDeferredTool` 和完成回调。

不要在网络回调里等待整段音频或整套动作；也不要省略忙状态、超时和取消处理。

## 5. 常见问题

| 现象 | 检查 |
|---|---|
| 后台看不到新工具 | 是否烧入新应用、重新连接并刷新工具 |
| 模型只说不调用 | 描述和人设是否写清工具名 |
| 调用后卡住 | 回调是否阻塞、延迟工具是否漏掉完成回调 |
| 无法编译 | 代码是否放在控制器的方法内部，名称有无重复 |
