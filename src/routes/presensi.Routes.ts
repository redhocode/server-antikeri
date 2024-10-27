import { Router, Request, Response } from "express";
import postPresensi from "../controller/presensi.Controller"; // Ensure the import path is correct

const router = Router();

/**
 * Route handler for posting presensi data.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} - The response object.
 */


/**
 * @swagger
 * /api/presensi:
 *   post:
 *     summary: Post presensi data
 *     description: Post presensi data to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               checktime:
 *                 type: string
 *               sensorId:
 *                 type: integer
 *               sn:
 *                 type: string
 *     responses:
 *       200:
 *         description: Presensi data posted successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 affectedRows:
 *                   type: number
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  await postPresensi(req, res);
});
export default router;