import { PrismaClient } from '@prisma/client';

export class ExpenseRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Create a new shared expense with participants.
   * @param data Shared expense data.
   * @param participants List of participant shares.
   * @returns The created shared expense.
   */
  async createSharedExpense(
    data: { description: string; totalAmount: number; createdBy: number },
    participants: { userId: number; amount: number }[]
  ): Promise<any> {
    return await this.prisma.sharedExpense.create({
      data: {
        ...data,
        participants: {
          create: participants,
        },
      },
      include: { participants: true },
    });
  }

  /**
   * Get a shared expense by ID.
   * @param id Shared expense ID.
   * @returns Shared expense with participants.
   */
  async getSharedExpenseById(id: number): Promise<any | null> {
    return await this.prisma.sharedExpense.findUnique({
      where: { id },
      include: { participants: true },
    });
  }

  /**
   * Get all shared expenses for a user.
   * @param userId User ID.
   * @returns List of shared expenses.
   */
  async getSharedExpensesByUser(userId: number): Promise<any[]> {
    return await this.prisma.sharedExpense.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: { participants: true },
    });
  }
}
