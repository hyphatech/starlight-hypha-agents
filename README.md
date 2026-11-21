# starlight-hypha-agents

An agent writing code with a Hypha Stack library should know what the library
already does, or it writes by hand what a part of the library gives. That
knowledge is in the library's docs, but an opam package installs only its
README, CHANGES and LICENSE: the agent never sees the docs, and never the docs
of the release it builds against.

This [Starlight](https://starlight.astro.build) plugin ships a library's docs
with its package. Every page becomes Markdown an agent reads whole, its
examples included, with an [`llms.txt`](https://llmstxt.org) that lists them,
and the package installs them at `$(opam var <package>:doc)`. The docs site
serves the same pages, for an agent online.

An agent reads them only when told to. A library's README gives its users one
line for their project's `AGENTS.md`:

```md
Before writing code with widgets, read `$(opam var widgets:doc)/llms.txt` and
the pages it lists for the parts you need, and use those parts rather than
writing your own.
```

## Install

```sh
bun add -d github:hyphatech/starlight-hypha-agents#v0.2.0
```

```js
import starlightHyphaAgents from "starlight-hypha-agents";

starlight({
  plugins: [
    starlightThemeHypha(),
    starlightHyphaAgents({
      dir: "../agents", // from the Astro root: llms.txt and pages/<page>.md
      preamble: "What to know before any page, in Markdown.",
      groups: { Reference: "Markdown under a sidebar group's heading." },
    }),
  ],
});
```

| Option | Default | Description |
|---|---|---|
| `dir` | none | The folder the build also writes, for the package to install; none, the site's files alone |
| `preamble` | none | Markdown after `llms.txt`'s summary, before its groups |
| `groups` | `{}` | Markdown under a sidebar group's heading, by its label |

## Installed with the package

dune installs the folder into the package's documentation,
`$(opam var widgets:doc)/llms.txt` and the pages beside it:

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
make docs && git add --intent-to-add agents/ && git diff --exit-code agents/
```

## Licence

MIT. Copyright Hypha Technologies Ltd. See [LICENSE](LICENSE).
