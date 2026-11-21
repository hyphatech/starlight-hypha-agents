// A Hypha Stack library's docs, for agents: each page as Markdown and
// llms.txt in the built site, and with `dir` a folder the library installs
// with its package.

import type { StarlightPlugin } from "@astrojs/starlight/types";
import { agentsBuild } from "./build";
import { optionsSchema, type Options } from "./options";

export type { Options };

export default function starlightHyphaAgents(input?: Options): StarlightPlugin {
  const options = optionsSchema.parse(input ?? {});
  return {
    name: "starlight-hypha-agents",
    hooks: {
      "config:setup"({ config, astroConfig, addIntegration }) {
        const build = agentsBuild(options, config, astroConfig);
        addIntegration({ name: "starlight-hypha-agents-integration", hooks: { "astro:build:done": build["astro:build:done"] } });
      },
    },
  };
}
