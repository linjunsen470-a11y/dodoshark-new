import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('doDoSharkCms')
    .title('DoDoShark CMS')
    .items([
      // 内容管理 - 单页面
      S.listItem()
        .id('contentManagement')
        .title('内容管理')
        .icon(() => '📄')
        .child(
          S.list()
            .id('contentManagementList')
            .title('内容管理')
            .items([
              S.documentTypeListItem('homePage').title('首页'),
              S.documentTypeListItem('aboutPage').title('关于我们'),
              S.documentTypeListItem('contactPage').title('联系我们'),
              S.documentTypeListItem('blogPage').title('博客聚合页'),
              S.documentTypeListItem('solutionsPage').title('解决方案聚合页'),
              S.documentTypeListItem('casesPage').title('客户案例聚合页'),
              S.documentTypeListItem('productPage').title('产品聚合页'),
            ])
        ),

      // 动态内容 - 可重复文档
      S.listItem()
        .id('dynamicContent')
        .title('动态内容')
        .icon(() => '📝')
        .child(
          S.list()
            .id('dynamicContentList')
            .title('动态内容')
            .items([
              S.documentTypeListItem('post').title('博客文章'),
              S.documentTypeListItem('solution').title('解决方案'),
              S.documentTypeListItem('caseStudy').title('客户案例'),
              S.documentTypeListItem('product').title('产品'),
            ])
        ),

      // 数据库 - 参考资料
      S.listItem()
        .id('database')
        .title('数据库')
        .icon(() => '🗄️')
        .child(
          S.list()
            .id('databaseList')
            .title('数据库')
            .items([
              S.documentTypeListItem('category').title('分类标签'),
              S.documentTypeListItem('productVariant').title('产品型号'),
              S.documentTypeListItem('accessory').title('配件'),
              S.documentTypeListItem('author').title('人员'),
              S.documentTypeListItem('globalSettings').title('全局设置'),
            ])
        ),
    ])
