import { CategoryType } from '@lib/types/search';
import { TOP_MA_MUNICIPALITIES } from '@lib/mocks/municipalities-data';

interface ParsedQuery {
  term: string;
  category?: CategoryType;
  year?: number;
  municipality?: string;
}

const CATEGORY_SYNONYMS: Record<CategoryType, string[]> = {
  saude: ['saúde', 'hospital', 'médico', 'medico', 'remedio', 'remédio', 'sus', 'upa'],
  educacao: ['educação', 'escola', 'professor', 'aluno', 'ensino', 'merenda'],
  seguranca: ['segurança', 'policia', 'polícia', 'delegacia', 'presidio', 'bombeiro', 'militar'],
  obras: ['obra', 'construção', 'reforma', 'estrada', 'pavimentação', 'ponte', 'infraestrutura'],
  servidores: ['servidor', 'salário', 'salario', 'folha', 'pagamento', 'funcionário', 'remuneração'],
  contratos: ['contrato', 'licitação', 'licitacao', 'empresa', 'terceirizado', 'pregão'],
  transferencias: ['transferência', 'repasse', 'município', 'prefeitura', 'fundo'],
  'dados-abertos': ['dados', 'planilha', 'download', 'csv', 'api'],
  receitas: ['receita', 'arrecadação', 'imposto', 'icms', 'ipva', 'tributo']
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
  
  const stopWords = ['quanto', 'o', 'estado', 'gastou', 'gasto', 'gastos', 'despesa', 'despesas', 'investiu', 'investimento', 'investimentos', 'pagou', 'pagamento', 'pagamentos', 'em', 'com', 'no', 'na', 'os', 'as', 'de', 'da', 'do', 'ano', 'para', 'sobre'];
  const meaningfulWords = words.filter(w => !stopWords.includes(w) && !w.match(/^\d+$/));

  for (const [category, synonyms] of Object.entries(CATEGORY_SYNONYMS)) {
    if (meaningfulWords.some(word => synonyms.some(syn => word.includes(syn) || syn.includes(word)))) {
      result.category = category as CategoryType;
      break;
    }
  }

  // 4. Remaining term (excluding category synonym words and detected municipality)
  if (!result.category) {
    result.term = meaningfulWords.join(' ');
  } else {
    const synonymsForMatchedCategory = CATEGORY_SYNONYMS[result.category];
    const leftOverWords = meaningfulWords.filter(w => !synonymsForMatchedCategory.some(syn => w.includes(syn) || syn.includes(w)));
    if (leftOverWords.length > 0) {
      result.term = leftOverWords.join(' ');
    }
  }

  return result;
}
