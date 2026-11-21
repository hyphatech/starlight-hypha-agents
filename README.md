# starlight-hypha-agents

An agent writing code with a Hypha Stack library should know what the library
already does, or it writes by hand what a part of the library gives. That
knowledge is in the library's docs, but an opam package installs only its
README, CHANGES and LICENSE: the agent never sees the docs, and never the docs
of the release it builds against.

This [Starlight](https://starlight.astro.build) plugin ships a library's docs
with its package. Every page becomes Markdown an agent reads whole, its
examples included, and the package installs them with a skill that tells the
agent to read them before it writes code. The docs site serves the same pages
and an [`llms.txt`](https://llmstxt.org), for an agent online.

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
