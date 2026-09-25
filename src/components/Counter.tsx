import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="counter" aria-label="Interactive counter">
      <button type="button" onClick={() => setCount(value => value - 1)} aria-label="Decrease count">
        −
      </button>
      <output aria-live="polite">{count()}</output>
      <button type="button" onClick={() => setCount(value => value + 1)} aria-label="Increase count">
        +
      </button>
    </div>
  );
}
