import { type } from 'arktype';

export const EasydonateSchema = type({
  provider: "'easydonate'",
  referenceNo: 'string',
  channelName: 'string',
  donatorName: 'string',
  donateMessage: 'string',
  amount: 'number',
  time: 'string',
});
