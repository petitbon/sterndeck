import { useState } from 'react';
import CsvReader from 'react-csv-reader';

interface CsvEditorProps {
  onCsvChange: (data: any[][]) => void;
  onHeaderCheck: (headers: string[]) => boolean;
}

export default function CsvEditor({ onCsvChange, onHeaderCheck }: CsvEditorProps) {
  const handleCSV = (data: any[][]) => {
    const headers = data[0];
    if (onHeaderCheck(headers)) {
      onCsvChange(data);
    } else {
      console.log('too many headers');
    }
  };

  return (
    <div>
      <CsvReader onFileLoaded={handleCSV} />
    </div>
  );
}
