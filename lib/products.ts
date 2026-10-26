import { cache } from "react";
import type { Product } from "./shop";
import { supabase } from "./supabase";

export const getProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*").order("rank");
  if (error) throw error;
  return data;
});

export const getProduct = cache(async (id: number): Promise<Product | null> => {
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
});
