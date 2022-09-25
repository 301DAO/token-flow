# Token Flow

Token flow lets you create zapier like automation flows for your income. We currently support Aave and Uniswap with more integrations coming soon.

## Contributing

Install pnpm: https://pnpm.io/installation

We are using turbo repo to manage this monorepo. Learn more [here](https://turborepo.org/docs).

**Note**: To manage dependencies within workspaces in your monorepo, ensure you are running commands from within the target workspace, or by specifying the workspace when running from root:

```bash
pnpm add <package> --filter <workspace>
```

For example:

```sh
pnpm add rimraf --filter database
# database is a workspace inside ./packages
```

notice we're not doing `--filter packages/database`.

To run scripts:

```bash
cd scripts
```

```bash
pnpm run monitor
```
