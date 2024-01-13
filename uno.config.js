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
})
