# DoDoShark CMS 运营说明

本文档面向运营与内容维护人员，说明本次 `vlog` 与共享标签（Shared Tags）改造后的使用方式。

## 这次改了什么

### 1. `/vlog` 页面不再展示博客文章
- 现在 `/vlog` 页面只展示视频内容。
- 旧的 `Blog Posts / post` 仍然保留在 CMS 中，但不再用于 `/vlog` 页面。
- `/vlog` 页面点击卡片后，会直接弹出 YouTube 视频播放窗口，不再进入 `/vlog/[slug]` 详情页。

### 2. 新增共享标签 Shared Tags
- 新增了独立的 `Shared Tags` 文档。
- 这套标签同时供：
  - `Vlog Videos`
  - `Case Studies`
- 运营可在后台统一命名和修改标签名称，前端 `/vlog` 与 `/cases` 会同步使用这套标签。

### 3. `/cases` 页面筛选逻辑已改为 Shared Tags
- 现在 `/cases` 页面不再按 `industry` 做前台筛选。
- `industry` 字段仍保留在案例文档中，方便内部整理，但不会再作为列表筛选条件。
- 如果案例没有填写 Shared Tags，卡片标签会临时回退显示 `industry`。

## CMS 后台入口说明

在 Sanity 左侧导航中，你会看到以下入口：

### Site Pages
- `Vlog Listing Page`
  - 用于配置 `/vlog` 页面 Hero 区和底部 tag cloud 的标签顺序。
- `Case Studies Listing Page`
  - 用于配置 `/cases` 页面 Hero 区和底部标签筛选顺序。

### Collections
- `Vlog Videos`
  - 新的视频内容库，`/vlog` 页面只读取这里的数据。
- `Legacy Blog Posts`
  - 旧博客文章库，仅保留兼容用途，不再用于 `/vlog`。
- `Case Studies`
  - 案例库。

### Reference Library
- `Shared Tags`
  - 统一管理 vlog 与 cases 共用的标签。

## 如何新建 Shared Tag

路径：`Reference Library` -> `Shared Tags`

### 字段说明
- `Tag Name`
  - 前端展示名称。
  - 例如：`Grinding Demo`、`Feed Processing`、`Factory Tour`
- `URL Slug`
  - 用于生成筛选链接。
  - 建议使用英文、短横线风格，例如：`grinding-demo`
- `Description`
  - 可选，仅供内部备注。

### 填写建议
- 标签名称尽量短，方便前端展示。
- 一个标签表达一个主题，不要把多个概念写进同一个标签。
- 如果需要改前端标签文案，直接编辑 `Shared Tags` 即可，无需逐条修改视频或案例标题。

## 如何新建 Vlog 视频

路径：`Collections` -> `Vlog Videos`

### 必填字段
- `Video Title`
  - 视频标题，会展示在 `/vlog` 卡片上。
- `YouTube URL`
  - 必须填写有效的 HTTPS YouTube 地址。
  - 支持：
    - 标准 YouTube 链接
    - `youtu.be`
    - `shorts`
    - `live`
    - `embed`
- `Published At`
  - 用于排序。
  - 前端默认按发布时间从新到旧展示。

### 建议填写字段
- `Cover Image`
  - 视频封面图，建议上传。
  - 如果不填，前端会缺少最佳视觉效果。
- `Alt Text`
  - 建议认真填写，方便无障碍与图片说明。
- `Excerpt`
  - 视频简介，用于卡片说明文字。
- `Shared Tags`
  - 建议至少选择 1 个标签。
  - 这会影响 `/vlog` 和 `/cases` 的筛选效果。

### 可选字段
- `Primary Product`
  - 如视频主要对应某台设备，可选填。
- `Internal Category`
  - 仅供内部分类整理，前端不会使用。
- `Featured`
  - 目前前端未使用，先保留做后续扩展。

### 状态字段
- `Draft`
  - 草稿，不在 `/vlog` 展示。
- `Published`
  - 已发布，会在 `/vlog` 展示。
- `Archived`
  - 已归档，不在 `/vlog` 展示。

### 发布前检查清单
- `Video Title` 已填写
- `YouTube URL` 可正常播放
- `Published At` 已填写
- `Status` 已设为 `Published`
- 至少选择 1 个 `Shared Tag`
- 已上传 `Cover Image`

## 如何配置 `/vlog` 页面

路径：`Site Pages` -> `Vlog Listing Page`

### 可配置内容
- `SEO Settings`
- `Hero Section`
  - `Badge`
  - `Title`
  - `Subtitle`
  - `Hero Image`
- `Tag Filters`
  - 用于控制 `/vlog` 页面底部 tag cloud 的展示顺序。

### Tag Filters 的规则
- 如果这里填写了标签：
  - 前端只显示这里选中的标签，并按这里的顺序显示。
- 如果这里留空：
  - 前端会自动回退显示全部 `Shared Tags`。

## 如何配置 `/cases` 页面标签筛选

路径：`Site Pages` -> `Case Studies Listing Page`

### 可配置内容
- `SEO Settings`
- `Hero Section`
- `Tag Filters`

### 重要说明
- 这里的 `Tag Filters` 规则与 `Vlog Listing Page` 相同。
- `/cases` 前端筛选现在读取的是 `Shared Tags`，不再读取 `industry`。

## 如何填写 Case Study

路径：`Collections` -> `Case Studies`

### 重点字段
- `Shared Tags`
  - 这是现在 `/cases` 列表筛选真正使用的字段。
  - 建议每个案例至少绑定 1 个共享标签。
- `Industry`
  - 仍可填写，但仅作内部整理和旧卡片回退显示，不再决定前端筛选。

### 建议
- 如果某案例已经上线，请尽快补上 `Shared Tags`，避免前端长期回退显示旧 `industry`。

## 旧 Blog Posts 怎么处理

路径：`Collections` -> `Legacy Blog Posts`

### 说明
- 旧博客文章仍保留，不需要删除。
- 这些内容目前不再用于 `/vlog` 页面。
- 如其他页面仍引用旧博客内容，可继续保留以保证兼容。
- 新的视频内容请不要再录入到 `Legacy Blog Posts`，应统一录入到 `Vlog Videos`。

## 常见操作示例

### 场景 1：新增一个视频到 `/vlog`
1. 先到 `Shared Tags` 中确认标签是否已存在。
2. 没有则先新建标签。
3. 进入 `Vlog Videos` 新建视频。
4. 填写标题、YouTube 链接、发布时间、封面图、简介。
5. 选择合适的 `Shared Tags`。
6. 将 `Status` 设为 `Published`。

### 场景 2：让某个标签显示在 `/vlog` 底部 tag cloud
1. 进入 `Vlog Listing Page`
2. 在 `Tag Filters` 中加入该标签
3. 调整顺序

### 场景 3：让某个案例能被前台筛选到
1. 进入对应 `Case Study`
2. 填写或补充 `Shared Tags`
3. 保存后，前端 `/cases` 即可按该标签筛选

## 注意事项

- `/vlog/[slug]` 详情页已经停用，请不要再以“文章详情页”的思路维护 vlog 内容。
- `Shared Tags` 是全局共享标签，请避免随意重命名高频使用的标签。
- 如果要统一修改前端标签名称，请优先修改 `Shared Tags`，不要分别去改视频或案例标题。
- `industry` 仍可保留填写，但它已经不是 `/cases` 前台筛选字段。
- `Legacy Blog Posts` 不等于 `Vlog Videos`，请不要混用。

## 建议运营流程

- 先建 `Shared Tags`
- 再建 `Vlog Videos`
- 最后配置 `Vlog Listing Page` / `Case Studies Listing Page` 中的 `Tag Filters`

这样可以保证前端筛选与标签文案保持一致。
