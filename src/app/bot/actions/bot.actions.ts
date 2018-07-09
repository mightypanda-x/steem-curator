import { Action } from '@ngrx/store';
import {BidModel} from '../models/bid.model';

export enum BotActionTypes {
  RetriveBotInformation = '[Bots] Retrieve Bot Info',
  RetriveBotInformationSuccess = '[Bots] Retrieve Bot Info Successful',
  RetriveBotInformationFailure = '[Bots] Retrieve Bot Info Failed',
  ClearBotInformation = '[Bots] Clear Bot Info'
}
export class RetriveBotInformation implements Action {
  readonly type = BotActionTypes.RetriveBotInformation;

  constructor(public payload: string) {}
}

export class RetriveBotInformationSuccess implements Action {
  readonly type = BotActionTypes.RetriveBotInformationSuccess;

  constructor(public payload: BidModel[]) {}
}

export class RetriveBotInformationFailure implements Action {
  readonly type = BotActionTypes.RetriveBotInformationFailure;

  constructor(public error: any) {}
}

export class ClearBotInformation implements Action {
  readonly type = BotActionTypes.ClearBotInformation;
}

export type BotActions = RetriveBotInformation
  | RetriveBotInformationSuccess
  | RetriveBotInformationFailure
  | ClearBotInformation;
