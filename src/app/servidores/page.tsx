import { Suspense } from 'react';
import { ServantSearchPage } from '@flows/servidores/pages/ServantSearchPage';

export default function ServidoresPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ServantSearchPage />
    </Suspense>
  );
}
