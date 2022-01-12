import { customAlphabet } from 'nanoid';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import databaseMiddleware from '@/middlewares/database';
import Link from '@/models/Link';
import {
  createError,
  createSuccess,
  isValidAlias,
  isValidURL,
  StatusCodes,
} from '@/utils/ApiHelper';

const nanoInstance = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  6
);

const generateAlias = () => nanoInstance();

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { url, customAlias } = req.body;
    if (!isValidURL(url))
      return createError(
        res,
        StatusCodes.BAD_REQUEST,
        'A Valid Url is required'
      );

    if (customAlias && !isValidAlias(customAlias))
      return createError(
        res,
        StatusCodes.BAD_REQUEST,
        'A Custom Alias must be alphanumeric'
      );

    const alias = customAlias || generateAlias();
    const shortUrl = `${req.headers.host}/${alias}`;

    if ((await Link.find({ url }).count()) > 0) {
      const existing = await Link.findOne({ url });
      return createSuccess(res, { data: existing.toJSON() });
    }

    if ((await Link.find({ alias }).count()) > 0) {
      const existing = await Link.findOne({ alias });
      return createSuccess(res, { data: existing.toJSON() });
    }

    const create = await Link.create({
      url,
      alias,
      shortUrl,
    });

    return createSuccess(res, { data: create.toJSON() });
  }

  if (req.method === 'GET') {
    const { alias } = req.query;
    if (!alias || !isValidAlias(alias as string))
      return createError(res, StatusCodes.BAD_REQUEST, 'Alias is required');

    const link = await Link.findOneAndUpdate(
      { alias },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!link) return createError(res, StatusCodes.NOT_FOUND, 'Link not found');

    return createSuccess(res, { data: link.toJSON() });
  }

  return createError(res, StatusCodes.BAD_REQUEST, 'Method not allowed');
};

export default databaseMiddleware(handler);
