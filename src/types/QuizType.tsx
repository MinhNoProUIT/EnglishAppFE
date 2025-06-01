export type QuizType = {
  id: number;
  title: string;
  questions: QuizQuestionType[];
}

export type QuizQuestionType = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export type QuizResultType = {
  id: number;
  title: string;
  questions: QuizQuestionResultType[];
  score: number;
}

export type QuizQuestionResultType = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
}
