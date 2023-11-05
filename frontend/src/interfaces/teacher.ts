import { Course } from "./course";

export interface Teacher {
  id: string,
  name: string,
  courses: [Course]
}