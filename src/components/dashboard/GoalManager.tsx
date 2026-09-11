import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Pencil,
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";

import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../data/finance";

const defaultForm = {
  name: "",
  current: "",
  target: "",
};

type FormState = typeof defaultForm;

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

export function GoalManager() {
  const {
    finance,
    addGoal,
    updateGoal,
    deleteGoal,
  } = useFinance();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<FormState>(defaultForm);

  const [error, setError] = useState("");

  const goals = finance.goals;

  const completedGoals = useMemo(
    () =>
      goals.filter(
        (goal) => goal.current >= goal.target
      ),
    [goals]
  );

  const activeGoals = useMemo(
    () =>
      goals.filter(
        (goal) => goal.current < goal.target
      ),
    [goals]
  );

  const totalTarget = useMemo(
    () =>
      goals.reduce(
        (sum, goal) => sum + goal.target,
        0
      ),
    [goals]
  );

  const totalSaved = useMemo(
    () =>
      goals.reduce(
        (sum, goal) =>
          sum +
          Math.min(goal.current, goal.target),
        0
      ),
    [goals]
  );

  const overallProgress =
    totalTarget > 0
      ? Math.min(
          100,
          (totalSaved / totalTarget) * 100
        )
      : 0;

  const openAdd = () => {
    setForm(defaultForm);
    setEditingId(null);
    setError("");
    setIsAdding(true);
  };

  const openEdit = (
    goal: (typeof goals)[number]
  ) => {
    setForm({
      name: goal.name,
      current: String(goal.current),
      target: String(goal.target),
    });

    setEditingId(goal.id);
    setError("");
    setIsAdding(true);
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(defaultForm);
    setError("");
  };

  const updateField = <
    K extends keyof FormState
  >(
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
    const current = Number(form.current);
    const target = Number(form.target);

    if (!name) {
      setError("Enter a goal name.");
      return;
    }

    if (
      !Number.isFinite(target) ||
      target <= 0
    ) {
      setError(
        "Enter a target amount greater than ₹0."
      );
      return;
    }

    if (
      !Number.isFinite(current) ||
      current < 0
    ) {
      setError(
        "Current saved amount cannot be negative."
      );
      return;
    }

    const goal = {
      name,
      current: Math.round(current),
      target: Math.round(target),
    };

    if (editingId) {
      updateGoal(editingId, goal);
    } else {
      addGoal(goal);
    }

    closeForm();
  };

  return (
    <section
      id="goals"
      className="w-full overflow-hidden border-t border-[#24262A] bg-[#08090A]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-8 sm:py-28">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[620px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#777B84]">
              Financial goals
            </p>

            <h2 className="mt-5 font-space text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-[#F1F1F2] sm:text-[50px]">
              Give your money
              <br />
              somewhere to go.
            </h2>

            <p className="mt-6 max-w-[480px] text-[12px] leading-[1.8] text-[#777B84] sm:text-[13px]">
              Create personal goals, track what you've
              saved, and see your progress change as
              your plans move forward.
            </p>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-[10px] border border-[#34363D] bg-[#17181A] px-4 py-3 text-[10px] font-medium text-[#F1F1F2] transition-all hover:border-[#666CC7] hover:bg-[#1B1C1F]"
          >
            <Plus
              size={14}
              strokeWidth={1.8}
            />
            Add goal
          </button>
        </div>

        {/* SUMMARY */}

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4">
          <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Total goals
            </p>

            <p className="mt-3 font-space text-[22px] text-[#F1F1F2]">
              {goals.length}
            </p>
          </div>

          <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Active
            </p>

            <p className="mt-3 font-space text-[22px] text-[#7C83FF]">
              {activeGoals.length}
            </p>
          </div>

          <div className="min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Completed
            </p>

            <p className="mt-3 font-space text-[22px] text-[#56C7A0]">
              {completedGoals.length}
            </p>
          </div>

          <div className="col-span-2 min-w-0 rounded-[14px] border border-[#292B30] bg-[#111214] p-4 sm:col-span-1 sm:p-5">
            <p className="text-[8px] uppercase tracking-[0.16em] text-[#777B84]">
              Overall progress
            </p>

            <p className="mt-3 font-space text-[22px] text-[#F1F1F2]">
              {Math.round(overallProgress)}%
            </p>
          </div>
        </div>

        {/* OVERALL PROGRESS */}

        <div className="mt-3 rounded-[14px] border border-[#292B30] bg-[#111214] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#17181A]">
                <Target
                  size={14}
                  className="text-[#7C83FF]"
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-medium text-[#F1F1F2]">
                  Overall goal progress
                </p>

                <p className="mt-1 text-[7px] text-[#55585F]">
                  {formatCurrency(totalSaved)} saved of{" "}
                  {formatCurrency(totalTarget)}
                </p>
              </div>
            </div>

            <span className="shrink-0 font-space text-[11px] text-[#7C83FF]">
              {Math.round(overallProgress)}%
            </span>
          </div>

          <div className="mt-5 h-[6px] overflow-hidden rounded-full bg-[#24262A]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${overallProgress}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-[#7C83FF]"
            />
          </div>
        </div>

        {/* GOAL LIST */}

        <div className="mt-3">
          {goals.length === 0 ? (
            <div className="rounded-[18px] border border-[#292B30] bg-[#111214] px-6 py-16 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#292B30] bg-[#17181A]">
                <Target
                  size={17}
                  className="text-[#777B84]"
                />
              </div>

              <p className="mt-5 text-[11px] font-medium text-[#F1F1F2]">
                No goals yet
              </p>

              <p className="mx-auto mt-2 max-w-[310px] text-[9px] leading-[1.7] text-[#777B84]">
                Create your first goal to start tracking
                progress toward something that matters
                to you.
              </p>

              <button
                type="button"
                onClick={openAdd}
                className="mt-5 text-[9px] font-medium text-[#7C83FF] hover:text-[#9A9FFF]"
              >
                Create your first goal
              </button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {goals.map((goal, index) => {
                const progress = Math.min(
                  100,
                  (goal.current /
                    Math.max(1, goal.target)) *
                    100
                );

                const isComplete =
                  progress >= 100;

                return (
                  <motion.div
                    key={goal.id}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                    className="group min-w-0 rounded-[16px] border border-[#292B30] bg-[#111214] p-5 sm:p-6"
                  >
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-[#292B30] bg-[#17181A]">
                          {isComplete ? (
                            <CheckCircle2
                              size={15}
                              className="text-[#56C7A0]"
                            />
                          ) : (
                            <Target
                              size={15}
                              className="text-[#7C83FF]"
                            />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium text-[#F1F1F2]">
                            {goal.name}
                          </p>

                          <p className="mt-1 text-[8px] text-[#55585F]">
                            {isComplete
                              ? "Goal completed"
                              : "In progress"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() =>
                            openEdit(goal)
                          }
                          aria-label={`Edit ${goal.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[#777B84] transition-colors hover:bg-[#1B1C1F] hover:text-[#F1F1F2]"
                        >
                          <Pencil size={12} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteGoal(goal.id)
                          }
                          aria-label={`Delete ${goal.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-[7px] text-[#777B84] transition-colors hover:bg-[#25191A] hover:text-[#C87575]"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* AMOUNTS */}

                    <div className="mt-7 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                          Saved
                        </p>

                        <p className="mt-2 truncate font-space text-[20px] text-[#F1F1F2]">
                          {formatCurrency(
                            goal.current
                          )}
                        </p>
                      </div>

                      <div className="min-w-0 text-right">
                        <p className="text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                          Target
                        </p>

                        <p className="mt-2 truncate font-space text-[13px] text-[#A7ABB4]">
                          {formatCurrency(
                            goal.target
                          )}
                        </p>
                      </div>
                    </div>

                    {/* PROGRESS */}

                    <div className="mt-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[8px] text-[#55585F]">
                          Progress
                        </span>

                        <span
                          className={`font-space text-[9px] ${
                            isComplete
                              ? "text-[#56C7A0]"
                              : "text-[#7C83FF]"
                          }`}
                        >
                          {Math.round(progress)}%
                        </span>
                      </div>

                      <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-[#24262A]">
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${progress}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor:
                              isComplete
                                ? "#56C7A0"
                                : "#7C83FF",
                          }}
                        />
                      </div>
                    </div>

                    {/* REMAINING */}

                    <div className="mt-5 border-t border-[#292B30] pt-4">
                      <p className="text-[8px] text-[#55585F]">
                        {isComplete
                          ? "You've reached this goal."
                          : `${formatCurrency(
                              Math.max(
                                0,
                                goal.target -
                                  goal.current
                              )
                            )} remaining`}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
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
              className="fixed inset-x-4 top-1/2 z-50 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-[18px] border border-[#292B30] bg-[#111214] p-5 shadow-2xl sm:left-1/2 sm:right-auto sm:w-[500px] sm:-translate-x-1/2 sm:p-7"
            >
              {/* HEADER */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#777B84]">
                    {editingId
                      ? "Edit goal"
                      : "New goal"}
                  </p>

                  <h3 className="mt-2 font-space text-[22px] font-medium tracking-[-0.03em] text-[#F1F1F2]">
                    {editingId
                      ? "Update your goal"
                      : "Create a goal"}
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
                    Goal name
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
                    placeholder="e.g. New laptop, Emergency fund"
                    className={inputClassName()}
                    autoFocus
                  />
                </label>

                {/* AMOUNTS */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[8px] uppercase tracking-[0.14em] text-[#777B84]">
                      Already saved
                    </span>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#777B84]">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={form.current}
                        onChange={(event) =>
                          updateField(
                            "current",
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
                      Target amount
                    </span>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#777B84]">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={form.target}
                        onChange={(event) =>
                          updateField(
                            "target",
                            event.target.value
                          )
                        }
                        placeholder="0"
                        className={`${inputClassName()} pl-7`}
                      />
                    </div>
                  </label>
                </div>

                {/* PREVIEW */}

                {Number(form.target) > 0 && (
                  <div className="rounded-[10px] border border-[#292B30] bg-[#0F1012] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[8px] text-[#777B84]">
                        Current progress
                      </span>

                      <span className="font-space text-[10px] text-[#7C83FF]">
                        {Math.round(
                          Math.min(
                            100,
                            (Number(
                              form.current || 0
                            ) /
                              Number(
                                form.target
                              )) *
                              100
                          )
                        )}
                        %
                      </span>
                    </div>

                    <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-[#24262A]">
                      <motion.div
                        animate={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              (Number(
                                form.current ||
                                  0
                              ) /
                                Number(
                                  form.target
                                )) *
                                100
                            )
                          )}%`,
                        }}
                        className="h-full rounded-full bg-[#7C83FF]"
                      />
                    </div>
                  </div>
                )}

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

                {/* ACTIONS */}

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
                      : "Create goal"}
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