import { A, useParams } from "@solidjs/router";
import { Match, Switch, createResource } from "solid-js";
import { fetchProducts } from "../data";

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const [product] = createResource(() => params.id, async id => {
    const products = await fetchProducts();
    return products.find(candidate => candidate.id === id) ?? null;
  });

  return (
    <main>
      <Switch>
        <Match when={product.loading}>
          <p class="panel">Resolving <code>{params.id}</code> in the browser…</p>
        </Match>
        <Match when={product.error}>
          <section class="panel error-panel">
            <h1>Product fetch failed</h1>
            <pre>{String(product.error)}</pre>
          </section>
        </Match>
        <Match when={product()} keyed>
          {item => (
            <section class="panel product-detail">
              <p class="eyebrow">Dynamic client route · /products/{item.id}</p>
              <h1>{item.name}</h1>
              <p class="price">${item.price}</p>
              <p>{item.description}</p>
              <A href="/products">← All products</A>
            </section>
          )}
        </Match>
        <Match when={!product.loading && product() === null}>
          <section class="panel error-panel">
            <p class="eyebrow">Client-side miss</p>
            <h1>No product named “{params.id}”</h1>
            <A href="/products">Browse known products</A>
          </section>
        </Match>
      </Switch>
    </main>
  );
}
