import { createSignal } from "solid-js";

function IntentionalFailure(props: { armed: boolean }) {
  if (props.armed) {
    throw new Error("Intentional Solid client render failure");
  }

  return <p class="status-line">Boundary is armed but quiet.</p>;
}

export default function ErrorLab() {
  const [armed, setArmed] = createSignal(false);

  return (
    <main>
      <section class="panel page-heading">
        <p class="eyebrow">Recoverable client failure</p>
        <h1>Exercise the nearest ErrorBoundary.</h1>
        <p>The button changes reactive state; the next render throws and the application shell remains intact.</p>
        <button type="button" class="danger" onClick={() => setArmed(true)}>
          Throw render error
        </button>
        <IntentionalFailure armed={armed()} />
      </section>
    </main>
  );
}
