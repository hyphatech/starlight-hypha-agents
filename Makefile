.DEFAULT_GOAL := help
.PHONY: help setup test lint

help: ## list targets
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	  | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

setup: ## install the dependencies
	@command -v bun >/dev/null 2>&1 || echo "The plugin needs Bun 1.3 or later."
	bun install --frozen-lockfile

node_modules: package.json bun.lock
	bun install --frozen-lockfile
	@touch node_modules

test: node_modules ## the pages' Markdown, llms.txt, the skill and the folder
	bun test test

lint: node_modules ## the plugin's types
	bunx tsc --noEmit -p .
