import { Router } from 'express';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const repository = new TransactionRepository(prisma);
const service = new TransactionService(repository);
const controller = new TransactionController(service);

const router = Router();

/**
 * Transaction routes.
 */
router.post('/transactions', (req, res) => controller.createTransaction(req, res));
router.get('/transactions/:userId', (req, res) => controller.getTransactionsByUser(req, res));
router.delete('/transactions/:userId', (req, res) => controller.deleteAllTransactions(req, res));

export default router;
