import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main>
      <section class="panel error-panel">
        <p class="eyebrow">Client router fallback</p>
        <h1>That route is not in this bundle.</h1>
        <p>A production static host should still return <code>index.html</code>, then let Solid render this state.</p>
        <A href="/">Return home</A>
      </section>
    </main>
  );
}
