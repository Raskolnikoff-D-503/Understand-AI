export const SIZE = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
} as const;

export const TOPIC_IDS = {
  MACHINE_LEARNING: 'MACHINE_LEARNING',
  COMPUTER_VISION: 'COMPUTER_VISION',
  NATURAL_LEARNING_PROCESSING: 'NATURAL_LEARNING_PROCESSING',
  AI_ETHICS: 'AI_ETHICS',
  AI_HARDWARE: 'AI_HARDWARE',
} as const;

export const TOPICS = {
  [TOPIC_IDS.MACHINE_LEARNING]: {name: 'Machine Learning', id: 'machine-learning'},
  [TOPIC_IDS.COMPUTER_VISION]: {name: 'Computer Vision', id: 'computer-vision'},
  [TOPIC_IDS.NATURAL_LEARNING_PROCESSING]: {
    name: 'Natural Language Processing',
    id: 'natural-language-processing',
  },
  [TOPIC_IDS.AI_ETHICS]: {name: 'AI Ethics', id: 'ai-ethics'},
  [TOPIC_IDS.AI_HARDWARE]: {name: 'AI Hardware', id: 'ai-hardware'},
} as const;
