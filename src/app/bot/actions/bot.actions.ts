import { Action } from '@ngrx/store';
import {BidModel} from '../models/bid.model';

export enum BotActionTypes {
  RetrieveBotInformation = '[Bots] Retrieve Bot Info',
  RetrieveBotInformationSuccess = '[Bots] Retrieve Bot Info Successful',
  RetrieveBotInformationFailure = '[Bots] Retrieve Bot Info Failed',
  ClearBotInformation = '[Bots] Clear Bot Info'
}
/*
* This action triggers the call to get current bids in the specified bot.
* Payload is the name of the bot for which bids need to be retrieved.
*/
export class RetrieveBotInformation implements Action {
  readonly type = BotActionTypes.RetrieveBotInformation;

  constructor(public payload: string) {}
}

/*
* This action gets called when the retrieve of current bids for a bot is successful.
* Payload is the list of all the bids.
 */
export class RetrieveBotInformationSuccess implements Action {
  readonly type = BotActionTypes.RetrieveBotInformationSuccess;

  constructor(public payload: BidModel[]) {}
}

export class RetrieveBotInformationFailure implements Action {
  readonly type = BotActionTypes.RetrieveBotInformationFailure;

  constructor(public error: any) {}
}

/*
* This action clearsthe state object before getting a fresh list of all the bids.
 */
export class ClearBotInformation implements Action {
  readonly type = BotActionTypes.ClearBotInformation;
}

export type BotActions = RetrieveBotInformation
  | RetrieveBotInformationSuccess
  | RetrieveBotInformationFailure
  | ClearBotInformation;
