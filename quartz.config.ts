import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "AYAME",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ayame2847.github.io/life",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Playfair Display", 
        // 正文使用经典的 EB Garamond，体现手稿感
        body: "EB Garamond",        
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4ecd8",         // 核心：羊皮纸底色，匹配星系
          lightgray: "#dcd0b9",    // 边框色，稍微加深以体现纸张叠层感
          gray: "#a69d8a",         // 次要文字颜色
          darkgray: "#433422",     // 正文颜色，改用深棕色替代纯黑，更柔和
          dark: "#2b2b2b",         
          secondary: "#b85c38",    // 链接颜色：铁锈红/古墨色，更有学术感
          tertiary: "#5a7d7c",     // 强调色：古雅的灰绿色
          highlight: "rgba(184, 92, 56, 0.1)", // 选中文本的背景色
          textHighlight: "#fff23688",
        },
        darkMode: {
          // 星空色（更高亮、分层更明显）
          light: "#0b1020", // 主背景：深靛蓝夜空
          lightgray: "#141b33", // 分层底色：更亮一档的夜空层
          gray: "#6b7aa6", // 次要文字/图标：偏冷的星雾蓝灰
          darkgray: "#c8d2ff", // 正文：高对比、偏冷的月光白
          dark: "#f3f6ff", // 标题/核心文字：更亮的星光白
          secondary: "#7aa2ff", // 强调/链接：电光蓝
          tertiary: "#c38cff", // 次强调：星云紫
          highlight: "rgba(122, 162, 255, 0.16)", // 选中文本底色：蓝光晕
          textHighlight: "#b4a7ff88", // mark 高亮：淡紫荧光
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
