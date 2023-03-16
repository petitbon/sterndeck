import { useState, useEffect } from 'react';

type TTemperature = number | undefined;

export interface Props {
  temperature: TTemperature;
  onTemperatureChange: any;
}

export default function Temperature({ onTemperatureChange, temperature }: Props) {
  const [temperatureState, setTemperatureState] = useState<number>(0.2);

  useEffect(() => {
    if (temperature) {
      setTemperatureState(temperature || 0.2);
    }
  }, [temperature]);

  const saveTemperature = async (e: any) => {
    setTemperatureState(+e.target.value);
    onTemperatureChange(+e.target.value);
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">Temperature {temperatureState}</label>
        <input
          onChange={(e) => setTemperatureState(+e.target.value)}
          onMouseUp={(e) => saveTemperature(e)}
          id="small-range"
          max={2}
          min={0}
          step={0.1}
          type="range"
          value={temperatureState}
          className="input-range"
        />
      </div>
    </>
  );
}
