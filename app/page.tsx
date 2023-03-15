export default function HomePage() {
  return (
    <div className="flex-1 p-8">
      <h1 className="font-bold mb-8 text-xl"> Sterndeck MVP: Fine Tuning optimized for Conditional generation with a user feedback loop and A/B testing capabilities.</h1>
      <p>
        Conditional generation is a problem where the content needs to be generated given some kind of input. This includes paraphrasing, summarizing, entity extraction, product
        description writing given specifications, chatbots and many others. For this type of problem we recommend:
      </p>
      <p>
        Use a separator at the end of the prompt, e.g. \n\n###\n\n. Remember to also append this separator when you eventually make requests to your model. Use an ending token at
        the end of the completion, e.g. END Remember to add the ending token as a stop sequence during inference, e.g. stop=[" END"] Aim for at least ~500 examples Ensure that the
        prompt + completion doesn't exceed 2048 tokens, including the separator Ensure the examples are of high quality and follow the same desired format Ensure that the dataset
        used for finetuning is very similar in structure and type of task as what the model will be used for Using Lower learning rate and only 1-2 epochs tends to work better for
        these use cases
      </p>
    </div>
  );
}
