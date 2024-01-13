<script setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { onMounted } from 'vue'
import { gpx } from '@tmcw/togeojson'
import config from '@/config'

// 生成随机颜色
function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

// 加载并解析 GPX 文件
async function loadGpxFile(file) {
  const response = await fetch(file)
  const xml = await response.text()
  return gpx(new DOMParser().parseFromString(xml, 'text/xml'))
}

// 初始化地图
async function initMap() {
  mapboxgl.accessToken = config.mapboxAccessToken
  const map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [113.264499, 23.130061],
    zoom: 8,
  })

  if (config.isChinese) {
    map.addControl(
      new MapboxLanguage({ defaultLanguage: 'zh-Hans' }),
    )
  }

  map.on('load', async () => {
    const files = import.meta.glob('@/data/gpx/*.gpx')
    for (const file in files) {
      const data = await loadGpxFile(file)
      const fileName = file.match(/\/(\w+)\.gpx$/)[1]
      map.addSource(fileName, {
        type: 'geojson',
        data,
      })
      map.addLayer({
        id: fileName,
        type: 'line',
        source: fileName,
        paint: {
          'line-color': getRandomColor(),
          'line-width': 2,
        },
      })
    }
  })
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="mapbox" absolute h-full w-full />
</template>

<style lang="scss" scoped>
</style>
