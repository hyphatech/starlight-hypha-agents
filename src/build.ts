// The build's files: the site's Markdown and llms.txt, links absolute, into
// the built site; and, with `dir`, the folder the library commits, links
// relative. The folder is replaced whole, so a page removed
// leaves nothing behind, and `git diff` after a build is its check.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroConfig, AstroIntegrationLogger } from "astro";
import { agentFiles, aliasesOf, readPages, type AgentsOptions, type Target } from "./agents";

export interface Site {
  title: string | Record<string, string>;
  description?: string;
  sidebar?: unknown;
}

function write(dir: string, files: Map<string, string>) {
  for (const [path, text] of files) {
    const file = join(dir, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
  }
}

export function agentsBuild(options: AgentsOptions, site: Site, astro: AstroConfig) {
  const base = astro.base.replace(/\/+$/, "");
  const origin = astro.site?.replace(/\/+$/, "");
  const title = typeof site.title === "string" ? site.title : (site.title.en ?? Object.values(site.title)[0] ?? "");
  const folder = options.dir ? fileURLToPath(new URL(options.dir.replace(/\/*$/, "/"), astro.root)) : undefined;

  const generate = (kind: Target["kind"], logger: AstroIntegrationLogger, warn: boolean) =>
    agentFiles({
      pages: readPages(fileURLToPath(new URL("content/docs/", astro.srcDir))),
      aliases: aliasesOf(astro.vite?.resolve?.alias),
      sidebar: site.sidebar,
      title,
      description: site.description,
      options,
      target: { kind, base, origin },
      warn: (m) => warn && logger.warn(m),
    });

  return {
    "astro:build:done"({ dir, logger }: { dir: URL; logger: AstroIntegrationLogger }) {
      write(fileURLToPath(dir), generate("site", logger, true));
      if (!folder) return;
      rmSync(folder, { recursive: true, force: true });
      write(folder, generate("folder", logger, false));
      logger.info(`agents' Markdown written to ${folder}`);
    },
  };
}
