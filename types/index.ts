import { IdTokenResult, User } from 'firebase/auth'

export type QuestionType = {
  id?: string
  title: string
  question: string
  upvotes: string[]
  createdBy: string
  createdAt: any
  isAnswered: boolean
}

export type AnswerType = {
  id?: string;
  questionId: string;
  answer: string;
  createdBy: string;
  createdAt: any;
};

export type PollType = {
  id?: string;
  topic: string;
  description: string;
  createdAt: any;
  createdBy: string;
  endsOn: any;
};

export type SignInProps = { email: string; password: string }
export type SignUpProps = {
  firstname: string
  lastname: string
  occupation: string
  nic: string
  email: string
  password: string
}

export type AuthSliceType = {
  user: (User & IdTokenResult) | null
  loading: boolean
  setUser: (user: (User & IdTokenResult) | null) => void
  setLoading: (loading: boolean) => void
  signIn: ({}: SignInProps) => Promise<User>
  signUp: ({}: SignUpProps) => Promise<User>
  signOut: () => Promise<void>
}
