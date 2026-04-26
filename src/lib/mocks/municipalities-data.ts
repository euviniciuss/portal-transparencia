/**
 * Municipalities data for Maranhão state.
 * Includes: full list, top municipalities for filters, per-municipality
 * company providers and statistical helpers.
 */

import { ExpenseDetail } from '@lib/types/search';

// ─── Full list of Maranhão municipalities (alphabetical) ─────────────────────
export const ALL_MA_MUNICIPALITIES: string[] = [
  'Açailândia', 'Afonso Cunha', 'Água Doce do Maranhão', 'Alcântara', 'Aldeias Altas',
  'Altamira do Maranhão', 'Alto Alegre do Maranhão', 'Alto Alegre do Pindaré', 'Alto Parnaíba',
  'Amapá do Maranhão', 'Amarante do Maranhão', 'Anajatuba', 'Anapurus', 'Apicum-Açu',
  'Araguanã', 'Araioses', 'Arame', 'Arari', 'Axixá',
  'Bacabal', 'Bacabeira', 'Bacuri', 'Bacurituba', 'Balsas',
  'Barão de Grajaú', 'Barra do Corda', 'Barreirinhas', 'Belágua', 'Bela Vista do Maranhão',
  'Benedito Leite', 'Bequimão', 'Bernardo do Mearim', 'Boa Vista do Gurupi', 'Bom Jardim',
  'Bom Jesus das Selvas', 'Bom Lugar', 'Brejo', 'Brejo de Areia', 'Buriti',
  'Buriti Bravo', 'Buriticupu', 'Buritirana', 'Cachoeira Grande', 'Cajapió',
  'Cajari', 'Campestre do Maranhão', 'Cândido Mendes', 'Cantanhede', 'Capinzal do Norte',
  'Carolina', 'Carutapera', 'Caxias', 'Cedral', 'Central do Maranhão',
  'Centro do Guilherme', 'Centro Novo do Maranhão', 'Chapadinha', 'Cidelândia', 'Codó',
  'Coelho Neto', 'Colinas', 'Conceição do Lago-Açu', 'Coroatá', 'Cururupu',
  'Davinópolis', 'Dom Pedro', 'Duque Bacelar', 'Esperantinópolis', 'Estreito',
  'Feira Nova do Maranhão', 'Fernando Falcão', 'Formosa da Serra Negra', 'Fortaleza dos Nogueiras', 'Fortuna',
  'Godofredo Viana', 'Gonçalves Dias', 'Governador Archer', 'Governador Edison Lobão', 'Governador Eugênio Barros',
  'Governador Luiz Rocha', 'Governador Newton Bello', 'Governador Nunes Freire', 'Graça Aranha', 'Grajaú',
  'Guimarães', 'Humberto de Campos', 'Icatu', 'Igarapé do Meio', 'Igarapé Grande',
  'Imperatriz', 'Itaipava do Grajaú', 'Itapecuru Mirim', 'Itinga do Maranhão', 'Jatobá',
  'Jenipapo dos Vieiras', 'João Lisboa', 'Joselândia', 'Junco do Maranhão', 'Lago da Pedra',
  'Lago do Junco', 'Lago dos Rodrigues', 'Lago Verde', 'Lagoa do Mato', 'Lagoa Grande do Maranhão',
  'Lajeado Novo', 'Lima Campos', 'Loreto', 'Luís Domingues', 'Magalhães de Almeida',
  'Maracaçumé', 'Marajá do Sena', 'Maranhãozinho', 'Mata Roma', 'Matinha',
  'Matões', 'Matões do Norte', 'Milagres do Maranhão', 'Mirador', 'Miranda do Norte',
  'Mirinzal', 'Monção', 'Montes Altos', 'Morros', 'Nina Rodrigues',
  'Nova Colinas', 'Nova Iorque', 'Nova Olinda do Maranhão', 'Olho d\'Água das Cunhãs', 'Olinda Nova do Maranhão',
  'Paço do Lumiar', 'Palmeirândia', 'Paraibano', 'Parnarama', 'Passagem Franca',
  'Pastos Bons', 'Paulino Neves', 'Paulo Ramos', 'Pedreiras', 'Pedro do Rosário',
  'Penalva', 'Peri Mirim', 'Peritoró', 'Pindaré Mirim', 'Pinheiro',
  'Pio XII', 'Pirapemas', 'Poção de Pedras', 'Porto Franco', 'Porto Rico do Maranhão',
  'Presidente Dutra', 'Presidente Juscelino', 'Presidente Médici', 'Presidente Sarney', 'Presidente Vargas',
  'Primeira Cruz', 'Riachão', 'Ribamar Fiquene', 'Rosário', 'Sambaíba',
  'Santa Filomena do Maranhão', 'Santa Helena', 'Santa Inês', 'Santa Luzia', 'Santa Luzia do Paruá',
  'Santa Quitéria do Maranhão', 'Santa Rita', 'Santana do Maranhão', 'Santo Amaro do Maranhão', 'Santo Antônio dos Lopes',
  'São Benedito do Rio Preto', 'São Bento', 'São Bernardo', 'São Domingos do Azeitão', 'São Domingos do Maranhão',
  'São Félix de Balsas', 'São Francisco do Brejão', 'São Francisco do Maranhão', 'São João Batista', 'São João do Carú',
  'São João do Paraíso', 'São João do Soter', 'São João dos Patos', 'São José de Ribamar', 'São José dos Basílios',
  'São Luís', 'São Luís Gonzaga do Maranhão', 'São Mateus do Maranhão', 'São Pedro da Água Branca', 'São Pedro dos Crentes',
  'São Raimundo das Mangabeiras', 'São Raimundo do Doca Bezerra', 'São Roberto', 'São Vicente Ferrer', 'Satubinha',
  'Senador Alexandre Costa', 'Senador La Rocque', 'Serrano do Maranhão', 'Sítio Novo', 'Sucupira do Norte',
  'Sucupira do Riachão', 'Tasso Fragoso', 'Timbiras', 'Timon', 'Trizidela do Vale',
  'Tufilândia', 'Tuntum', 'Turiaçu', 'Turilândia', 'Tutóia',
  'Urbano Santos', 'Vargem Grande', 'Viana', 'Vila Nova dos Martírios', 'Vitória do Mearim',
  'Vitorino Freire', 'Zé Doca',
];

// ─── Top municipalities for the filter dropdown (most relevant) ───────────────
export const TOP_MA_MUNICIPALITIES: string[] = [
  'São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Bacabal',
  'Balsas', 'Santa Inês', 'Açailândia', 'Chapadinha', 'Codó',
  'Coroatá', 'Paço do Lumiar', 'São José de Ribamar', 'Pinheiro', 'Pedreiras',
  'Itapecuru Mirim', 'Barra do Corda', 'Grajaú', 'Presidente Dutra', 'Barreirinhas',
  'Viana', 'Santa Rita', 'Carolina', 'Pindaré Mirim', 'Zé Doca',
  'Porto Franco', 'Estreito', 'Rosário', 'Vargem Grande', 'Tuntum',
];

// ─── Provider companies by municipality ──────────────────────────────────────
export const PROVIDERS_BY_MUNICIPALITY: Record<string, string[]> = {
  'São Luís': [
    'Consórcio MedMaranhão', 'TechSegurança', 'Cloud Maranhão', 'TI Maranhão Solutions',
    'Vigilância Noturna', 'Limpeza Padrão Ltda', 'Manutenção Predial S.A.',
    'Locação de Veículos MA', 'Instituto de Gestão Médica', 'TechEdu Soluções',
  ],
  'Imperatriz': [
    'Engenharia Maranhão S.A.', 'Hospitais Integrados Norte', 'Farma Logística S.A.',
    'Construtora Base Forte', 'Viação Tático Maranhão', 'InfraEstrutura Norte',
  ],
  'Caxias': [
    'Construtora Saber', 'Transportes Escolares Silva', 'Têxtil Fardamentos',
    'Defesa Forte Equipamentos', 'NutriMerenda S.A.',
  ],
  'Timon': [
    'Asfalto Bom', 'Cimento e Cia', 'Construtora Base Segura',
    'Livraria Educar', 'Desenvolvimento Ágil Ltda',
  ],
  'Bacabal': [
    'Construtora Saúde Tech', 'Farma Logística S.A.', 'Tech Dados S.A.',
  ],
  'Balsas': [
    'InfraEstrutura Norte', 'Asfalto Bom', 'Engenharia Maranhão S.A.',
  ],
  'Santa Inês': [
    'NutriMerenda S.A.', 'Transportes Escolares Silva', 'Construtora Saber',
  ],
  'Açailândia': [
    'Construtora Base Forte', 'Cimento e Cia', 'Defesa Forte Equipamentos',
  ],
  'Chapadinha': [
    'Consultoria em Transparência', 'Servidores Cloud MA', 'TechEdu Soluções',
  ],
  'Codó': [
    'Farma Logística S.A.', 'Instituto de Gestão Médica', 'Construtora Saúde Tech',
  ],
  'Paço do Lumiar': [
    'Limpeza Padrão Ltda', 'Vigilância Noturna', 'Manutenção Predial S.A.',
  ],
  'São José de Ribamar': [
    'Tech Dados S.A.', 'Desenvolvimento Ágil Ltda', 'Cloud Maranhão',
  ],
  'Pinheiro': [
    'Construtora Base Segura', 'NutriMerenda S.A.', 'Engenharia Maranhão S.A.',
  ],
  'Barreirinhas': [
    'Asfalto Bom', 'Construtora Base Forte', 'InfraEstrutura Norte',
  ],
};

// ─── Weighted distribution for expense generation ─────────────────────────────
// municipality: probability weight (higher = more frequent)
export const MUNICIPALITY_WEIGHTS: Array<{ name: string; weight: number }> = [
  { name: 'São Luís', weight: 30 },
  { name: 'Imperatriz', weight: 15 },
  { name: 'Caxias', weight: 8 },
  { name: 'Timon', weight: 7 },
  { name: 'Bacabal', weight: 5 },
  { name: 'Balsas', weight: 4 },
  { name: 'Santa Inês', weight: 3 },
  { name: 'Açailândia', weight: 3 },
  { name: 'Chapadinha', weight: 3 },
  { name: 'Codó', weight: 3 },
  { name: 'Paço do Lumiar', weight: 3 },
  { name: 'São José de Ribamar', weight: 3 },
  { name: 'Pinheiro', weight: 2 },
  { name: 'Barreirinhas', weight: 2 },
  { name: 'Carolina', weight: 2 },
  { name: 'Barra do Corda', weight: 2 },
  { name: 'Outros municípios', weight: 5 },
];

/** Picks a random municipality according to the weight distribution. */
export function pickWeightedMunicipality(): string {
  const totalWeight = MUNICIPALITY_WEIGHTS.reduce((sum, m) => sum + m.weight, 0);
  let random = Math.random() * totalWeight;
  for (const m of MUNICIPALITY_WEIGHTS) {
    random -= m.weight;
    if (random <= 0) return m.name;
  }
  return 'São Luís';
}

// ─── Statistical helpers ──────────────────────────────────────────────────────

export interface MunicipalityStats {
  municipality: string;
  totalAmount: number;
  count: number;
  percentage: number;
}

export function getMunicipalityStats(expenses: ExpenseDetail[]): MunicipalityStats[] {
  const map = new Map<string, { totalAmount: number; count: number }>();

  expenses.forEach(exp => {
    const key = exp.municipality ?? 'Não informado';
    const current = map.get(key) ?? { totalAmount: 0, count: 0 };
    map.set(key, { totalAmount: current.totalAmount + exp.amount, count: current.count + 1 });
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return Array.from(map.entries())
    .map(([municipality, stats]) => ({
      municipality,
      totalAmount: stats.totalAmount,
      count: stats.count,
      percentage: total > 0 ? (stats.totalAmount / total) * 100 : 0,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

export function getTopMunicipality(expenses: ExpenseDetail[]): MunicipalityStats | null {
  const stats = getMunicipalityStats(expenses);
  return stats[0] ?? null;
}
