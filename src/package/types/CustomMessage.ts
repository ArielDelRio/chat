export type CustomMessage = {
  type: "video" | "text";
  body: string;
  attributes?: Record<string, unknown>;
};
