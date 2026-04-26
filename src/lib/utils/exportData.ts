import { ExpenseDetail } from '@lib/types/search';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Formats a number to Brazilian Real (BRL)
 */
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

/**
 * Formats a date string (YYYY-MM-DD) to Brazilian format (DD/MM/YYYY)
 */
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

/**
 * Exports data to a CSV file and triggers download
 */
export const exportToCSV = (data: ExpenseDetail[], filename: string) => {
  if (!data || data.length === 0) {
    console.warn('Nenhum dado para exportar');
    return;
  }

  // Define CSV headers
  const headers = ['ID', 'Data', 'Categoria', 'Subcategoria', 'Destinatário/Fornecedor', 'Descrição', 'Status', 'Valor (R$)'];
  
  // Map data to CSV rows
  const rows = data.map(item => [
    item.id,
    formatDate(item.date),
    item.category,
    item.subCategory || '',
    `"${item.recipient}"`, // Quotes to handle potential commas in recipient names
    `"${item.description}"`, // Quotes to handle commas in descriptions
    item.status,
    item.amount.toString() // Keep raw number for CSV math, or formatCurrency(item.amount) if visual only
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Add BOM for Excel UTF-8 compatibility
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Trigger download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exports data to a formatted PDF file and triggers download
 */
export const exportToPDF = (data: ExpenseDetail[], filename: string, title: string) => {
  if (!data || data.length === 0) {
    console.warn('Nenhum dado para exportar');
    return;
  }

  // Create a new PDF document in landscape orientation (better for tables)
  const doc = new jsPDF('landscape');

  // Add title
  doc.setFontSize(18);
  doc.setTextColor(27, 28, 28); // #1B1C1C
  doc.text(title, 14, 22);

  // Add subtitle/metadata
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Total de registros: ${data.length}`, 14, 30);
  
  const totalAmount = data.reduce((acc, curr) => acc + curr.amount, 0);
  doc.text(`Valor Total: ${formatCurrency(totalAmount)}`, 14, 36);

  // Define table columns and rows
  const tableColumns = ['Data', 'Categoria', 'Destinatário/Fornecedor', 'Status', 'Valor'];
  const tableRows = data.map(item => [
    formatDate(item.date),
    item.category.toUpperCase(),
    item.recipient,
    item.status.toUpperCase(),
    formatCurrency(item.amount)
  ]);

  // Draw the table
  autoTable(doc, {
    startY: 45,
    head: [tableColumns],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 108, 79], // #006C4F (Primary color)
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [246, 243, 242], // #F6F3F2 (Surface Container Low)
    },
  });

  // Trigger download
  doc.save(`${filename}.pdf`);
};
