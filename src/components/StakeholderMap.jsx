import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes for YieldSync stakeholder map 
const initialNodes = [
  // Core Platform
  {
    id: 'core',
    type: 'input',
    data: { 
      label: 'YIELDSYNC\nGEO AI PROCESSING',
      category: 'Platform',
      description: 'Core AI platform processing satellite and weather data to deliver insights'
    },
    position: { x: 750, y: 50 },
    style: { 
      background: '#1e293b', 
      color: 'white', 
      border: '3px solid #0f172a', 
      borderRadius: '12px', 
      padding: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      minWidth: '200px'
    },
  },
  
  // Data Sources
  {
    id: 'satellite',
    data: { 
      label: 'SATELLITE DATA\n(Sentinel 2, Landsat 8/9)',
      category: 'Data Source',
      description: 'Region-dependent satellite imagery for crop monitoring'
    },
    position: { x: 300, y: 50 },
    style: { background: '#475569', color: 'white', border: '3px solid #334155', borderRadius: '8px', padding: '12px', fontSize: '12px', textAlign: 'center' },
  },
  {
    id: 'weather',
    data: { 
      label: 'WEATHER DATA',
      category: 'Data Source',
      description: 'Real-time and historical weather data for agricultural intelligence'
    },
    position: { x: 1200, y: 50 },
    style: { background: '#475569', color: 'white', border: '3px solid #334155', borderRadius: '8px', padding: '12px', fontSize: '12px', textAlign: 'center' },
  },

  // Main Stakeholder 1: Agribusinesses & Cooperatives
  {
    id: 's1',
    data: { 
      label: 'Agribusinesses &\nCooperatives',
      category: 'Stakeholder Group',
      description: 'Farmers, farm managers, and agronomists using YieldSync tools for day-to-day operations'
    },
    position: { x: 150, y: 200 },
    style: { background: '#10b981', color: 'white', border: '2.75px solid #059669', borderRadius: '10px', padding: '15px', fontWeight: 'bold', minWidth: '180px', textAlign: 'center' },
  },
  {
    id: 's1-users',
    data: { label: 'Users' },
    position: { x: 50, y: 300 },
    style: { background: '#34d399', color: 'white', border: '1.5px solid #10b981', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's1-u1',
    data: { label: 'Farmers' },
    position: { x: 20, y: 380 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-u2',
    data: { label: 'Farm Managers' },
    position: { x: 20, y: 430 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-u3',
    data: { label: 'Agronomists' },
    position: { x: 20, y: 480 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-tools',
    data: { label: 'YieldSync Tools' },
    position: { x: 240, y: 300 },
    style: { background: '#34d399', color: 'white', border: '1.5px solid #10b981', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's1-t1',
    data: { label: 'AgRI SHIELD AI' },
    position: { x: 240, y: 380 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-t2',
    data: { label: 'Field Secure' },
    position: { x: 240, y: 430 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-t3',
    data: { label: 'Farm Diary' },
    position: { x: 240, y: 480 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-t4',
    data: { label: 'Weather Intelligence' },
    position: { x: 240, y: 530 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's1-t5',
    data: { label: 'Specialized Tools for\nAgricultural Excellence' },
    position: { x: 240, y: 580 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's1-problems',
    data: { label: 'Problems to Solve' },
    position: { x: -175, y: 300 },
    style: { background: '#34d399', color: 'white', border: '1.5px solid #10b981', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's1-p1',
    data: { label: 'Late stress detection leading to inconsistent yields' },
    position: { x: -175, y: 380 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's1-p2',
    data: { label: 'Fragmented decision tools' },
    position: { x: -175, y: 430 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's1-solutions',
    data: { label: 'Solutions to Offer' },
    position: { x: 50, y: 630 },
    style: { background: '#34d399', color: 'white', border: '1.5px solid #10b981', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's1-s1',
    data: { label: 'Enables early stress detection & proactive intervention to reduce yield loss' },
    position: { x: 20, y: 710 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's1-s2',
    data: { label: 'Consolidates farm, climate, and field data into one decision layer, eliminating fragmentated tools' },
    position: { x: 20, y: 760 },
    style: { background: '#6ee7b7', color: '#064e3b', border: '1px solid #34d399', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },

  // Main Stakeholder 2: Agri-finance & Insurance 
  {
    id: 's2',
    data: { 
      label: 'Agri-finance &\nInsurance Institutions',
      category: 'Stakeholder Group',
      description: 'Financial institutions assessing ESG, risk, and sustainability in agriculture'
    },
    position: { x: 550, y: 200 },
    style: { background: '#3b82f6', color: 'white', border: '2.75px solid #2563eb', borderRadius: '10px', padding: '15px', fontWeight: 'bold', minWidth: '180px', textAlign: 'center' },
  },
  {
    id: 's2-users',
    data: { label: 'Internal Users' },
    position: { x: 450, y: 300 },
    style: { background: '#60a5fa', color: 'white', border: '1.5px solid #3b82f6', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's2-u1',
    data: { label: 'ESG & Sustainability Teams' },
    position: { x: 420, y: 380 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-u2',
    data: { label: 'Insurance Agents' },
    position: { x: 420, y: 430 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-u3',
    data: { label: 'Risk Analysts' },
    position: { x: 420, y: 480 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-tools',
    data: { label: 'YS Tools' },
    position: { x: 650, y: 300 },
    style: { background: '#60a5fa', color: 'white', border: '1.5px solid #3b82f6', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's2-t1',
    data: { label: 'AgRI SHIELD AI' },
    position: { x: 620, y: 380 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-t2',
    data: { label: 'Macro Yield Intelligence' },
    position: { x: 620, y: 430 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-t3',
    data: { label: 'Environmental Calculators' },
    position: { x: 620, y: 480 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's2-t4',
    data: { label: 'Specialized Tools for\nAgricultural Excellence' },
    position: { x: 620, y: 530 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's2-problems',
    data: { label: 'Problems to Solve' },
    position: { x: 450, y: 600 },
    style: { background: '#60a5fa', color: 'white', border: '1.5px solid #3b82f6', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's2-p1',
    data: { label: 'placeholder' },
    position: { x: 420, y: 680 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's2-p2',
    data: { label: 'placeholder' },
    position: { x: 420, y: 730 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's2-solutions',
    data: { label: 'Solutions to Offer' },
    position: { x: 450, y: 800 },
    style: { background: '#60a5fa', color: 'white', border: '1.5px solid #3b82f6', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's2-s1',
    data: { label: 'placeholder' },
    position: { x: 420, y: 880 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },
  {
    id: 's2-s2',
    data: { label: 'placeholder' },
    position: { x: 420, y: 930 },
    style: { background: '#93c5fd', color: '#1e3a8a', border: '1px solid #60a5fa', borderRadius: '6px', padding: '8px', fontSize: '11px', textAlign: 'center' },
  },

  // Main Stakeholder 3: Food & Commodity Corporates 
  {
    id: 's3',
    data: { 
      label: 'Food & Commodity\nCorporates',
      category: 'Stakeholder Group',
      description: 'Large food companies managing procurement, supply chain, and ESG reporting'
    },
    position: { x: 950, y: 200 },
    style: { background: '#f59e0b', color: 'white', border: '2.75px solid #d97706', borderRadius: '10px', padding: '15px', fontWeight: 'bold', minWidth: '180px', textAlign: 'center' },
  },
  {
    id: 's3-users',
    data: { label: 'Internal Users' },
    position: { x: 850, y: 300 },
    style: { background: '#fbbf24', color: 'white', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's3-u1',
    data: { label: 'Procurement &\nEval Teams' },
    position: { x: 820, y: 380 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '12px', textAlign: 'center' },
  },
  {
    id: 's3-tools',
    data: { label: 'YS Tools' },
    position: { x: 1050, y: 300 },
    style: { background: '#fbbf24', color: 'white', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's3-t1',
    data: { label: 'Micro & Macro Yield\nIntelligence' },
    position: { x: 1020, y: 380 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '12px', textAlign: 'center' },
  },
  {
    id: 's3-t2',
    data: { label: 'BiomeSync Agri Core' },
    position: { x: 1020, y: 445 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's3-t3',
    data: { label: 'Environmental Calculators\n(ESG)' },
    position: { x: 1020, y: 495 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '12px', textAlign: 'center' },
  },
  {
    id: 's3-problems',
    data: { label: 'Problems to Solve' },
    position: { x: 850, y: 580 },
    style: { background: '#fbbf24', color: 'white', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's3-p1',
    data: { label: 'Lack of documentation for yield verification, sustainability reporting, and ESG compliance' },
    position: { x: 820, y: 660 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's3-p2',
    data: { label: 'Fragmented reporting across different systems and stakeholders' },
    position: { x: 820, y: 730 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's3-solutions',
    data: { label: 'Solutions to Offer' },
    position: { x: 850, y: 810 },
    style: { background: '#fbbf24', color: 'white', border: '1.5px solid #f59e0b', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's3-s1',
    data: { label: 'Verifies yield, sustainability, and ESG compliance documentation across networks' },
    position: { x: 820, y: 890 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's3-s2',
    data: { label: 'Improves procurement reliability through predictive yield forecasting and climate risk visibility' },
    position: { x: 820, y: 960 },
    style: { background: '#fde68a', color: '#78350f', border: '1px solid #fbbf24', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },

  // Main Stakeholder 4: Government Agriculture Programs 
  {
    id: 's4',
    data: { 
      label: 'Government\nAgriculture Programs',
      category: 'Stakeholder Group',
      description: 'Government agencies implementing agricultural programs and monitoring compliance'
    },
    position: { x: 1350, y: 200 },
    style: { background: '#8b5cf6', color: 'white', border: '2.75px solid #7c3aed', borderRadius: '10px', padding: '15px', fontWeight: 'bold', minWidth: '180px', textAlign: 'center' },
  },
  {
    id: 's4-users',
    data: { label: 'Internal Users' },
    position: { x: 1250, y: 300 },
    style: { background: '#a78bfa', color: 'white', border: '1.5px solid #8b5cf6', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's4-u1',
    data: { label: 'Field Officers' },
    position: { x: 1220, y: 380 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-u2',
    data: { label: 'Program Implementers' },
    position: { x: 1220, y: 430 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-u3',
    data: { label: 'Outreach Teams' },
    position: { x: 1220, y: 480 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-tools',
    data: { label: 'YS Tools' },
    position: { x: 1450, y: 300 },
    style: { background: '#a78bfa', color: 'white', border: '1.5px solid #8b5cf6', borderRadius: '8px', padding: '10px', fontSize: '13px' },
  },
  {
    id: 's4-t1',
    data: { label: 'Environmental Calculators' },
    position: { x: 1420, y: 380 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-t2',
    data: { label: 'BiomeSync Agri Core' },
    position: { x: 1420, y: 430 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-t3',
    data: { label: 'Macro Yield Intelligence' },
    position: { x: 1420, y: 480 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '12px' },
  },
  {
    id: 's4-problems',
    data: { label: 'Problems to Solve' },
    position: { x: 1250, y: 570 },
    style: { background: '#a78bfa', color: 'white', border: '1.5px solid #8b5cf6', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's4-p1',
    data: { label: 'Limited visibility into program performance at scale' },
    position: { x: 1220, y: 650 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's4-p2',
    data: { label: 'Inconsistent data quality across different regions and time periods' },
    position: { x: 1220, y: 710 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's4-solutions',
    data: { label: 'Solutions to Offer' },
    position: { x: 1250, y: 790 },
    style: { background: '#a78bfa', color: 'white', border: '1.5px solid #8b5cf6', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 'bold' },
  },
  {
    id: 's4-s1',
    data: { label: 'Offers centralized, real-time visibility into program performance across all regions' },
    position: { x: 1220, y: 870 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  },
  {
    id: 's4-s2',
    data: { label: 'Reduces field supervision costs through scalable, data-driven monitoring and impact measurement' },
    position: { x: 1220, y: 940 },
    style: { background: '#c4b5fd', color: '#4c1d95', border: '1px solid #a78bfa', borderRadius: '6px', padding: '8px', fontSize: '11px', maxWidth: '200px' },
  }
];

// Initial edges 
const initialEdges = [
  // Data sources to core platform
  { id: 'e-sat-core', source: 'satellite', target: 'core', type: 'smoothstep', animated: true, style: { stroke: '#64748b' } },
  { id: 'e-weather-core', source: 'weather', target: 'core', type: 'smoothstep', animated: true, style: { stroke: '#64748b' } },
  
  // Core platform to main stakeholders
  { id: 'e-core-s1', source: 'core', target: 's1', type: 'smoothstep', animated: true, style: { stroke: '#10b981', strokeWidth: 4 } },
  { id: 'e-core-s2', source: 'core', target: 's2', type: 'smoothstep', animated: true, style: { stroke: '#3b82f6', strokeWidth: 4 } },
  { id: 'e-core-s3', source: 'core', target: 's3', type: 'smoothstep', animated: true, style: { stroke: '#f59e0b', strokeWidth: 4 } },
  { id: 'e-core-s4', source: 'core', target: 's4', type: 'smoothstep', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 4 } },
  
  // Stakeholder 1 connections
  { id: 'e-s1-users', source: 's1', target: 's1-users', type: 'straight' },
  { id: 'e-s1-tools', source: 's1', target: 's1-tools', type: 'straight' },
  { id: 'e-s1-problems', source: 's1', target: 's1-problems', type: 'straight' },
  { id: 'e-s1-solutions', source: 's1', target: 's1-solutions', type: 'straight' },
  { id: 'e-s1u-u1', source: 's1-users', target: 's1-u1', type: 'straight' },
  { id: 'e-s1u-u2', source: 's1-users', target: 's1-u2', type: 'straight' },
  { id: 'e-s1u-u3', source: 's1-users', target: 's1-u3', type: 'straight' },
  { id: 'e-s1t-t1', source: 's1-tools', target: 's1-t1', type: 'straight' },
  { id: 'e-s1t-t2', source: 's1-tools', target: 's1-t2', type: 'straight' },
  { id: 'e-s1t-t3', source: 's1-tools', target: 's1-t3', type: 'straight' },
  { id: 'e-s1t-t4', source: 's1-tools', target: 's1-t4', type: 'straight' },
  { id: 'e-s1t-t5', source: 's1-tools', target: 's1-t5', type: 'straight' },
  { id: 'e-s1p-p1', source: 's1-problems', target: 's1-p1', type: 'straight' },
  { id: 'e-s1p-p2', source: 's1-problems', target: 's1-p2', type: 'straight' },
  { id: 'e-s1s-s1', source: 's1-solutions', target: 's1-s1', type: 'straight' },
  { id: 'e-s1s-s2', source: 's1-solutions', target: 's1-s2', type: 'straight' },
  
  // Stakeholder 2 connections
  { id: 'e-s2-users', source: 's2', target: 's2-users', type: 'straight' },
  { id: 'e-s2-tools', source: 's2', target: 's2-tools', type: 'straight' },
  { id: 'e-s2-problems', source: 's2', target: 's2-problems', type: 'straight' },
  { id: 'e-s2-solutions', source: 's2', target: 's2-solutions', type: 'straight' },
  { id: 'e-s2u-u1', source: 's2-users', target: 's2-u1', type: 'straight' },
  { id: 'e-s2u-u2', source: 's2-users', target: 's2-u2', type: 'straight' },
  { id: 'e-s2u-u3', source: 's2-users', target: 's2-u3', type: 'straight' },
  { id: 'e-s2t-t1', source: 's2-tools', target: 's2-t1', type: 'straight' },
  { id: 'e-s2t-t2', source: 's2-tools', target: 's2-t2', type: 'straight' },
  { id: 'e-s2t-t3', source: 's2-tools', target: 's2-t3', type: 'straight' },
  { id: 'e-s2t-t4', source: 's2-tools', target: 's2-t4', type: 'straight' },
  { id: 'e-s2p-p1', source: 's2-problems', target: 's2-p1', type: 'straight' },
  { id: 'e-s2p-p2', source: 's2-problems', target: 's2-p2', type: 'straight' },
  { id: 'e-s2s-s1', source: 's2-solutions', target: 's2-s1', type: 'straight' },
  { id: 'e-s2s-s2', source: 's2-solutions', target: 's2-s2', type: 'straight' },
  
  // Stakeholder 3 connections
  { id: 'e-s3-users', source: 's3', target: 's3-users', type: 'straight' },
  { id: 'e-s3-tools', source: 's3', target: 's3-tools', type: 'straight' },
  { id: 'e-s3-problems', source: 's3', target: 's3-problems', type: 'straight' },
  { id: 'e-s3-solutions', source: 's3', target: 's3-solutions', type: 'straight' },
  { id: 'e-s3u-u1', source: 's3-users', target: 's3-u1', type: 'straight' },
  { id: 'e-s3t-t1', source: 's3-tools', target: 's3-t1', type: 'straight' },
  { id: 'e-s3t-t2', source: 's3-tools', target: 's3-t2', type: 'straight' },
  { id: 'e-s3t-t3', source: 's3-tools', target: 's3-t3', type: 'straight' },
  { id: 'e-s3p-p1', source: 's3-problems', target: 's3-p1', type: 'straight' },
  { id: 'e-s3p-p2', source: 's3-problems', target: 's3-p2', type: 'straight' },
  { id: 'e-s3s-s1', source: 's3-solutions', target: 's3-s1', type: 'straight' },
  { id: 'e-s3s-s2', source: 's3-solutions', target: 's3-s2', type: 'straight' },
  
  // Stakeholder 4 connections
  { id: 'e-s4-users', source: 's4', target: 's4-users', type: 'straight' },
  { id: 'e-s4-tools', source: 's4', target: 's4-tools', type: 'straight' },
  { id: 'e-s4-problems', source: 's4', target: 's4-problems', type: 'straight' },
  { id: 'e-s4-solutions', source: 's4', target: 's4-solutions', type: 'straight' },
  { id: 'e-s4u-u1', source: 's4-users', target: 's4-u1', type: 'straight' },
  { id: 'e-s4u-u2', source: 's4-users', target: 's4-u2', type: 'straight' },
  { id: 'e-s4u-u3', source: 's4-users', target: 's4-u3', type: 'straight' },
  { id: 'e-s4t-t1', source: 's4-tools', target: 's4-t1', type: 'straight' },
  { id: 'e-s4t-t2', source: 's4-tools', target: 's4-t2', type: 'straight' },
  { id: 'e-s4t-t3', source: 's4-tools', target: 's4-t3', type: 'straight' },
  { id: 'e-s4p-p1', source: 's4-problems', target: 's4-p1', type: 'straight' },
  { id: 'e-s4p-p2', source: 's4-problems', target: 's4-p2', type: 'straight' },
  { id: 'e-s4s-s1', source: 's4-solutions', target: 's4-s1', type: 'straight' },
  { id: 'e-s4s-s2', source: 's4-solutions', target: 's4-s2', type: 'straight' },
];

export default function StakeholderMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  // Handle node click for editing
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setEditLabel(node.data.label);
  }, []);

  // Handle node hover
  const onNodeMouseEnter = useCallback((event, node) => {
    setHoveredNode(node);
    const rect = event.target.getBoundingClientRect();
    setHoverPosition({ 
      x: rect.right + 10, 
      y: rect.top 
    });
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  // Update node label
  const updateNodeLabel = useCallback(() => {
    if (selectedNode && editLabel.trim()) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: { ...node.data, label: editLabel },
            };
          }
          return node;
        })
      );
      setSelectedNode(null);
      setEditLabel('');
    }
  }, [selectedNode, editLabel, setNodes]);

  // Add new node
  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      data: { label: 'New Node' },
      position: { x: Math.random() * 400 + 600, y: Math.random() * 200 + 400 },
      style: { background: '#64748b', color: 'white', border: '1px solid #475569', borderRadius: '8px', padding: '10px' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Delete selected node
  const deleteNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
      setSelectedNode(null);
      setEditLabel('');
    }
  }, [selectedNode, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
        {/* Control Panel */}
        <Panel position="top-left" style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>YieldSync Map Controls</h3>
          
          <button 
            onClick={addNode}
            style={{ 
              width: '100%',
              padding: '8px 12px', 
              marginBottom: '8px',
              background: '#6366f1', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Add Node
          </button>

          {selectedNode && (
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
                Edit: {selectedNode.data.label}
              </p>
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && updateNodeLabel()}
                style={{ 
                  width: '100%',
                  padding: '6px 8px',
                  marginBottom: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter new label"
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={updateNodeLabel}
                  style={{ 
                    flex: 1,
                    padding: '6px 12px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Save
                </button>
                <button 
                  onClick={deleteNode}
                  style={{ 
                    flex: 1,
                    padding: '6px 12px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280' }}>
            <p style={{ margin: '0 0 4px 0' }}>💡 Tips:</p>
            <ul style={{ margin: 0, paddingLeft: '18px' }}>
              <li>Hover over nodes for info</li>
              <li>Drag nodes to reposition</li>
              <li>Click a node to edit/delete</li>
              <li>Drag from node edges to connect</li>
            </ul>
          </div>
        </Panel>
      </ReactFlow>

      {/* Hover Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: 'fixed',
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            background: 'white',
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            padding: '14px 18px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            zIndex: 1000,
            maxWidth: '320px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
            {hoveredNode.data.label}
          </div>
          
          {hoveredNode.data.category && (
            <div style={{ 
              fontSize: '11px', 
              color: 'white', 
              background: '#3b82f6',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-block',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              {hoveredNode.data.category}
            </div>
          )}

          {hoveredNode.data.description && (
            <div style={{ 
              fontSize: '13px', 
              color: '#4b5563', 
              lineHeight: '1.5',
              marginTop: '8px',
              marginBottom: '8px'
            }}>
              {hoveredNode.data.description}
            </div>
          )}

          <div style={{ 
            fontSize: '11px', 
            color: '#9ca3af',
            marginTop: '10px', 
            paddingTop: '10px', 
            borderTop: '1px solid #e5e7eb',
            fontStyle: 'italic'
          }}>
            💡 Click to edit or delete
          </div>
        </div>
      )}
    </div>
  );
}
