import { WordType } from "./WordType";
export type CourseType = {
    id: string,
    title: string,
    totalWords: number,
    remainWords: number,
    ongoingWords: number,
    completedWords: number,
    topic: string,
    level: string,
    image: string,
    vocabulary: WordType[],
  };