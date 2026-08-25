import { TransactionService } from './transaction.service';
import { Request, Response } from 'express';

export class TransactionController {
  private service: TransactionService;

  constructor(service: TransactionService) {
    this.service = service;
  }

  /**
   * Handle the creation of a new transaction.
   */
  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount, description } = req.body;

      // Authorization check (ensure userId matches authenticated user)
      if (req.user.id !== userId) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      const transaction = await this.service.createTransaction(userId, amount, description);
      res.status(201).json(transaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ error: message });
    }
  }

  /**
   * Handle fetching transactions for a user.
   */
  async getTransactionsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(String(req.params.userId), 10);
      const { skip = 0, take = 10 } = req.query;

      // Authorization check
      if (req.user.id !== userId) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      const transactions = await this.service.getTransactionsByUser(userId, Number(skip), Number(take));
      res.status(200).json(transactions);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ error: message });
    }
  }

  /**
   * Handle deleting all transactions for a user.
   */
  async deleteAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(String(req.params.userId), 10);

      // Authorization check
      if (req.user.id !== userId) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      const deletedCount = await this.service.deleteAllTransactions(userId);
      res.status(200).json({ deletedCount });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ error: message });
    }
  }
}
