# 新字段总结

拟打算在 Sanity CMS 中加入以下字段。

## Vlog Items

用于管理视频集合中的单条视频内容。

### 必要字段

#### `title`
- **类型**：`string`
- **用途**：视频标题，用于列表展示。

#### `youtubeUrl`
- **类型**：`url`
- **用途**：YouTube 视频链接，前端可解析 video id 用于嵌入或跳转。

#### `coverImage`
- **类型**：`image`
- **用途**：视频封面图。
- **建议附带**：`alt`

#### `excerpt`
- **类型**：`text`
- **用途**：视频简介，用于卡片描述。

#### `product`
- **类型**：`reference` → `product`
- **用途**：关联一个主产品。

#### `publishedAt`
- **类型**：`datetime`
- **用途**：发布时间，用于排序和后台管理。

#### `category`
- **类型**：`string`
- **用途**：内容分类。
- **说明**：当前不参与前端渲染，但建议保留用于数据组织和未来扩展。

#### `tags`
- **类型**：`array<string>`
- **用途**：更灵活的内容标签，可用于后续筛选或搜索。

#### `featured`
- **类型**：`boolean`
- **用途**：是否推荐/置顶。

#### `status`
- **类型**：`string`
- **用途**：内容状态控制。
- **建议值**：
  - `draft`
  - `published`
  - `archived`