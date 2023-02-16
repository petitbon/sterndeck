import { IconLink } from '@tabler/icons-react';

export interface Props {
  published_model: string;
}

export default function PublishedModelCard({ published_model }: Props) {
  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[14px] m-1 font-semibold items-center">
        <div className="flex py-1 items-center inline-block align-middle">
          <IconLink size={55} stroke={1.5} className="text-gray-500" />
          <label className="">https://sterndeck.com/api/v1/model/{published_model}</label>
        </div>
      </div>
    </div>
  );
}
