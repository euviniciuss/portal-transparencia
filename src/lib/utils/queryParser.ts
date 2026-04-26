import { CategoryType } from '@lib/types/search';

interface ParsedQuery {
  term: string;
  category?: CategoryType;
  year?: number;
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

export function parseNaturalLanguageQuery(input: string): ParsedQuery {
  const normalizedInput = input.toLowerCase().trim();
  const result: ParsedQuery = { term: '' };

  if (!normalizedInput) return result;

  // 1. Extract Year (4 consecutive digits starting with 20)
  const yearMatch = normalizedInput.match(/\b(20\d{2})\b/);
  if (yearMatch) {
    result.year = parseInt(yearMatch[1], 10);
  }

  // 2. Extract Category by Synonyms
  const words = normalizedInput.replace(/[?,.!]/g, '').split(/\s+/);
  
  // Clean up words to ignore common stop words
  const stopWords = ['quanto', 'o', 'estado', 'gastou', 'em', 'com', 'no', 'na', 'os', 'as', 'de', 'da', 'do', 'ano'];
  const meaningfulWords = words.filter(w => !stopWords.includes(w) && !w.match(/^\d+$/));

  for (const [category, synonyms] of Object.entries(CATEGORY_SYNONYMS)) {
    // Check if any meaningful word matches a synonym
    if (meaningfulWords.some(word => synonyms.some(syn => word.includes(syn) || syn.includes(word)))) {
      result.category = category as CategoryType;
      break; // Stop at first matched category
    }
  }

  // 3. Fallback: if we didn't find a category, maybe the user is searching for a specific name
  // We'll just join the meaningful words back as the 'term' to search via Fuzzy
  if (!result.category) {
     result.term = meaningfulWords.join(' ');
  } else {
     // Even if we found a category, let's see if there are other words left over that aren't the category synonym
     // E.g. "gastos com saúde em são luís" -> category: saude, term: "são luís"
     const synonymsForMatchedCategory = CATEGORY_SYNONYMS[result.category];
     const leftOverWords = meaningfulWords.filter(w => !synonymsForMatchedCategory.some(syn => w.includes(syn) || syn.includes(w)));
     if (leftOverWords.length > 0) {
       result.term = leftOverWords.join(' ');
     }
  }

  return result;
}
