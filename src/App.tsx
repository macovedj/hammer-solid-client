import { A, Route, Router } from "@solidjs/router";
import { ErrorBoundary, JSX, lazy } from "solid-js";
import Home from "./routes/Home";
import Products from "./routes/Products";
import ProductDetail from "./routes/ProductDetail";
import ErrorLab from "./routes/ErrorLab";
import NotFound from "./routes/NotFound";

const LazyLab = lazy(() => import("./routes/LazyLab"));

function AppShell(props: { children?: JSX.Element }) {
  return (
    <div class="site-shell">
      <header class="topbar">
        <A class="brand" href="/" end>
          <img src="/solid-mark.svg" alt="" width="36" height="36" />
          <span>Hammer / Solid CSR</span>
        </A>
        <nav aria-label="Primary navigation">
          <A href="/" end activeClass="active">
            Home
          </A>
          <A href="/products" activeClass="active">
            Products
          </A>
          <A href="/lazy" activeClass="active">
            Lazy route
          </A>
          <A href="/error" activeClass="active">
            Error lab
          </A>
        </nav>
      </header>
      <ErrorBoundary
        fallback={(error, reset) => (
          <main class="panel error-panel">
            <p class="eyebrow">Client error boundary</p>
            <h1>The route threw on purpose.</h1>
            <pre>{error instanceof Error ? error.message : String(error)}</pre>
            <button type="button" onClick={reset}>
              Reset boundary
            </button>
          </main>
        )}
      >
        {props.children}
      </ErrorBoundary>
      <footer>
        <span>Pure SPA fixture</span>
        <span>SolidJS · Vite · TypeScript</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router root={AppShell}>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/lazy" component={LazyLab} />
      <Route path="/error" component={ErrorLab} />
      <Route path="*404" component={NotFound} />
    </Router>
  );
}
