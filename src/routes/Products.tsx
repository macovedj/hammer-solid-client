import { A } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import { fetchProducts } from "../data";

export default function Products() {
  const [products, { refetch }] = createResource(fetchProducts);

  return (
    <main>
      <section class="panel page-heading">
        <p class="eyebrow">Browser fetch → public/data/products.json</p>
        <h1>Local product data</h1>
        <p>The request stays deterministic and never leaves the fixture.</p>
        <button type="button" class="secondary" onClick={() => void refetch()}>
          Refetch JSON
        </button>
      </section>

      <Show when={!products.loading} fallback={<p class="panel">Loading local JSON…</p>}>
        <Show when={!products.error} fallback={<p class="panel error-panel">{String(products.error)}</p>}>
          <section class="card-grid">
            <For each={products()}>
              {product => (
                <article class="panel product-card">
                  <p class="eyebrow">${product.price}</p>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <A href={`/products/${product.id}`}>Open deep link →</A>
                </article>
              )}
            </For>
          </section>
        </Show>
      </Show>
    </main>
  );
}
