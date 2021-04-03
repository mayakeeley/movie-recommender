import {NodeTypesEnum} from '../enums/node-types.enum';

export interface ConfigModel {
  nodeType: NodeTypesEnum;
  nodeId: string;
  data?: AnswerModel | QuestionModel | OutcomeModel;
  children: ConfigModel[];
}

export interface AnswerModel {
  answerText: string;
}

export interface QuestionModel {
  questionText: string;
}

export interface OutcomeModel {
  outcomeType: string;
  genreOutcome?: string[];
  budgetOutcomeMin?: number;
  budgetOutcomeMax?: number;
}
