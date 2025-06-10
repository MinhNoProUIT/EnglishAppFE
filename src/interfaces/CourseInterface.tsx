export interface Course {
    id: string,
    title: string,
    totalWords: number,
    remainWords: number,
    ongoingWords: number,
    completedWords: number,
    topic: string,
    level: string,
    image: string,
    progressScore: number,
};

export interface CourseDetailMenuProps {
    course_id: string,
    completedWords: number,
    remainWords: number,
};

export interface LockedCourse {
    id: string,
    title: string,
    topic: string,
    level: string,
    image_url: string,
    description: string,
    price: number,
    isActive: boolean,
};
