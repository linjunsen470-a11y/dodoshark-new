# Sanity Presentation / Visual Editing 排障记录

## 1. 问题现象

- 本地启动 `studio-dodoshark` 后，点击 `Presentation` 长时间无法加载页面。
- Studio 提示：`Unable to connect, check the browser console for more information.`
- 前端日志中出现 `GET /api/draft/enable ... 500`。
- 同一套本地环境在更早之前曾经可以正常使用，问题具有间歇性。

## 2. 已确认的配置现状

- Studio 已接入 `presentationTool`。
- `studio-dodoshark/sanity.config.ts` 中 `previewUrl.origin` 指向 `http://localhost:3000`。
- 前端存在：
  - `front/dodoshark/app/api/draft/enable/route.ts`
  - `front/dodoshark/app/api/draft/disable/route.ts`
- 前端已接入：
  - `VisualEditing`
  - `SanityLive`
- Sanity 项目 API hosts / CORS 已包含：
  - `http://localhost:3000`
  - `http://localhost:3333`
  - `https://dodoshark.sanity.studio`

## 3. 排查证据

### 本地应用状态

- Next dev server 可正常启动于 `http://localhost:3000`。
- 本地首页可正常打开，说明前端渲染链路本身没有整体故障。
- Studio 本地页可打开于 `http://localhost:3333`。

### Presentation 相关链路

- `GET /api/draft/enable` 已注册在 Next App Router 中。
- `draft/enable` 使用 `defineEnableDraftMode(...)`，会在服务端访问 Sanity API 校验 preview secret。
- 故障时前端终端日志出现：

```text
TypeError: fetch failed
Error [ConnectTimeoutError]: Connect Timeout Error
GET /api/draft/enable?... 500
```

- 超时目标为：

```text
nljl95h9.api.sanity.io:443
```

### 网络 / 代理证据

- 本机环境变量存在：

```text
HTTP_PROXY=http://127.0.0.1:2081
HTTPS_PROXY=http://127.0.0.1:2081
ALL_PROXY=http://127.0.0.1:2081
NO_PROXY=127.0.0.1,localhost,::1
```

- `127.0.0.1:2081` 由 `nekobox_core.exe` 提供。
- 故障时：
  - PowerShell 直连 Sanity 域名失败或超时。
  - PowerShell 通过本地代理访问 Sanity / `www.sanity.io` 也出现连接被关闭。
- 浏览器侧验证结果：
  - 可以访问 `https://www.sanity.io`
  - 可以访问 `https://nljl95h9.api.sanity.io/v2024-01-01/data/query/production?query=count(*)`

这说明：
- Sanity 服务本身可用。
- 浏览器链路可以通过当前代理访问外网。
- 问题更偏向 `Next.js / Node / PowerShell` 这一侧的服务端出网不稳定。

## 4. 已排除项

- 不是 Studio 中 `presentationTool` 缺失。
- 不是前端缺少 `draft enable` 路由。
- 不是本地 `localhost:3000` 页面本身打不开。
- 不是浏览器 CORS 直接导致。
- 不是 Sanity API 全局不可用。
- 不是稳定可复现的代码逻辑错误。

## 5. 当前结论

当前最合理的结论是：

- 高概率根因是本机代理 / 出网链路不稳定。
- 更准确地说，是“浏览器访问 Sanity 正常，但 Next / Node 服务端访问 Sanity 不稳定”。
- 这会导致 `defineEnableDraftMode(...)` 在服务端校验 preview secret 时失败。
- 一旦该请求失败，Studio Presentation 就无法完成握手，因此出现：

```text
Unable to connect, check the browser console for more information.
```

因为问题出现过、又自行恢复过，所以目前更像网络链路抖动，而不是仓库中存在持续性代码缺陷。

## 6. 后续建议

### 先做观察

- 下次复现时，优先保留 Next 终端完整日志。
- 重点观察是否仍然是：
  - `fetch failed`
  - `ConnectTimeoutError`
  - `GET /api/draft/enable ... 500`

### 本地开发环境建议

- 本地联调时建议把 `NEXT_PUBLIC_SANITY_STUDIO_URL` 切到 `http://localhost:3333`，避免本地预览仍指向线上 Studio。
- 保持 Studio `previewUrl.origin` 为 `http://localhost:3000`。

### 若后续频繁复现，建议做仓库级加固

- 在 `front/dodoshark` 中显式为 Next 服务端请求接入代理。
- 优先考虑在 Next 启动阶段通过 `instrumentation.ts` 为 Node runtime 设置全局代理 dispatcher。
- 目标是让 `next-sanity`、`@sanity/client`、`defineEnableDraftMode(...)` 内部的服务端 fetch 稳定走 `HTTP_PROXY / HTTPS_PROXY`。

## 7. 待补充项

下次复现时建议补记录以下信息：

- Nekoray 当前模式
- 浏览器访问 Sanity 是否仍正常
- Node / Next 是否单独失败
- 切换代理模式后是否立刻恢复
- 是否只影响 `Presentation`，还是普通服务端 Sanity 查询也一起受影响

## 8. 结论摘要

这次问题的排查结果可以简化为一句话：

> `Sanity Presentation` 无法连接的直接原因，是本地 `draft/enable` 服务端请求访问 Sanity API 失败；高概率根因是当前代理/网络链路对 Node 服务端请求不稳定，而不是 Studio 或前端配置本身错误。
