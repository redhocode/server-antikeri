import { Request, Response } from 'express';
import * as presensiService from '../services/presensi.Service';
import logger from '../utils/logger';

/**
 * Handles HTTP POST requests to /api/presensi.
 * @param {PresensiRequest} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - The response object.
 */
const postPresensi = async (
  req: PresensiRequest,
  res: Response,
): Promise<Response> => {
  const { userId, checktime, sensorId, sn } = req.body;

  if (!userId || !checktime) {
    return res.status(400).json({ error: 'userId and checktime are required' });
  }

  try {
    const affectedRows = await presensiService.postPresensi(
      userId,
      checktime,
      sensorId,
      sn,
    );
    logger.info('Check-in/out data inserted successfully', { affectedRows });
    return res.status(201).json({
      message: 'Check-in/out data inserted successfully',
      affectedRows,
    });
  } catch (error) {
    logger.error('Failed to insert check-in/out data', { error });
    return res
      .status(500)
      .json({ error: 'Failed to insert check-in/out data' });
  }
};

/**
 * The shape of the request body.
 */
interface PresensiRequest extends Request {
  body: {
    userId: number;
    checktime: string;
    sensorId?: number;
    sn?: string;
  };
}

export default postPresensi;
