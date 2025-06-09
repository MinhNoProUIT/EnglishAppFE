export interface Word {
    id: string;
    englishname: string;
    vietnamesename: string;
    type: string;
    examplesentence: string;
    imageurl: string;
    transcription: string;
};

export interface UserProgressWithWord {
    id: string;
    level: number;
    words: Word;
};

export interface WordWithProgress {
    id: string;
    englishname: string;
    vietnamesename: string;
    type: string;
    examplesentence: string;
    imageurl: string;
    transcription: string;
    level: number;
}
export interface UpdateUserProgressProps {
    isCorrect: boolean,
    isRetry: boolean
}