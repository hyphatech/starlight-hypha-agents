import { z } from "astro/zod";
import { skillName } from "./agents";

export const optionsSchema = z
  .object({
    // The folder, from the Astro root, the build also writes into, for the
    // library to commit and install with its package; none, the site's alone.
    dir: z.string().optional(),
    // Markdown after llms.txt's summary, before its groups.
    preamble: z.string().optional(),
    // Markdown under a sidebar group's heading, by its label.
    groups: z.record(z.string(), z.string()).default({}),
    // Written with `dir`: the skill that sends an agent to the pages.
    skill: z
      .union([
        z.literal(false),
        z.object({
          name: z.string().regex(skillName, "lower case letters, digits and dashes, at most 64").optional(),
          package: z.string().optional(),
          description: z.string().max(1024).optional(),
          before: z.string().optional(),
          instead: z.array(z.string()).default([]),
        }),
      ])
      .default({ instead: [] }),
  });

export type Options = z.input<typeof optionsSchema>;
