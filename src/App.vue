<script setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { onMounted } from 'vue'
import { gpx } from '@tmcw/togeojson'
import config from '@/config'

// 生成随机颜色
const getRandomColor = () => `rgb(${Array(3).fill(0).map(() => Math.floor(Math.random() * 256)).join(',')})`

// 加载并解析 GPX 文件
async function loadGpxFile(file) {
  try {
    const response = await fetch(file)
    const xml = await response.text()
    return gpx(new DOMParser().parseFromString(xml, 'text/xml'))
  }
  catch (error) {
    console.error(`Failed to load file ${file}: ${error}`)
  }
}

// 初始化地图
async function initMap() {
  mapboxgl.accessToken = config.mapboxAccessToken

  const mapConfig = {
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [113.448177, 22.761818],
    zoom: 0,
  }

  const map = new mapboxgl.Map(mapConfig)

  if (config.isChinese)
    map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))

  map.flyTo({
    center: [113.448177, 22.761818],
    zoom: 9,
    bearing: 0,
    speed: 1,
    curve: 1,
    easing: t => t,
    essential: true,
  })

  map.on('load', async () => {
    const files = import.meta.glob('/data/gpx/*.gpx')
    for (const file in files) {
      try {
        const data = await loadGpxFile(file)
        const fileName = file.match(/\/(\w+)\.gpx$/)[1]
        map.addSource(fileName, { type: 'geojson', data })
        map.addLayer({
          id: fileName,
          type: 'line',
          source: fileName,
          paint: { 'line-color': getRandomColor(), 'line-width': 2 },
        })
      }
      catch (error) {
        console.error(`Failed to load or parse file ${file}: ${error}`)
      }
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

<style lang="scss" scoped></style>
