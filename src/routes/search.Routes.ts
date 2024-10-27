import { Request, Response, Router } from 'express';
import searchUsers from '../controller/search.Controller';

const router = Router();

/**
 * @swagger
 * /api/search?name={query}:
 *   get:
 *     summary: Search users by name
 *     description: Returns a list of users matching the provided name.
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: The name to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: integer
 *                   name:
 *                     type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get('/', async (req: Request, res: Response): Promise<void> => {
  await searchUsers(req, res);
});

export default router;
