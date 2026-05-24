const STYLES = {
  log: "color: dodgerblue;",
  error: "color: red;",
  warn: "color: orange;",
};

export const log = (
  type: "log" | "error" | "warn",
  message: unknown,
  context?: unknown
) => {
  if (import.meta.env.DEV) {
    console?.[type](
      `%cchat ${type}: `,
      STYLES[type],
      message,
      context
    );
  }
};
