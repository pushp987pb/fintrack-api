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
        splitType: z.enum(['EQUAL', 'CUSTOM']).optional(),
        participants: z.array(z.object({
          userId: z.number().int().positive(),
          amount: z.number().positive().optional(),
        })).min(2),
      });

      const { description, totalAmount, participants, splitType } = schema.parse(req.body);
      const resolvedSplitType = splitType ?? (
        participants.some((participant) => participant.amount !== undefined) ? 'CUSTOM' : 'EQUAL'
      );

      if (resolvedSplitType === 'CUSTOM' && participants.some((participant) => participant.amount === undefined)) {
        res.status(400).json({ error: 'Custom split requires an amount for every participant.' });
        return;
      }

      if (resolvedSplitType === 'EQUAL' && participants.some((participant) => participant.amount !== undefined)) {
        res.status(400).json({ error: 'Equal split must not include participant amounts.' });
        return;
      }

      // Authorization: Ensure the user is the creator
      const createdBy = req.user.id;

      const sharedExpense = await this.balanceService.createSharedExpense(
        description,
        totalAmount,
        createdBy,
        participants,
        resolvedSplitType
      );

      res.status(201).json(sharedExpense);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ error: message });
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
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ error: message });
    }
  }

/**
 * Calculate the net balance for the authenticated user.
 */
async getNetBalance(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
  
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
