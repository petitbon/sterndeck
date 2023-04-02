import { useRouter } from 'next/navigation';

export interface Props {
  text: string;
  link: string;
}

export default function TextInput({ text, link }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="flex px-2" onClick={() => router.push(link)}>
        <span className="text-[11px] hover:text-stern-blue cursor-pointer font-semibold">] {text} [</span>
      </div>
    </>
  );
}
