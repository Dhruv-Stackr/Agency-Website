export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const g = global as unknown as Record<string, unknown>;
    if (
      typeof g.localStorage !== "undefined" &&
      typeof (g.localStorage as Storage).getItem !== "function"
    ) {
      const store: Record<string, string> = {};
      g.localStorage = {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach(k => delete store[k]); },
        key: (i: number) => Object.keys(store)[i] ?? null,
        get length() { return Object.keys(store).length; },
      };
    }
  }
}
