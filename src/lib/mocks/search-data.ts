import { CategorySummary, ExpenseDetail, CategoryType } from '@lib/types/search';

export const categories: CategorySummary[] = [
  {
    type: 'saude',
    title: 'Saúde',
    description: 'Hospitais, medicamentos e insumos médicos.',
    icon: '🏥',
  },
  {
    type: 'educacao',
    title: 'Educação',
    description: 'Escolas, merenda e transporte escolar.',
    icon: '📚',
  },
  {
    type: 'seguranca',
    title: 'Segurança',
    description: 'Policiamento, equipamentos e inteligência.',
    icon: '🚓',
  },
  {
    type: 'obras',
    title: 'Obras Públicas',
    description: 'Infraestrutura, estradas e construções.',
    icon: '🏗️',
  },
  {
    type: 'servidores',
    title: 'Servidores',
    description: 'Folha de pagamento e remuneração.',
    icon: '👥',
  },
  {
    type: 'contratos',
    title: 'Contratos',
    description: 'Licitações e contratos vigentes.',
    icon: '📋',
  },
];

export const mockCategoryInsights: Record<CategoryType | 'global', import('@lib/types/search').CategoryInsights> = {
  global: {
    title: 'Visão Geral do Estado',
    mainValue: 45000000000,
    statusText: 'orçamento total executado',
    representationPercent: 100,
    perCapitaImpact: 6428,
    annualVariation: 8.5,
    distributionTitle: 'Como os R$ 45 bi foram distribuídos',
    distribution: [
      { label: 'Saúde Pública', amount: 12500000000 },
      { label: 'Educação Básica', amount: 10200000000 },
      { label: 'Segurança e Defesa', amount: 8400000000 },
      { label: 'Infraestrutura e Obras', amount: 6500000000 },
      { label: 'Outros Programas', amount: 7400000000 },
    ]
  },
  saude: {
    title: 'Gastos com Saúde',
    mainValue: 3200000000,
    statusText: 'empenhados até o momento',
    representationPercent: 25.8,
    perCapitaImpact: 453,
    annualVariation: 12,
    distributionTitle: 'Como os R$ 3,2 bi foram distribuídos',
    distribution: [
      { label: 'Atenção básica', amount: 980000000 },
      { label: 'Assistência hospitalar', amount: 850000000 },
      { label: 'Vigilância sanitária', amount: 420000000 },
      { label: 'Investimentos e obras', amount: 380000000 },
      { label: 'Outros programas', amount: 570000000 },
    ]
  },
  educacao: {
    title: 'Gastos com Educação',
    mainValue: 2800000000,
    statusText: 'investidos neste ano',
    representationPercent: 22.4,
    perCapitaImpact: 396,
    annualVariation: 5,
    distributionTitle: 'Como os R$ 2,8 bi foram distribuídos',
    distribution: [
      { label: 'Ensino Fundamental', amount: 1100000000 },
      { label: 'Ensino Médio', amount: 950000000 },
      { label: 'Merenda Escolar', amount: 450000000 },
      { label: 'Transporte Escolar', amount: 200000000 },
      { label: 'Capacitação Docente', amount: 100000000 },
    ]
  },
  seguranca: {
    title: 'Gastos com Segurança',
    mainValue: 1900000000,
    statusText: 'empenhados até o momento',
    representationPercent: 15.2,
    perCapitaImpact: 269,
    annualVariation: -2.5,
    distributionTitle: 'Como o R$ 1,9 bi foi distribuído',
    distribution: [
      { label: 'Policiamento Ostensivo', amount: 800000000 },
      { label: 'Inteligência e Investigação', amount: 450000000 },
      { label: 'Sistema Penitenciário', amount: 350000000 },
      { label: 'Corpo de Bombeiros', amount: 200000000 },
      { label: 'Defesa Civil', amount: 100000000 },
    ]
  },
  obras: {
    title: 'Investimentos em Obras',
    mainValue: 4500000000,
    statusText: 'contratados para o período',
    representationPercent: 36.0,
    perCapitaImpact: 638,
    annualVariation: 15.4,
    distributionTitle: 'Como os R$ 4,5 bi foram distribuídos',
    distribution: [
      { label: 'Rodovias e Asfalto', amount: 2100000000 },
      { label: 'Saneamento Básico', amount: 1200000000 },
      { label: 'Hospitais e Escolas', amount: 850000000 },
      { label: 'Iluminação Pública', amount: 200000000 },
      { label: 'Praças e Parques', amount: 150000000 },
    ]
  },
  servidores: {
    title: 'Folha de Servidores',
    mainValue: 12000000000,
    statusText: 'liquidados neste exercício',
    representationPercent: 42.0,
    perCapitaImpact: 1700,
    annualVariation: 6.2,
    distributionTitle: 'Como os R$ 12 bi foram distribuídos',
    distribution: [
      { label: 'Servidores Ativos', amount: 7500000000 },
      { label: 'Aposentados', amount: 3200000000 },
      { label: 'Pensionistas', amount: 800000000 },
      { label: 'Encargos Patronais', amount: 350000000 },
      { label: 'Benefícios', amount: 150000000 },
    ]
  },
  contratos: {
    title: 'Valor Total de Contratos',
    mainValue: 5400000000,
    statusText: 'em contratos vigentes',
    representationPercent: 18.9,
    perCapitaImpact: 765,
    annualVariation: 3.1,
    distributionTitle: 'Como os R$ 5,4 bi estão alocados',
    distribution: [
      { label: 'Serviços Terceirizados', amount: 2200000000 },
      { label: 'Fornecimento de Materiais', amount: 1800000000 },
      { label: 'Tecnologia da Informação', amount: 850000000 },
      { label: 'Locação de Veículos/Imóveis', amount: 400000000 },
      { label: 'Consultorias e Outros', amount: 150000000 },
    ]
  },
  transferencias: {
    title: 'Transferências a Municípios',
    mainValue: 6800000000,
    statusText: 'repassados aos fundos',
    representationPercent: 23.8,
    perCapitaImpact: 963,
    annualVariation: 9.8,
    distributionTitle: 'Como os R$ 6,8 bi foram distribuídos',
    distribution: [
      { label: 'Repasses Constitucionais (ICMS)', amount: 4100000000 },
      { label: 'Fundeb (Cota Municípios)', amount: 1500000000 },
      { label: 'Convênios Específicos', amount: 850000000 },
      { label: 'Emendas Parlamentares', amount: 250000000 },
      { label: 'Outras Transferências', amount: 100000000 },
    ]
  },
  'dados-abertos': {
    title: 'Portal de Dados Abertos',
    mainValue: 15000000,
    statusText: 'investidos em transparência',
    representationPercent: 0.1,
    perCapitaImpact: 2,
    annualVariation: 25.0,
    distributionTitle: 'Como os R$ 15 mi foram distribuídos',
    distribution: [
      { label: 'Infraestrutura Cloud', amount: 6000000 },
      { label: 'Desenvolvimento de Software', amount: 4500000 },
      { label: 'Segurança da Informação', amount: 2500000 },
      { label: 'Capacitação Técnica', amount: 1500000 },
      { label: 'Auditorias', amount: 500000 },
    ]
  },
  receitas: {
    title: 'Arrecadação do Estado',
    mainValue: 48000000000,
    statusText: 'arrecadados até o momento',
    representationPercent: 100, // Makes sense since it's revenue
    perCapitaImpact: 6800,
    annualVariation: 7.5,
    distributionTitle: 'Composição dos R$ 48 bi de Receitas',
    distribution: [
      { label: 'ICMS', amount: 25000000000 },
      { label: 'FPE (Repasse Federal)', amount: 12000000000 },
      { label: 'IPVA', amount: 4500000000 },
      { label: 'Royalties e Outros', amount: 3500000000 },
      { label: 'Taxas e Licenças', amount: 3000000000 },
    ]
  }
};

const generateMockExpenses = (): ExpenseDetail[] => {
  const expenses: ExpenseDetail[] = [];
  
  const recipientsByCat: Record<CategoryType, string[]> = {
    saude: ['Consórcio MedMaranhão', 'Farma Logística S.A.', 'Hospitais Integrados Norte', 'Construtora Saúde Tech', 'Instituto de Gestão Médica'],
    educacao: ['Livraria Educar', 'Transportes Escolares Silva', 'NutriMerenda S.A.', 'Construtora Saber', 'TechEdu Soluções'],
    seguranca: ['Defesa Forte Equipamentos', 'Viação Tático Maranhão', 'TechSegurança', 'Construtora Base Segura', 'Têxtil Fardamentos'],
    obras: ['Construtora Base Forte', 'Engenharia Maranhão S.A.', 'Asfalto Bom', 'InfraEstrutura Norte', 'Cimento e Cia'],
    servidores: ['Folha - Secretaria de Saúde', 'Folha - Secretaria de Educação', 'Folha - Polícia Militar', 'Folha - Administração', 'Folha - Bombeiros'],
    contratos: ['Limpeza Padrão Ltda', 'Vigilância Noturna', 'TI Maranhão Solutions', 'Locação de Veículos MA', 'Manutenção Predial S.A.'],
    transferencias: ['Prefeitura de São Luís', 'Prefeitura de Imperatriz', 'Prefeitura de Caxias', 'Prefeitura de Timon', 'Prefeitura de São José de Ribamar'],
    'dados-abertos': ['Tech Dados S.A.', 'Cloud Maranhão', 'Desenvolvimento Ágil Ltda', 'Consultoria em Transparência', 'Servidores Cloud MA'],
    receitas: ['Arrecadação ICMS', 'Repasse FPE', 'Arrecadação IPVA', 'Taxas Diversas', 'Repasses Federais Saúde']
  };

  const descriptionsByCat: Record<CategoryType, string[]> = {
    saude: ['Gestão hospitalar', 'Distribuição de medicamentos', 'Manutenção de equipamentos', 'Reforma de unidade', 'Capacitação profissional'],
    educacao: ['Compra de livros', 'Transporte escolar', 'Fornecimento de merenda', 'Reforma de escola', 'Software educacional'],
    seguranca: ['Compra de equipamentos táticos', 'Manutenção de viaturas', 'Sistema de monitoramento', 'Reforma de delegacia', 'Fardamento'],
    obras: ['Pavimentação de rodovia', 'Construção de ponte', 'Saneamento básico', 'Reforma de praça', 'Iluminação pública'],
    servidores: ['Pagamento de salários', 'Décimo terceiro', 'Férias', 'Bônus de produtividade', 'Horas extras'],
    contratos: ['Serviço de limpeza', 'Serviço de vigilância', 'Manutenção de software', 'Locação de frota', 'Manutenção de ar condicionado'],
    transferencias: ['Repasse fundo a fundo', 'Convênio estadual', 'Emenda parlamentar', 'Auxílio emergencial', 'Fundo de participação'],
    'dados-abertos': ['Hospedagem de dados', 'Desenvolvimento de portal', 'Licença de software', 'Consultoria técnica', 'Treinamento de equipe'],
    receitas: ['Arrecadação mensal', 'Repasse mensal', 'Imposto sobre veículos', 'Taxas de serviço', 'Fundo nacional']
  };

  const statuses: ExpenseDetail['status'][] = ['pago', 'empenhado', 'liquidado', 'cancelado'];

  let idCounter = 1;

  for (let year = 2024; year <= 2025; year++) {
    for (let month = 1; month <= 12; month++) {
      // Only generate up to current month for 2025
      if (year === 2025 && month > 5) continue;

      Object.keys(recipientsByCat).forEach((catKey) => {
        const category = catKey as CategoryType;
        const recipients = recipientsByCat[category];
        const descriptions = descriptionsByCat[category];
        
        // Generate 2 to 5 random expenses per category per month
        const count = Math.floor(Math.random() * 4) + 2;
        
        for (let i = 0; i < count; i++) {
          const recipient = recipients[Math.floor(Math.random() * recipients.length)];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];
          const amount = Math.floor(Math.random() * 100000000) + 1000000; // Between 1M and 101M
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          // Random day
          const day = Math.floor(Math.random() * 28) + 1;
          const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          expenses.push({
            id: idCounter.toString(),
            recipient,
            amount,
            date,
            year,
            month,
            description: `${description} referente ao período.`,
            category,
            subCategory: description, // Just for chart grouping variation
            status
          });
          
          idCounter++;
        }
      });
    }
  }

  // Sort by date descending
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockExpenses: ExpenseDetail[] = generateMockExpenses();
