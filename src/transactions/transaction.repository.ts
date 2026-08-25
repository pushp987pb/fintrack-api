import { PrismaClient, Transaction } from '@prisma/client';

export class TransactionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Create a new transaction in the database.
   * @param data - Transaction data.
   * @returns The created transaction.
   */
  async create(data: { userId: number; amount: number; description: string }): Promise<Transaction> {
    return await this.prisma.transaction.create({
      data,
    });
  }

  /**
   * Get all transactions for a specific user.
   * @param userId - ID of the user.
   * @param skip - Number of records to skip (for pagination).
   * @param take - Number of records to take (for pagination).
   * @returns List of transactions for the user.
   */
  async findByUser(userId: number, skip: number, take: number): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  /**
   * Delete all transactions for a specific user.
   * @param userId - ID of the user.
   * @returns The count of deleted transactions.
   */
  async deleteAllByUser(userId: number): Promise<number> {
    const result = await this.prisma.transaction.deleteMany({
      where: { userId },
    });
    return result.count;
  }
}
