import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const age = Number(fields.age);
  const restingHR = Number(fields.restingHR || 0);

  if (!isFinite(age) || age <= 0 || age > 120) return { output: '' };
  if (!isFinite(restingHR) || restingHR < 0) return { output: '' };

  const maxHR = 220 - age;
  const hrReserve = maxHR - restingHR;

  // Karvonen method: Target HR = ((Max HR - Resting HR) × %intensity) + Resting HR
  const zones = [
    { name: 'Zone 1 — Very Light', min: 0.5, max: 0.6, desc: 'Recovery, warm-up' },
    { name: 'Zone 2 — Light', min: 0.6, max: 0.7, desc: 'Fat burning, endurance' },
    { name: 'Zone 3 — Moderate', min: 0.7, max: 0.8, desc: 'Aerobic fitness' },
    { name: 'Zone 4 — Hard', min: 0.8, max: 0.9, desc: 'Anaerobic, speed' },
    { name: 'Zone 5 — Maximum', min: 0.9, max: 1.0, desc: 'Max effort, VO2max' },
  ];

  const useKarvonen = restingHR > 0;
  const table = zones.map(z => {
    const lo = useKarvonen
      ? Math.round(hrReserve * z.min + restingHR)
      : Math.round(maxHR * z.min);
    const hi = useKarvonen
      ? Math.round(hrReserve * z.max + restingHR)
      : Math.round(maxHR * z.max);
    return {
      label: z.name,
      value: `${lo} - ${hi} bpm`,
      unit: z.desc,
    };
  });

  return {
    output: `Max HR: ${maxHR} bpm`,
    table: [
      { label: 'Age', value: `${age}` },
      { label: 'Max Heart Rate', value: `${maxHR} bpm` },
      ...(restingHR > 0 ? [{ label: 'Resting HR', value: `${restingHR} bpm` }] : []),
      ...(restingHR > 0 ? [{ label: 'HR Reserve', value: `${hrReserve} bpm` }] : []),
      ...table,
    ],
    breakdown: [
      { label: 'Max HR Formula', value: `220 - ${age} = ${maxHR} bpm`, highlight: true },
      ...(useKarvonen
        ? [
            { label: 'Method', value: 'Karvonen (uses resting HR)' },
            { label: 'HR Reserve', value: `${maxHR} - ${restingHR} = ${hrReserve} bpm` },
            { label: 'Target HR', value: '(HR Reserve × %intensity) + Resting HR' },
          ]
        : [{ label: 'Method', value: 'Standard (% of Max HR)' }]),
    ],
  };
}
