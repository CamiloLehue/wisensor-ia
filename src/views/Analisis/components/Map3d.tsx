import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { Center } from '../../views/Configuracion/sections/services/centersService'; // Importar la interfaz Center

interface Map3dProps {
  macrozonaData: any; 
  salmonConcessions: any[]; 
  concessionAreas: any[]; 
  centers: Center[]; 
}

export default function CMap3d({ macrozonaData, salmonConcessions, concessionAreas, centers }: Map3dProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);

  // La URL  mapa .
  const styleUrl = "https://api.maptiler.com/maps/0197f631-07d9-7a7f-9310-cd447713fd1a/style.json?key=J7a25SJNVDfXRxlsaujO";

  // Definición de la capa de clorofila (chlorophyll)
  const chlorophyllLayerInfo = {
    id: 'a1b6fb9b-9704-4ed7-9772-dc0599fb461b',
    sourceId: 'chlorophyll-source',
    layerId: 'chlorophyll-layer',
    tilesUrl: 'https://api.resourcewatch.org/v1/layer/a1b6fb9b-9704-4ed7-9772-dc0599fb461b/tile/gee/{z}/{x}/{y}'
  };

  useEffect(() => {
    // Evita que el mapa se reinicialice en cada renderizado.
    if (map.current) return;
    if (mapContainer.current) {
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: [-72.93768, -42.39810],
      zoom: 5,
      pitch: 60, //rotacion del mapa
    });

      map.current.on('load', async () => {
      try {
          // Para añadir una capa 3D personalizada (si la necesitas)
          // const layer3D = new maptiler3d.Layer3D("custom-3D-layer");
          // map.current?.addLayer(layer3D);
          // console.log('Capa 3D personalizada añadida');

          // Los archivos .glb deben estar en la carpeta `public`
          // await layer3D.addMeshFromURL(
          //   "mod", // ID único para este modelo.
          //   "/modulo2.glb", // URL del archivo .glb (asumiendo que está en la carpeta `public`)
          //   {
          //     lngLat: [-72.93768, -42.39810],
          //     heading: 0, // Rotación del modelo.
          //     scale: 100    // Tamaño del modelo.
          //   }
          // );
          // console.log('Modelo 3D (modulo2.glb) añadido');

          // Añadir macrozonas
          if (macrozonaData) {
            map.current?.addSource('macrozonas-data', {
          type: 'geojson',
              data: macrozonaData
        });
            console.log('Fuente de datos macrozonas-data añadida', macrozonaData);

            map.current?.addLayer({
          'id': 'macrozonas-layer',
          'type': 'fill',
          'source': 'macrozonas-data',
          'layout': {},
          'paint': {
            'fill-color': [
              'match',
              ['get', 'RIESGO'],
              'Riesgo moderado', '#ff9900', // Naranja 
              'Riesgo bajo', '#00cc00',    // Verde 
              'Sin Datos', '#cccccc',      // Gris
              '#0000ff' // azul
            ],
                'fill-opacity': 0.5,
                'fill-outline-color': '#000000'
          }
        });
            console.log('Capa macrozonas-layer añadida');

            map.current?.addLayer({
          'id': 'macrozonas-borders',
          'type': 'line',
          'source': 'macrozonas-data',
          'layout': {},
          'paint': {
                'line-color': '#000000',
            'line-width': 1
          }
        });
            console.log('Capa macrozonas-borders añadida');

          
        const popup = new maptilersdk.Popup({
          closeButton: false,
          closeOnClick: false
        });

            map.current?.on('click', 'macrozonas-layer', (e) => {
              if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;
                console.log('Propiedades de Macrozona:', properties);
            const description = `
                  Nombre: ${properties.NOMBRE || 'N/A'}
                  Riesgo: ${properties.RIESGO || 'N/A'}
            `;
                console.log('Descripción del Popup (Macrozona):', description);
                popup.setLngLat(e.lngLat)
                  .setHTML(`<div style="color: black;">${description}</div>`)
                  .addTo(map.current as maptilersdk.Map);
              }
            });

            map.current?.on('mouseenter', 'macrozonas-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = 'pointer';
            });

            map.current?.on('mouseleave', 'macrozonas-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = '';
              // popup.remove(); 
            });
          }

          // Añadir salmonConcessions como puntos (markers)
          if (salmonConcessions && salmonConcessions.length > 0) {
            const salmonGeoJson: GeoJSON.FeatureCollection = {
              type: 'FeatureCollection',
              features: salmonConcessions.map(con => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [con.position[1], con.position[0]] // Convertir de [lat, lng] a [lng, lat]
                },
                properties: {
                  name: con.name,
                  type: con.type,
                  production: con.production,
                  capacity: con.capacity,
                  status: con.status,
                  region: con.region
                }
              }))
            };

            map.current?.addSource('salmon-concessions', {
              type: 'geojson',
              data: salmonGeoJson
            });
            console.log('Fuente de datos salmon-concessions añadida', salmonGeoJson);

            map.current?.addLayer({
              id: 'salmon-concessions-layer',
              type: 'circle',
              source: 'salmon-concessions',
              paint: {
                'circle-radius': 6,
                'circle-color': '#FF0000', 
                'circle-stroke-color': '#FFFFFF',
                'circle-stroke-width': 1
          }
        });
            console.log('Capa salmon-concessions-layer añadida');

            // Popup y eventos para salmonConcessions
            const salmonPopup = new maptilersdk.Popup({
              closeButton: false,
              closeOnClick: false
            });

            map.current?.on('click', 'salmon-concessions-layer', (e) => {
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const properties = feature.properties;
                console.log('Propiedades de Concesión Salmón:', properties);
                const description = `
                  Concesión: ${properties.name || 'N/A'}
                  Producción: ${properties.production || 'N/A'}
                  Capacidad: ${properties.capacity || 'N/A'} Ton
                  Estado: ${properties.status || 'N/A'}
                `;
                console.log('Descripción del Popup (Salmón):', description);
                salmonPopup.setLngLat(e.lngLat)
                  .setHTML(`<div style="color: black;">${description}</div>`)
                  .addTo(map.current as maptilersdk.Map);
              }
            });

            map.current?.on('mouseenter', 'salmon-concessions-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = 'pointer';
        });

            map.current?.on('mouseleave', 'salmon-concessions-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = '';
              // salmonPopup.remove();
            });
          }

          // Añadir concessionAreas como polígonos
          if (concessionAreas && concessionAreas.length > 0) {
            const areasGeoJson: GeoJSON.FeatureCollection = {
              type: 'FeatureCollection',
              features: concessionAreas.map(area => ({
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [area.positions] // Las coordenadas
                },
                properties: {
                  name: area.name,
                  region: area.region,
                  status: area.status
                }
              }))
            };

            map.current?.addSource('concession-areas', {
              type: 'geojson',
              data: areasGeoJson
            });
            console.log('Fuente de datos concession-areas añadida', areasGeoJson);

            map.current?.addLayer({
              id: 'concession-areas-layer',
              type: 'fill',
              source: 'concession-areas',
              paint: {
                'fill-color': '#00FF00', // Verde para áreas de concesión
                'fill-opacity': 0.3,
                'fill-outline-color': '#000000'
              }
            });
            console.log('Capa concession-areas-layer añadida');

            map.current?.addLayer({
              id: 'concession-areas-borders',
              type: 'line',
              source: 'concession-areas',
              paint: {
                'line-color': '#000000',
                'line-width': 1
              }
            });
            console.log('Capa concession-areas-borders añadida');

            // Popup y eventos para concessionAreas
            const areaPopup = new maptilersdk.Popup({
              closeButton: true, // Permitir cerrar
              closeOnClick: false
            });

            map.current?.on('click', 'concession-areas-layer', (e) => {
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const properties = feature.properties;
                console.log('Propiedades de Área de Concesión:', properties);
                const description = `
                  <div style="background-color: #2a2d32; color: white; padding: 10px; border-radius: 5px;">
                    <strong>Área:</strong> ${properties.name || 'N/A'}<br/>
                    <strong>Región:</strong> ${properties.region || 'N/A'}<br/>
                    <strong>Estado:</strong> ${properties.status || 'N/A'}
                  </div>
                `;
                console.log('Descripción del Popup (Área Concesión):', description);
                areaPopup.setLngLat(e.lngLat)
                  .setHTML(description)
                  .addTo(map.current as maptilersdk.Map);
              }
            });

            map.current?.on('mouseenter', 'concession-areas-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = 'pointer';
            });

            map.current?.on('mouseleave', 'concession-areas-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = '';
            });
          }

          // Añadir Centros como puntos
          if (centers && centers.length > 0) {
            const centersGeoJson: GeoJSON.FeatureCollection = {
              type: 'FeatureCollection',
              features: centers.map(center => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [center.longitude, center.latitude]
                },
                properties: {
                  id: center.id,
                  name: center.name,
                  code: center.code,
                  latitude: center.latitude,
                  longitude: center.longitude
                }
              }))
            };

            map.current?.addSource('centers-data', {
              type: 'geojson',
              data: centersGeoJson
            });
            console.log('Fuente de datos centers-data añadida', centersGeoJson);

            map.current?.addLayer({
              id: 'centers-layer',
              type: 'circle',
              source: 'centers-data',
              paint: {
                'circle-radius': 8,
                'circle-color': '#1E90FF', // Azul para los centros
                'circle-stroke-color': '#FFFFFF',
                'circle-stroke-width': 2
              }
            });
            console.log('Capa centers-layer añadida');

            // Popup y eventos para Centros
            const centerPopup = new maptilersdk.Popup({
              closeButton: true,
              closeOnClick: false
            });

            map.current?.on('click', 'centers-layer', (e) => {
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const properties = feature.properties;
                console.log('Propiedades del Centro:', properties);
                const description = `
                  <div style="background-color: #2a2d32; color: white; padding: 10px; border-radius: 5px;">
                    <strong>Centro:</strong> ${properties.name || 'N/A'}<br/>
                    <strong>Código:</strong> ${properties.code || 'N/A'}<br/>
                    <strong>Latitud:</strong> ${properties.latitude || 'N/A'}<br/>
                    <strong>Longitud:</strong> ${properties.longitude || 'N/A'}
                  </div>
                `;
                console.log('Descripción del Popup (Centro):', description);
                centerPopup.setLngLat(e.lngLat)
                  .setHTML(description)
                  .addTo(map.current as maptilersdk.Map);
      }
    });

            map.current?.on('mouseenter', 'centers-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = 'pointer';
            });

            map.current?.on('mouseleave', 'centers-layer', () => {
              (map.current as maptilersdk.Map).getCanvas().style.cursor = '';
            });
          }

          // Añadir capa de clorofila (chlorophyll)
          if (!map.current.getSource(chlorophyllLayerInfo.sourceId)) {
            map.current.addSource(chlorophyllLayerInfo.sourceId, {
              type: 'raster',
              tiles: [chlorophyllLayerInfo.tilesUrl],
              tileSize: 256,
              attribution: '<a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>'
            });
          }
          if (!map.current.getLayer(chlorophyllLayerInfo.layerId)) {
            map.current.addLayer({
              id: chlorophyllLayerInfo.layerId,
              type: 'raster',
              source: chlorophyllLayerInfo.sourceId,
              paint: { 'raster-opacity': 0.7 }
            });
          }

          // Controlar visibilidad de la capa de clorofila según zoom
          map.current.on('zoom', () => {
            const currentZoom = map.current.getZoom();
            const chlorophyllZoomThreshold = 10;
            const chlorophyllVisibility = currentZoom > chlorophyllZoomThreshold ? 'none' : 'visible';
            if (map.current.getLayer(chlorophyllLayerInfo.layerId)) {
              map.current.setLayoutProperty(chlorophyllLayerInfo.layerId, 'visibility', chlorophyllVisibility);
            }
          });

        } catch (error) {
          console.error('Error al añadir capas del mapa:', error);
        }
      });
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [macrozonaData, salmonConcessions, concessionAreas, centers]);

  return (
    <div className="map-container-wrapper relative w-full h-full rounded-md shadow-inner">
      <div ref={mapContainer} className="map-container w-full h-full" />
      <div className="info-circles-container absolute top-4 left-4 flex flex-col items-start space-y-2 z-10">
        <div className=" flex items-center bg-blue-600 rounded-full p-2">
          <div className=" bg-blue-700 border border-white w-4 h-4 rounded-full"></div>
          <span className=" text-sm ml-2">Centros</span>
        </div>
        <div className="flex items-center bg-blue-600 rounded-full p-2">
          <div className=" bg-red-500 border border-white w-4 h-4 rounded-full"></div>
          <span className=" text-sm ml-2">Concesiones</span>
        </div>
        <div className=" flex items-center bg-blue-600 rounded-full p-2">
          <div className="bg-emerald-300 w-4 h-4 rounded-full"></div>
          <span className=" text-sm ml-2">Clorofila</span>
        </div>
        <div className=" flex items-center bg-blue-600 rounded-full p-2">
          <div className="bg-white/50 border border-black w-4 h-4 rounded-full"></div>
          <span className="  text-sm ml-2">Áreas de Concesión</span>
        </div>
        
      </div>
    </div>
  );
}