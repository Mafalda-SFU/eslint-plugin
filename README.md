# eslint-plugin

[![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/mafalda-bot/27d772a9a3a8a945b34fd9676de40486/raw/eslint-plugin.json)](https://gist.github.com/Mafalda-bot/27d772a9a3a8a945b34fd9676de40486#file-eslint-plugin-json)
[![Docs coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/mafalda-bot/7238ab5f664c36d1edfa48d218eea9b3/raw/eslint-plugin.json)](https://gist.github.com/Mafalda-bot/7238ab5f664c36d1edfa48d218eea9b3#file-eslint-plugin-json)
[![npm](https://img.shields.io/npm/v/@mafalda-sfu/eslint-plugin.svg)](https://www.npmjs.com/package/@mafalda-sfu/eslint-plugin)

This is an ESLint plugin that exports configurations and rules for the
[Mafalda SFU](https://mafalda.io) project.

## Installation

You can install this plugin using npm:

```bash
npm install @mafalda-sfu/eslint-plugin --save-dev
```

## Configurations

This plugin exports the following configurations:

- `layout`
- `recommended`
- `suggestions`
- `suggestions-typescript`
- `typescript`

## Rules

This plugin exports the following rules:

- `brace-style`: modified version of the
  [eslint brace-style rule](https://eslint.org/docs/rules/brace-style) allowing
  multiple lines in `allman` style.
- `no-private-keyword`: disallows the use of the Typescript `private` keyword.
- `no-protected-keyword`: disallows the use of the Typescript `protected`
  keyword.
- `no-public-keyword`: disallows the use of the Typescript `public` keyword.
- `no-setInterval`: disallows the use of `setInterval`.
- `no-setTimeout`: disallows the use of `setTimeout`.
- `no-window-event`: disallows the use of `window` events.

## License

This project is licensed under the [MIT License](LICENSE).
