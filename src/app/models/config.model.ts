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
  genreOutcome?: number;
  budgetOutcome?: number;
  budgetOutcomeMin?: number;
  budgetOutcomeMax?: number;
}
