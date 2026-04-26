import React from 'react';
import { ExpenseDetail } from '@lib/types/search';

interface PaymentTimelineProps {
  expense: ExpenseDetail;
}

const timelineData = [
  {
    key: 'empenhado',
    title: 'Reservado (Empenho)',
    description: 'O governo garantiu que o dinheiro existe para pagar este serviço no futuro.',
  },
  {
    key: 'liquidado',
    title: 'Conferido (Liquidação)',
    description: 'O governo conferiu que o serviço foi prestado ou o produto foi entregue corretamente.',
  },
  {
    key: 'pago',
    title: 'Pago',
    description: 'O dinheiro foi transferido para a conta do fornecedor.',
  }
];

export const PaymentTimeline: React.FC<PaymentTimelineProps> = ({ expense }) => {
  const currentStatus = expense.status;
  
  const getStepStatus = (stepKey: string) => {
    if (currentStatus === 'cancelado') return 'inactive';
    if (currentStatus === 'pago') return 'active';
    if (currentStatus === 'liquidado') {
      if (stepKey === 'pago') return 'inactive';
      return 'active';
    }
    if (currentStatus === 'empenhado') {
      if (stepKey === 'empenhado') return 'active';
      return 'inactive';
    }
    return 'inactive';
  };

  if (currentStatus === 'cancelado') {
    return (
      <div className="bg-error-container text-on-error-container p-6 rounded-[12px]">
        <h3 className="font-bold text-lg mb-2">Pagamento Cancelado</h3>
        <p>Este empenho foi cancelado e os valores retornaram ao caixa do Estado.</p>
      </div>
    );
  }

  // Generate some fake dates based on the payment date
  const baseDate = new Date(expense.date);
  const empenhoDate = new Date(baseDate);
  empenhoDate.setDate(empenhoDate.getDate() - 40);
  
  const liquidacaoDate = new Date(baseDate);
  liquidacaoDate.setDate(liquidacaoDate.getDate() - 10);
  
  const formatDate = (date: Date) => date.toLocaleDateString('pt-BR');

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {timelineData.map((step, index) => {
          const status = getStepStatus(step.key);
          const isActive = status === 'active';
          
          let stepDate = '';
          if (step.key === 'empenhado') stepDate = formatDate(empenhoDate);
          if (step.key === 'liquidado') stepDate = formatDate(liquidacaoDate);
          if (step.key === 'pago') stepDate = formatDate(baseDate);

          return (
            <div 
              key={step.key} 
              className={`flex-1 p-6 rounded-[12px] border flex flex-col gap-2 transition-all ${
                isActive 
                  ? 'bg-primary-container bg-opacity-20 border-primary' 
                  : 'bg-surface-container-low border-outline-variant opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {isActive ? stepDate : 'Aguardando'}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-primary text-white' : 'bg-outline-variant text-white'
                }`}>
                  {isActive && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  )}
                </div>
              </div>
              <h3 className={`text-lg font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                {step.title}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="bg-surface-container-low p-4 rounded-lg text-sm text-on-surface-variant">
        <strong>Entenda as fases:</strong> O Empenho é a reserva do valor. A Liquidação é a verificação de que o serviço foi prestado. O Pagamento é a transferência final do dinheiro.
      </div>
    </div>
  );
};
