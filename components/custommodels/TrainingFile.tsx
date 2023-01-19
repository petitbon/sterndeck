'use client';

interface Props {
  file: string;
}

export function TrainingFile({ file }: Props) {
  return (
    <>
      <div className="flex border-4">
        <div className="text-lg p-4">
          <p className="leading-none">{file}</p>
        </div>
      </div>
    </>
  );
}
