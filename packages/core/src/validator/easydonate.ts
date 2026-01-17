import { type } from 'arktype';

export const EasydonateSchema = type({
  referenceNo: 'string',
  channelName: 'string',
  donatorName: 'string',
  donateMessage: 'string',
  amount: 'number',
  time: 'string',
});
