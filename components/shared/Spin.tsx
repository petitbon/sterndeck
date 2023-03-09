export interface Props {
  size: string;
}

export default function Spin({ size }: Props) {
  return (
    <>
      <div className={'animate-[bounce_1s_ease-in-out_infinite] text-indigo-1000 ' + size}>.</div>
    </>
  );
}
