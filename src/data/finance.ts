export type BudgetBucket = "needs" | "wants" | "savings";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  bucket: BudgetBucket;
  recurring?: boolean;
};

export type Goal = {
  id: string;
  name: string;
  current: number;
  target: number;
};

export type FinanceData = {
  income: number;
  transactions: Transaction[];
  goals: Goal[];
  allocation: {
    needs: number;
    wants: number;
    savings: number;
  };
};

export const defaultFinanceData: FinanceData = {
  income: 80000,

  transactions: [
    {
      id: "demo-rent",
      name: "Rent",
      category: "Housing",
      amount: 18000,
      date: "2026-10-01",
      bucket: "needs",
      recurring: true,
    },
    {
      id: "demo-swiggy",
      name: "Swiggy",
      category: "Food",
      amount: 420,
      date: "2026-10-04",
      bucket: "needs",
    },
    {
      id: "demo-spotify",
      name: "Spotify",
      category: "Subscriptions",
      amount: 119,
      date: "2026-10-06",
      bucket: "wants",
      recurring: true,
    },
    {
      id: "demo-uber",
      name: "Uber",
      category: "Transport",
      amount: 280,
      date: "2026-10-08",
      bucket: "needs",
    },
    {
      id: "demo-netflix",
      name: "Netflix",
      category: "Subscriptions",
      amount: 649,
      date: "2026-10-10",
      bucket: "wants",
      recurring: true,
    },
  ],

  goals: [
    {
      id: "demo-laptop",
      name: "New laptop",
      current: 72000,
      target: 150000,
    },
    {
      id: "demo-trip",
      name: "Goa trip",
      current: 18000,
      target: 30000,
    },
  ],

  allocation: {
    needs: 56,
    wants: 22,
    savings: 22,
  },
};

export function formatCurrency(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function calculateSpending(
  transactions: Transaction[]
): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

export function calculateSavings(
  income: number,
  transactions: Transaction[]
): number {
  return Math.max(0, income - calculateSpending(transactions));
}

export function calculateSavingsRate(
  income: number,
  transactions: Transaction[]
): number {
  if (income <= 0) return 0;

  return Math.max(
    0,
    Math.min(
      100,
      (calculateSavings(income, transactions) / income) * 100
    )
  );
}

export function calculateCategorySpending(
  transactions: Transaction[]
) {
  const totals = new Map<string, number>();

  for (const transaction of transactions) {
    totals.set(
      transaction.category,
      (totals.get(transaction.category) ?? 0) +
        transaction.amount
    );
  }

  const total = calculateSpending(transactions);

  return Array.from(totals.entries())
    .map(([label, amount]) => ({
      label,
      amount,
      percentage:
        total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function calculateBucketSpending(
  transactions: Transaction[]
) {
  const totals = {
    needs: 0,
    wants: 0,
    savings: 0,
  };

  for (const transaction of transactions) {
    totals[transaction.bucket] += transaction.amount;
  }

  return totals;
}