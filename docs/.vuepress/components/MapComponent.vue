<template>
  <div class="map-wrapper">
    <div class="map-frame">
      <div id="leaflet-map"></div>
    </div>
    <p class="map-caption">📍 My Australian Journey (2017 - Present)</p>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'MapComponent',
  setup() {
    onMounted(async () => {
      // Dynamic import for SSR compatibility
      if (typeof window !== 'undefined') {
        const L = (await import('leaflet')).default;
        
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Center on Australia
        const map = L.map('leaflet-map').setView([-35.0, 138.0], 5);

        // Use CartoDB Voyager for a cleaner, "cuter" look (pastel colors)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        // Define a custom emoji icon function
        const createEmojiIcon = (emoji) => {
          return L.divIcon({
            className: 'custom-emoji-icon',
            html: `<div style="font-size: 24px;">${emoji}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
        };

        const locations = [
          { name: "Melbourne (2017 June) ✈️", coords: [-37.8136, 144.9631], emoji: '🚋' },
          { name: "Falls Creek (2017 June) �", coords: [-36.8631, 147.2806], emoji: '🏂' },
          { name: "Launceston (2017 Nov) 🍒", coords: [-41.4391, 147.1358], emoji: '🍒' },
          { name: "Hobart (2017 Nov) 🍓", coords: [-42.8821, 147.3272], emoji: '🍓' },
          { name: "Adelaide (2018-Now) 🏠", coords: [-34.9285, 138.6007], emoji: '🍷' }
        ];

        // Paths to represent the journey (Arrows)
        const paths = [
          // Melbourne -> Falls Creek
          [[-37.8136, 144.9631], [-36.8631, 147.2806]], 
          // Melbourne -> Launceston (Tasmania trip)
          [[-37.8136, 144.9631], [-41.4391, 147.1358]],
          // Launceston -> Hobart
          [[-41.4391, 147.1358], [-42.8821, 147.3272]]
        ];

        locations.forEach(loc => {
           L.marker(loc.coords, { icon: createEmojiIcon(loc.emoji) }).addTo(map)
            .bindPopup(`<b style="font-family: 'Quicksand'; font-size: 14px;">${loc.name}</b>`);
        });

        // Add dashed lines for paths
        paths.forEach(path => {
          L.polyline(path, {
            color: '#FF6384', // Cute pink/red color for path
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10', // Dashed line
            lineCap: 'round'
          }).addTo(map);
        });
      }
    })
  }
}
</script>

<style scoped>
.map-wrapper {
  text-align: center;
  margin: 2rem 0;
}

.map-frame {
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border: 4px solid var(--c-brand-light);
  position: relative;
}

#leaflet-map {
  width: 100%;
  height: 100%;
  background-color: #AEEEEE; /* Fallback color */
}

.map-caption {
  margin-top: 10px;
  font-weight: 600;
  color: var(--c-brand-dark);
  font-size: 0.9rem;
}

/* Ensure no default borders on the emoji icon container */
:deep(.custom-emoji-icon) {
  background: transparent;
  border: none;
}
</style>
