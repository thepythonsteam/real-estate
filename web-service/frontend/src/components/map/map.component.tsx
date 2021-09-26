import { useLeafletContext } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-maskcanvas';
import { FC, memo, useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './map.component.scss';

type HeatLayerProps = {
    color: string;
    coordinates: [number, number][];
};

const HeatLayer: FC<HeatLayerProps> = ({ color, coordinates }) => {
    const context = useLeafletContext();

    useEffect(() => {
        // @ts-ignore
        const layer = L.TileLayer.maskCanvas({
            radius: 100, // radius in pixels or in meters (see useAbsoluteRadius)
            useAbsoluteRadius: true, // true: r in meters, false: r in pixels
            color, // the color of the layer
            opacity: 0.5, // opacity of the not covered area
            noMask: true, // true results in normal (filled) circled, instead masked circles
        });

        layer.setData(coordinates);

        const container = context.layerContainer ?? context.map;
        container.addLayer(layer);

        return () => {
            container.removeLayer(layer);
        };
    });

    return null;
};

export type MapProps = {
    address: string;
    data: {
        objectCoordinates: [number, number];
        heatmap: {
            [layerColor: string]: [number, number][];
        };
    };
};

export const Map = memo<MapProps>(({ address, data }) => {
    const heatLayers = useMemo(() => {
        return Object.entries(data.heatmap).map(([layerColor, coordinates]) => (
            <HeatLayer key={layerColor} color={layerColor} coordinates={coordinates} />
        ));
    }, [data]);

    return (
        <MapContainer style={{ width: '100%', height: 600 }} center={data.objectCoordinates} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {heatLayers}

            <Marker position={data.objectCoordinates}>
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
});

Map.displayName = 'Map';
