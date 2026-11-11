"use client";

import * as React from "react";

/**
 * useLocalStorage qua useSyncExternalStore (không setState trong effect, hợp lint React 19).
 * - Server và lần hydrate đầu trả về `fallback`, sau đó đồng bộ với localStorage.
 * - `fallback` phải là hằng ổn định (khai báo ngoài component) để tránh re-render thừa.
 */

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;
  let value: T = fallback;
  if (raw != null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

function write<T>(key: string, value: T) {
  const raw = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    /* storage bị chặn: vẫn giữ trong cache cho phiên hiện tại */
  }
  cache.set(key, { raw, value });
  listeners.get(key)?.forEach((fn) => fn());
}

export function useLocalStorage<T>(key: string, fallback: T) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      let set = listeners.get(key);
      if (!set) {
        set = new Set();
        listeners.set(key, set);
      }
      set.add(onChange);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) onChange();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        set?.delete(onChange);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key],
  );

  const value = React.useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, fallback);
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      write(key, resolved);
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
