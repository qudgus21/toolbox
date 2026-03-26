import type { CalculatorResult } from '../types';

const GRADE_MAP: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
};

interface CourseEntry {
  grade: string;
  gradePoint: number;
  credits: number;
}

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const raw = String(fields.dataset || fields.data || '').trim();
  if (!raw) return { output: '' };

  const lines = raw.split(/\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const courses: CourseEntry[] = [];

  for (const line of lines) {
    // Supports formats: "A,3" or "A 3" or "A, 3"
    const parts = line.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) continue;

    const gradeStr = parts[0].toUpperCase();
    const credits = Number(parts[1]);

    if (!(gradeStr in GRADE_MAP) || !isFinite(credits) || credits <= 0) continue;

    courses.push({
      grade: gradeStr,
      gradePoint: GRADE_MAP[gradeStr],
      credits,
    });
  }

  if (courses.length === 0) return { output: '' };

  let totalQualityPoints = 0;
  let totalCredits = 0;

  const table = courses.map((c, i) => {
    const qualityPoints = c.gradePoint * c.credits;
    totalQualityPoints += qualityPoints;
    totalCredits += c.credits;
    return {
      label: `Course ${i + 1} (${c.grade})`,
      value: c.gradePoint.toFixed(1),
      unit: `${c.credits} cr | QP: ${qualityPoints.toFixed(1)}`,
    };
  });

  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  table.push({
    label: 'Total',
    value: gpa.toFixed(2),
    unit: `${totalCredits} credits`,
  });

  return {
    output: gpa.toFixed(2),
    breakdown: [
      { label: 'Courses', value: courses.length.toString() },
      { label: 'Total Credits', value: totalCredits.toString() },
      { label: 'Total Quality Points', value: totalQualityPoints.toFixed(1) },
      { label: 'GPA', value: gpa.toFixed(2), highlight: true },
    ],
    table,
    stats: {
      gpa: Math.round(gpa * 100) / 100,
      totalCredits,
      courseCount: courses.length,
    },
  };
}
