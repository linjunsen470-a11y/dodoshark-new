下面是一份可以直接丢给 IDE AI Agent 的完整说明。
我先复述问题，再给分析，再给重构方案和实施顺序。

---

# DoDoShark 项目 GROQ 查询重构方案

## 1. 需求复述

请评估 `linjunsen470-a11y/dodoshark-new` 项目中，前端对 Sanity 的 GROQ 查询是否存在以下问题：

1. 查询次数是否偏高，是否容易随着页面增多而持续膨胀。
2. 查询结构是否重复，是否适合抽象成可复用的 GROQ 片段或查询构建模块。
3. 当前页面是否存在“同一次请求里查了多次相近数据”的情况。
4. 如何在不破坏现有页面功能的前提下，减少潜在 API 调用次数，提高可维护性。
5. 请整理成一份可执行的 GROQ 重构方案，便于后续直接交给 IDE AI Agent 做开发改写。

---

## 2. 当前结论

结论很明确：

### 2.1 当前项目的 GROQ 查询次数偏高

不是“已经严重失控”，但已经形成了**结构性浪费**。
如果继续沿用当前写法扩展页面，Sanity API 调用次数会持续上升。

核心原因有三类：

1. **详情页普遍采用 `generateMetadata()` 查一次、页面主体再查一次**。
2. **列表页经常拆成 landing / list / categories 多次查询**，再叠加 metadata，又多一次。
3. **GROQ projection 大量重复**，特别是 SEO、图片、分类、引用对象、page builder block 结构。

---

## 3. 现状分析

## 3.1 首页存在“双重重查询”

首页 `app/page.tsx` 里：

* `generateMetadata()` 调一次 `getHomePageData()`
* 页面主体再调一次 `getHomePageData(true)`

而 `homeQuery` 本身非常重，包含首页 hero、stats、about、confidence、featured products、featured solutions、featured cases、featured videos 等整包数据。也就是说，**仅仅为了生成 metadata，又把整页内容查了一遍**。

这是当前最典型的高成本模式之一。

---

## 3.2 产品详情页是标准“双查模式”

`app/products/[slug]/page.tsx` 中：

* `generateMetadata()` 使用 `getProductMetadata(slug)`
* 页面主体使用 `getProduct(slug)`

虽然 metadata 查询比完整内容查询轻一些，但两者仍然重复查了很多相近字段，比如 `seo`、`title`、`slug`、`mainImage`。同时完整页里的 `contentBlocks[]` projection 很长，且可复用性差。

---

## 3.3 解决方案详情页也是同样问题

`app/solutions/[slug]/page.tsx` 也是：

* `getSolutionMetadata(slug)`
* `getSolution(slug)`

模式与产品详情页几乎一致。

---

## 3.4 案例详情页浪费更明显

`app/cases/[slug]/page.tsx` 的问题更重：

* `generateMetadata()` 调用 `getCaseBySlug(slug, false)`
* 页面主体再次调用 `getCaseBySlug(slug)`

而 `caseBySlugQuery` 不是 metadata 专用轻查询，它把 `body[]`、`usedEquipment[]`、`metrics[]`、`tags[]` 等正文级字段也全部查出来了。
这意味着：**metadata 阶段把正文和关联设备也拉了一遍**，然后正文阶段又再拉一次。

这是当前最该优先整改的页面之一。

---

## 3.5 产品列表页和解决方案列表页单次访问查询数偏多

`app/products/page.tsx` 当前大致是：

1. `generateMetadata()` 查 `productLandingQuery`
2. 页面主体再查一次 `productLandingQuery`
3. 再查一次 `productListQuery`
4. 再查一次 `allCategoriesQuery`

也就是说，**一次请求最多 4 次 GROQ**。

`app/solutions/page.tsx` 也是同样结构：

1. metadata 查 `solutionsLandingQuery`
2. 页面主体再查一次 `solutionsLandingQuery`
3. 查 `solutionsListQuery`
4. 查 `allCategoriesQuery` 

---

## 3.6 当前 fetch 封装过薄，未体现显式缓存策略

`lib/sanity.live.ts` 中的 `fetchSanityData()` 只是对 `sanityFetch()` 的简单包装，没有看到显式的 `cache()`、`unstable_cache()`、统一 query key、按 slug 级别缓存等策略。

因此不能假设这些重复查询一定会被自动去重。
从工程角度，应当**按“默认不会自动帮你省掉这些请求”来设计**。

---

## 4. 当前问题的本质

这个项目的根本问题不是“GROQ 写错了”，而是：

### 4.1 查询和页面耦合太紧

很多页面把 query 直接写在页面文件里。
结果是：

* 查询复用困难
* projection 片段无法共享
* metadata / page / list / detail 很容易各写一套

### 4.2 projection 重复严重

重复最多的结构包括：

* `seo`
* `image { ..., asset }`
* `slug { current }`
* `category -> { _id, title, slug { current } }`
* 各类 product/reference projection
* `contentBlocks[]` 的 page builder projection

### 4.3 没有形成“按页面意图拆查询”的习惯

理想上应该区分：

* metadata query
* detail query
* list query
* landing query
* shared query

而现在很多页面是“能查到就行”，没有按用途精简。

---

# 5. 重构目标

本次 GROQ 重构的目标如下：

1. **减少页面级重复请求**
2. **减少 metadata 和主体页面之间的重复数据获取**
3. **抽象可复用 projection 片段**
4. **统一 query 文件组织方式**
5. **为后续缓存、ISR、revalidation 做好结构准备**
6. **保证功能不变、SEO 不退化、Sanity Presentation 能继续工作**

---

# 6. 总体重构策略

## 6.1 建立统一的 query 模块目录

建议新增：

```ts id="j1v3yg"
front/dodoshark/lib/sanity/queries/
  fragments/
    seo.ts
    image.ts
    slug.ts
    category.ts
    references.ts
    pageBuilder.ts
  home.ts
  products.ts
  solutions.ts
  cases.ts
```

原则：

* 页面文件里尽量不再内嵌大段 GROQ 字符串
* 页面只调用 `getXxxData()` 方法
* GROQ 片段统一在 `fragments` 中定义并复用

---

## 6.2 建立统一的数据访问层

建议新增：

```ts id="jar2ij"
front/dodoshark/lib/sanity/data/
  home.ts
  products.ts
  solutions.ts
  cases.ts
```

每个模块对外暴露：

* `getHomePageData()`
* `getHomeMetadataData()`
* `getProductBySlug()`
* `getProductMetadataBySlug()`
* `getProductsLandingPageData()`
* `getSolutionBySlug()`
* `getCaseBySlug()`
* 等等

进一步建议把“页面使用的数据函数”做成缓存包装。

---

## 6.3 用 GROQ fragment 复用 projection

GROQ 本身没有 JS 级 fragment 机制，但可以通过字符串组合实现。

例如：

```ts id="fxdjlwm"
export const seoProjection = `
seo {
  title,
  description,
  keywords,
  canonicalUrl,
  noIndex,
  ogImage {
    ...,
    asset
  }
}
`
```

然后在 query 中拼接使用。

---

## 6.4 能合并的 query 尽量合并为一个对象查询

对于列表页这类“同一请求中必须同时拿 landing + items + categories”的页面，不建议拆成 3 个 `fetchSanityData()`。
直接合并成一个 GROQ object 返回。

例如：

```ts id="fijd0v"
{
  "landing": ...,
  "items": ...,
  "categories": ...
}
```

这样单次页面请求可以从 3 次降到 1 次。

---

## 6.5 metadata 与页面主体优先共用缓存数据源

详情页不要再继续“metadata 一套 query，page 一套 query，然后彼此毫无关联”。

更合理的做法是：

* 详情页保留 metadata query 和 detail query 两种意图
* 但对绝大多数 slug 页面，使用统一的 cached getter
* `generateMetadata()` 和页面主体优先共用同一缓存入口

---

# 7. 建议抽出的 GROQ 片段

## 7.1 `seoProjection`

```ts id="y87lsp"
export const seoProjection = `
seo {
  title,
  description,
  keywords,
  canonicalUrl,
  noIndex,
  ogImage {
    ...,
    asset
  }
}
`
```

适用页面：

* 首页
* 产品详情
* 方案详情
* 案例详情
* 产品列表 landing
* 方案列表 landing

---

## 7.2 `imageProjectionLite`

```ts id="725jp2"
export const imageProjectionLite = `
{
  alt,
  asset
}
`
```

适用于卡片、hero、小图、cover。

---

## 7.3 `imageProjectionFull`

```ts id="vsn630"
export const imageProjectionFull = `
{
  ...,
  asset
}
`
```

适用于详情页、Portable Text image、page builder。

---

## 7.4 `slugProjection`

```ts id="m2tfc2"
export const slugProjection = `
slug {
  current
}
`
```

---

## 7.5 `categoryProjection`

```ts id="fxmzzv"
export const categoryProjection = `
{
  _id,
  title,
  slug { current }
}
`
```

---

## 7.6 `productCardProjection`

```ts id="poww4z"
export const productCardProjection = `
{
  _id,
  title,
  slug { current },
  shortDescription,
  seriesTag,
  mainImage {
    alt,
    asset
  },
  category->{
    _id,
    title,
    slug { current }
  }
}
`
```

---

## 7.7 `solutionCardProjection`

```ts id="2v0n5h"
export const solutionCardProjection = `
{
  _id,
  title,
  slug { current },
  summary,
  heroImage {
    alt,
    asset
  },
  category->{
    _id,
    title,
    slug { current }
  }
}
`
```

---

## 7.8 `caseCardProjection`

```ts id="roylwb"
export const caseCardProjection = `
{
  _id,
  title,
  slug { current },
  excerpt,
  coverImage {
    alt,
    asset
  },
  clientLogo {
    alt,
    asset
  }
}
`
```

---

## 7.9 `pageBuilderBlockProjection`

这是最关键的一块。
产品详情页和解决方案详情页的 `contentBlocks[]` 高度相似，应抽成一个统一 projection。当前两页都在重复展开大量 block 内字段。

建议拆分：

* `portableImageProjection`
* `referencedProductProjection`
* `referencedGenericProjection`
* `pageBuilderBlockProjection`

这样后续 page builder schema 增字段时，只改一处。

---

# 8. 分页面重构方案

## 8.1 首页重构方案

### 当前问题

首页 `generateMetadata()` 和页面主体都调用重型 `homeQuery`。

### 目标

两种可选方案，选其一：

#### 方案 A：拆 metadata 轻查询

新增：

* `homeMetadataQuery`
* `homePageQuery`

其中 `homeMetadataQuery` 只查：

* `seo`
* 少量 fallback 所需字段

#### 方案 B：保留一个 query，但做共享缓存

新增：

* `getHomePageDataCached()`

让 `generateMetadata()` 和页面主体都调用同一个缓存函数。

### 推荐

首页访问量高，推荐优先做 **方案 A**。
因为首页主 query 太重，不值得让 metadata 用它。

---

## 8.2 产品详情页重构方案

### 当前问题

产品详情页 metadata 与主体是两套 query。

### 建议

保留：

* `productMetadataQuery`
* `productDetailQuery`

但将它们移出页面文件，进入：

* `lib/sanity/queries/products.ts`

再在：

* `lib/sanity/data/products.ts`

中统一暴露：

```ts id="n4f0zr"
getProductMetadataBySlug(slug)
getProductDetailBySlug(slug)
```

如果后续确认 metadata 与页面主体在同一次请求中可被缓存复用，则进一步加：

```ts id="o7s0si"
getProductDetailBySlugCached(slug)
```

并从 detail 数据中生成 metadata。

### 同时必须做

把 `contentBlocks[]` projection 抽成共享片段，避免与 solutions 详情页重复。

---

## 8.3 解决方案详情页重构方案

### 当前问题

与产品详情页相同。

### 建议

与产品页保持一致的架构：

* `solutionMetadataQuery`
* `solutionDetailQuery`
* `getSolutionMetadataBySlug(slug)`
* `getSolutionDetailBySlug(slug)`

同时把：

* `relatedProducts`
* `relatedVlogs`
* `htmlTemplate`
* `contentBlocks`

按用途组织进 detail projection，减少散落的手写字段。

---

## 8.4 案例详情页重构方案

### 当前问题

metadata 阶段用了完整详情查询，这是最浪费的页面之一。

### 必做项

拆成两条：

#### `caseMetadataQuery`

只查：

* `_id`
* `title`
* `slug`
* `excerpt`
* `seo`
* `coverImage`

#### `caseDetailQuery`

查完整正文：

* `body`
* `tags`
* `metrics`
* `usedEquipment`
* `clientLogo`
* 其余详情页内容

### 预期收益

这个页面改完以后，metadata 的 Sanity payload 会显著下降。

---

## 8.5 产品列表页重构方案

### 当前问题

一次页面访问最多 4 次查询。

### 建议

把页面主体的三条 query 合成一条：

```ts id="an0qtk"
const productsPageQuery = `{
  "landing": coalesce(
    *[_id == "productPage"][0],
    *[_type == "productPage"][0]
  ){
    ...
  },
  "items": *[
    _type == "product" &&
    defined(slug.current) &&
    ($category == "" || category->slug.current == $category)
  ] | order(_createdAt desc){
    ...
  },
  "fallbackCategories": *[_type == "category"] | order(title asc){
    ...
  }
}`
```

### metadata 优化

metadata 可以：

* 单独用 `productLandingMetadataQuery`
* 或与 landing query 共享缓存

### 目标

把：

* 页面主体 3 次
  降成
* 页面主体 1 次

整个页面从最多 4 次降到 1~2 次。

---

## 8.6 解决方案列表页重构方案

与产品列表页同理。当前也是 4 次模式。

建议合并为：

```ts id="ltw41j"
const solutionsPageQuery = `{
  "landing": ...,
  "items": ...,
  "fallbackCategories": ...
}`
```

---

# 9. 数据访问层重构建议

建议把页面文件里直接调用 `fetchSanityData()` 的模式收敛掉。

例如：

```ts id="2401r3"
lib/sanity/data/products.ts
```

```ts id="1ji8fd"
import { cache } from 'react'
import { fetchSanityData } from '@/lib/sanity.live'
import {
  productMetadataQuery,
  productDetailQuery,
  productsPageQuery,
} from '@/lib/sanity/queries/products'

export const getProductMetadataBySlug = cache(async (slug: string) => {
  return fetchSanityData({
    query: productMetadataQuery,
    params: { slug },
    stega: false,
  })
})

export const getProductDetailBySlug = cache(async (slug: string, stega?: boolean) => {
  return fetchSanityData({
    query: productDetailQuery,
    params: { slug },
    stega,
  })
})

export const getProductsPageData = cache(async (category: string) => {
  return fetchSanityData({
    query: productsPageQuery,
    params: { category },
    stega: false,
  })
})
```

重点：

* 页面只关心“拿什么数据”
* query 和 projection 细节不再散落在页面里
* 为缓存和复用留好统一入口

---

# 10. 建议的缓存策略

## 10.1 请求内去重

优先用 `cache()` 包一层数据函数。
这样同一次服务端渲染流程内，metadata 和 page 对同一 slug 的请求更容易共享结果。

---

## 10.2 稳定内容做 ISR / revalidate

对于这些页面，建议逐步加缓存策略：

* `/products/[slug]`
* `/solutions/[slug]`
* `/cases/[slug]`
* `/products`
* `/solutions`

如果数据不是秒级变更，适合做：

* `revalidate`
* `unstable_cache`
* `revalidateTag`

---

## 10.3 不要一开始就过度依赖隐式缓存

当前 `fetchSanityData()` 封装很薄，工程上不应依赖“也许 next-sanity / Next.js 会自动帮我省掉请求”。
建议显式控制缓存层。

---

# 11. 优先级排序

## P0：立即改

1. 首页：避免 metadata 重跑整份重 query。
2. 案例详情页：拆 metadataQuery 和 detailQuery。
3. 产品列表页：合并 landing/list/categories 为 1 个页面 query。
4. 解决方案列表页：同上。

## P1：第二阶段改

5. 产品详情页：抽 page builder projection。
6. 解决方案详情页：抽 page builder projection。
7. 所有 SEO / image / category projection 统一抽片段。

## P2：第三阶段改

8. 引入统一 `lib/sanity/data/*`
9. 增加 `cache()` / `unstable_cache()`
10. 逐步加 revalidation 机制

---

# 12. 预期收益

重构完成后，预期收益如下：

### 首页

* 从 2 次重查询
  降为
* 1 次轻 metadata + 1 次页面主查询
  或
* 1 次共享缓存查询

### 案例详情页

* metadata 阶段不再拉正文和关联设备
* payload 显著缩小

### 产品列表页 / 方案列表页

* 页面主体从 3 次降到 1 次
* 全页面从最多 4 次降到 1~2 次

### 产品详情页 / 方案详情页

* query 结构更清晰
* projection 统一维护
* 后续 block schema 变更时只需改一处

### 长期收益

* 页面越多，复用收益越明显
* query 变更成本下降
* 代码更适合让 IDE Agent 批量改写

---

# 13. 建议的文件结构

```ts id="7529ux"
front/dodoshark/lib/sanity/
  queries/
    fragments/
      seo.ts
      image.ts
      slug.ts
      category.ts
      references.ts
      pageBuilder.ts
    home.ts
    products.ts
    solutions.ts
    cases.ts
  data/
    home.ts
    products.ts
    solutions.ts
    cases.ts
```

---

# 14. 建议的实施步骤

## Step 1

先新建 `fragments/seo.ts`、`fragments/image.ts`、`fragments/category.ts`

## Step 2

重构 `cases/[slug]`

* 拆 metadataQuery / detailQuery
* 页面改用 data layer

## Step 3

重构首页

* metadata query 轻量化
* 或共享缓存

## Step 4

重构 `products/page.tsx`、`solutions/page.tsx`

* 合并页面主体多 query 为单 query object

## Step 5

抽 `pageBuilderBlockProjection`

* 复用到 `products/[slug]`
* 复用到 `solutions/[slug]`

## Step 6

统一缓存策略

* 给 data layer 加 `cache()`
* 视情况再加 `unstable_cache()` / `revalidateTag`

---

# 15. 交给 IDE AI Agent 的执行指令

下面这段可以直接给 IDE AI Agent：

```text id="ao9ebq"
请对 front/dodoshark 项目执行一次 Sanity GROQ 重构，目标是减少重复查询、统一 projection、降低 metadata 与页面主体之间的重复 API 调用。

要求如下：

1. 新建目录：
   - lib/sanity/queries/fragments
   - lib/sanity/data

2. 抽出可复用 GROQ 片段：
   - seoProjection
   - imageProjectionLite
   - imageProjectionFull
   - categoryProjection
   - productCardProjection
   - solutionCardProjection
   - caseCardProjection
   - pageBuilderBlockProjection

3. 重构以下页面：
   - app/page.tsx
   - app/products/page.tsx
   - app/solutions/page.tsx
   - app/products/[slug]/page.tsx
   - app/solutions/[slug]/page.tsx
   - app/cases/[slug]/page.tsx

4. 重构规则：
   - 页面文件中不再保留大段 GROQ 字符串，统一移动到 lib/sanity/queries/*
   - 页面不要直接散落调用 fetchSanityData，优先通过 lib/sanity/data/* 暴露的数据函数调用
   - 对 products/page.tsx 和 solutions/page.tsx，将 landing + items + fallbackCategories 合并为单个 GROQ object query
   - 对 cases/[slug]/page.tsx，拆分 metadataQuery 和 detailQuery，metadata query 不允许再拉 body、usedEquipment、metrics 等详情字段
   - 对首页 app/page.tsx，避免 generateMetadata 与页面主体重复执行同一个重型 homeQuery
   - 对 products/[slug] 和 solutions/[slug]，抽离并共享 pageBuilderBlockProjection
   - 优先使用 React cache() 包装数据获取函数，减少同请求内重复查询

5. 保持以下行为不变：
   - 页面视觉输出不变
   - metadata 输出逻辑不变
   - Sanity Presentation / stega 相关能力不被破坏
   - slug、category 过滤、LandingCardPager、relatedProducts、relatedVlogs 等功能不变

6. 输出内容：
   - 完整改写后的文件
   - 新增文件
   - 每个页面重构前后查询次数变化说明
   - 如发现 query 结构无法完全共用，请保留行为正确性优先，并在注释中说明原因
```

---

# 16. 最终结论

一句话总结：

**这个项目当前的 GROQ 查询已经出现了明显的重复与膨胀趋势，尤其集中在首页、案例详情页、产品列表页、解决方案列表页。最佳重构方向不是单纯“删 query”，而是建立统一的 query fragments + data access layer + 缓存入口，把多次相近请求合并成少量明确的数据读取路径。**

