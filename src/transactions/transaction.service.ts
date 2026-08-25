import { TransactionRepository } from './transaction.repository';
import { Transaction } from '@prisma/client';
import { z } from 'zod';

export class TransactionService {
  private repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  /**
   * Create a new transaction for a user.
   * @param userId - ID of the user.
   * @param amount - Transaction amount.
   * @param description - Description of the transaction.
   * @returns The created transaction.
   */
  async createTransaction(userId: number, amount: number, description: string): Promise<Transaction> {
    // Input validation
    const schema = z.object({
      userId: z.number().int().positive(),
      amount: z.number().positive(),
      description: z.string().min(1).max(255),
    });

    schema.parse({ userId, amount, description });

    // Business logic (e.g., additional validations can be added here)
    return await this.repository.create({ userId, amount, description });
  }

  /**
   * Get all transactions for a specific user.
   * @param userId - ID of the user.
   * @param skip - Number of records to skip (for pagination).
   * @param take - Number of records to take (for pagination).
   * @returns List of transactions for the user.
   */
  async getTransactionsByUser(userId: number, skip: number, take: number): Promise<Transaction[]> {
    // Input validation
    const schema = z.object({
      userId: z.number().int().positive(),
      skip: z.number().int().nonnegative(),
      take: z.number().int().positive(),
    });

    schema.parse({ userId, skip, take });

    return await this.repository.findByUser(userId, skip, take);
  }

  /**
   * Delete all transactions for a specific user.
   * @param userId - ID of the user.
   * @returns The count of deleted transactions.
   */
  async deleteAllTransactions(userId: number): Promise<number> {
    // Input validation
    const schema = z.object({
      userId: z.number().int().positive(),
    });

    schema.parse({ userId });

    return await this.repository.deleteAllByUser(userId);
  }
}
