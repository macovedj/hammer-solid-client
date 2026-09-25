import Counter from "../components/Counter";

export default function Home() {
  const mountedAt = new Date().toISOString();

  return (
    <main>
      <section class="hero panel">
        <div>
          <p class="eyebrow">Client-side rendering control</p>
          <h1>No server HTML hiding under the paint.</h1>
          <p class="lede">
            The checked-in <code>index.html</code> contains only an empty mount node. Solid creates this entire surface in the browser.
          </p>
          <div class="badges" aria-label="Fixture properties">
            <span>CSR only</span>
            <span>SPA fallback</span>
            <span>Local fetch</span>
          </div>
        </div>
        <img class="hero-mark" src="/solid-mark.svg" alt="Solid fixture mark" width="160" height="160" />
      </section>

      <section class="grid two-up">
        <article class="panel">
          <p class="eyebrow">Fine-grained reactivity</p>
          <h2>Hydration-free counter</h2>
          <p>This control is mounted from scratch by <code>solid-js/web</code>.</p>
          <Counter />
        </article>
        <article class="panel telemetry">
          <p class="eyebrow">Browser evidence</p>
          <h2>Mounted in this tab</h2>
          <dl>
            <div>
              <dt>Timestamp</dt>
              <dd data-testid="client-mounted-at">{mountedAt}</dd>
            </div>
            <div>
              <dt>Rendering mode</dt>
              <dd data-testid="render-mode">client-only</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
