import { z } from "astro/zod";

export const optionsSchema = z
  .object({
    // The folder, from the Astro root, the build also writes into, for the
    // library to commit and install with its package; none, the site's alone.
    dir: z.string().optional(),
    // Markdown after llms.txt's summary, before its groups.
    preamble: z.string().optional(),
    // Markdown under a sidebar group's heading, by its label.
    groups: z.record(z.string(), z.string()).default({}),
  })
  // An option it does not know, `skill` from 0.1.0 say, stops the build.
  .strict();

export type Options = z.input<typeof optionsSchema>;
