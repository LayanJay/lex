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
  id?: string
  questionId: string
  answer: string
  createdBy: string
  createdAt: any
}

export type PollType = {
  id?: string
  topic: string
  description: string
  createdAt: any
  createdBy: string
  endsOn: any
}

export type SignInProps = { email: string; password: string }
export type SignUpProps = {
  firstname: string
  lastname: string
  occupation: string
  nic: string
  email: string
  password: string
}
export type SignUpLawyerProps = {
  firstname: string
  lastname: string
  firm: string
  university: string
  email: string
  password: string
}
export type SignUpAnalystProps = {
  firstname: string
  lastname: string
  firm: string
  email: string
  password: string
}

export type AuthSliceType = {
  user:
    | (User & IdTokenResult & { role: 'user' | 'lawyer' | 'analyst' | 'admin' })
    | null
  loading: boolean
  setUser: (
    user:
      | (User &
          IdTokenResult & { role: 'user' | 'lawyer' | 'analyst' | 'admin' })
      | null
  ) => void
  setLoading: (loading: boolean) => void
  signIn: ({}: SignInProps) => Promise<User>
  signUp: ({}: SignUpProps) => Promise<User>
  signUpLawyer: ({}: SignUpLawyerProps) => Promise<User>
  signUpAnalyst: ({}: SignUpAnalystProps) => Promise<User>
  signOut: () => Promise<void>
}
