'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useSystemContext } from '@context/SystemProvider';

import { IComposer } from '@interfaces/IComposer';

import { addComposer } from '@lib/firestore/composers';

import UserCheck from '@components/user/UserCheck';

export default function ComposerNew() {
  const { authUser } = useSystemContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IComposer>();

  const onSubmit: SubmitHandler<IComposer> = async (data: IComposer) => {
    await addComposer(authUser.uid, data);
  };

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4">
          <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="custom-label">New Composer</label>
              <input placeholder="Name of the custom composer" className="custom-input" {...register('title', { required: true })} />
              <input type="hidden" className="custom-input" {...register('user_uid', { required: true })} value={authUser?.uid} />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className="mb-4">{errors.title && <span>This field is required</span>}</div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <button className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? '...loading' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </UserCheck>
    </>
  );
}
