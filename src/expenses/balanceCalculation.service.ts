import { ExpenseRepository } from './expense.repository';

type SharedExpenseResult = {
  participants: Array<{ userId: number; amount: number }>;
};

export class BalanceCalculationService {
  private repository: ExpenseRepository;

  constructor(repository: ExpenseRepository) {
    this.repository = repository;
  }

  /**
   * Create a new shared expense with equal or custom split.
   * @param description - Description of the expense.
   * @param totalAmount - Total amount of the expense.
   * @param createdBy - ID of the user who created the expense.
   * @param participants - List of participants with their custom amounts (optional for equal split).
   * @returns The created shared expense.
   */
  async createSharedExpense(
    description: string,
    totalAmount: number,
    createdBy: number,
    participants: { userId: number; amount?: number }[],
    splitType?: 'EQUAL' | 'CUSTOM'
  ): Promise<SharedExpenseResult> {
    if (participants.length === 0) {
      throw new Error('At least one participant is required.');
    }

    const resolvedSplitType = splitType ?? (
      participants.some((participant) => participant.amount !== undefined) ? 'CUSTOM' : 'EQUAL'
    );

    if (resolvedSplitType === 'CUSTOM') {
      if (participants.some((p) => p.amount === undefined)) {
        throw new Error('Custom split requires an amount for every participant.');
      }

      const totalCustomAmount = participants.reduce((sum, p) => sum + (p.amount || 0), 0);
      if (totalCustomAmount !== totalAmount) {
        throw new Error('Custom split amounts must equal the total expense amount.');
      }
    } else if (participants.some((p) => p.amount !== undefined)) {
      throw new Error('Equal split must not include participant amounts.');
    }

    // Calculate equal split if no custom amounts are provided
    const splitAmount = totalAmount / participants.length;
    const participantShares = participants.map((p) => ({
      userId: p.userId,
      amount: p.amount ?? splitAmount,
    }));

    return await this.repository.createSharedExpense(
      { description, totalAmount, createdBy, splitType: resolvedSplitType },
      participantShares
    );
  }

  /**
   * Calculate net balances between users for all shared expenses.
   * @param userId - ID of the user for whom to calculate balances.
   * @returns A map of user IDs to their net balances with the given user.
   */
  async calculateNetBalances(userId: number): Promise<Record<number, number>> {
    const sharedExpenses = await this.repository.getSharedExpensesByUser(userId);

    const balances: Record<number, number> = {};

    for (const expense of sharedExpenses) {
      if (!expense.participants.some((participant: { userId: number }) => participant.userId === userId)) {
        continue;
      }

      for (const participant of expense.participants) {
        if (participant.userId === userId) {
          continue;
        }

        const amountOwed = Number(participant.amount);
        const isPaid = participant.paid;

        if (!isPaid) {
          const signedAmount = expense.createdBy === userId ? amountOwed : -amountOwed;
          balances[participant.userId] = (balances[participant.userId] || 0) + signedAmount;
        }
      }
    }

    const simplifiedBalances: Record<number, number> = {};
    for (const [otherUserId, balance] of Object.entries(balances)) {
      if (balance !== 0) {
        simplifiedBalances[Number(otherUserId)] = balance;
      }
    }

    return simplifiedBalances;
  }
}
