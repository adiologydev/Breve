import console from 'console';

import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const databaseMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connection.readyState) return handler(req, res);

    await mongoose.connect(process.env.MONGO_URL!).catch((err) => {
      console.error(err);
      return res.status(500).json({ error: 'Server error (database)' });
    });
    return handler(req, res);
  };

export default databaseMiddleware;
