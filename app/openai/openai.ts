//import { Configuration, OpenAIApi } from 'openai';
//import type { NextApiRequest, NextApiResponse } from 'next';
//import type { FineTune } from '@interfaces/Custommodel';

//const configuration = new Configuration({
// apiKey: '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',
//});
//const openai = new OpenAIApi(configuration);

export default function listModels() {
  console.log(process.env.OPENAI_API_KEY);

  //  const res = await openai.listModels();
  // return res;

  /*
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req.body.dish),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
   */
}
