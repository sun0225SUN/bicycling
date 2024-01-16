<script setup>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { onMounted } from 'vue'
import { gpx } from '@tmcw/togeojson'
import config from '@/config'
import 'mapbox-gl/dist/mapbox-gl.css'

// 生成随机色
const getRandomColor = () => `rgb(${Array(3).fill(0).map(() => Math.floor(Math.random() * 256)).join(',')})`

// GPX to GeoJSON
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
  mapboxgl.accessToken = config.accessToken

  const mapConfig = {
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [113.457495, 22.589236],
    zoom: 1,
    maxZoom: 14,
    pitch: 50,
    bearing: -60,
  }

  const map = new mapboxgl.Map(mapConfig)

  // 星星背景
  map.on('style.load', () => {
    map.setFog({
      'color': '#000000',
      'high-color': '#282727',
      'horizon-blend': 0.02,
      'space-color': '#000000',
      'star-intensity': 0.6,
    })
  })

  // 中文标注
  if (config.isChinese)
    map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))

  // 全屏
  map.addControl(new mapboxgl.FullscreenControl())

  // 比例尺
  map.addControl(new mapboxgl.ScaleControl())

  // 缩放
  map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }))

  // 定位
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  }))

  // 飞入
  map.flyTo({
    center: [113.457495, 22.589236],
    zoom: 9,
    bearing: 0,
    speed: 1,
    curve: 1,
    easing: t => t,
    essential: true,
  })

  // 地图加载完成后依次添加数据图层
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
          paint: {
            'line-color': getRandomColor(),
            'line-width': 2,
            'line-opacity': 0.8,
            'line-dasharray': [0, 3, 6],
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
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
  <div id="mapbox" class="h-[75vh] w-[100vw] lg:w-[80vw]" />
</template>

<style lang="scss" scoped></style>
