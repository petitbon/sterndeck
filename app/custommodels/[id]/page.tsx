'use client';

import { useAuth } from '@context/AuthUserProvider';
import UserCheck from '@components/user/UserCheck';
import { getCustommodel } from '@context/firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';

interface Props {
  params: {
    id: string;
  };
}

type CustommodelDocument = {
  title: string;
  basemodel: string;
  epochs: number;
  useruid: string;
};

type Inputs = CustommodelDocument;

export default function CustommodelEdit({ params }: Props) {
  const { authUser, isLoading } = useAuth();
  const [custommodel, setCustommodel] = useState([]);
  const [isLodingCustommodel, setIsLodingCustommodel] = useState([]);

  useEffect(() => {
    const doit = async () => {
      if (authUser) {
        const unsubscribe = await getCustommodel(authUser.uid, params.id, setCustommodel, setIsLodingCustommodel);
        return () => unsubscribe();
      }
    };
    doit();
  }, [authUser]);

  console.log(custommodel);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: CustommodelDocument) => {};
  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4">
          <form className="custommodel-form" onSubmit={handleSubmit(onSubmit)}>
            <div> Custom Model {custommodel.title} </div>
            <div> Base Model {custommodel.basemodel} </div>
            <div> Number of Epochs {custommodel.epochs} </div>
          </form>
        </div>
      </UserCheck>
    </>
  );
}
