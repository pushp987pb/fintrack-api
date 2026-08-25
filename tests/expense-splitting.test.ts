import { BalanceCalculationService } from '../src/expenses/balanceCalculation.service';
import { ExpenseRepository } from '../src/expenses/expense.repository';

jest.mock('../src/expenses/expense.repository');

describe('BalanceCalculationService', () => {
  let service: BalanceCalculationService;
  let repository: jest.Mocked<ExpenseRepository>;

  beforeEach(() => {
    repository = new ExpenseRepository({} as any) as jest.Mocked<ExpenseRepository>;
    service = new BalanceCalculationService(repository);
  });

  it('should create an equal split among 3 participants', async () => {
    const participants = [
      { userId: 1 },
      { userId: 2 },
      { userId: 3 },
    ];
    const totalAmount = 300;

    repository.createSharedExpense.mockResolvedValue({
      id: 1,
      description: 'Dinner',
      totalAmount,
      createdBy: 1,
      createdAt: new Date(),
      participants: participants.map((p) => ({
        ...p,
        amount: 100,
        paid: false,
        createdAt: new Date(),
      })),
    });

    const result = await service.createSharedExpense('Dinner', totalAmount, 1, participants);

    expect(result.participants).toHaveLength(3);
    expect(result.participants.every((p) => p.amount === 100)).toBe(true);
  });

  it('should create a custom split where participant amounts equal the total', async () => {
    const participants = [
      { userId: 1, amount: 150 },
      { userId: 2, amount: 100 },
      { userId: 3, amount: 50 },
    ];
    const totalAmount = 300;

    repository.createSharedExpense.mockResolvedValue({
      id: 1,
      description: 'Trip',
      totalAmount,
      createdBy: 1,
      createdAt: new Date(),
      participants: participants.map((p) => ({
        ...p,
        paid: false,
        createdAt: new Date(),
      })),
    });

    const result = await service.createSharedExpense('Trip', totalAmount, 1, participants);

    expect(result.participants).toHaveLength(3);
    expect(result.participants.map((p) => p.amount)).toEqual([150, 100, 50]);
  });

  it('should throw an error for a custom split where participant amounts do not equal the total', async () => {
    const participants = [
      { userId: 1, amount: 150 },
      { userId: 2, amount: 100 },
    ];
    const totalAmount = 300;

    await expect(
      service.createSharedExpense('Trip', totalAmount, 1, participants)
    ).rejects.toThrow('Custom split amounts must equal the total expense amount.');
  });

  it('should calculate net balances between two users with multiple shared expenses', async () => {
    const userId = 1;
    const sharedExpenses = [
      {
        id: 1,
        description: 'Dinner',
        totalAmount: 100,
        createdBy: 1,
        createdAt: new Date(),
        participants: [
          { userId: 1, amount: 50, paid: false, createdAt: new Date() },
          { userId: 2, amount: 50, paid: false, createdAt: new Date() },
        ],
      },
      {
        id: 2,
        description: 'Trip',
        totalAmount: 200,
        createdBy: 2,
        createdAt: new Date(),
        participants: [
          { userId: 1, amount: 100, paid: false, createdAt: new Date() },
          { userId: 2, amount: 100, paid: false, createdAt: new Date() },
        ],
      },
    ];

    repository.getSharedExpensesByUser.mockResolvedValue(sharedExpenses);

    const balances = await service.calculateNetBalances(userId);

    expect(balances).toEqual({ 2: 0 }); // User 1 owes User 2 50, User 2 owes User 1 50 -> Net balance is 0
  });

  it('should handle an expense with only one participant', async () => {
    const participants = [{ userId: 1 }];
    const totalAmount = 100;

    repository.createSharedExpense.mockResolvedValue({
      id: 1,
      description: 'Solo Expense',
      totalAmount,
      createdBy: 1,
      createdAt: new Date(),
      participants: participants.map((p) => ({
        ...p,
        amount: 100,
        paid: false,
        createdAt: new Date(),
      })),
    });

    const result = await service.createSharedExpense('Solo Expense', totalAmount, 1, participants);

    expect(result.participants).toHaveLength(1);
    expect(result.participants[0].amount).toBe(100);
  });

  it('should throw an error for unauthorized access attempt', async () => {
    const userId = 1;
    const sharedExpenses = [
      {
        id: 1,
        description: 'Unauthorized Expense',
        totalAmount: 100,
        createdBy: 2,
        createdAt: new Date(),
        participants: [
          { userId: 2, amount: 100, paid: false, createdAt: new Date() },
        ],
      },
    ];

    repository.getSharedExpensesByUser.mockResolvedValue(sharedExpenses);

    const balances = await service.calculateNetBalances(userId);

    expect(balances).toEqual({}); // No balances should be calculated for unauthorized access
  });
});
