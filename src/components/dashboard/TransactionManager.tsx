import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Pencil,
  Plus,
  Repeat,
  Trash2,
  X,
} from "lucide-react";
import { useFinance } from "../../context/FinanceContext";
import {
  formatCurrency,
  type BudgetBucket,
  type Transaction,
} from "../../data/finance";

const bucketOptions: {
  value: BudgetBucket;
  label: string;
}[] = [
  { value: "needs", label: "Needs" },
  { value: "wants", label: "Wants" },
  { value: "savings", label: "Savings" },
];

const defaultForm = {
  name: "",
  category: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  bucket: "needs" as BudgetBucket,
  recurring: false,
};

type FormState = typeof defaultForm;

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function inputClassName() {
  return [
    "w-full rounded-[10px]",
    "border border-[#292B30]",
    "bg-[#0F1012]",
    "px-3 py-3",
    "text-[11px] text-[#F1F1F2]",
    "outline-none",
    "transition-colors",
    "placeholder:text-[#55585F]",
    "focus:border-[#666CC7]",
  ].join(" ");
}

export function TransactionManager() {
  const {
    finance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinance();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [error, setError] = useState("");

  const transactions = useMemo(
    () =>
      [...finance.transactions].sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      ),
    [finance.transactions]
  );

  const total = useMemo(
    () =>
      transactions.reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      ),
    [transactions]
  );

  const openAdd = () => {
    setForm({
      ...defaultForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingId(null);
    setError("");
    setIsAdding(true);
  };

  const openEdit = (transaction: Transaction) => {
    setForm({
      name: transaction.name,
      category: transaction.category,
      amount: String(transaction.amount),
      date: transaction.date,
      bucket: transaction.bucket,
      recurring: Boolean(transaction.recurring),
    });

    setEditingId(transaction.id);
    setError("");
    setIsAdding(true);
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(defaultForm);
    setError("");
  };

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setError("");
  };

  const handleSubmit = () => {
    const name = form.name.trim();
    const category = form.category.trim();
    const amount = Number(form.amount);

    if (!name) {
      setError("Enter a transaction name.");
      return;
    }

    if (!category) {
      setError("Enter a category.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than ₹0.");
      return;
    }

    if (!form.date) {
      setError("Select a date.");
      return;
    }

    const transaction = {
      name,
      category,
      amount: Math.round(amount),
      date: form.date,
      bucket: form.bucket,
      recurring: form.recurring,
    };

    if (editingId) {
      updateTransaction(editingId, transaction);
    } else {
      addTransaction(transaction);
    }

    closeForm();
  };

  return (
    <section
      id="transactions"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#070708]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[620px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
              Transactions
            </p>

            <h2 className="mt-5 font-space text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#F1F1F2] sm:text-[50px]">
              Know where
              <br />
              every rupee goes.
            </h2>

            <p className="mt-6 max-w-[480px] text-[12px] leading-[1.8] text-[#777B84] sm:text-[13px]">
              Add your spending as it happens. Aurora
              keeps your totals, categories and budget
              breakdown in sync automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-[10px] border border-[#34363D] bg-[#17181A] px-4 py-3 text-[10px] font-medium text-[#F1F1F2] transition-all hover:border-[#666CC7] hover:bg-[#1B1C1F]"
          >
            <Plus size={14} strokeWidth={1.8} />
            Add transaction
          </button>
        </div>

        {/* SUMMARY */}

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3">
          <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Transactions
            </p>

            <p className="mt-3 font-space text-[22px] text-[#F1F1F2]">
              {transactions.length}
            </p>
          </div>

          <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Total spending
            </p>

            <p className="mt-3 truncate font-space text-[22px] text-[#F1F1F2]">
              {formatCurrency(total)}
            </p>
          </div>

          <div className="col-span-2 min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:col-span-1 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Remaining
            </p>

            <p className="mt-3 truncate font-space text-[22px] text-[#56C7A0]">
              {formatCurrency(
                Math.max(0, finance.income - total)
              )}
            </p>
          </div>
        </div>

        {/* TRANSACTION LIST */}

        <div className="mt-6 overflow-hidden rounded-[18px] border border-[#292B30] bg-[#111214]">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#292B30] bg-[#17181A]">
                <Plus
                  size={18}
                  className="text-[#777B84]"
                />
              </div>

              <p className="mt-5 text-[12px] font-medium text-[#F1F1F2]">
                No transactions yet
              </p>

              <p className="mt-2 max-w-[300px] text-[10px] leading-[1.7] text-[#777B84]">
                Add your first transaction and Aurora
                will start calculating your spending.
              </p>

              <button
                type="button"
                onClick={openAdd}
                className="mt-5 text-[10px] font-medium text-[#7C83FF] hover:text-[#9A9FFF]"
              >
                Add your first transaction
              </button>
            </div>
          ) : (
            <div>
              {transactions.map(
                (transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      delay:
                        Math.min(index, 8) *
                        0.025,
                    }}
                    className="group flex min-w-0 items-center gap-3 border-b border-[#292B30] px-4 py-4 last:border-b-0 sm:px-6"
                  >
                    {/* ICON */}

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#292B30] bg-[#17181A]">
                      {transaction.recurring ? (
                        <Repeat
                          size={14}
                          className="text-[#7C83FF]"
                        />
                      ) : (
                        <span className="text-[11px] font-medium text-[#777B84]">
                          {transaction.name
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium text-[#F1F1F2]">
                        {transaction.name}
                      </p>

                      <div className="mt-1 flex min-w-0 items-center gap-2">
                        <span className="truncate text-[8px] text-[#777B84]">
                          {transaction.category}
                        </span>

                        <span className="h-[2px] w-[2px] shrink-0 rounded-full bg-[#55585F]" />

                        <span className="shrink-0 text-[8px] text-[#55585F]">
                          {formatDate(
                            transaction.date
                          )}
                        </span>
                      </div>
                    </div>

                    {/* BUCKET */}

                    <span className="hidden shrink-0 rounded-full border border-[#292B30] px-2 py-1 text-[7px] text-[#777B84] sm:inline-flex">
                      {transaction.bucket}
                    </span>

                    {/* AMOUNT */}

                    <p className="shrink-0 font-space text-[11px] font-medium text-[#F1F1F2]">
                      {formatCurrency(
                        transaction.amount
                      )}
                    </p>

                    {/* ACTIONS */}

                    <div className="flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() =>
                          openEdit(transaction)
                        }
                        aria-label={`Edit ${transaction.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[#777B84] transition-colors hover:bg-[#1B1C1F] hover:text-[#F1F1F2]"
                      >
                        <Pencil size={12} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                        aria-label={`Delete ${transaction.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[#777B84] transition-colors hover:bg-[#25191A] hover:text-[#C87575]"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}

      <AnimatePresence>
        {isAdding && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-[18px] border border-[#292B30] bg-[#111214] p-5 shadow-2xl sm:left-1/2 sm:right-auto sm:w-[520px] sm:-translate-x-1/2 sm:p-7"
            >
              {/* MODAL HEADER */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#777B84]">
                    {editingId
                      ? "Edit transaction"
                      : "New transaction"}
                  </p>

                  <h3 className="mt-2 font-space text-[22px] font-medium tracking-[-0.03em] text-[#F1F1F2]">
                    {editingId
                      ? "Update spending"
                      : "Add spending"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  aria-label="Close"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-[#292B30] text-[#777B84] hover:text-[#F1F1F2]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* FORM */}

              <div className="mt-7 space-y-5">
                {/* NAME */}

                <label className="block">
                  <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                    Name
                  </span>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Netflix, Rent, Swiggy"
                    className={inputClassName()}
                    autoFocus
                  />
                </label>

                {/* CATEGORY */}

                <label className="block">
                  <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                    Category
                  </span>

                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      updateField(
                        "category",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Food, Housing, Subscriptions"
                    className={inputClassName()}
                  />
                </label>

                {/* AMOUNT + DATE */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                      Amount
                    </span>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#777B84]">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.amount}
                        onChange={(event) =>
                          updateField(
                            "amount",
                            event.target.value
                          )
                        }
                        placeholder="0"
                        className={`${inputClassName()} pl-7`}
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                      Date
                    </span>

                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        updateField(
                          "date",
                          event.target.value
                        )
                      }
                      className={inputClassName()}
                    />
                  </label>
                </div>

                {/* BUCKET */}

                <label className="block">
                  <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                    Budget bucket
                  </span>

                  <div className="relative">
                    <select
                      value={form.bucket}
                      onChange={(event) =>
                        updateField(
                          "bucket",
                          event.target
                            .value as BudgetBucket
                        )
                      }
                      className={`${inputClassName()} appearance-none pr-9`}
                    >
                      {bucketOptions.map(
                        (option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-[#111214]"
                          >
                            {option.label}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#777B84]"
                    />
                  </div>
                </label>

                {/* RECURRING */}

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "recurring",
                      !form.recurring
                    )
                  }
                  className="flex w-full items-center justify-between rounded-[10px] border border-[#292B30] bg-[#0F1012] px-3 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-[7px] border ${
                        form.recurring
                          ? "border-[#666CC7] bg-[#666CC7]/10"
                          : "border-[#292B30]"
                      }`}
                    >
                      <Repeat
                        size={13}
                        className={
                          form.recurring
                            ? "text-[#7C83FF]"
                            : "text-[#777B84]"
                        }
                      />
                    </div>

                    <div>
                      <p className="text-[10px] text-[#F1F1F2]">
                        Recurring transaction
                      </p>

                      <p className="mt-1 text-[8px] text-[#55585F]">
                        Mark subscriptions or regular payments.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-[5px] border ${
                      form.recurring
                        ? "border-[#7C83FF] bg-[#7C83FF]"
                        : "border-[#34363D]"
                    }`}
                  >
                    {form.recurring && (
                      <Check
                        size={12}
                        className="text-white"
                      />
                    )}
                  </div>
                </button>

                {/* ERROR */}

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      className="text-[9px] text-[#C87575]"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* BUTTONS */}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 rounded-[10px] border border-[#292B30] px-4 py-3 text-[10px] font-medium text-[#A7ABB4] transition-colors hover:bg-[#17181A] hover:text-[#F1F1F2]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 rounded-[10px] bg-[#F1F1F2] px-4 py-3 text-[10px] font-medium text-[#08090A] transition-opacity hover:opacity-90"
                  >
                    {editingId
                      ? "Save changes"
                      : "Add transaction"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}