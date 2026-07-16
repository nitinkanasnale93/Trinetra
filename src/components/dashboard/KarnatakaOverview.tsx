"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Circle,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

type DistrictActivity = {
  district: string;
  incidentCount: number;
  linkedPatternCount: number;
  risk: "Elevated" | "Moderate" | "Low";
};

type KarnatakaOverviewProps = {
  districts: DistrictActivity[];
  monitoredDistrictCount: number;
};

type GeoJsonPosition = [number, number];

type GeoJsonGeometry =
  | {
      type: "Polygon";
      coordinates: GeoJsonPosition[][];
    }
  | {
      type: "MultiPolygon";
      coordinates: GeoJsonPosition[][][];
    };

type GeoJsonFeature = {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: GeoJsonGeometry;
};

type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
};

type GeographicCoordinate = {
  latitude: number;
  longitude: number;
};

const districtCoordinates: Record<
  string,
  GeographicCoordinate
> = {
  Bidar: {
    latitude: 17.9133,
    longitude: 77.5301,
  },

  "Kalaburagi City": {
    latitude: 17.3297,
    longitude: 76.8343,
  },

  "Belagavi Dist": {
    latitude: 15.8497,
    longitude: 74.4977,
  },

  Shivamogga: {
    latitude: 13.9299,
    longitude: 75.5681,
  },

  Tumakuru: {
    latitude: 13.3409,
    longitude: 77.101,
  },

  Chitradurga: {
    latitude: 14.2306,
    longitude: 76.398,
  },

  Haveri: {
    latitude: 14.7935,
    longitude: 75.4041,
  },

  Udupi: {
    latitude: 13.3409,
    longitude: 74.7421,
  },

  "Bengaluru City": {
    latitude: 12.9716,
    longitude: 77.5946,
  },

  Mysuru: {
    latitude: 12.2958,
    longitude: 76.6394,
  },

  Mangaluru: {
    latitude: 12.9141,
    longitude: 74.856,
  },

  Hubballi: {
    latitude: 15.3647,
    longitude: 75.124,
  },

  Ballari: {
    latitude: 15.1394,
    longitude: 76.9214,
  },

  Davanagere: {
    latitude: 14.4644,
    longitude: 75.9218,
  },

  Koppal: {
    latitude: 15.345,
    longitude: 76.1548,
  },
};

const MAP_WIDTH = 620;
const MAP_HEIGHT = 390;
const MAP_PADDING = 24;

function getGeometryPositions(
  geometry: GeoJsonGeometry
): GeoJsonPosition[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }

  return geometry.coordinates.flat(2);
}

function createPath(
  geometry: GeoJsonGeometry,
  project: (
    position: GeoJsonPosition
  ) => [number, number]
) {
  const polygons: GeoJsonPosition[][][] =
    geometry.type === "Polygon"
      ? [geometry.coordinates]
      : geometry.coordinates;

  return polygons
    .map((polygon) =>
      polygon
        .map((ring) => {
          if (!ring.length) return "";

          const projected = ring.map(project);

          const [firstX, firstY] = projected[0];

          return `M ${firstX.toFixed(
            2
          )} ${firstY.toFixed(
            2
          )} ${projected
            .slice(1)
            .map(
              ([x, y]) =>
                `L ${x.toFixed(2)} ${y.toFixed(2)}`
            )
            .join(" ")} Z`;
        })
        .join(" ")
    )
    .join(" ");
}

export default function KarnatakaOverview({
  districts,
  monitoredDistrictCount,
}: KarnatakaOverviewProps) {
  const [mapData, setMapData] =
    useState<GeoJsonFeatureCollection | null>(null);

  const priorityDistricts = districts.slice(0, 6);

  useEffect(() => {
    let active = true;

    async function loadMap() {
      try {
        const response = await fetch(
          "/maps/karnataka-districts.geojson"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load Karnataka map: ${response.status}`
          );
        }

        const data =
          (await response.json()) as GeoJsonFeatureCollection;

        if (active) {
          setMapData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadMap();

    return () => {
      active = false;
    };
  }, []);

  const mapProjection = useMemo(() => {
    if (!mapData) {
      return null;
    }

    const positions = mapData.features.flatMap((feature) =>
      getGeometryPositions(feature.geometry)
    );

    const longitudes = positions.map(
      ([longitude]) => longitude
    );

    const latitudes = positions.map(
      ([, latitude]) => latitude
    );

    const minimumLongitude = Math.min(...longitudes);
    const maximumLongitude = Math.max(...longitudes);

    const minimumLatitude = Math.min(...latitudes);
    const maximumLatitude = Math.max(...latitudes);

    const longitudeRange =
      maximumLongitude - minimumLongitude;

    const latitudeRange =
      maximumLatitude - minimumLatitude;

    const availableWidth =
      MAP_WIDTH - MAP_PADDING * 2;

    const availableHeight =
      MAP_HEIGHT - MAP_PADDING * 2;

    const scale = Math.min(
      availableWidth / longitudeRange,
      availableHeight / latitudeRange
    );

    const projectedWidth =
      longitudeRange * scale;

    const projectedHeight =
      latitudeRange * scale;

    const offsetX =
      (MAP_WIDTH - projectedWidth) / 2;

    const offsetY =
      (MAP_HEIGHT - projectedHeight) / 2;

    function project(
      position: GeoJsonPosition
    ): [number, number] {
      const [longitude, latitude] = position;

      const x =
        offsetX +
        (longitude - minimumLongitude) * scale;

      const y =
        offsetY +
        (maximumLatitude - latitude) * scale;

      return [x, y];
    }

    return {
      project,
    };
  }, [mapData]);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

      {/* Header */}

      <div className="flex items-start justify-between border-b border-[var(--border)] px-4 py-4 sm:px-6 sm:py-5">

        <div>

          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Karnataka operational overview
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Verified district activity and detected
            intelligence pattern exposure
          </p>

        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)]"
        >
          <MoreHorizontal
            size={18}
            strokeWidth={1.8}
          />
        </button>

      </div>

      {/* Responsive Grid */}

      <div className="grid min-h-[420px] grid-cols-1 xl:grid-cols-[1.45fr_0.85fr]">

        <div className="relative overflow-hidden border-b border-[var(--border)] bg-[#f3f1eb] xl:border-b-0 xl:border-r">

  {/* State Activity */}

  <div className="absolute left-4 top-4 z-20 rounded-xl border border-[var(--border)] bg-white/90 px-3 py-2 backdrop-blur sm:left-6 sm:top-6 sm:px-4 sm:py-3">

    <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
      State activity
    </p>

    <p className="mt-1 text-sm font-medium text-[var(--navy)]">
      {monitoredDistrictCount} monitored districts
    </p>

  </div>

  {/* Karnataka SVG */}

  <div className="absolute inset-0 flex items-center justify-center px-3 py-4 sm:px-6 lg:px-8">

    {mapData && mapProjection ? (

      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="h-full w-full max-h-[520px]"
        role="img"
        aria-label="Karnataka district intelligence activity map"
      >

        {/* District Shapes */}

        <g>

          {mapData.features.map((feature, index) => (

            <path
              key={index}
              d={createPath(
                feature.geometry,
                mapProjection.project
              )}
              fill="rgba(255,255,255,0.60)"
              stroke="var(--border-strong)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />

          ))}

        </g>

        {/* Markers */}

        <g>

          {districts.map((district) => {

            const coordinate =
              districtCoordinates[district.district];

            if (!coordinate) return null;

            const [x, y] =
              mapProjection.project([
                coordinate.longitude,
                coordinate.latitude,
              ]);

            const radius =
              district.risk === "Elevated"
                ? 6
                : district.risk === "Moderate"
                ? 5
                : 4;

            const fill =
              district.risk === "Elevated"
                ? "var(--danger)"
                : district.risk === "Moderate"
                ? "var(--gold)"
                : "var(--success)";

            return (

              <g
                key={district.district}
                className="group cursor-pointer"
              >

                {district.risk === "Elevated" && (

                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="var(--danger)"
                    opacity="0.1"
                  >

                    <animate
                      attributeName="r"
                      values="8;16;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />

                    <animate
                      attributeName="opacity"
                      values="0.18;0;0.18"
                      dur="2s"
                      repeatCount="indefinite"
                    />

                  </circle>

                )}

                <circle
                  cx={x}
                  cy={y}
                  r={radius + 2}
                  fill="white"
                />

                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={fill}
                />

                {/* Hover Card */}

                <g className="pointer-events-none opacity-0 transition-opacity group-hover:opacity-100">

                  <rect
                    x={x - 68}
                    y={y + 12}
                    width="136"
                    height="48"
                    rx="8"
                    fill="white"
                    stroke="var(--border)"
                  />

                  <text
                    x={x}
                    y={y + 31}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="var(--navy)"
                  >
                    {district.district}
                  </text>

                  <text
                    x={x}
                    y={y + 47}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--text-muted)"
                  >
                    {district.incidentCount} verified ·{" "}
                    {district.linkedPatternCount} linked
                  </text>

                </g>

              </g>

            );

          })}

        </g>

      </svg>

    ) : (

      <div className="flex h-full w-full items-center justify-center text-sm text-[var(--text-muted)]">

        Loading Karnataka Map...

      </div>

    )}

  </div>

  {/* Legend */}

  <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-white/90 px-3 py-2 backdrop-blur sm:bottom-5 sm:left-6 sm:gap-5 sm:px-4 sm:py-3">

    <div className="flex items-center gap-2 text-[10px]">

      <Circle
        size={8}
        fill="var(--success)"
        strokeWidth={0}
      />

      Low

    </div>

    <div className="flex items-center gap-2 text-[10px]">

      <Circle
        size={8}
        fill="var(--gold)"
        strokeWidth={0}
      />

      Moderate

    </div>

    <div className="flex items-center gap-2 text-[10px]">

      <Circle
        size={8}
        fill="var(--danger)"
        strokeWidth={0}
      />

      Elevated

    </div>

  </div>

</div>

        {/* Right Panel */}

        <div className="p-4 sm:p-5 lg:p-6">

          <div className="flex items-center justify-between px-2">

            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Priority districts
            </p>

            <span className="text-xs text-[var(--gold)]">
              Live dataset
            </span>

          </div>

          <div className="mt-4">

            {priorityDistricts.map((district) => (

              <button
                key={district.district}
                type="button"
                className="group flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-[var(--surface-soft)] sm:gap-4 sm:py-4"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">

                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="text-[var(--text-muted)]"
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <p className="break-words text-sm font-medium text-[var(--navy)]">
                      {district.district}
                    </p>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] ${
                        district.risk === "Elevated"
                          ? "bg-[#f8e8e8] text-[var(--danger)]"
                          : district.risk === "Moderate"
                          ? "bg-[var(--gold-soft)] text-[var(--warning)]"
                          : "bg-[#e8f2ed] text-[var(--success)]"
                      }`}
                    >
                      {district.risk}
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">

                    {district.incidentCount} verified{" "}

                    {district.incidentCount === 1
                      ? "incident"
                      : "incidents"}

                  </p>

                </div>

                <div className="shrink-0 text-right">

                  <p
                    className={`text-xs font-medium ${
                      district.linkedPatternCount > 0
                        ? "text-[var(--danger)]"
                        : "text-[var(--success)]"
                    }`}
                  >

                    {district.linkedPatternCount > 0
                      ? `${district.linkedPatternCount} linked`
                      : "No link"}

                  </p>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    className="ml-auto mt-2 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100"
                  />

                </div>

              </button>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}