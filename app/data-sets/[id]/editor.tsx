import { useState } from 'react';
import CsvEditor from '@components/data/comps/CsvEditor';
import Table from '@components/data/comps/Table';
import { IData } from '@interfaces/IData';

export interface Props {
  data: IData;
}

type THeader = {
  header: string;
  group: string;
};

function modifyGroupByHeader(arr: THeader[], header: string, newGroup: string): THeader[] {
  return arr.map((obj) => {
    if (obj.header === header) {
      return {
        ...obj,
        group: newGroup,
      };
    }
    return obj;
  });
}

export default function EditorStanza({ data }: Props) {
  const [csvData, setCsvData] = useState<any[][]>([]);
  const [headersState, setHeadersState] = useState<THeader[]>([]);
  const [validHeaders, setValidHeaders] = useState<boolean>(false);
  const handleCsvChange = (data: any[][]) => {
    setCsvData(data);
  };

  const checkHeaders = (headers: string[]): boolean => {
    if (headers.length === 2 && headers[0] == 'prompt' && headers[1] == 'completion') {
      setValidHeaders(true);
      return true;
    } else {
      setValidHeaders(false);
      groupHeaders(headers);
      return false;
    }
  };

  const groupHeaders = (headers: string[]) => {
    let headersMap: any[] = [];
    headers.map((header: string, i: number) => {
      if (i + 1 == headers.length) {
        headersMap.push({ header: header, group: 'completion' });
      } else {
        headersMap.push({ header: header, group: 'prompt' });
      }
    });
    setHeadersState(headersMap);
  };

  const handleDataChange = (updatedData: any[][]) => {
    setCsvData(updatedData);
  };

  const selectHeader = async (e: any) => {
    const modifiedArray: any[] = modifyGroupByHeader(headersState, e.target.id, e.target.value);
    setHeadersState(modifiedArray);
  };

  const createData = async () => {
    //await updateModel(user_uid, model_id, { title: titleState, use_case: useCaseState });
  };

  const checkNext = () => {
    return true;
  };

  return (
    <div className="flex-1 flex-col">
      <CsvEditor onCsvChange={handleCsvChange} onHeaderCheck={checkHeaders} />
      {!validHeaders && (
        <ul className="flex-1 py-4">
          {headersState.map((header: any, i: number) => (
            <li key={i}>
              <div className="flex flex-row border p-2 m-2">
                <div className="w-3/4">{header.header}</div>
                <div className="w-1/4">
                  <select id={header.header} className="custom-select" onChange={(e) => selectHeader(e)} value={header.group}>
                    <option value="prompt">prompt</option>
                    <option value="completion">completion</option>
                  </select>
                </div>
              </div>
            </li>
          ))}

          <li className="flex flex-row justify-end pt-4 items-center">
            <span className="text-sm px-4"></span>
            <button className={`btn-small w-[100px] ${!checkNext() ? 'cursor-not-allowed text-gray-300' : ''}`} disabled={!checkNext()} onClick={() => createData()}>
              Next
            </button>
          </li>
        </ul>
      )}
      {validHeaders && csvData.length > 0 && <Table data={csvData} onDataChange={handleDataChange} />}
    </div>
  );
}
