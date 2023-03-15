import { useState, useEffect } from 'react';

import { IModel } from '@interfaces/IModel';
import { IUseCase } from '@interfaces/IUseCase';
import { getUseCase } from '@firestore/useCases';

export interface Props {
  model: IModel;
}

export default function SubTitle({ model }: Props) {
  const [fu, setFu] = useState<IUseCase | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const output = await getUseCase(model.use_case);
      setFu(output);
    };
    fetchData();
  }, [model]);

  return (
    <div className="text-xs pt-2 font-semibold">
      <span className="text-white">.</span>
      {fu && `Model Use Case: ${fu?.long_name}`}{' '}
    </div>
  );
}
