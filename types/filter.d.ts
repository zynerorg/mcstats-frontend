import type { InputMenuItem } from "@nuxt/ui";

export type Filter = {
  key: string;
  label: string;
  items?: InputMenuItem[];
  type: "select" | "input";
  modelValue: Ref<unknown>;
};
