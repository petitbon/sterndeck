export interface ICompletionRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  logprobs: number | null;
  stop: string;
}

export interface ICompletionResponse {
  id: string;
  object: string;
  created: Date;
  model: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: string;
      finish_reason: string;
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
