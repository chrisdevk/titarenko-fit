"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ProgressEntry {
  percentage: number;
  completed: Set<number>;
}

interface ProgressContextType {
  progress: Record<number, ProgressEntry>;
  updateProgress: (
    productId: number,
    totalLessons: number,
    lessonIndex: number,
  ) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [progress, setProgress] = useState<Record<number, ProgressEntry>>({});

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("videoProgress") || "{}",
    );

    if (typeof savedProgress !== "object" || savedProgress === null) return;

    const parsedProgress: Record<number, ProgressEntry> = Object.fromEntries(
      Object.entries(savedProgress).map(([key, value]) => {
        if (
          typeof value === "object" &&
          value !== null &&
          "percentage" in value &&
          "completed" in value &&
          Array.isArray(value.completed)
        ) {
          return [
            Number(key),
            {
              percentage: Number(value.percentage) || 0,
              completed: new Set(value.completed), // Convert array back to Set
            },
          ];
        }
        return [Number(key), { percentage: 0, completed: new Set<number>() }];
      }),
    );

    setProgress(parsedProgress);
  }, []);

  const updateProgress = (
    productId: number,
    totalLessons: number,
    lessonIndex: number,
  ) => {
    setProgress((prevProgress) => {
      const prevData = prevProgress[productId] || {
        percentage: 0,
        completed: new Set<number>(),
      };
      const newCompleted = new Set(prevData.completed);
      newCompleted.add(lessonIndex);

      const percentage = (newCompleted.size / totalLessons) * 100;

      const updatedProgress = {
        ...prevProgress,
        [productId]: {
          percentage,
          completed: newCompleted,
        },
      };

      // Save progress to localStorage
      localStorage.setItem(
        "videoProgress",
        JSON.stringify(
          Object.fromEntries(
            Object.entries(updatedProgress).map(([key, value]) => [
              key,
              {
                percentage: value.percentage,
                completed: Array.from(value.completed),
              }, // Convert Set to array for storage
            ]),
          ),
        ),
      );

      return updatedProgress;
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
