import { Action } from '@ngrx/store';
import {BidModel} from '../models/bid.model';
import {BotModel} from '../models/bot.model';

export enum BotActionTypes {
  RetrieveBotList = '[Bots] Retrieve Bot List',
  RetrieveBotListSuccess = '[Bots] Retrieve Bot List Successful',
  RetrieveBotInformation = '[Bots] Retrieve Bot Info',
  RetrieveBotInformationSuccess = '[Bots] Retrieve Bot Info Successful',
  RetrieveBotInformationFailure = '[Bots] Retrieve Bot Info Failed',
  ClearBotInformation = '[Bots] Clear Bot Info'
}
/*
* This action triggers the call to get list of all bid bots currently listed.
*/
export class RetrieveBotList implements Action {
  readonly type = BotActionTypes.RetrieveBotList;
}
/*
* This action gets called when the retrieve of bots list is successful.
*/
export class RetrieveBotListSuccess implements Action {
  readonly type = BotActionTypes.RetrieveBotListSuccess;

  constructor(public payload: BotModel[]) {}
}
/*
* This action triggers the call to get current bids in the specified bot.
* Payload is the name of the bot for which bids need to be retrieved.
*/
export class RetrieveBotInformation implements Action {
  readonly type = BotActionTypes.RetrieveBotInformation;

  constructor(public payload: string[]) {}
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

export type BotActions = RetrieveBotList
  | RetrieveBotListSuccess
  | RetrieveBotInformation
  | RetrieveBotInformationSuccess
  | RetrieveBotInformationFailure
  | ClearBotInformation;
