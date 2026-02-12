
export interface Comment {
  author: string;
  text: string;
  date: string;
}

export interface Reading {
  title: string;
  author: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3?: string; // Nota/Hipótesis del facilitador
}

export interface Encounter {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  promptQuestion: string;
  content: string | null; // Narrativa original/futura
  summaryParagraph?: string; // Síntesis bitácora
  keyIdeas?: string[]; // Ideas clave bitácora
  herramientasMetodologicas?: string[]; // Herramientas bitácora
  readings?: Reading[];
  attendees: string[];
  comments: Comment[];
}

export enum UserRole {
  ADMIN = 'admin',
  PARTICIPANT = 'participant'
}

export interface User {
  name: string;
  role: UserRole;
}
