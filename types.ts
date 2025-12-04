export interface AdCopy {
  headline: string;
  tagline: string;
  body: string;
  callToAction: string;
}

export type AspectRatio = '1:1' | '16:9' | '9:16';

export interface AdResult {
  id: string;
  prompt: string;
  imageUrl: string;
  copy: AdCopy;
  timestamp: number;
  aspectRatio: AspectRatio;
}

export interface UserState {
  name: string;
  isOnboarded: boolean;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  GENERATING_COPY = 'GENERATING_COPY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}