import { type ClassValue, clsx } from "clsx";
import { getDay } from "date-fns";
import { twMerge } from "tailwind-merge";

// UTILITY TYPES
export type Nullable<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// TAILWIND UTILITY FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ARRAY UTILITY FUNCTIONS
export const isArrayEmpty = (array: unknown[]) => {
  return array.length < 1;
};

export const generateArray = (size: number = 10) => {
  return Array.from({ length: size }, (_, i) => i);
};

export const isLastOfArray = (index: number, array: unknown[]) => {
  return index === array.length - 1;
};

// DATE UTILITY FUNCTIONS
export const getDayOfWeek = (date: string | number | Date) => {
  const day = getDay(date);
  if (day === 0) return 6;
  else return day - 1;
};

// SERVICE WORKER FUNCTIONS
export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("Service workers are not supported by this browser");
  }
  await navigator.serviceWorker.register("/sw.js");
}

export async function getReadyServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw Error("Service workers are not supported by this browser");
  }
  return navigator.serviceWorker.ready;
}
