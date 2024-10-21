import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'node-napcat-ts',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ]
  },

  sitemap: {
    hostname: 'https://node-napcat-ts.huankong.top',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'https://img.huankong.top/i/2022/11/29/6385ef8c7a675.ico'
      }
    ],
    ['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://img.huankong.top/i/2022/11/29/6385ef8c7a675.ico'}],
    ['link', {rel: 'apple-touch-icon', sizes: '180x180', href: 'https://img.huankong.top/i/2022/11/29/6385ef8c7a675.ico'}],
    ['link', {rel: 'mask-icon', href: 'https://img.huankong.top/i/2022/11/29/6385ef8c7a675.ico', color: '#5bbad5'}],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
  ],

  themeConfig: {
    logo: { src: 'https://img.huankong.top/i/2022/11/29/6385ef8c7a675.ico', width: 24, height: 24 },
    //开启本地搜索
    search: {
      provider: 'local'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/huankong233/node-napcat-ts' }]
  }
})
