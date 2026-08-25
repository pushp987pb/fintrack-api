import { ExpenseRepository } from './expense.repository';
import { BalanceCalculationService } from './balanceCalculation.service';
import { Request, Response } from 'express';
import { z } from 'zod';

export class ExpenseController {
  private repository: ExpenseRepository;
  private balanceService: BalanceCalculationService;

  constructor(repository: ExpenseRepository, balanceService: BalanceCalculationService) {
    this.repository = repository;
    this.balanceService = balanceService;
  }

  /**
   * Create a new shared expense.
   */
  async createSharedExpense(req: Request, res: Response): Promise<void> {
    try {
      const schema = z.object({
        description: z.string().min(1).max(255),
        totalAmount: z.number().positive(),
        participants: z.array(
          z.object({
            userId: z.number().int().positive(),
            amount: z.number().positive(),
          })
        ),
      });

      const { description, totalAmount, participants } = schema.parse(req.body);

      // Validate that participant amounts equal the total amount
      const totalParticipantAmount = participants.reduce((sum, p) => sum + p.amount, 0);
      if (totalParticipantAmount !== totalAmount) {
        res.status(400).json({ error: 'Participant amounts must equal the total expense amount.' });
        return;
      }

      // Authorization: Ensure the user is the creator
      const createdBy = req.user.id;

      const sharedExpense = await this.repository.createSharedExpense(
        { description, totalAmount, createdBy },
        participants
      );

      res.status(201).json(sharedExpense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get all shared expenses for the authenticated user.
   */
  async getSharedExpenses(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;

      const sharedExpenses = await this.repository.getSharedExpensesByUser(userId);
      res.status(200).json(sharedExpenses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

/**
 * Calculate the net balance for the authenticated user.
 */
async getNetBalance(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
  
      const netBalance =
        await this.balanceService.calculateNetBalances(userId);
  
      res.status(200).json({ netBalance });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Internal server error';
  
      res.status(400).json({ error: message });
    }
  }
}
