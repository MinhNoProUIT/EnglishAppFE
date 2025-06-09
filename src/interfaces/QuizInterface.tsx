export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  created_date: Date;
  total_questions: number;
}

export interface CreateEditQuizWithQuestionsProps {
  title: string;
  questions: CreateEditQuizQuestionProps[],
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
}

export interface CreateEditQuizQuestionProps {
  id?: string,
  question_text: string;
  options: string[];
  correct_answer: string;
}

export interface QuizResult {
  title: string;
  questions: QuizQuestionResult[];
  score: number;
}

export interface QuizQuestionResult {
  question_text: string;
  options: string[];
  correct_answer: string;
  selectedAnswer: string;
}
