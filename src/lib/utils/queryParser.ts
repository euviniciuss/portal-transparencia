import { CategoryType } from '@lib/types/search';
import { TOP_MA_MUNICIPALITIES } from '@lib/mocks/municipalities-data';

interface ParsedQuery {
  term: string;
  category?: CategoryType;
  year?: number;
  municipality?: string;
}

const CATEGORY_SYNONYMS: Record<CategoryType, string[]> = {
  saude: ['saúde', 'saude', 'hospital', 'médico', 'medico', 'remedio', 'remédio', 'sus', 'upa'],
  educacao: ['educação', 'educacao', 'escola', 'aluno', 'ensino', 'merenda'],
  seguranca: ['segurança', 'seguranca', 'policia', 'polícia', 'delegacia', 'presidio', 'bombeiro', 'militar'],
  obras: ['obra', 'construção', 'construcao', 'reforma', 'estrada', 'pavimentação', 'pavimentacao', 'ponte', 'infraestrutura'],
  servidores: ['professor', 'servidor', 'salário', 'salario', 'folha', 'pagamento', 'funcionário', 'funcionario', 'remuneração', 'remuneracao'],
  contratos: ['contrato', 'licitação', 'licitacao', 'empresa', 'terceirizado', 'pregão', 'pregao'],
  transferencias: ['transferência', 'transferencia', 'repasse', 'município', 'municipio', 'prefeitura', 'fundo'],
  'dados-abertos': ['dados', 'planilha', 'download', 'csv', 'api'],
  receitas: ['receita', 'arrecadação', 'arrecadacao', 'imposto', 'icms', 'ipva', 'tributo']
};

/** Normalises a string for comparison: lowercase + strip accents + strip punctuation. */
function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[?!,.']/g, '');
}

/**
 * Tries to find a known MA municipality name inside the user query.
 * Returns the canonical name (with proper casing) or undefined.
 */
function detectMunicipality(input: string): string | undefined {
  const normInput = normalise(input);
  for (const m of TOP_MA_MUNICIPALITIES) {
    const normM = normalise(m);
    if (normInput.includes(normM)) return m;
  }
  return undefined;
}

export function parseNaturalLanguageQuery(input: string): ParsedQuery {
  const normalizedInput = input.toLowerCase().trim();
  const result: ParsedQuery = { term: '' };

  if (!normalizedInput) return result;

  // 1. Extract Year (4 consecutive digits starting with 20)
  const yearMatch = normalizedInput.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    result.year = parseInt(yearMatch[1], 10);
  }

  // 2. Detect municipality name in the query
  result.municipality = detectMunicipality(input);

  // 3. Extract Category by Synonyms
  const words = normalizedInput.replace(/[?,.!]/g, '').split(/\s+/);
  const stopWords = ['quanto', 'o', 'estado', 'gastou', 'gasto', 'gastos', 'despesa', 'despesas', 'investiu', 'investimento', 'investimentos', 'pagou', 'pagamento', 'pagamentos', 'em', 'com', 'no', 'na', 'os', 'as', 'de', 'da', 'do', 'ano', 'para', 'sobre', 'um', 'uma', 'ganha', 'ganham', 'recebe', 'recebem', 'qual', 'quais', 'quem'];
  const meaningfulWords = words.filter(w => !stopWords.includes(normalise(w)) && !w.match(/^\d+$/));

  const spendingKeywords = ['gastou', 'gasto', 'gastos', 'despesa', 'despesas', 'investiu', 'investimento', 'investimentos', 'pagou', 'comprou', 'custou'];
  const salaryKeywords = ['ganha', 'salario', 'salário', 'recebe', 'remuneração', 'remuneracao', 'folha', 'vencimento', 'contracheque'];

  const hasSpendingIntent = meaningfulWords.some(w => spendingKeywords.some(k => normalise(w).includes(normalise(k))));
  const hasSalaryIntent = meaningfulWords.some(w => salaryKeywords.some(k => normalise(w).includes(normalise(k))));

  // 3. Extract Category by Synonyms
  for (const [category, synonyms] of Object.entries(CATEGORY_SYNONYMS)) {
    const normSynonyms = synonyms.map(s => normalise(s));
    if (meaningfulWords.some(word => {
      const normWord = normalise(word);
      return normSynonyms.some(ns => normWord.includes(ns) || ns.includes(normWord));
    })) {
      result.category = category as CategoryType;
      
      // Intent override for "professor" or similar shared contexts
      if (category === 'servidores' && hasSpendingIntent && !hasSalaryIntent) {
        const educationSyns = ['professor', 'ensino', 'escola', 'educacao', 'educação'];
        const normEducationSyns = educationSyns.map(s => normalise(s));
        if (meaningfulWords.some(w => normEducationSyns.some(s => normalise(w).includes(s)))) {
          result.category = 'educacao';
        }
      }
      
      break;
    }
  }

  // 4. Remaining term (excluding category synonym words and detected municipality)
  if (!result.category) {
    result.term = meaningfulWords.join(' ');
  } else if (result.category === 'servidores') {
    const normSalaryKeywords = salaryKeywords.map(k => normalise(k));
    result.term = meaningfulWords
      .filter(w => !normSalaryKeywords.some(k => normalise(w).includes(k)))
      .join(' ');
  } else {
    const synonymsForMatchedCategory = CATEGORY_SYNONYMS[result.category];
    const normSyns = synonymsForMatchedCategory.map(s => normalise(s));
    const leftOverWords = meaningfulWords.filter(w => {
      const nw = normalise(w);
      return !normSyns.some(ns => nw.includes(ns) || ns.includes(nw));
    });
    result.term = leftOverWords.join(' ');
  }

  return result;
}
