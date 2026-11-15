import type { ProjectDetails } from "./types";

// Source of truth: https://github.com/AlwinVJ/amazon_conveyor_EDA
// Figures are real outputs exported directly from the project's analytical notebooks and reports.
const images = import.meta.glob<{ default: string }>(
  "../../assets/projects/amazon-conveyor/*.png",
  { eager: true },
);

const fig = (name: string) =>
  images[`../../assets/projects/amazon-conveyor/${name}`]?.default ||
  `${import.meta.env.BASE_URL}projects/amazon-conveyor/${name}`;

export const amazonConveyor: ProjectDetails = {
  overview: {
    body: [
      "Amazon Conveyor Alarm Analysis (EDA) is a comprehensive, evidence-based Exploratory Data Analysis and Root Cause Investigation of the Pick to Rebin (P2R) automated conveyor sorting system at an Amazon fulfillment center.",
      "In modern high-velocity e-commerce logistics, automated conveyor lines sort and dispatch tens of thousands of packages each hour between pick towers and rebin induct stations. Unplanned conveyor downtime and recurring lane jams directly degrade package sorting velocity, inflate operating costs, risk customer delivery SLAs, and create substantial technician overtime.",
      "The investigation evaluates 9,686 SCADA (Supervisory Control and Data Acquisition) alarm logs recorded across four consecutive operational days on three warehouse floors: P2, P3, and P4. By synthesizing exploratory telemetry analytics, spatial bottleneck mapping, cumulative downtime profiling, and systems engineering Root Cause Analysis (Ishikawa Fishbone and 5 Whys), this study delivers actionable engineering recommendations and an executive operational framework.",
    ],
  },
  problem: {
    body: [
      "Warehouse operational teams previously faced high alarm fatigue from thousands of daily SCADA notifications without clear visibility into which events caused actual physical stoppages versus benign lane fullness signals. Conveyor maintenance had become predominantly reactive rather than data-driven and preventive.",
      "The primary analytical challenge is identifying the underlying mechanical, spatial, and process bottlenecks responsible for conveyor downtime, evaluating operational disparities across warehouse floors, and establishing targeted interventions to maximize throughput.",
    ],
    bullets: [
      "Quantify total SCADA alarm volume across 9,686 records and categorize alarms into functional operational classes",
      "Identify the most frequently occurring alarm types and apply the Pareto principle to isolate the vital few",
      "Map alarm frequency and critical failure points to physical conveyor lines (2400, 2600, 2800) and specific photo-eye (PEC) sensors",
      "Compare operational burden and downtime across warehouse levels P2, P3, and P4 to detect floor-specific disparities",
      "Rank alarms by cumulative downtime to determine whether high-frequency alerts correspond to the largest operational disruptions",
      "Perform systems engineering Root Cause Analysis using an Ishikawa (Fishbone) diagram and 5 Whys drill-down on dominant jam modes",
      "Formulate actionable engineering recommendations spanning dynamic flow routing, induct throttling, and predictive maintenance",
    ],
  },
  researchQuestions: {
    body: [
      "The exploratory analysis and root cause investigation were structured around seven central operational questions:",
    ],
    bullets: [
      "RQ1 (Alarm Frequency): Which alarm types occur most frequently across the fulfillment center's SCADA logs?",
      "RQ2 (Spatial Bottlenecks): Which physical conveyor lines, subsystems, and sensor locations generate the highest concentration of alarms?",
      "RQ3 (Floor Variations): How do alarm frequency, congestion patterns, and operational downtime vary across warehouse floors P2, P3, and P4?",
      "RQ4 (Downtime Drivers): Which specific alarm events contribute the greatest cumulative downtime to system operations?",
      "RQ5 (Operational Classification): What proportion of recorded alarms represents physical equipment breakdowns versus routine congestion indicators?",
      "RQ6 (Root Causes): What are the underlying mechanical, sensor, and operational causes triggering recurring package jams at photo-eye locations?",
      "RQ7 (Corrective Actions): What data-driven engineering improvements, flow-control strategies, and maintenance schedules will minimize unplanned stoppages?",
    ],
  },
  dataset: {
    body: [
      "Primary Dataset: Four consecutive operational days of SCADA telemetry logs collected from the Pick to Rebin (P2R) conveyor system across warehouse floors P2, P3, and P4, encompassing 9,686 total event records.",
      "Core Telemetry Attributes: Timestamp (precise event trigger time), Alarm Duration (active duration recorded in seconds, converted to decimal minutes and hours), Alarm Name (standardized SCADA alert designation), Priority (operational severity classification), Device Description and Device Type (sensors, motors, lane conveyors, scanners), and Display Path (hierarchical PLC physical location string).",
      "Functional Classification Taxonomy: To differentiate routine traffic monitoring from equipment failures, alarms were categorized into three distinct operational groups: Congestion Indicators (9,202 alarms / 95.00%), Operational Events (325 alarms / 3.36%), and Critical Faults (159 alarms / 1.64%).",
      "Data Integrity: Evaluated schema consistency, record completeness, and missing values. Zero record loss occurred during preprocessing, confirming a high-fidelity telemetry foundation for analysis.",
    ],
    images: [
      {
        src: fig("alarm-type-distribution.png"),
        caption:
          "Figure 1: Overall Composition of SCADA Alarm Events by Category — Congestion Indicators (95.0%), Operational Events (3.36%), and Critical Faults (1.64%).",
      },
    ],
  },
  workflow: {
    body: [
      "The project adheres to a structured 6-stage engineering and analytics workflow, ensuring reproducible transformations from raw SCADA logs into actionable maintenance protocols.",
    ],
    steps: [
      "Data Ingestion & Validation: Ingested multi-floor SCADA telemetry logs; validated schema definitions, timestamps, and record uniqueness.",
      "Data Cleaning & Preprocessing: Standardized datetime formats, derived duration metrics in minutes and hours, and tokenized hierarchical DisplayPath strings.",
      "Alarm Taxonomy Classification: Categorized raw SCADA alarms into Congestion Indicators, Critical Faults, and Operational Events.",
      "Exploratory Data Analysis: Conducted univariate frequency, Pareto, spatial location, floor-wise comparative, and cumulative downtime analyses.",
      "Root Cause Analysis (RCA): Executed Ishikawa (Fishbone) diagramming across 6 engineering dimensions and 5 Whys drill-down on dominant failure modes.",
      "Actionable Recommendations: Formulated data-driven proposals for dynamic routing, induct throttling, predictive maintenance, and alarm threshold tuning.",
    ],
  },
  preprocessing: {
    body: [
      "A rigorous preprocessing pipeline was executed across the SCADA logs to transform raw machine records into an analytics-ready dataset.",
    ],
    steps: [
      "Multi-Floor Log Aggregation: Combined raw CSV telemetry extracts across floors P2, P3, and P4 into a unified analytical dataframe while preserving floor metadata.",
      "Timestamp Parsing: Converted raw timestamp strings into pandas datetime64 objects to enable time-series indexing and interval calculations.",
      "Duration Metric Normalization: Normalized raw alarm duration values from seconds into fractional minutes and hours for meaningful operational downtime aggregation.",
      "DisplayPath Decomposition: Parsed the SCADA DisplayPath string (e.g., 'PLC2600_2600_9_3_SR/OPC/ER_PEC_71_Blockage/PEC 71 Blockage') into conveyor line (2400, 2600, 2800), subsystem zone, and specific photo-eye sensor ID (PEC 71, PEC 31).",
      "Functional Alarm Categorization: Developed rule-based classification logic mapping every distinct alarm code into Congestion Indicators, Operational Events, or Critical Faults.",
      "Data Quality Audit: Confirmed absence of duplicate entries and verified that duration distributions aligned with physical conveyor operating parameters.",
    ],
  },
  eda: {
    body: [
      "The exploratory data analysis phase investigated the telemetry data across multiple operational dimensions to isolate the core drivers of conveyor downtime.",
    ],
    subsections: [
      {
        title: "1. Alarm Frequency and Pareto Analysis",
        body: [
          "Analysis of the complete 9,686 SCADA alarm events reveals that activity is heavily dominated by lane occupancy signals rather than equipment breakdowns. Congestion Indicators account for 9,202 alarms (95.00%), Operational Events represent 325 alarms (3.36%), and Critical Faults account for only 159 alarms (1.64%).",
          "The top recorded alarms are dominated by 'Full 50%', 'Full 75%', and 'Full 100%' occupancy triggers on the 2600 and 2400 conveyor systems. Lane 2600.21.13 recorded the highest individual frequency with 1,012 alarms (10.45%), followed by Lane 2600.21.6 with 910 alarms (9.40%) and Lane 2600.21.1 with 875 alarms (9.03%).",
          "Applying the Pareto principle demonstrates that a small subset of congestion-related alarm types contributes to approximately 80% of all recorded events across all three floors, demonstrating that conveyor congestion is a warehouse-wide operational dynamic rather than an isolated hardware failure.",
        ],
        images: [
          {
            src: fig("overall-alarm-frequency.png"),
            caption:
              "Figure 2: Top 15 Overall Alarm Frequencies — Dominated by lane occupancy indicators across the 2600 and 2400 conveyor lines.",
          },
          {
            src: fig("pareto-chart-alarm-types.png"),
            caption:
              "Figure 3: Pareto Analysis of SCADA Alarm Types — Demonstrating that ~80% of all alarm occurrences stem from a vital few occupancy signals.",
          },
        ],
      },
      {
        title: "2. Congestion Indicators vs. Critical Equipment Faults",
        body: [
          "To avoid obscuring mechanical equipment failures beneath thousands of routine congestion alerts, critical faults were isolated and analyzed independently.",
          "Within the 159 recorded Critical Fault events, 'Jam PEC 71' is the overwhelmingly dominant failure mode, accounting for 140 alarms (88.05% of all critical faults). In contrast, secondary faults such as 'Jam PEC 31' (10 alarms), 'LMS Not Automatic' (2 alarms), and 'LMS Not Healthy' (2 alarms) occur infrequently.",
          "This concentration proves that physical conveyor blockages are highly specific to photo-eye sensor location PEC 71, providing a clear focal point for engineering and maintenance intervention.",
        ],
        images: [
          {
            src: fig("congestion-indicator-frequency.png"),
            caption:
              "Figure 4: Congestion Indicator Alarm Frequency — Progressive lane accumulation patterns across fulfillment center conveyor lines.",
          },
          {
            src: fig("critical-alarm-frequency.png"),
            caption:
              "Figure 5: Critical Fault Alarm Frequencies — Jam PEC 71 represents 88.05% of all mechanical conveyor fault events.",
          },
        ],
      },
      {
        title: "3. Spatial Analysis & High-Risk Conveyor Locations",
        body: [
          "Mapping alarm occurrences to physical conveyor subsystems reveals severe spatial clustering. The 2600 conveyor system is the highest-risk operational segment in the facility, generating the largest overall alarm count led by Lane 2600.21.13 (1,012 alarms) and Lane 2600.21.6 (910 alarms).",
          "Examining critical faults specifically, the worst-performing physical location is photo-eye PEC 71 on the 2600 line ('PLC2600_2600_9_3_SR/OPC/ER_PEC_71_Blockage'), which recorded 22 critical blockage alarms.",
          "Other notable critical locations include PEC 71 on the 2800 line (12 alarms), PEC 31 on the 2800 line (10 alarms), and PEC 71 on the 2400 line (7 alarms). The recurring presence of PEC 71 across all three conveyor lines highlights a shared structural vulnerability in conveyor transition geometry.",
        ],
        images: [
          {
            src: fig("top-conveyor-locations.png"),
            caption:
              "Figure 6: Top 15 Conveyor Locations by Overall Alarm Frequency — High concentration on the 2600 conveyor system.",
          },
          {
            src: fig("top-locations-by-floor.png"),
            caption:
              "Figure 7: Top Conveyor Locations on Each Floor — Demonstrating consistent accumulation patterns across warehouse levels.",
          },
          {
            src: fig("critical-fault-locations.png"),
            caption:
              "Figure 8: Worst Conveyor Locations for Critical Indicator Alarms — PEC 71 on the 2600 system represents the highest mechanical failure risk.",
          },
        ],
      },
      {
        title: "4. Floor-wise Performance & Downtime Divergence",
        body: [
          "Aggregating telemetry by warehouse level demonstrates that Floor P3 experienced the highest overall alarm volume, accounting for 3,710 alarms (38.30%), closely followed by Floor P2 with 3,662 alarms (37.81%). Floor P4 recorded significantly lower activity with 2,314 alarms (23.89%).",
          "However, comparing alarm frequency against cumulative operational downtime uncovered a striking operational divergence: despite P3 generating the highest alarm count, P2 suffered the greatest cumulative downtime (57.66 hours), followed by P4 (52.03 hours). P3 generated only 37.45 hours of downtime.",
          "Furthermore, Floor P2 experienced the highest volume of critical equipment faults (61 alarms), compared to 53 on P3 and 45 on P4. This divergence underscores that alarm count is an inadequate measure of operational impact; alarms occurring on P2 and P4 result in substantially longer operational stoppages.",
        ],
        images: [
          {
            src: fig("floor-alarm-distribution.png"),
            caption:
              "Figure 9: Overall SCADA Alarm Distribution by Warehouse Floor — P3 (38.30%) and P2 (37.81%) account for the majority of events.",
          },
          {
            src: fig("floor-downtime-distribution.png"),
            caption:
              "Figure 10: Cumulative Operational Downtime by Warehouse Floor — P2 accounts for 57.66 hours despite having fewer alarms than P3.",
          },
        ],
      },
      {
        title: "5. Downtime and Bottleneck Drivers",
        body: [
          "Ranking alarms by cumulative operational downtime reveals the true operational bottlenecks of the P2R system.",
          "The single largest downtime contributor is the 'Cracked Belt Detection - Intervention Required' alarm on Floor P2, which accumulated 3,968.75 minutes (~66.15 hours) of downtime. This catastrophic mechanical failure alone accounted for approximately 45% of total system downtime across the 4-day observation window.",
          "Beyond belt failure, ongoing daily operational halts are driven by Lane Full 100% accumulation alarms (ranging from 450 to 766 minutes each across lines 2600, 2400, and 2800) and recurring Jam PEC 71 blockages, which accumulated 439.78 minutes (7.33 hours) of downtime.",
        ],
        images: [
          {
            src: fig("total-downtime-by-alarm.png"),
            caption:
              "Figure 11: Top Downtime-Contributing Alarms — Dominated by the Cracked Belt Detection event (66.15 hours) and 100% Lane Full accumulation.",
          },
          {
            src: fig("critical-fault-downtime.png"),
            caption:
              "Figure 12: Critical Fault Alarms by Total Downtime — Jam PEC 71 accounts for 439.78 minutes of cumulative operational downtime.",
          },
        ],
      },
    ],
  },
  statisticalAnalysis: {
    body: [
      "To trace observed telemetry patterns back to root causes, structured systems engineering methodologies were applied to the conveyor operations.",
      "The Ishikawa (Fishbone) diagram categorizes potential root causes across six core engineering dimensions: Machine (belt micro-cracking, drive chain slackness, photo-eye lens dirt), Method (absence of dynamic routing, static induct rates), Material (non-standard parcel dimensions, damaged cardboard), Milieu (warehouse dust, ambient temperature shifts), Man (manual jam recovery delays, operator alarm fatigue), and Measurement (overly sensitive occupancy delay timers).",
      "Applying the 5 Whys framework to recurring blockages at PEC 71 demonstrates that physical jams are symptoms of upstream flow imbalances rather than isolated component failures: Conveyor stops -> Packages accumulate at PEC 71 -> Downstream segment cannot clear parcels -> Sustained lane saturation occurs -> High conveyor utilization combined with lack of dynamic SCADA divert logic across floors.",
    ],
    images: [
      {
        src: fig("fishbone-diagram.png"),
        caption:
          "Figure 13: Ishikawa (Fishbone) Diagram — Systems root cause analysis of conveyor jams and operational downtime across engineering dimensions.",
      },
    ],
  },
  results: {
    body: [
      "The exploratory analysis and root cause investigation yielded five key operational findings:",
    ],
    bullets: [
      "Congestion Dominance: 95.00% of all SCADA alarms (9,202 events) represent congestion indicators ('Lane Full' alerts), proving that managing conveyor saturation is the primary operational challenge, whereas true mechanical breakdowns represent only 1.64% of events.",
      "Singular Critical Fault Focus: 'Jam PEC 71' accounts for 140 of the 159 critical equipment faults (88.05%), identifying photo-eye 71 as the primary point of physical package blockages.",
      "Spatial Vulnerability on Line 2600: The 2600 conveyor system generates the highest alarm count (led by Lane 2600.21.13 with 1,012 alarms) and holds the worst critical failure point (PEC 71 on 2600 with 22 critical jams).",
      "Frequency vs. Downtime Inversion: While Floor P3 records the highest alarm count (3,710 / 38.30%), Floor P2 suffers the highest cumulative downtime (57.66 hours) and the most critical faults (61), proving that alarm volume alone is misleading.",
      "Catastrophic Single-Point Impact: A single 'Cracked Belt Detection' event on Floor P2 contributed 66.15 hours of downtime (45% of total facility downtime), demonstrating the high ROI of preventive belt wear monitoring.",
    ],
  },
  recommendations: {
    body: [
      "Based on empirical findings, actionable engineering and operational recommendations were developed across four functional domains:",
    ],
    subsections: [
      {
        title: "1. Operational Flow Improvements",
        bullets: [
          "Dynamic SCADA Flow Balancing: Implement automated divert logic to balance package flows from the heavily congested P3 floor (3,710 alarms) to the underutilized P4 floor (2,314 alarms) during peak volume hours.",
          "Automated Induct Throttling: Program automated induct speed throttling when downstream Full 75% or Full 100% occupancy alarms trigger, preventing parcel pileups and mechanical jams.",
        ],
      },
      {
        title: "2. Targeted Preventive Maintenance",
        bullets: [
          "Daily PEC 71 Alignment & Cleaning: Establish prioritized daily inspections and optical cleaning for PEC 71 sensors across lines 2600, 2800, and 2400 to eliminate the 140 recurring jam faults.",
          "Preemptive Belt Wear Testing: Standardize ultrasonic and visual belt crack inspections on Floor P2 to detect micro-tears prior to catastrophic 66-hour failure events.",
          "Drive Chain Tensioning Schedules: Institute bi-weekly tensioning protocols targeting the 296 recorded slack chain alerts to prevent chain slippage and motor trips.",
        ],
      },
      {
        title: "3. SCADA Monitoring & Alarm Optimization",
        bullets: [
          "Fine-Tune Occupancy Alarm Delays: Increase SCADA filter delay timers on 'Lane Full 50%' and '75%' alerts (e.g., from 5s to 15s) to ignore transient package waves and alleviate operator alarm fatigue.",
          "Automated LMS Heartbeat Pings: Configure continuous diagnostic polling for LMS controllers (specifically LMS_12) to detect communication drops prior to operational disruptions.",
        ],
      },
      {
        title: "4. Telemetry & Data Collection Enhancements",
        bullets: [
          "Log Jam Clearing MTTR: Update SCADA logic to timestamp the duration from jam trigger to manual reset, providing precise Mean Time to Repair (MTTR) metrics.",
          "CMMS Work Order Integration: Integrate SCADA alarm logs with maintenance management systems to tag technician corrective actions directly to specific alarm instances.",
        ],
      },
    ],
  },
  learnings: {
    body: [
      "The Amazon Conveyor SCADA Alarm Analysis provides core insights applicable across industrial automation, telemetry engineering, and operations research:",
    ],
    bullets: [
      "Frequency Does Not Equal Severity: Evaluating operational health purely by alarm frequency creates misallocated engineering effort. Alarms occurring thousands of times represented routine occupancy, while a single cracked belt caused 45% of downtime.",
      "Spatial Granularity Enables Precision Maintenance: Decomposing hierarchical PLC display paths isolated the exact photo-eye sensor (PEC 71) responsible for 88% of critical faults, transforming facility-wide guesswork into a targeted maintenance action plan.",
      "Bridging Data Analytics and Systems Engineering: Pairing quantitative exploratory telemetry analysis with structured qualitative root cause methodologies (Fishbone, 5 Whys) provides an actionable roadmap from telemetry data to physical mechanical reliability.",
    ],
  },
};
