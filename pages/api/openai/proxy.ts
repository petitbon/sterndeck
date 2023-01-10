import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import formidable, { File } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('handler');

  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    const files: ProcessedFiles = [];
    form.on('file', function (field, file) {
      files.push([field, file]);
    });
    form.on('end', () => resolve(files));
    form.on('error', (err) => reject(err));
    form.parse(req, () => {
      //
    });
  }).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });

  if (files?.length) {
    /* Add files to FormData */
    const formData = new FormData();
    for (const file of files) {
      formData.append('purpose', 'fine-tune');
      formData.append(file[0], fs.createReadStream(file[1].filepath) as Blob);
    }

    /* Send request to another server */
    const response = await fetch('https://api.openai.com/v1/files', {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: 'POST',
      body: formData,
    });

    console.log(response);
  }

  res.status(status).json(resultBody);
};

export default handler;
