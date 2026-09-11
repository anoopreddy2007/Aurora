import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  calculateBucketSpending,
  calculateCategorySpending,
  calculateSavings,
  calculateSavingsRate,
  calculateSpending,
  defaultFinanceData,
  type FinanceData,
  type Goal,
  type Transaction,
} from "../data/finance";
import { useAuth } from "./AuthContext";

type FinanceContextValue = {
  finance: FinanceData;
  spending: number;
  savings: number;
  savingsRate: number;
  categorySpending: ReturnType<typeof calculateCategorySpending>;
  bucketSpending: ReturnType<typeof calculateBucketSpending>;
  setIncome: (income: number) => void;
  setAllocation: (allocation: FinanceData["allocation"]) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>
  ) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, "id">) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  resetFinance: () => void;
};

const FinanceContext = createContext<FinanceContextValue | null>(null);

const STORAGE_PREFIX = "aurora-finance-";
const DEMO_STORAGE_KEY = "aurora-finance-demo";

function getStorageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

function cloneDefaultFinanceData(): FinanceData {
  return {
    income: defaultFinanceData.income,

    transactions: defaultFinanceData.transactions.map(
      (transaction) => ({
        ...transaction,
      })
    ),

    goals: defaultFinanceData.goals.map((goal) => ({
      ...goal,
    })),

    allocation: {
      ...defaultFinanceData.allocation,
    },
  };
}

function loadFinanceData(storageKey: string): FinanceData {
  try {
    const stored = localStorage.getItem(storageKey);

    if (!stored) {
      return cloneDefaultFinanceData();
    }

    const parsed = JSON.parse(stored) as Partial<FinanceData>;

    return {
      income:
        typeof parsed.income === "number"
          ? parsed.income
          : defaultFinanceData.income,

      transactions: Array.isArray(parsed.transactions)
        ? parsed.transactions
        : cloneDefaultFinanceData().transactions,

      goals: Array.isArray(parsed.goals)
        ? parsed.goals
        : cloneDefaultFinanceData().goals,

      allocation:
        parsed.allocation &&
        typeof parsed.allocation.needs === "number" &&
        typeof parsed.allocation.wants === "number" &&
        typeof parsed.allocation.savings === "number"
          ? parsed.allocation
          : {
              ...defaultFinanceData.allocation,
            },
    };
  } catch {
    return cloneDefaultFinanceData();
  }
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

type FinanceProviderProps = {
  children: ReactNode;
  demoMode?: boolean;
};

export function FinanceProvider({
  children,
  demoMode = false,
}: FinanceProviderProps) {
  const { user } = useAuth();

  const storageKey =
    demoMode
      ? DEMO_STORAGE_KEY
      : user
        ? getStorageKey(user.id)
        : null;

  const [finance, setFinance] = useState<FinanceData>(() =>
    storageKey
      ? loadFinanceData(storageKey)
      : cloneDefaultFinanceData()
  );

  useEffect(() => {
    if (!storageKey) {
      setFinance(cloneDefaultFinanceData());
      return;
    }

    setFinance(loadFinanceData(storageKey));
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify(finance)
    );
  }, [finance, storageKey]);

  const spending = useMemo(
    () =>
      calculateSpending(finance.transactions),
    [finance.transactions]
  );

  const savings = useMemo(
    () =>
      calculateSavings(
        finance.income,
        finance.transactions
      ),
    [finance.income, finance.transactions]
  );

  const savingsRate = useMemo(
    () =>
      calculateSavingsRate(
        finance.income,
        finance.transactions
      ),
    [finance.income, finance.transactions]
  );

  const categorySpending = useMemo(
    () =>
      calculateCategorySpending(
        finance.transactions
      ),
    [finance.transactions]
  );

  const bucketSpending = useMemo(
    () =>
      calculateBucketSpending(
        finance.transactions
      ),
    [finance.transactions]
  );

  const setIncome = (income: number) => {
    setFinance((current) => ({
      ...current,
      income: Math.max(0, income),
    }));
  };

  const setAllocation = (
    allocation: FinanceData["allocation"]
  ) => {
    setFinance((current) => ({
      ...current,
      allocation,
    }));
  };

  const addTransaction = (
    transaction: Omit<Transaction, "id">
  ) => {
    setFinance((current) => ({
      ...current,
      transactions: [
        ...current.transactions,
        {
          ...transaction,
          id: createId("transaction"),
        },
      ],
    }));
  };

  const updateTransaction = (
    id: string,
    transaction: Partial<Transaction>
  ) => {
    setFinance((current) => ({
      ...current,
      transactions: current.transactions.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                ...transaction,
              }
            : item
      ),
    }));
  };

  const deleteTransaction = (id: string) => {
    setFinance((current) => ({
      ...current,
      transactions: current.transactions.filter(
        (item) => item.id !== id
      ),
    }));
  };

  const addGoal = (
    goal: Omit<Goal, "id">
  ) => {
    setFinance((current) => ({
      ...current,
      goals: [
        ...current.goals,
        {
          ...goal,
          id: createId("goal"),
        },
      ],
    }));
  };

  const updateGoal = (
    id: string,
    goal: Partial<Goal>
  ) => {
    setFinance((current) => ({
      ...current,
      goals: current.goals.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                ...goal,
              }
            : item
      ),
    }));
  };

  const deleteGoal = (id: string) => {
    setFinance((current) => ({
      ...current,
      goals: current.goals.filter(
        (item) => item.id !== id
      ),
    }));
  };

  const resetFinance = () => {
    setFinance(cloneDefaultFinanceData());
  };

  const value: FinanceContextValue = {
    finance,
    spending,
    savings,
    savingsRate,
    categorySpending,
    bucketSpending,
    setIncome,
    setAllocation,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    resetFinance,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance must be used inside FinanceProvider"
    );
  }

  return context;
}