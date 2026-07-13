"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import L from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import MapIntro from "./MapIntro";

type Hotspot = {
  id: string;
  district: string;
  lat: number;
  lng: number;
  incidents: number;
  risk: string;
  confidence: number;
  insight: string;
};

type Props = {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot;
  onSelect: (hotspot: Hotspot) => void;
};

function FlyToHotspot({
  hotspot,
}: {
  hotspot: Hotspot;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [hotspot.lat, hotspot.lng],
      9,
      {
        duration: 1.8,
      }
    );
  }, [hotspot, map]);

  return null;
}

export default function KarnatakaMap({
  hotspots,
  selectedHotspot,
  onSelect,
}: Props) {
  const [introComplete, setIntroComplete] =
    useState(false);

  const [goldIcon, setGoldIcon] =
    useState<L.DivIcon | null>(null);

  useEffect(() => {
    const icon = new L.DivIcon({
      className: "",
      html: `
        <div
          style="
            width:18px;
            height:18px;
            background:#C9A74D;
            border-radius:50%;
            border:4px solid white;
            box-shadow:0 0 18px rgba(201,167,77,.55);
          ">
        </div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    setGoldIcon(icon);
  }, []);

  return (
    <MapContainer
      center={[14.2, 77.2]}
      zoom={6}
      minZoom={6}
      maxZoom={13}
      zoomControl={false}
      scrollWheelZoom
      className="h-full w-full"
    >
      {/* Cinematic Intro */}
      <MapIntro
        onComplete={() =>
          setIntroComplete(true)
        }
      />

      {/* Fly to selected hotspot after intro */}
      {introComplete && (
        <FlyToHotspot
          hotspot={selectedHotspot}
        />
      )}

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {goldIcon &&
        hotspots.map((hotspot) => (
          <Marker
            key={hotspot.id}
            position={[
              hotspot.lat,
              hotspot.lng,
            ]}
            icon={goldIcon}
            eventHandlers={{
              click: () =>
                onSelect(hotspot),
            }}
          >

                        <Popup>
              <div className="space-y-2">
                <h3 className="text-base font-semibold">
                  {hotspot.district}
                </h3>

                <p>
                  <strong>ID:</strong>{" "}
                  {hotspot.id}
                </p>

                <p>
                  <strong>Incidents:</strong>{" "}
                  {hotspot.incidents}
                </p>

                <p>
                  <strong>Risk:</strong>{" "}
                  {hotspot.risk}
                </p>

                <p>
                  <strong>Confidence:</strong>{" "}
                  {hotspot.confidence}%
                </p>

                <p className="pt-2 text-xs text-gray-600">
                  {hotspot.insight}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}