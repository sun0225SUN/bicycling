// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetMini, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    // mini
    presetMini(),
    // 默认预设
    presetUno(),
    // 图标
    presetIcons(),
    // 属性化
    presetAttributify(),
    // 排版
    presetTypography(),
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-b-c', 'flex justify-between items-center'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
    ['icon-btn', 'text-5 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none'],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }],
  ],
  theme: {
    colors: {
    },
  },
})
