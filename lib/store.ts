"use client";

import { useSyncExternalStore } from "react";

// 장바구니 · 위시리스트를 브라우저(localStorage)에 저장하는 작은 저장소
type ShopState = {
  cart: Record<number, number>;
  wish: Record<number, boolean>;
};

const KEY = "mono-shop";
const EMPTY: ShopState = { cart: {}, wish: {} };

let state: ShopState | null = null;
const listeners = new Set<() => void>();

function load(): ShopState {
  if (state) return state;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    state = saved ? { ...EMPTY, ...saved } : EMPTY;
  } catch {
    state = EMPTY;
  }
  return state!;
}

function save(next: ShopState) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useShop() {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function addToCart(id: number) {
  const s = load();
  save({ ...s, cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 } });
}

export function setQty(id: number, qty: number) {
  const s = load();
  const cart = { ...s.cart };
  if (qty > 0) cart[id] = qty;
  else delete cart[id];
  save({ ...s, cart });
}

export function toggleWish(id: number) {
  const s = load();
  save({ ...s, wish: { ...s.wish, [id]: !s.wish[id] } });
}

export const cartCount = (cart: ShopState["cart"]) =>
  Object.values(cart).reduce((t, q) => t + q, 0);

// 검색어는 저장하지 않고 페이지를 옮겨 다녀도 유지만 한다
let query = "";
const queryListeners = new Set<() => void>();

function subscribeQuery(listener: () => void) {
  queryListeners.add(listener);
  return () => queryListeners.delete(listener);
}

export function useQuery() {
  return useSyncExternalStore(subscribeQuery, () => query, () => "");
}

export function setQuery(next: string) {
  query = next;
  queryListeners.forEach((l) => l());
}
