import { createSignal, onMount } from "solid-js";

export default function LazyLab() {
  const [loadedAt, setLoadedAt] = createSignal("waiting for onMount");

  onMount(() => setLoadedAt(new Date().toISOString()));

  return (
    <main>
      <section class="panel page-heading">
        <p class="eyebrow">Dynamic import boundary</p>
        <h1>This route arrived as a separate chunk.</h1>
        <p>
          <code>lazy(() =&gt; import("./routes/LazyLab"))</code> keeps this module out of the initial route graph.
        </p>
        <p class="status-line">
          Client mount: <strong>{loadedAt()}</strong>
        </p>
      </section>
    </main>
  );
}
