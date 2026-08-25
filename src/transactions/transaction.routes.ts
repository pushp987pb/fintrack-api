import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { PrismaClient } from '@prisma/client';
import { requireUser } from '../middleware/auth';

const prisma = new PrismaClient();
const repository = new TransactionRepository(prisma);
const service = new TransactionService(repository);
const controller = new TransactionController(service);

const router = Router();
router.use(requireUser);

/**
 * Transaction routes.
 */
router.post('/', (req, res) => controller.createTransaction(req, res));
router.get('/:userId', (req, res) => controller.getTransactionsByUser(req, res));
router.delete('/:userId', (req, res) => controller.deleteAllTransactions(req, res));

export default router;
