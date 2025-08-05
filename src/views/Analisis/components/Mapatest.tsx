import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import * as maptiler3d from "@maptiler/3d";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import './Map.css'; 
import macrozona from './macrozona.js';

// --- Componente de Leyenda ---
const Legend = ({ legendConfig }) => {
    const legendStyle = {
        position: 'absolute',
        bottom: '30px',
        right: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontFamily: 'sans-serif',
        maxWidth: '300px'
    };
    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    };
    const colorBoxStyle = (color) => ({
        width: '20px',
        height: '20px',
        backgroundColor: color,
        marginRight: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px'
    });

    if (!legendConfig || !legendConfig.items || legendConfig.items.length === 0) {
        return null;
    }

    return (
        <div style={legendStyle}>
            <h4 style={{ margin: '0 0 10px 0' }}>{legendConfig.type === 'choropleth' ? 'Concentración de Clorofila-a (mg/m³)' : 'Leyenda'}</h4>
            {legendConfig.items.map((item, index) => (
                <div key={index} style={itemStyle}>
                    <span style={colorBoxStyle(item.color)}></span>
                    <span>{item.name || item.value}</span>
                </div>
            ))}
        </div>
    );
};

// --- Componente Principal del Mapa Fusionado ---
export default function MapaIntegrado() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const createdMarkers = useRef([]);

    const [showResetButton, setShowResetButton] = useState(false);
    const [legendConfig, setLegendConfig] = useState(null);

    const initialMapState = useRef({
        center: [-72.93768, -42.39810],
        zoom: 8,
        pitch: 60,
    });
    
    const apiKey = 'J7a25SJNVDfXRxlsaujO';
    const styleUrl = `https://api.maptiler.com/maps/0197f631-07d9-7a7f-9310-cd447713fd1a/style.json?key=${apiKey}`;

    const macrozonas = macrozona;

    const rtspMarkers = [
        { name: "Alao", lngLat: [-73.27916998474393, -42.548193940325035] },
        { name: "Bajos Lami", lngLat: [-73.231687922962, -41.8198809453509] },
        { name: "Polocuhe", lngLat: [-73.26939092726927, -42.42832560209612] },
        { name: "Angosta", lngLat: [-73.1512215877216, -45.28398372513862] },
        { name: "Verdugo", lngLat: [-73.66206407546997, -44.14989980233733] },
    ];
    
    const chlorophyllLayerInfo = {
        id: 'a1b6fb9b-9704-4ed7-9772-dc0599fb461b',
        sourceId: 'chlorophyll-source',
        layerId: 'chlorophyll-layer',
        tilesUrl: 'https://api.resourcewatch.org/v1/layer/a1b6fb9b-9704-4ed7-9772-dc0599fb461b/tile/gee/{z}/{x}/{y}'
    };

    useEffect(() => {
        if (map.current) return;

        maptilersdk.config.apiKey = apiKey;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: styleUrl,
            center: initialMapState.current.center,
            zoom: initialMapState.current.zoom,
            pitch: initialMapState.current.pitch,
        });

        map.current.on('ready', async () => {
            try {
                const layer3D = new maptiler3d.Layer3D("custom-3D-layer");
                map.current.addLayer(layer3D);
                
                if (!map.current.getSource(chlorophyllLayerInfo.sourceId)) {
                    map.current.addSource(chlorophyllLayerInfo.sourceId, {
                        type: 'raster', tiles: [chlorophyllLayerInfo.tilesUrl], tileSize: 256,
                        attribution: '<a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>'
                    });
                }
                if (!map.current.getLayer(chlorophyllLayerInfo.layerId)) {
                    map.current.addLayer({
                        id: chlorophyllLayerInfo.layerId, type: 'raster', source: chlorophyllLayerInfo.sourceId,
                        paint: { 'raster-opacity': 0.7 }
                    });
                }

                for (const [index, markerData] of rtspMarkers.entries()) {
                    const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(`<h3>${markerData.name}</h3>`);
                    const marker = new maptilersdk.Marker({ color: "#FF0000" })
                        .setLngLat(markerData.lngLat).setPopup(popup).addTo(map.current);
                    createdMarkers.current.push(marker);

                    marker.getElement().addEventListener('click', () => {
                        map.current.flyTo({ center: markerData.lngLat, zoom: 15, essential: true });
                    });

                    await layer3D.addMeshFromURL(`mod-${index}`, "/modulo2.glb", {
                        lngLat: markerData.lngLat, heading: 0, scale: 100
                    });
                }

                map.current.addSource('macrozonas-data', { type: 'geojson', data: macrozonas });
                map.current.addLayer({
                    'id': 'macrozonas-layer', 'type': 'fill', 'source': 'macrozonas-data', 'layout': {},
                    'paint': {
                        'fill-color': ['match', ['get', 'RIESGO'], 'Riesgo moderado', '#ff9900', 'Riesgo bajo', '#00cc00', 'Sin Datos', '#cccccc', '#0000ff'],
                        'fill-opacity': 0.5, 'fill-outline-color': '#000000'
                    }
                });
                map.current.addLayer({
                    'id': 'macrozonas-borders', 'type': 'line', 'source': 'macrozonas-data', 'layout': {},
                    'paint': { 'line-color': '#000000', 'line-width': 1 }
                });

                const macrozonaPopup = new maptilersdk.Popup({ closeButton: false, closeOnClick: false });
                map.current.on('click', 'macrozonas-layer', (e) => {
                    if (e.features.length > 0) {
                        const { properties } = e.features[0];
                        const description = `<strong>Nombre:</strong> ${properties.NOMBRE}<br><strong>Riesgo:</strong> ${properties.RIESGO}`;
                        macrozonaPopup.setLngLat(e.lngLat).setHTML(description).addTo(map.current);
                    }
                });
                map.current.on('mouseenter', 'macrozonas-layer', () => { map.current.getCanvas().style.cursor = 'pointer'; });
                map.current.on('mouseleave', 'macrozonas-layer', () => {
                    map.current.getCanvas().style.cursor = '';
                    macrozonaPopup.remove();
                });

                // --- Lógica de Zoom para Visibilidad de TODAS las capas ---
                map.current.on('zoom', () => {
                    const currentZoom = map.current.getZoom();

                    // ***Lógica para la capa de Clorofila ***
                    const chlorophyllZoomThreshold = 10; // <-- Puedes cambiar este valor
                    const chlorophyllVisibility = currentZoom > chlorophyllZoomThreshold ? 'none' : 'visible';
                    if (map.current.getLayer(chlorophyllLayerInfo.layerId)) {
                        map.current.setLayoutProperty(chlorophyllLayerInfo.layerId, 'visibility', chlorophyllVisibility);
                    }

                    // Lógica existente para macrozonas y marcadores
                    const macrozonaZoomThreshold = 14;
                    const macrozonaVisibility = currentZoom > macrozonaZoomThreshold ? 'none' : 'visible';
                    if (map.current.getLayer('macrozonas-layer')) map.current.setLayoutProperty('macrozonas-layer', 'visibility', macrozonaVisibility);
                    if (map.current.getLayer('macrozonas-borders')) map.current.setLayoutProperty('macrozonas-borders', 'visibility', macrozonaVisibility);
                    createdMarkers.current.forEach(marker => { marker.getElement().style.display = currentZoom > macrozonaZoomThreshold ? 'none' : 'block'; });
                    
                    setShowResetButton(currentZoom > 12);
                });

            } catch (error) {
                console.error("Error al cargar capas:", error);
            }
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const fetchChlorophyllLegend = async () => {
            try {
                const response = await fetch(`https://api.resourcewatch.org/v1/layer/${chlorophyllLayerInfo.id}`);
                if (!response.ok) throw new Error(`Error en la petición: ${response.statusText}`);
                const data = await response.json();
                if (data?.data?.attributes?.legendConfig) {
                    setLegendConfig(data.data.attributes.legendConfig);
                }
            } catch (error) {
                console.error("No se pudo cargar la leyenda:", error);
                setLegendConfig(null);
            }
        };
        fetchChlorophyllLegend();
    }, [chlorophyllLayerInfo.id]);

    const handleResetZoom = () => {
        if (map.current) {
            map.current.flyTo({ ...initialMapState.current, essential: true });
        }
    };
    
    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
            
            {showResetButton && (
                <button className="reset-zoom-button" onClick={handleResetZoom}>
                    Resetear Zoom 🔄
                </button>
            )}

            {legendConfig && <Legend legendConfig={legendConfig} />}
        </div>
    );
}