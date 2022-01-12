import { NextApiResponse } from 'next';
import validator from 'validator';

export enum StatusCodes {
  SUCCESS = 200,
  SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  RATE_LIMIT = 429,
}

export const createSuccess = (res: NextApiResponse, data: {}) =>
  res.status(StatusCodes.SUCCESS).json({ success: true, ...data });

export const createError = (
  res: NextApiResponse,
  code: StatusCodes,
  error: string
) => res.status(code).json({ success: false, error });

export const isValidURL = (url: string) => {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_host: true,
    require_tld: true,
  });
};

export const isValidAlias = (alias: string) => {
  return validator.isAlphanumeric(alias);
};
