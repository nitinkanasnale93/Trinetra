/* eslint-disable @typescript-eslint/no-require-imports */

'use strict';

const catalyst = require('zcatalyst-sdk-node');

const ANALYSIS_VERSION = 'TRINETRA_RULE_ENGINE_V1';

const WEIGHTS = {
    structured: 0.30,
    mo: 0.35,
    temporal: 0.20,
    geographic: 0.15
};

const MATCH_THRESHOLD = 75;
const PATTERN_THRESHOLD = 80;
const MIN_PATTERN_INCIDENTS = 3;
const MIN_PATTERN_DISTRICTS = 3;

/*
 * TRINETRA CONTROLLED SYNTHETIC PROTOTYPE DATASET
 *
 * District and police-station context is grounded in public Karnataka
 * policing references.
 *
 * Incident facts, DEMO FIR references, dates, times, descriptions and
 * modus-operandi details are synthetic and exist only for prototype testing.
 */

const incidents = [
    {
        incident_id: 'INC-001',
        fir_number: 'DEMO-BID-001',
        district: 'Bidar',
        police_station: 'Hallikhed PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-04 01:40:00',
        location: 'Hallikhed commercial locality, Bidar district',
        location_type: 'SHOP',
        description: 'Two masked persons entered a closed retail shop through rear access during late-night hours and removed cash and portable valuables.',
        modus_operandi: 'Rear-side entry; lock forced; CCTV view obstructed; cash and compact valuables targeted; motorcycle used for escape.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 95,
        verified_by: 'DEMO_STATION_OFFICER_01',
        verified_at: '2026-01-04 03:05:00'
    },
    {
        incident_id: 'INC-002',
        fir_number: 'DEMO-KLB-002',
        district: 'Kalaburagi City',
        police_station: 'Station Bazar PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-09 02:15:00',
        location: 'Station Bazar commercial locality, Kalaburagi',
        location_type: 'SHOP',
        description: 'Two masked persons accessed a closed shop from the rear after midnight and removed cash and small high-value items.',
        modus_operandi: 'Rear entry; locking point forced; CCTV visibility obstructed; cash and compact valuables targeted; motorcycle used for escape.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 96,
        verified_by: 'DEMO_STATION_OFFICER_02',
        verified_at: '2026-01-09 03:30:00'
    },
    {
        incident_id: 'INC-003',
        fir_number: 'DEMO-BGM-003',
        district: 'Belagavi Dist',
        police_station: 'Nippani Town PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-15 01:55:00',
        location: 'Nippani commercial locality, Belagavi district',
        location_type: 'SHOP',
        description: 'Two masked individuals gained access to a closed retail premises from the rear during night hours and stole cash and portable valuables.',
        modus_operandi: 'Rear-side access; lock forced; camera visibility blocked; cash and compact valuables targeted; motorcycle used for escape.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 94,
        verified_by: 'DEMO_STATION_OFFICER_03',
        verified_at: '2026-01-15 03:15:00'
    },
    {
        incident_id: 'INC-004',
        fir_number: 'DEMO-SMG-004',
        district: 'Shivamogga',
        police_station: 'Doddapete PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-22 02:05:00',
        location: 'Doddapete commercial locality, Shivamogga',
        location_type: 'SHOP',
        description: 'Two masked persons entered a closed shop using rear access at night and removed cash and easily portable valuable items.',
        modus_operandi: 'Rear access used; locking mechanism forced; CCTV view obstructed; cash and compact valuables targeted; motorcycle escape.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 97,
        verified_by: 'DEMO_STATION_OFFICER_04',
        verified_at: '2026-01-22 03:25:00'
    },
    {
        incident_id: 'INC-005',
        fir_number: 'DEMO-TMK-005',
        district: 'Tumakuru',
        police_station: 'Sira Town PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-25 02:30:00',
        location: 'Sira commercial locality, Tumakuru district',
        location_type: 'SHOP',
        description: 'A lone person forced the front shutter of a closed shop during night hours and removed cash from the counter.',
        modus_operandi: 'Front shutter forced; front entry; cash counter targeted; single suspect; escape method unidentified.',
        suspect_count: 1,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'UNKNOWN',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 92,
        verified_by: 'DEMO_STATION_OFFICER_05',
        verified_at: '2026-01-25 03:45:00'
    },
    {
        incident_id: 'INC-006',
        fir_number: 'DEMO-CTA-006',
        district: 'Chitradurga',
        police_station: 'Chitradurga Town PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-01-28 01:50:00',
        location: 'Residential locality, Chitradurga',
        location_type: 'RESIDENCE',
        description: 'Two persons entered a residence through a rear window during night hours and removed jewellery.',
        modus_operandi: 'Rear-window entry; residential property targeted; jewellery removed; two suspects observed; no CCTV obstruction reported.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'UNKNOWN',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 93,
        verified_by: 'DEMO_STATION_OFFICER_06',
        verified_at: '2026-01-28 03:10:00'
    },
    {
        incident_id: 'INC-007',
        fir_number: 'DEMO-HVR-007',
        district: 'Haveri',
        police_station: 'Ranebennur Town PS',
        crime_type: 'BURGLARY_NIGHT',
        incident_datetime: '2026-02-02 03:10:00',
        location: 'Ranebennur commercial locality, Haveri district',
        location_type: 'SHOP',
        description: 'Two persons entered a closed electronics shop at night and removed electronic goods.',
        modus_operandi: 'Side-door lock forced; electronics targeted; two suspects; goods transported using a small goods vehicle.',
        suspect_count: 2,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'GOODS_VEHICLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 91,
        verified_by: 'DEMO_STATION_OFFICER_07',
        verified_at: '2026-02-02 04:30:00'
    },
    {
        incident_id: 'INC-008',
        fir_number: 'DEMO-UDP-008',
        district: 'Udupi',
        police_station: 'Udupi Town PS',
        crime_type: 'CHAIN_SNATCHING',
        incident_datetime: '2026-02-05 18:20:00',
        location: 'Public road locality, Udupi',
        location_type: 'ROAD',
        description: 'A motorcycle-borne person snatched a chain from a pedestrian and immediately left the area.',
        modus_operandi: 'Pedestrian approached on road; chain snatched; motorcycle used for immediate escape.',
        suspect_count: 1,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 94,
        verified_by: 'DEMO_STATION_OFFICER_08',
        verified_at: '2026-02-05 19:35:00'
    },
    {
        incident_id: 'INC-009',
        fir_number: 'DEMO-BLR-009',
        district: 'Bengaluru City',
        police_station: 'Yelahanka PS',
        crime_type: 'VEHICLE_THEFT',
        incident_datetime: '2026-02-08 22:40:00',
        location: 'Public parking locality, Yelahanka, Bengaluru',
        location_type: 'PUBLIC_PLACE',
        description: 'A parked motorcycle was reported missing from a public parking area.',
        modus_operandi: 'Parked motorcycle targeted; vehicle removed from public parking area; suspect identity unknown.',
        suspect_count: 1,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'MOTORCYCLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 90,
        verified_by: 'DEMO_STATION_OFFICER_09',
        verified_at: '2026-02-09 00:05:00'
    },
    {
        incident_id: 'INC-010',
        fir_number: 'DEMO-KPL-010',
        district: 'Koppal',
        police_station: 'Koppal Town PS',
        crime_type: 'ROBBERY',
        incident_datetime: '2026-02-11 21:15:00',
        location: 'Public road locality, Koppal',
        location_type: 'ROAD',
        description: 'Two persons threatened a pedestrian and took cash and a mobile phone.',
        modus_operandi: 'Pedestrian intercepted on road; victim threatened; cash and mobile phone taken; suspects left on foot.',
        suspect_count: 2,
        weapon_type: 'KNIFE_REPORTED',
        vehicle_type: 'NONE_REPORTED',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 93,
        verified_by: 'DEMO_STATION_OFFICER_10',
        verified_at: '2026-02-11 22:35:00'
    },
    {
        incident_id: 'INC-011',
        fir_number: 'DEMO-BLR-011',
        district: 'Bengaluru City',
        police_station: 'Kengeri PS',
        crime_type: 'CYBER_FRAUD',
        incident_datetime: '2026-02-14 14:35:00',
        location: 'Kengeri, Bengaluru',
        location_type: 'DIGITAL',
        description: 'A prototype complaint record describes an online payment fraud involving a deceptive payment link.',
        modus_operandi: 'Deceptive payment link shared digitally; complainant induced to authorize an online transaction.',
        suspect_count: 1,
        weapon_type: 'NOT_APPLICABLE',
        vehicle_type: 'NOT_APPLICABLE',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 96,
        verified_by: 'DEMO_STATION_OFFICER_11',
        verified_at: '2026-02-14 15:50:00'
    },
    {
        incident_id: 'INC-012',
        fir_number: 'DEMO-UDP-012',
        district: 'Udupi',
        police_station: 'Manipal PS',
        crime_type: 'HOUSE_THEFT',
        incident_datetime: '2026-02-18 11:10:00',
        location: 'Residential locality, Manipal, Udupi district',
        location_type: 'RESIDENCE',
        description: 'Household valuables were reported missing from a residence during daytime hours.',
        modus_operandi: 'Residential property targeted during daytime; household valuables removed; entry method under verification.',
        suspect_count: 1,
        weapon_type: 'NONE_REPORTED',
        vehicle_type: 'UNKNOWN',
        source_type: 'PROTOTYPE_SYNTHETIC',
        verification_status: 'VERIFIED',
        data_quality_score: 88,
        verified_by: 'DEMO_STATION_OFFICER_12',
        verified_at: '2026-02-18 12:30:00'
    }
];

function clampScore(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function normalize(value) {
    return String(value || '').trim().toUpperCase();
}

function extractMOIndicators(value = '') {
    const text = String(value).toLowerCase();

    const indicators = {
        rear_entry:
            /\brear\b|\brear-side\b|\brear window\b|\brear-window\b/.test(text),

        forced_lock:
            /\block forced\b|\bforced\b.*\block\b|\blocking mechanism forced\b|\blocking point forced\b|\bshutter forced\b/.test(text),

        cctv_obstruction:
            /\bcctv\b.*\b(obstructed|blocked)\b|\bcamera visibility blocked\b/.test(text),

        cash_target:
            /\bcash\b/.test(text),

        compact_valuables:
            /\bcompact valuables\b|\bportable valuables\b|\bsmall high-value items\b|\bportable valuable items\b/.test(text),

        motorcycle_escape:
            /\bmotorcycle\b.*\bescape\b|\bmotorcycle escape\b/.test(text),

        front_entry:
            /\bfront entry\b|\bfront shutter\b/.test(text),

        residential_target:
            /\bresidential\b|\bresidence\b/.test(text),

        jewellery_target:
            /\bjewellery\b/.test(text),

        electronics_target:
            /\belectronic goods\b|\belectronics targeted\b/.test(text),

        road_interception:
            /\bpedestrian\b.*\broad\b|\bintercepted on road\b/.test(text),

        digital_deception:
            /\bpayment link\b|\bdigitally\b|\bonline transaction\b/.test(text)
    };

    return new Set(
        Object.entries(indicators)
            .filter(([, matched]) => matched)
            .map(([indicator]) => indicator)
    );
}

function setSimilarity(firstSet, secondSet) {
    if (firstSet.size === 0 || secondSet.size === 0) {
        return 0;
    }

    const intersection = [...firstSet]
        .filter(value => secondSet.has(value))
        .length;

    const union = new Set([
        ...firstSet,
        ...secondSet
    ]).size;

    return clampScore((intersection / union) * 100);
}

function calculateStructuredScore(first, second) {
    let score = 0;

    if (normalize(first.crime_type) === normalize(second.crime_type)) {
        score += 35;
    }

    if (normalize(first.location_type) === normalize(second.location_type)) {
        score += 20;
    }

    if (Number(first.suspect_count) === Number(second.suspect_count)) {
        score += 15;
    }

    if (normalize(first.weapon_type) === normalize(second.weapon_type)) {
        score += 10;
    }

    if (normalize(first.vehicle_type) === normalize(second.vehicle_type)) {
        score += 20;
    }

    return clampScore(score);
}

function calculateMOScore(first, second) {
    return setSimilarity(
        extractMOIndicators(first.modus_operandi),
        extractMOIndicators(second.modus_operandi)
    );
}

function parseCatalystDateTime(value) {
    return new Date(
        String(value).replace(' ', 'T')
    );
}

function calculateTemporalScore(first, second) {
    const firstDate = parseCatalystDateTime(
        first.incident_datetime
    );

    const secondDate = parseCatalystDateTime(
        second.incident_datetime
    );

    if (
        Number.isNaN(firstDate.getTime()) ||
        Number.isNaN(secondDate.getTime())
    ) {
        return 0;
    }

    let hourDifference = Math.abs(
        firstDate.getHours() - secondDate.getHours()
    );

    hourDifference = Math.min(
        hourDifference,
        24 - hourDifference
    );

    const dayDifference =
        Math.abs(secondDate.getTime() - firstDate.getTime()) /
        (1000 * 60 * 60 * 24);

    let score = 0;

    if (hourDifference <= 1) {
        score += 70;
    } else if (hourDifference <= 2) {
        score += 55;
    } else if (hourDifference <= 4) {
        score += 30;
    }

    if (dayDifference <= 10) {
        score += 30;
    } else if (dayDifference <= 30) {
        score += 20;
    } else if (dayDifference <= 60) {
        score += 10;
    }

    return clampScore(score);
}

function calculateGeographicScore(first, second) {
    if (
        normalize(first.district) ===
        normalize(second.district)
    ) {
        return 25;
    }

    return 100;
}

function compareIncidents(first, second) {
    const structuredScore =
        calculateStructuredScore(first, second);

    const moScore =
        calculateMOScore(first, second);

    const temporalScore =
        calculateTemporalScore(first, second);

    const geographicScore =
        calculateGeographicScore(first, second);

    const matchScore = clampScore(
        structuredScore * WEIGHTS.structured +
        moScore * WEIGHTS.mo +
        temporalScore * WEIGHTS.temporal +
        geographicScore * WEIGHTS.geographic
    );

    const reasons = [];

    if (
        normalize(first.crime_type) ===
        normalize(second.crime_type)
    ) {
        reasons.push('same crime type');
    }

    if (
        normalize(first.location_type) ===
        normalize(second.location_type)
    ) {
        reasons.push('same location type');
    }

    if (
        Number(first.suspect_count) ===
        Number(second.suspect_count)
    ) {
        reasons.push('matching suspect count');
    }

    if (
        normalize(first.vehicle_type) ===
        normalize(second.vehicle_type)
    ) {
        reasons.push('matching vehicle type');
    }

    if (moScore >= 60) {
        reasons.push('similar modus operandi');
    }

    if (temporalScore >= 70) {
        reasons.push('similar incident timing');
    }

    if (
        normalize(first.district) !==
        normalize(second.district)
    ) {
        reasons.push('cross-district occurrence');
    }

    return {
        structured_score: structuredScore,
        mo_score: moScore,
        temporal_score: temporalScore,
        geographic_score: geographicScore,
        match_score: matchScore,
        match_reasons: reasons.join('; ')
    };
}

function buildCandidateGroups(rows) {
    const adjacency = new Map();
    const comparisons = new Map();

    for (const incident of rows) {
        adjacency.set(
            incident.incident_id,
            new Set()
        );
    }

    for (let firstIndex = 0;
        firstIndex < rows.length;
        firstIndex++) {

        for (let secondIndex = firstIndex + 1;
            secondIndex < rows.length;
            secondIndex++) {

            const first = rows[firstIndex];
            const second = rows[secondIndex];

            const comparison = compareIncidents(
                first,
                second
            );

            const firstKey =
                `${first.incident_id}:${second.incident_id}`;

            const secondKey =
                `${second.incident_id}:${first.incident_id}`;

            comparisons.set(firstKey, comparison);
            comparisons.set(secondKey, comparison);

            if (
                comparison.match_score >=
                MATCH_THRESHOLD
            ) {
                adjacency
                    .get(first.incident_id)
                    .add(second.incident_id);

                adjacency
                    .get(second.incident_id)
                    .add(first.incident_id);
            }
        }
    }

    const rowMap = new Map(
        rows.map(row => [
            row.incident_id,
            row
        ])
    );

    const visited = new Set();
    const groups = [];

    for (const incident of rows) {
        if (visited.has(incident.incident_id)) {
            continue;
        }

        const queue = [incident.incident_id];
        const componentIds = [];

        visited.add(incident.incident_id);

        while (queue.length > 0) {
            const current = queue.shift();

            componentIds.push(current);

            const neighbours =
                adjacency.get(current) || new Set();

            for (const neighbour of neighbours) {
                if (!visited.has(neighbour)) {
                    visited.add(neighbour);
                    queue.push(neighbour);
                }
            }
        }

        const group = componentIds
            .map(id => rowMap.get(id))
            .filter(Boolean);

        const districts = new Set(
            group.map(item => item.district)
        );

        if (
            group.length >= MIN_PATTERN_INCIDENTS &&
            districts.size >= MIN_PATTERN_DISTRICTS
        ) {
            groups.push(group);
        }
    }

    return {
        groups,
        comparisons
    };
}

function calculateIncidentAssociation(
    incident,
    group,
    comparisons
) {
    const relevantScores = [];

    for (const other of group) {
        if (
            other.incident_id ===
            incident.incident_id
        ) {
            continue;
        }

        const comparison = comparisons.get(
            `${incident.incident_id}:${other.incident_id}`
        );

        if (comparison) {
            relevantScores.push(comparison);
        }
    }

    const average = key => {
        if (relevantScores.length === 0) {
            return 0;
        }

        return clampScore(
            relevantScores.reduce(
                (sum, item) => sum + item[key],
                0
            ) / relevantScores.length
        );
    };

    const reasonSet = new Set();

    for (const score of relevantScores) {
        String(score.match_reasons)
            .split(';')
            .map(reason => reason.trim())
            .filter(Boolean)
            .forEach(reason => reasonSet.add(reason));
    }

    return {
        structured_score:
            average('structured_score'),

        mo_score:
            average('mo_score'),

        temporal_score:
            average('temporal_score'),

        geographic_score:
            average('geographic_score'),

        match_score:
            average('match_score'),

        match_reasons:
            [...reasonSet].join('; ')
    };
}

function calculatePatternScores(associations) {
    const average = key => {
        if (associations.length === 0) {
            return 0;
        }

        return clampScore(
            associations.reduce(
                (sum, item) => sum + item[key],
                0
            ) / associations.length
        );
    };

    return {
        structured_score:
            average('structured_score'),

        mo_score:
            average('mo_score'),

        temporal_score:
            average('temporal_score'),

        geographic_score:
            average('geographic_score'),

        pattern_score:
            average('match_score')
    };
}

function getConfidenceLabel(score) {
    if (score >= 85) {
        return 'HIGH';
    }

    if (score >= 70) {
        return 'MEDIUM';
    }

    return 'LOW';
}

function getDominantCrimeType(group) {
    const crimeTypes = new Map();

    for (const incident of group) {
        const crimeType = normalize(
            incident.crime_type
        );

        crimeTypes.set(
            crimeType,
            (crimeTypes.get(crimeType) || 0) + 1
        );
    }

    return [...crimeTypes.entries()]
        .sort((first, second) =>
            second[1] - first[1]
        )[0][0];
}

function buildPatternName(crimeType) {
    if (crimeType === 'BURGLARY_NIGHT') {
        return 'Cross-Jurisdiction Night Burglary Pattern';
    }

    return `Cross-Jurisdiction ${crimeType} Pattern`;
}

function getCurrentCatalystDateTime() {
    const now = new Date();

    const pad = value =>
        String(value).padStart(2, '0');

    return [
        now.getFullYear(),
        '-',
        pad(now.getMonth() + 1),
        '-',
        pad(now.getDate()),
        ' ',
        pad(now.getHours()),
        ':',
        pad(now.getMinutes()),
        ':',
        pad(now.getSeconds())
    ].join('');
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async (req, res) => {
    res.setHeader(
        'Content-Type',
        'application/json'
    );

    try {
        const app = catalyst.initialize(
            req,
            { scope: 'admin' }
        );

        if (
            req.method === 'POST' &&
            req.url === '/seed-incidents'
        ) {
            const incidentTable = app
                .datastore()
                .table('Incidents');

            const insertedRows =
                await incidentTable.insertRows(
                    incidents
                );

            res.writeHead(201);

            res.end(JSON.stringify({
                success: true,
                dataset_type: 'CONTROLLED_SYNTHETIC',
                message:
                    '12 TRINETRA prototype incidents inserted successfully',
                inserted_count: insertedRows.length
            }));

            return;
        }

        if (
            req.method === 'POST' &&
            req.url === '/analyze-patterns'
        ) {
            const existingPatternResponse = await app
                .zcql()
                .executeZCQLQuery(
                    "SELECT * FROM CrimePatterns WHERE pattern_status = 'SYSTEM_DETECTED'"
                );

            if (existingPatternResponse.length > 0) {
                res.writeHead(409);

                res.end(JSON.stringify({
                    success: false,
                    message:
                        'System-detected pattern data already exists. Analysis was not repeated.'
                }));

                return;
            }

            const incidentResponse = await app
                .zcql()
                .executeZCQLQuery(
                    "SELECT * FROM Incidents WHERE verification_status = 'VERIFIED'"
                );

            const verifiedIncidents =
                incidentResponse.map(result =>
                    result.Incidents || result
                );

            const {
                groups,
                comparisons
            } = buildCandidateGroups(
                verifiedIncidents
            );

            if (groups.length === 0) {
                res.writeHead(200);

                res.end(JSON.stringify({
                    success: true,
                    analysis_version:
                        ANALYSIS_VERSION,
                    patterns_detected: 0,
                    alerts_generated: 0,
                    message:
                        'No qualifying cross-district patterns detected'
                }));

                return;
            }

            const crimePatternTable = app
                .datastore()
                .table('CrimePatterns');

            const patternIncidentTable = app
                .datastore()
                .table('PatternIncidents');

            const alertTable = app
                .datastore()
                .table('IntelligenceAlerts');

            const generatedPatterns = [];
            let alertCount = 0;

            for (
                let index = 0;
                index < groups.length;
                index++
            ) {
                const group = groups[index];

                const patternId =
                    `PAT-${String(index + 1)
                        .padStart(3, '0')}`;

                const associations = group.map(
                    incident => ({
                        incident,
                        scores:
                            calculateIncidentAssociation(
                                incident,
                                group,
                                comparisons
                            )
                    })
                );

                const patternScores =
                    calculatePatternScores(
                        associations.map(
                            item => item.scores
                        )
                    );

                const districts = new Set(
                    group.map(item => item.district)
                );

                const dominantCrimeType =
                    getDominantCrimeType(group);

                const linkedReasons = new Set();

                for (
                    const association of associations
                ) {
                    String(
                        association.scores.match_reasons
                    )
                        .split(';')
                        .map(reason => reason.trim())
                        .filter(Boolean)
                        .forEach(reason =>
                            linkedReasons.add(reason)
                        );
                }

                const now =
                    getCurrentCatalystDateTime();

                await crimePatternTable.insertRows([
                    {
                        pattern_id: patternId,

                        pattern_name:
                            buildPatternName(
                                dominantCrimeType
                            ),

                        crime_type:
                            dominantCrimeType,

                        pattern_score:
                            patternScores.pattern_score,

                        structured_score:
                            patternScores.structured_score,

                        mo_score:
                            patternScores.mo_score,

                        temporal_score:
                            patternScores.temporal_score,

                        geographic_score:
                            patternScores.geographic_score,

                        analysis_confidence:
                            getConfidenceLabel(
                                patternScores.pattern_score
                            ),

                        why_linked:
                            [...linkedReasons].join('; '),

                        pattern_scope:
                            'CROSS_DISTRICT',

                        pattern_status:
                            'SYSTEM_DETECTED',

                        incident_count:
                            group.length
                    }
                ]);

                const patternIncidentRows =
                    associations.map(
                        association => ({
                            pattern_id:
                                patternId,

                            incident_id:
                                association.incident
                                    .incident_id,

                            structured_score:
                                association.scores
                                    .structured_score,

                            mo_score:
                                association.scores
                                    .mo_score,

                            temporal_score:
                                association.scores
                                    .temporal_score,

                            geographic_score:
                                association.scores
                                    .geographic_score,

                            match_reasons:
                                association.scores
                                    .match_reasons,

                            association_status:
                                'SYSTEM_SUGGESTED',

                            added_at:
                                now,

                            analysis_version:
                                ANALYSIS_VERSION,

                            match_score:
                                association.scores
                                    .match_score
                        })
                    );

                await patternIncidentTable.insertRows(
                    patternIncidentRows
                );

                if (
                    patternScores.pattern_score >=
                        PATTERN_THRESHOLD &&
                    districts.size >=
                        MIN_PATTERN_DISTRICTS
                ) {
                    alertCount++;

                    const alertId =
                        `ALT-${String(alertCount)
                            .padStart(3, '0')}`;

                    await alertTable.insertRows([
                        {
                            alert_id:
                                alertId,

                            pattern_id:
                                patternId,

                            alert_title:
                                'Cross-Jurisdiction Crime Pattern Detected',

                            alert_type:
                                'CROSS_JURISDICTION_PATTERN',

                            severity:
                                patternScores.pattern_score >= 90
                                    ? 'HIGH'
                                    : 'MEDIUM',

                            alert_scope:
                                'STATE_INTELLIGENCE',

                            alert_reason:
                                `${group.length} associated incidents detected across ${districts.size} districts with a pattern score of ${patternScores.pattern_score}.`,

                            pattern_score:
                                patternScores.pattern_score,

                            incident_count:
                                group.length,

                            district_count:
                                districts.size,

                            alert_status:
                                'OPEN',

                            created_at:
                                now
                        }
                    ]);
                }

                generatedPatterns.push({
                    pattern_id:
                        patternId,

                    crime_type:
                        dominantCrimeType,

                    incident_ids:
                        group.map(
                            item => item.incident_id
                        ),

                    district_count:
                        districts.size,

                    scores:
                        patternScores
                });
            }

            res.writeHead(201);

            res.end(JSON.stringify({
                success: true,
                analysis_version:
                    ANALYSIS_VERSION,
                patterns_detected:
                    generatedPatterns.length,
                alerts_generated:
                    alertCount,
                patterns:
                    generatedPatterns
            }));

            return;
        }

                if (
            req.method === 'GET' &&
            req.url === '/intelligence-overview'
        ) {
            const incidentResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM Incidents'
                );

            const patternResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM CrimePatterns'
                );

            const alertResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM IntelligenceAlerts'
                );

            const incidentsData = incidentResponse.map(
                result => result.Incidents || result
            );

            const patternsData = patternResponse.map(
                result => result.CrimePatterns || result
            );

            const alertsData = alertResponse.map(
                result => result.IntelligenceAlerts || result
            );

            const districts = new Set(
                incidentsData.map(
                    incident => incident.district
                )
            );

            const verifiedIncidents = incidentsData.filter(
                incident =>
                    normalize(
                        incident.verification_status
                    ) === 'VERIFIED'
            );

            const openAlerts = alertsData.filter(
                alert =>
                    normalize(alert.alert_status) === 'OPEN'
            );

            const highSeverityAlerts = alertsData.filter(
                alert =>
                    normalize(alert.severity) === 'HIGH'
            );

            const averageDataQuality =
                incidentsData.length === 0
                    ? 0
                    : clampScore(
                        incidentsData.reduce(
                            (sum, incident) =>
                                sum +
                                Number(
                                    incident.data_quality_score || 0
                                ),
                            0
                        ) / incidentsData.length
                    );

            res.writeHead(200);

            res.end(JSON.stringify({
                success: true,

                overview: {
                    total_incidents:
                        incidentsData.length,

                    verified_incidents:
                        verifiedIncidents.length,

                    districts_covered:
                        districts.size,

                    patterns_detected:
                        patternsData.length,

                    total_alerts:
                        alertsData.length,

                    open_alerts:
                        openAlerts.length,

                    high_severity_alerts:
                        highSeverityAlerts.length,

                    average_data_quality:
                        averageDataQuality
                }
            }));

            return;
        }

        if (
            req.method === 'GET' &&
            req.url === '/patterns'
        ) {
            const patternResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM CrimePatterns'
                );

            const associationResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM PatternIncidents'
                );

            const incidentResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM Incidents'
                );

            const patternsData = patternResponse.map(
                result => result.CrimePatterns || result
            );

            const associationsData =
                associationResponse.map(
                    result =>
                        result.PatternIncidents || result
                );

            const incidentsData = incidentResponse.map(
                result => result.Incidents || result
            );

            const incidentMap = new Map(
                incidentsData.map(
                    incident => [
                        incident.incident_id,
                        incident
                    ]
                )
            );

            const patterns = patternsData.map(pattern => {
                const associations =
                    associationsData.filter(
                        association =>
                            association.pattern_id ===
                            pattern.pattern_id
                    );

                const linkedIncidents =
                    associations.map(association => ({
                        ...incidentMap.get(
                            association.incident_id
                        ),

                        association: {
                            structured_score:
                                Number(
                                    association.structured_score
                                ),

                            mo_score:
                                Number(
                                    association.mo_score
                                ),

                            temporal_score:
                                Number(
                                    association.temporal_score
                                ),

                            geographic_score:
                                Number(
                                    association.geographic_score
                                ),

                            match_score:
                                Number(
                                    association.match_score
                                ),

                            match_reasons:
                                association.match_reasons,

                            association_status:
                                association.association_status,

                            analysis_version:
                                association.analysis_version
                        }
                    }));

                const districts = [
                    ...new Set(
                        linkedIncidents.map(
                            incident => incident.district
                        )
                    )
                ];

                return {
                    ...pattern,

                    pattern_score:
                        Number(pattern.pattern_score),

                    structured_score:
                        Number(pattern.structured_score),

                    mo_score:
                        Number(pattern.mo_score),

                    temporal_score:
                        Number(pattern.temporal_score),

                    geographic_score:
                        Number(pattern.geographic_score),

                    incident_count:
                        Number(pattern.incident_count),

                    district_count:
                        districts.length,

                    districts,

                    incidents:
                        linkedIncidents
                };
            });

            res.writeHead(200);

            res.end(JSON.stringify({
                success: true,
                count: patterns.length,
                patterns
            }));

            return;
        }

        if (
            req.method === 'GET' &&
            req.url === '/alerts'
        ) {
            const alertResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM IntelligenceAlerts'
                );

            const alerts = alertResponse.map(result => {
                const alert =
                    result.IntelligenceAlerts || result;

                return {
                    ...alert,

                    pattern_score:
                        Number(alert.pattern_score),

                    incident_count:
                        Number(alert.incident_count),

                    district_count:
                        Number(alert.district_count),

                    acknowledged:
                        Boolean(
                            alert.acknowledged_by &&
                            alert.acknowledged_at
                        )
                };
            });

            res.writeHead(200);

            res.end(JSON.stringify({
                success: true,
                count: alerts.length,
                alerts
            }));

            return;
        }

                if (
            req.method === 'GET' &&
            req.url === '/incidents'
        ) {
            const incidentResponse = await app
                .zcql()
                .executeZCQLQuery(
                    'SELECT * FROM Incidents'
                );

            const incidents = incidentResponse.map(result => {
                const incident =
                    result.Incidents || result;

                return {
                    incident_id:
                        incident.incident_id,

                    fir_number:
                        incident.fir_number,

                    district:
                        incident.district,

                    police_station:
                        incident.police_station,

                    crime_type:
                        incident.crime_type,

                    incident_datetime:
                        incident.incident_datetime,

                    location:
                        incident.location,

                    location_type:
                        incident.location_type,

                    description:
                        incident.description,

                    modus_operandi:
                        incident.modus_operandi,

                    suspect_count:
                        Number(
                            incident.suspect_count || 0
                        ),

                    weapon_type:
                        incident.weapon_type,

                    vehicle_type:
                        incident.vehicle_type,

                    source_type:
                        incident.source_type,

                    verification_status:
                        incident.verification_status,

                    data_quality_score:
                        Number(
                            incident.data_quality_score || 0
                        )
                };
            });

            res.writeHead(200);

            res.end(JSON.stringify({
                success: true,
                count: incidents.length,
                incidents
            }));

            return;
        }

        res.writeHead(404);

        res.end(JSON.stringify({
            success: false,
            message:
                'Available routes: POST /seed-incidents, POST /analyze-patterns, GET /intelligence-overview, GET /patterns, GET /alerts'
        }));
    } catch (error) {
        console.error(
            'TRINETRA function error:',
            error
        );

        res.writeHead(500);

        res.end(JSON.stringify({
            success: false,
            error:
                error.message || String(error)
        }));
    }
};