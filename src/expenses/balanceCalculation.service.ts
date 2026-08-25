import { ExpenseRepository } from './expense.repository';
import { SharedExpense, ParticipantShare } from '@prisma/client';

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
    participants: { userId: number; amount?: number }[]
  ): Promise<SharedExpense> {
    // Validate custom split totals if amounts are provided
    const hasCustomAmounts = participants.some((p) => p.amount !== undefined);
    if (hasCustomAmounts) {
      const totalCustomAmount = participants.reduce((sum, p) => sum + (p.amount || 0), 0);
      if (totalCustomAmount !== totalAmount) {
        throw new Error('Custom split amounts must equal the total expense amount.');
      }
    }

    // Calculate equal split if no custom amounts are provided
    const splitAmount = totalAmount / participants.length;
    const participantShares = participants.map((p) => ({
      userId: p.userId,
      amount: p.amount ?? splitAmount,
    }));

    return await this.repository.createSharedExpense(
      { description, totalAmount, createdBy },
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
      for (const participant of expense.participants) {
        if (participant.userId === userId) {
          // Skip the current user's own share
          continue;
        }

        const amountOwed = participant.amount;
        const isPaid = participant.paid;

        if (!isPaid) {
          // Add or subtract the amount owed to/from the balance
          balances[participant.userId] = (balances[participant.userId] || 0) + amountOwed;
        }
      }
    }

    // Simplify balances (e.g., User A owes User B 30, User B owes User A 10 -> User A owes User B 20)
    const simplifiedBalances: Record<number, number> = {};
    for (const [otherUserId, balance] of Object.entries(balances)) {
      const otherUserBalance = balances[userId] || 0;
      const netBalance = balance - otherUserBalance;

      if (netBalance !== 0) {
        simplifiedBalances[Number(otherUserId)] = netBalance;
      }
    }

    return simplifiedBalances;
  }
}
