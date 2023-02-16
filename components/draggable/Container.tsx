import update from 'immutability-helper';
import { useEffect, useCallback, useState } from 'react';
import { Card } from './Card';
import { IModel } from '@interfaces/IModel';
import { updateComposer } from '@firestore/composers';
import { ICompositeRequest } from '@interfaces/IComposite';

const style = {};

const cardstyle = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'orange',
};

export interface ContainerState {
  cards: IModel[];
}

export interface Props {
  allModels: IModel[];
  userUid: string;
  compositeId: string;
}

export default function FineTune({ allModels, userUid, compositeId }: Props) {
  const [cards, setCards] = useState<IModel[]>([]);
  const [response, setResponse] = useState(null as any);
  const [promptstr, setPromptstr] = useState<string>('');

  useEffect(() => {
    setCards(allModels);
  }, [allModels]);

  useEffect(() => {
    if (cards.length > 0) {
      const updateData = async () => {
        await updateComposer(userUid, compositeId, { sequence: cards });
      };
      updateData();
    }
  }, [cards]);

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptstr(evt.target.value);
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: IModel[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as IModel],
        ],
      })
    );
  }, []);

  const clean = (input: string) => input?.replace(/['"]+/g, '');

  const renderCard = useCallback((card: IModel, index: number) => {
    return <Card model={card} index={index} id={card.id} moveCard={moveCard} key={index} />;
  }, []);

  const submittest = async () => {
    let compositeRequest: ICompositeRequest = {
      prompt: promptstr,
      sequence: cards,
    };
    const r = await fetch(`/api/sterndeck/composite`, { method: 'POST', body: JSON.stringify(compositeRequest) });
    r.json().then((json) => setResponse(JSON.stringify(json)));
  };

  return (
    <>
      <div style={{ ...cardstyle }}>
        INPUT
        <div className="flex flex-col p-2 mx-2 ">
          <div className=" w-full ">
            <textarea className="custom-textarea" rows={4} onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(evt)}></textarea>
          </div>
          <div className="flex flex-row w-full justify-end ">
            <button className="btn-small p-2 mt-4 bg-white" onClick={() => submittest()}>
              Test
            </button>
          </div>
        </div>
      </div>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      <div style={{ ...cardstyle }}>OUTPUT {response}</div>
    </>
  );
}
