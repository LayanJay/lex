export type QuestionType = {
  id?: string;
  title: string;
  question: string;
  upvotes: string[];
  createdBy: string;
  createdAt: any;
};

export type AnswerType = {
  id?: string;
  questionId: string;
  answer: string;
  createdBy: string;
  createdAt: any;
};
