import type { Product } from "./types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/data/products.json");

  if (!response.ok) {
    throw new Error(`Product request failed with ${response.status}`);
  }

  return response.json() as Promise<Product[]>;
}
