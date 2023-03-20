export default function HomePage() {
  return (
    <div className="flex-1 p-8">
      <h1 className=" mb-8 text-4xl"> Instructions</h1>
      <h1 className=" mb-8 text-xl"> SternDeck MVP</h1>
      <p></p>
      <p>1. Sign in using Google single sign-on (SSO) </p>
      <p>2. Enter the OpenAI.com API Key ( we suggest you create a new one for SternDeck )</p>
      <p>3. Create a new Model ( currently we only support Conditional Generation use cases ) </p>
      <p>4. Upload a CSV file of your data ( prompt, completion )</p>
      <p>5. Train (fine tune *) the file on the base model (Davinci at the moment) ( if this is not the first training you can choose which base model to train on top of ) </p>
      <p>6. Wait for the training to be finished (this may take minutes to hours depending on how busy OpenAI are) </p>
      <p>7. You can now test the fine tuning completion by clicking on [ Show Test Prompt ], entering a prompt and submitting</p>
      <p>8. If you want to use your model in your application use curl to get the request signature ( please make sure you use the entire payload as described)</p>
      <p className="my-8">( * ) OpenAI will charge you directly for fine tuning your data. SternDeck does not charges for fine tuning</p>

      <div className="my-4  text-stern-red">
        <a href="https://storage.cloud.google.com/sterndeck-public/marketingOKRs.csv">Download a sample file with marketing Objective KeyResults.</a>
      </div>
      <ul>
        <li className="font-semibold">Sample prompts to for testing: </li>
        <li>Increase marketing campaign agility</li>
        <li>Expand marketing team size</li>
        <li>Optimize marketing performance measurement</li>
      </ul>
    </div>
  );
}
