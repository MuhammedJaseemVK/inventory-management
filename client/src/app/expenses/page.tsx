"use client";
import { useState } from "react";
import { useGetExpensesByCateoryQuery } from "../state/api";
import Header from "@/components/Header";

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCateoryQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  return (
    <div>
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>
      <div className="flex flex-col md:flex-row  justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                name="start-date"
                id="start-date"
                type="date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                name="end-date"
                id="end-date"
                type="date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
