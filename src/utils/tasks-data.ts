export type TaskDef = {
  id: string;
  title: string;
};

export type TaskGroupDef = {
  id: string;
  title: string;
  subtitle?: string;
  tasks: TaskDef[];
};

export type SectionDef = {
  id: string;
  title: string;
  groups: TaskGroupDef[];
};

export const STUDY_DATA: SectionDef[] = [
  {
    id: 'section-1',
    title: 'SECTION 1 — COURSES TO COMPLETE [40 Days]',
    groups: [
      {
        id: '1a',
        title: '1A. Google Cloud Certificate',
        tasks: [
          { id: '1a-1', title: 'Google Cloud Certificate' },
          { id: '1a-2', title: 'Specific Data Engineering Projects' },
          { id: '1a-3', title: 'Data Analyst 12-hour course' },
          {
            id: '1a-4',
            title: '(With projects — refer to other videos in the playlist)',
          },
        ],
      },
      {
        id: '1b',
        title: '1B. Complete My Own Course (Up to Gen-AI Requisites)',
        tasks: [
          { id: '1b-1', title: 'NLP' },
          { id: '1b-2', title: 'Deep Learning with ANN' },
          { id: '1b-3', title: 'RNN' },
          { id: '1b-4', title: 'LSTM GRU' },
          { id: '1b-5', title: 'Bi-directional RNN (No code from here)' },
          { id: '1b-6', title: 'Encoder Decoder' },
          {
            id: '1b-7',
            title: 'Attention Mechanism (Important for Transformer)',
          },
          { id: '1b-8', title: 'Transformer' },
        ],
      },
    ],
  },
  {
    id: 'section-2',
    title: 'SECTION 2 — PLACEMENT EXCLUSIVES [45 Days]',
    groups: [
      {
        id: 'placement',
        title: '',
        tasks: [
          { id: 'p-1', title: 'DSA [Tree, Graph, DP] — 25 days allocated' },
          { id: 'p-2', title: 'Aptitude — 8 days allocated' },
          { id: 'p-3', title: 'Core Fundamentals — 7 days allocated' },
          { id: 'p-4', title: 'System Design — 2 days allocated' },
          { id: 'p-5', title: 'DSA Revision — 14 days allocated' },
        ],
      },
    ],
  },
  {
    id: 'section-3',
    title: 'SECTION 3 — MONTHLY DEADLINES',
    groups: [
      {
        id: 'march',
        title: '📅 March Deadlines',
        tasks: [
          { id: 'm-1', title: 'Andrew Ng Course' },
          { id: 'm-2', title: 'Start Tree (2 hours)' },
        ],
      },
      {
        id: 'april',
        title: '📅 April Deadlines',
        tasks: [
          { id: 'a-1', title: 'Complete Tree and DP' },
          { id: 'a-2', title: 'Complete my own course' },
        ],
      },
      {
        id: 'may',
        title: '📅 May Deadlines',
        tasks: [
          { id: 'may-1', title: 'Up to Gen-AI Requisites' },
          { id: 'may-2', title: 'Get hands-on understanding of RAGs and LLMs' },
          { id: 'may-3', title: 'Aptitude' },
          { id: 'may-4', title: 'Core Fundamentals' },
          { id: 'may-5', title: 'Complete Graph' },
          { id: 'may-6', title: 'DSA Revision' },
        ],
      },
      {
        id: 'june',
        title: '📅 June Deadlines',
        tasks: [
          { id: 'j-1', title: 'Google Cloud Certificate' },
          { id: 'j-2', title: 'Specific Data Engineering Projects' },
          { id: 'j-3', title: 'Data Analyst 12-hour course' },
          { id: 'j-4', title: 'With projects — refer to playlist' },
          { id: 'j-5', title: 'System Design' },
          { id: 'j-6', title: 'Aptitude' },
          { id: 'j-7', title: 'Core Fundamentals' },
          { id: 'j-8', title: 'Complete Graph' },
          { id: 'j-9', title: 'DSA Revision' },
        ],
      },
    ],
  },
];
