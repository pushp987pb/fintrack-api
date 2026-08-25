import { Router } from 'express';
import { ExpenseController } from './expense.controller';
import { ExpenseRepository } from './expense.repository';
import { BalanceCalculationService } from './balanceCalculation.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const repository = new ExpenseRepository(prisma);
const balanceService = new BalanceCalculationService(repository);

const controller = new ExpenseController(
  repository,
  balanceService
);

const router = Router();

/**
 * Expense routes.
 */
router.post('/expenses', (req, res) =>
  controller.createSharedExpense(req, res)
);

router.get('/expenses', (req, res) =>
  controller.getSharedExpenses(req, res)
);

router.get('/expenses/net-balance', (req, res) =>
  controller.getNetBalance(req, res)
);

export default router;
