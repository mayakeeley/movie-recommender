import {NodeTypesEnum, OutcomeTypesEnum} from '../enums';

export interface ConfigModel {
  nodeType: NodeTypesEnum;
  nodeId: string;
  data?: AnswerModel | QuestionModel;
  children: ConfigModel[];
}

export interface AnswerModel {
  answerText: string;
  outcome?: OutcomeModel;
}

export interface QuestionModel {
  questionText: string;
}

export interface OutcomeModel {
  outcomeType: OutcomeTypesEnum;
  options?: {
    value?: number;
    max?: number;
    min?: number;
    questionId?: string;
  }[];

}
