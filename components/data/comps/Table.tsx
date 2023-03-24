import { useState } from 'react';

interface TableProps {
  data: any[][];
  onDataChange: (updatedData: any[][]) => void;
}

export default function Table({ data, onDataChange }: TableProps) {
  const [tableData, setTableData] = useState(data);

  const handleCellChange = (event: React.FocusEvent<HTMLTableCellElement>, rowIndex: number, cellIndex: number) => {
    const newTableData = [...tableData];
    newTableData[rowIndex + 1][cellIndex] = event.target.innerText;
    setTableData(newTableData);
    onDataChange(newTableData);
  };

  const handleRowRemove = (rowIndex: number) => {
    const newTableData = [...tableData];
    newTableData.splice(rowIndex + 1, 1);
    setTableData(newTableData);
    onDataChange(newTableData);
  };

  return (
    <table>
      <thead>
        <tr>
          {tableData[0]?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {tableData.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} contentEditable suppressContentEditableWarning onBlur={(event) => handleCellChange(event, rowIndex, cellIndex)}>
                {cell}
              </td>
            ))}
            <td>
              <button onClick={() => handleRowRemove(rowIndex)}>[-]</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
