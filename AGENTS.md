# AGENTS.md

starlight-hypha-agents is a Starlight plugin for Hypha Stack libraries'
docs, installed from GitHub at a tag. This file is for anyone changing it,
human or agent. Users start at [README.md](README.md).

## Commands

```sh
make setup    # the dependencies, by Bun
make test     # the pages' Markdown, llms.txt, the skill and the folder
make lint     # the plugin's types
```

## Layout

```
src/index.ts    the plugin: its options read, the build's hook added
src/options.ts  the options and their defaults
src/agents.ts   a page as Markdown, llms.txt and the skill, from the pages
src/build.ts    the files written into the built site, and the folder
test/           the files generated from a site of the fixture's own
```

## Rules that must hold

- **What agents read is generated from the pages a person reads.** The
  Markdown, llms.txt and the skill come from the same source. Why: the two
  must say the same. Tests: `test/agents.test.ts`.
- **The build replaces the folder whole**, so `git diff` after a build is
  its check and no page removed stays. Test: `test/agents.test.ts`.
- **A page's examples are read in, and its live demos left out.** Why: an
  agent needs the code a person sees, not the component that renders it.
  Test: `test/agents.test.ts`.

## Releases

A release is a tag, `v<version>`, matching `package.json`; a library
installs the plugin by that tag, and the README's install line names it by
hand.
