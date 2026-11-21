# starlight-hypha-agents

A Hypha Stack library's docs, for the agents that build with it. A
[Starlight](https://starlight.astro.build) plugin, beside
[starlight-theme-hypha](https://github.com/hyphatech/starlight-theme-hypha).

An agent reads a page's source, where an MDX page's examples are imports and
its demos are components. The build writes each page as plain Markdown, its
`?raw` imports read into fenced blocks and its live demos left out, with an
[`llms.txt`](https://llmstxt.org) index from the sidebar:

- **in the built site**, beside each page, links absolute;
- **in a folder the library commits**, with `dir`, links relative, and a
  skill in the [Agent Skills](https://agentskills.io) format that sends an
  agent to the docs installed with the release its code builds against.

## Install

```sh
bun add -d github:hyphatech/starlight-hypha-agents#v0.1.0
```

```js
import starlightHyphaAgents from "starlight-hypha-agents";

starlight({
  plugins: [
    starlightThemeHypha(),
    starlightHyphaAgents({
      dir: "../agents", // from the Astro root: llms.txt, pages/<page>.md, skills/<name>/SKILL.md
      preamble: "What to know before any page, in Markdown.",
      groups: { Reference: "Markdown under a sidebar group's heading." },
      skill: { package: "widgets", instead: ["a raw `<button>`, where `Widgets.Button` is one"] },
    }),
  ],
});
```

| Option | Default | Description |
|---|---|---|
| `dir` | none | The folder the build also writes, for the package to install; none, the site's files alone |
| `preamble` | none | Markdown after `llms.txt`'s summary, before its groups |
| `groups` | `{}` | Markdown under a sidebar group's heading, by its label |
| `skill` | `{}` | With `dir`: `{ name?, package?, description?, before?, instead? }`, or `false` for none. `package` is the opam package, the skill's name unless given; `instead` lists what is easily written by hand where the library has a part |

## Installed with the package

dune installs the folder into the package's documentation, where the skill
sends an agent, `$(opam var widgets:doc)/llms.txt`:

```lisp
(install
 (package widgets)
 (section doc)
 (source_trees (agents as .)))
```

## Kept current

The build replaces the folder whole, so CI checks it by building the docs
and diffing:

```sh
make docs && git diff --exit-code agents/
```

## Licence

MIT. Copyright Hypha Technologies Ltd. See [LICENSE](LICENSE).
