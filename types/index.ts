export type QuestionType = {
  id?: string;
  title: string;
  question: string;
  upvotes: string[];
  createdBy: string;
  createdAt: any;
  isAnswered: boolean;
};

export type AnswerType = {
  id?: string;
  questionId: string;
  answer: string;
  createdBy: string;
  createdAt: any;
};
