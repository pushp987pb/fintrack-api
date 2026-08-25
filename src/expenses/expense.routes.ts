import { Router } from 'express';
import { ExpenseController } from './expenses.controller';
import { ExpenseRepository } from './expense.repository';
import { BalanceCalculationService } from './balanceCalculation.service';
import { PrismaClient } from '@prisma/client';
import { requireUser } from '../middleware/auth';

const prisma = new PrismaClient();

const repository = new ExpenseRepository(prisma);
const balanceService = new BalanceCalculationService(repository);

const controller = new ExpenseController(
  repository,
  balanceService
);

const router = Router();
router.use(requireUser);

// Create a shared expense and assign participant shares.
router.post('/', (req, res) =>
  controller.createSharedExpense(req, res)
);

// Get shared expenses involving the authenticated user.
router.get('/', (req, res) =>
  controller.getSharedExpenses(req, res)
);

// Calculate the authenticated user's net balances with other participants.
router.get('/net-balance', (req, res) =>
  controller.getNetBalance(req, res)
);

export default router;
