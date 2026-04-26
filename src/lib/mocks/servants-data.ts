import { ServantDetail } from '@lib/types/servants';

export const mockServants: ServantDetail[] = [
  {
    id: 'srv-001',
    name: 'Maria Conceição Santos Lima',
    position: 'Professora',
    level: 'Nível III',
    department: 'Secretaria de Educação',
    location: 'UE Gonçalves Dias',
    employmentType: 'efetivo',
    salary: { baseSalary: 4500, gratuities: 1740, discounts: 1060 },
    netSalary: 5180,
    history: [
      { month: 1, year: 2026, grossSalary: 6240, netSalary: 5180 },
      { month: 2, year: 2026, grossSalary: 6240, netSalary: 5180 },
      { month: 3, year: 2026, grossSalary: 6440, netSalary: 5350 },
      { month: 4, year: 2026, grossSalary: 6240, netSalary: 5180 },
      { month: 5, year: 2026, grossSalary: 6240, netSalary: 5180 },
      { month: 6, year: 2026, grossSalary: 6240, netSalary: 5180 },
    ],
  },
  {
    id: 'srv-002',
    name: 'José Carlos Ferreira Silva',
    position: 'Professor',
    level: 'Nível II',
    department: 'Secretaria de Educação',
    location: 'CE Liceu Maranhense',
    employmentType: 'efetivo',
    salary: { baseSalary: 3800, gratuities: 1200, discounts: 890 },
    netSalary: 4110,
    history: [
      { month: 1, year: 2026, grossSalary: 5000, netSalary: 4110 },
      { month: 2, year: 2026, grossSalary: 5000, netSalary: 4110 },
      { month: 3, year: 2026, grossSalary: 5200, netSalary: 4280 },
      { month: 4, year: 2026, grossSalary: 5000, netSalary: 4110 },
      { month: 5, year: 2026, grossSalary: 5000, netSalary: 4110 },
      { month: 6, year: 2026, grossSalary: 5000, netSalary: 4110 },
    ],
  },
  {
    id: 'srv-003',
    name: 'Ana Paula Oliveira Mendes',
    position: 'Enfermeira',
    level: 'Nível I',
    department: 'Secretaria de Saúde',
    location: 'Hospital Dr. Carlos Macieira',
    employmentType: 'efetivo',
    salary: { baseSalary: 5200, gratuities: 2100, discounts: 1450 },
    netSalary: 5850,
    history: [
      { month: 1, year: 2026, grossSalary: 7300, netSalary: 5850 },
      { month: 2, year: 2026, grossSalary: 7300, netSalary: 5850 },
      { month: 3, year: 2026, grossSalary: 7300, netSalary: 5850 },
      { month: 4, year: 2026, grossSalary: 7500, netSalary: 6020 },
      { month: 5, year: 2026, grossSalary: 7300, netSalary: 5850 },
      { month: 6, year: 2026, grossSalary: 7300, netSalary: 5850 },
    ],
  },
  {
    id: 'srv-004',
    name: 'Ricardo Almeida Sousa',
    position: 'Assessor Jurídico',
    level: 'DAS-3',
    department: 'Procuradoria Geral do Estado',
    location: 'PGE - Sede',
    employmentType: 'comissionado',
    salary: { baseSalary: 8500, gratuities: 3200, discounts: 2870 },
    netSalary: 8830,
    history: [
      { month: 1, year: 2026, grossSalary: 11700, netSalary: 8830 },
      { month: 2, year: 2026, grossSalary: 11700, netSalary: 8830 },
      { month: 3, year: 2026, grossSalary: 11700, netSalary: 8830 },
      { month: 4, year: 2026, grossSalary: 11700, netSalary: 8830 },
      { month: 5, year: 2026, grossSalary: 11700, netSalary: 8830 },
      { month: 6, year: 2026, grossSalary: 11700, netSalary: 8830 },
    ],
  },
  {
    id: 'srv-005',
    name: 'Francisca Lima Barros',
    position: 'Médica Plantonista',
    level: 'Nível II',
    department: 'Secretaria de Saúde',
    location: 'UPA Cidade Operária',
    employmentType: 'temporario',
    salary: { baseSalary: 9200, gratuities: 4800, discounts: 3100 },
    netSalary: 10900,
    history: [
      { month: 1, year: 2026, grossSalary: 14000, netSalary: 10900 },
      { month: 2, year: 2026, grossSalary: 14000, netSalary: 10900 },
      { month: 3, year: 2026, grossSalary: 14500, netSalary: 11300 },
      { month: 4, year: 2026, grossSalary: 14000, netSalary: 10900 },
      { month: 5, year: 2026, grossSalary: 14000, netSalary: 10900 },
      { month: 6, year: 2026, grossSalary: 14000, netSalary: 10900 },
    ],
  },
  {
    id: 'srv-006',
    name: 'Pedro Henrique Costa Nunes',
    position: 'Soldado PM',
    level: 'Classe A',
    department: 'Polícia Militar do Maranhão',
    location: '1º BPM - Centro',
    employmentType: 'efetivo',
    salary: { baseSalary: 3200, gratuities: 1600, discounts: 820 },
    netSalary: 3980,
    history: [
      { month: 1, year: 2026, grossSalary: 4800, netSalary: 3980 },
      { month: 2, year: 2026, grossSalary: 4800, netSalary: 3980 },
      { month: 3, year: 2026, grossSalary: 4800, netSalary: 3980 },
      { month: 4, year: 2026, grossSalary: 4800, netSalary: 3980 },
      { month: 5, year: 2026, grossSalary: 5100, netSalary: 4230 },
      { month: 6, year: 2026, grossSalary: 4800, netSalary: 3980 },
    ],
  },
  {
    id: 'srv-007',
    name: 'Luciana Ribeiro Gomes',
    position: 'Professora',
    level: 'Nível I',
    department: 'Secretaria de Educação',
    location: 'UE Josué Montello',
    employmentType: 'efetivo',
    salary: { baseSalary: 3200, gratuities: 980, discounts: 680 },
    netSalary: 3500,
    history: [
      { month: 1, year: 2026, grossSalary: 4180, netSalary: 3500 },
      { month: 2, year: 2026, grossSalary: 4180, netSalary: 3500 },
      { month: 3, year: 2026, grossSalary: 4180, netSalary: 3500 },
      { month: 4, year: 2026, grossSalary: 4180, netSalary: 3500 },
      { month: 5, year: 2026, grossSalary: 4180, netSalary: 3500 },
      { month: 6, year: 2026, grossSalary: 4180, netSalary: 3500 },
    ],
  },
  {
    id: 'srv-008',
    name: 'Carlos Eduardo Marques',
    position: 'Analista de Sistemas',
    level: 'Nível III',
    department: 'Secretaria de Ciência e Tecnologia',
    location: 'SECTI - Sede',
    employmentType: 'efetivo',
    salary: { baseSalary: 6800, gratuities: 2400, discounts: 1950 },
    netSalary: 7250,
    history: [
      { month: 1, year: 2026, grossSalary: 9200, netSalary: 7250 },
      { month: 2, year: 2026, grossSalary: 9200, netSalary: 7250 },
      { month: 3, year: 2026, grossSalary: 9200, netSalary: 7250 },
      { month: 4, year: 2026, grossSalary: 9500, netSalary: 7490 },
      { month: 5, year: 2026, grossSalary: 9200, netSalary: 7250 },
      { month: 6, year: 2026, grossSalary: 9200, netSalary: 7250 },
    ],
  },
  {
    id: 'srv-009',
    name: 'Fernanda Beatriz Santos',
    position: 'Técnica de Enfermagem',
    level: 'Auxiliar',
    department: 'Secretaria de Saúde',
    location: 'Hospital Nina Rodrigues',
    employmentType: 'efetivo',
    salary: { baseSalary: 2800, gratuities: 900, discounts: 580 },
    netSalary: 3120,
    history: [
      { month: 1, year: 2026, grossSalary: 3700, netSalary: 3120 },
      { month: 2, year: 2026, grossSalary: 3700, netSalary: 3120 },
      { month: 3, year: 2026, grossSalary: 3700, netSalary: 3120 },
      { month: 4, year: 2026, grossSalary: 3700, netSalary: 3120 },
      { month: 5, year: 2026, grossSalary: 3700, netSalary: 3120 },
      { month: 6, year: 2026, grossSalary: 3900, netSalary: 3290 },
    ],
  },
  {
    id: 'srv-010',
    name: 'Antônio Marcos Pereira',
    position: 'Auditor Fiscal',
    level: 'Classe Especial',
    department: 'Secretaria da Fazenda',
    location: 'SEFAZ - Sede',
    employmentType: 'efetivo',
    salary: { baseSalary: 12000, gratuities: 5800, discounts: 4950 },
    netSalary: 12850,
    history: [
      { month: 1, year: 2026, grossSalary: 17800, netSalary: 12850 },
      { month: 2, year: 2026, grossSalary: 17800, netSalary: 12850 },
      { month: 3, year: 2026, grossSalary: 17800, netSalary: 12850 },
      { month: 4, year: 2026, grossSalary: 17800, netSalary: 12850 },
      { month: 5, year: 2026, grossSalary: 18200, netSalary: 13140 },
      { month: 6, year: 2026, grossSalary: 17800, netSalary: 12850 },
    ],
  },
];

/** Search mock servants using Fuse-like simple matching */
export function searchServants(query: string): ServantDetail[] {
  if (!query.trim()) return [];

  const normalised = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return mockServants.filter((s) => {
    const haystack = `${s.name} ${s.position} ${s.department} ${s.location}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    return haystack.includes(normalised);
  });
}
