'use client';

import UserCheck from '@components/user/UserCheck';
import Name from './formfields/Name';
import Description from './formfields/Description';
import SternDrop from './formfields/SternDrop';
import TakeAction from './formfields/TakeAction';
import Inline from './formfields/Inline';
import firebaseApp from '@context/firebase/firebaseApp';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { useAuthContext } from '@context/AuthProvider';
import { useCollection } from 'react-firebase-hooks/firestore';

type CustommodelDocument = {
  custommodel: string;
};

export default function Models() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const { user } = useAuthContext();
  const [custommodels, custommodelsLoading, custommodelsError] = useCollection(collection(db, 'custommodels'), {});

  const addCustommodelDocument = async (custommodel: CustommodelDocument) => {
    await setDoc(doc(db, 'custommodels', user.uid), custommodel);
  };

  return (
    <>
      <UserCheck>
        <div className="flex w-full justify-center p-20 ">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={() => addCustommodelDocument()}>
            <div className="mb-4">
              <Name />
            </div>{' '}
            <div className="mb-6">
              <Description />
            </div>
            <div className="flex items-center justify-between mb-6">
              <SternDrop />{' '}
            </div>
            <div className="flex items-center justify-between mb-6">
              <TakeAction />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <Inline />
            </div>
          </form>
        </div>
      </UserCheck>
    </>
  );
}

/*
 *

## training_file  - string - Required
The ID of an uploaded file that contains training data.
See upload file for how to upload a file.
Your dataset must be formatted as a JSONL file, where each training example is a JSON object with the keys "prompt" and "completion". Additionally, you must upload your file with the purpose fine-tune.

## validation_file - string - Optional
The ID of an uploaded file that contains validation data.
If you provide this file, the data is used to generate validation metrics periodically during fine-tuning. These metrics can be viewed in the fine-tuning results file. Your train and validation data should be mutually exclusive.
Your dataset must be formatted as a JSONL file, where each validation example is a JSON object with the keys "prompt" and "completion". Additionally, you must upload your file with the purpose fine-tune.

## model - string - Optional
Defaults to curie
The name of the base model to fine-tune. You can select one of "ada", "babbage", "curie", "davinci", or a fine-tuned model created after 2022-04-21. To learn more about these models, see the Models documentation.

## n_epochs - integer - Optional
Defaults to 4
The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

## batch_size - integer - Optional
Defaults to null
The batch size to use for training. The batch size is the number of training examples used to train a single forward and backward pass.
By default, the batch size will be dynamically configured to be ~0.2% of the number of examples in the training set, capped at 256 - in general, we've found that larger batch sizes tend to work better for larger datasets.

## learning_rate_multiplier - number - Optional
Defaults to null
The learning rate multiplier to use for training. The fine-tuning learning rate is the original learning rate used for pretraining multiplied by this value.
By default, the learning rate multiplier is the 0.05, 0.1, or 0.2 depending on final batch_size (larger learning rates tend to perform better with larger batch sizes). We recommend experimenting with values in the range 0.02 to 0.2 to see what produces the best results.

## prompt_loss_weight - number - Optional
Defaults to 0.01
The weight to use for loss on the prompt tokens. This controls how much the model tries to learn to generate the prompt (as compared to the completion which always has a weight of 1.0), and can add a stabilizing effect to training when completions are short.
If prompts are extremely long (relative to completions), it may make sense to reduce this weight so as to avoid over-prioritizing learning the prompt.

## compute_classification_metrics - boolean - Optional
Defaults to false
If set, we calculate classification-specific metrics such as accuracy and F-1 score using the validation set at the end of every epoch. These metrics can be viewed in the results file.
In order to compute classification metrics, you must provide a validation_file. Additionally, you must specify classification_n_classes for multiclass classification or classification_positive_class for binary classification.

## classification_n_classes - integer - Optional
Defaults to null
The number of classes in a classification task.
This parameter is required for multiclass classification.

## classification_positive_class - string - Optional
Defaults to null
The positive class in binary classification.
This parameter is needed to generate precision, recall, and F1 metrics when doing binary classification.

## classification_betas - array - Optional
Defaults to null
If this is provided, we calculate F-beta scores at the specified beta values. The F-beta score is a generalization of F-1 score. This is only used for binary classification.
With a beta of 1 (i.e. the F-1 score), precision and recall are given the same weight. A larger beta score puts more weight on recall and less on precision. A smaller beta score puts more weight on precision and less on recall.

## suffix - string - Optional
Defaults to null
A string of up to 40 characters that will be added to your fine-tuned model name.
For example, a suffix of "custom-model-name" would produce a model name like ada:ft-your-org:custom-model-name-2022-02-15-04-21-04.
 */
