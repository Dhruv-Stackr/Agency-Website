// Route enter: CSS-only rise and fade from first paint, once per navigation. No JS gate on the LCP.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
