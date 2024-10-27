import { Request, Response } from 'express';
import * as userService from '../services/user.Service';
import logger from '../utils/logger';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      status: 'success',
      total: users.length,
      data: users,
    });
  } catch (error) {
    const errorAsError = error as Error;
    logger.error('Error fetching user info', { error: errorAsError.message });
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users',
      details: errorAsError.message, // Hanya untuk pengembangan, bisa dihapus di produksi
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    const errorAsError = error as Error;
    logger.error('Error fetching user info', { error: errorAsError.message });
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user',
      details: errorAsError.message, // Hanya untuk pengembangan, bisa dihapus di produksi
    });
  }
};
