export interface MenuItem {
  displayName?: string;  // 菜单名称
  disabled?: boolean;
  external?: boolean;
  twoLines?: boolean;
  chip?: boolean;
  iconName?: string;    // 图标名称
  navCap?: string;
  chipContent?: string;
  chipClass?: string;
  subtext?: string;
  route?: string;   // 路由
  children?: MenuItem[];    // 子菜单
  ddType?: string;
  isAdminOnly?: boolean;    // 是否管理员权限
  expanded?: boolean;
}

export const MenuList: MenuItem[] = [
  {
    displayName: '首页',
    iconName: 'home',
    route: '/main/dashboard',
    expanded: false
  },
  {
    displayName: '媒体服务',
    iconName: 'server',
    route: '/main/media-server',
    children: [
      {
        displayName: '我的媒体库',
        iconName: 'server-2',
        route: '/main/media-server/media-library'
      },
      {
        displayName: '媒体库分类',
        iconName: 'stereo-glasses',
        isAdminOnly: true,
        route: '/main/media-server/library-category'
      },
      {
        displayName: '媒体服务器',
        iconName: 'server-cog',
        isAdminOnly: true,
        route: '/main/media-server/media-server-setting'
      }
    ],
    expanded: false
  },
  {
    displayName: '精彩发现',
    iconName: 'align-box-bottom-center',
    route: '/main/discovery',
    children: [
      {
        displayName: '榜单推荐',
        iconName: 'align-box-bottom-center',
        route: '/main/discovery/ranking'
      },
      {
        displayName: '豆瓣电影',
        iconName: 'movie',
        route: '/main/discovery/douban_movie'
      },
      {
        displayName: '豆瓣电视剧',
        iconName: 'device-tv',
        route: '/main/discovery/douban_tv'
      },
      {
        displayName: 'TMDB电影',
        iconName: 'movie',
        route: '/main/discovery/tmdb_movie'
      },
      {
        displayName: 'TMDB电视剧',
        iconName: 'device-tv',
        route: '/main/discovery/tmdb_tv'
      },
      {
        displayName: 'BANGGUMI',
        iconName: 'device-tv-old',
        route: '/main/discovery/banggumi'
      },
      {
        displayName: 'B站综艺',
        iconName: 'brand-apple-podcast',
        route: '/main/discovery/bilibili_variety'
      },
      {
        displayName: 'B站国创',
        iconName: 'device-tv-old',
        route: '/main/discovery/bilibili_guoman'
      },
      {
        displayName: 'B站纪录片',
        iconName: 'world',
        route: '/main/discovery/bilibili_documentary'
      }
    ],
    expanded: false
  },
  {
    displayName: '豆瓣 DIY',
    iconName: 'brand-douban',
    route: '/main/douban',
    children: [
      {
        displayName: '我的豆瓣列表',
        iconName: 'brand-douban',
        route: '/main/douban/list'
      },
      {
        displayName: '豆列片单维护',
        iconName: 'server-cog',
        isAdminOnly: true,
        route: '/main/douban/manage'
      },
      {
        displayName: '搜索引擎设置',
        iconName: 'settings-search',
        isAdminOnly: true,
        route: '/main/douban/engine'
      }
    ],
    expanded: false
  },
  {
    displayName: '搜索结果',
    iconName: 'search',
    route: '/main/search',
    expanded: false
  },
  {
    displayName: '站点管理',
    iconName: 'sitemap',
    isAdminOnly: true,
    route: '/main/site',
    children: [
      {
        displayName: '站点维护',
        iconName: 'server-2',
        route: '/main/site/manage'
      },
      {
        displayName: '数据统计',
        iconName: 'chart-pie',
        route: '/main/site/statistics'
      },
      {
        displayName: '刷流任务',
        iconName: 'checklist',
        route: '/main/site/brush-task'
      },
      {
        displayName: '站点资源',
        iconName: 'cloud-computing',
        route: '/main/site/source'
      }
    ],
    expanded: false
  },
  {
    displayName: '订阅管理',
    iconName: 'cast',
    route: '/main/rss',
    children: [
      {
        displayName: '电影订阅',
        iconName: 'movie',
        route: '/main/rss/movie'
      },
      {
        displayName: '电视剧订阅',
        iconName: 'device-tv',
        route: '/main/rss/tv'
      },
      {
        displayName: '自定义订阅',
        iconName: 'file-rss',
        route: '/main/rss/custom'
      },
      {
        displayName: '订阅日历',
        iconName: 'calendar',
        route: '/main/rss/calendar'
      }
    ],
    expanded: false
  },
  {
    displayName: '下载管理',
    iconName: 'download',
    route: '/main/download',
    children: [
      {
        displayName: '正在下载',
        iconName: 'loader',
        route: '/main/download/downloading'
      },
      {
        displayName: '近期下载',
        iconName: 'download',
        route: '/main/download/downloaded'
      },
      {
        displayName: '自动删种',
        iconName: 'download-off',
        route: '/main/download/torrent-auto-remove'
      },
      {
        displayName: '下载器设置',
        isAdminOnly: true,
        iconName: 'settings-down',
        route: '/main/download/downloader-setting'
      }
    ],
    expanded: false
  },
  {
    displayName: '媒体整理',
    iconName: 'sort-ascending',
    isAdminOnly: true,
    route: '/main/media-tidy',
    children: [
      {
        displayName: '文件管理',
        iconName: 'file-pencil',
        route: '/main/media-tidy/mediafile'
      },
      {
        displayName: '手动识别',
        iconName: 'accessible',
        route: '/main/media-tidy/unidentification'
      },
      {
        displayName: '历史记录',
        iconName: 'history',
        route: '/main/media-tidy/history'
      },
      {
        displayName: '目录同步',
        iconName: 'refresh',
        route: '/main/media-tidy/directory-sync'
      },
      {
        displayName: 'TMDB缓存',
        iconName: 'brand-headlessui',
        route: '/main/media-tidy/tmdb-cache'
      }
    ],
    expanded: false
  },
  {
    displayName: '小工具',
    isAdminOnly: true,
    iconName: 'brand-codesandbox',
    route: '/main/tools',
    expanded: false
  },
  {
    displayName: '系统设置',
    isAdminOnly: true,
    iconName: 'settings',
    route: '/main/setting',
    children: [
      {
        displayName: '基础设置',
        iconName: 'settings',
        route: '/main/setting/base'
      },
      {
        displayName: '用户管理',
        iconName: 'users',
        route: '/main/setting/user'
      },
      {
        displayName: '索引器',
        iconName: 'list-search',
        route: '/main/setting/indexer'
      },
      {
        displayName: '消息通知',
        iconName: 'bell',
        route: '/main/setting/notify'
      },
      {
        displayName: '过滤规则',
        iconName: 'filter',
        route: '/main/setting/filter-rules'
      },
      {
        displayName: '自定义识别词',
        iconName: 'a-b',
        route: '/main/setting/custom-recog-words'
      }
    ],
    expanded: false
  }
];

export default MenuList;


