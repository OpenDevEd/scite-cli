<p align="center">
  <img title="scite.ai logo" src="https://github.com/OpenDevEd/scite-cli/assets/41545690/4de7595a-8456-463f-919d-6edca3867e0b" height="100px">
</p>

# scite-cli

An unofficial CLI tool that gives access to citation data, scite tallies, related paper metadata and scite reference check.

Please refer to the subsequent sections for details on how to install and use `scite-cli`.

# Examples:

Retrieve paper metadata by DOI(s):

```bash
# one paper
scite-cli papers 10.22323/1.380.0183

# multiple papers
scite-cli papers 10.1002/bin.1697 10.1002/best.202271004
```

Get papers citing a given DOI:

```bash
scite-cli papers --target 10.1002/bin.1697
```

Search the scite database for documents matching a term:

```bash
scite-cli search "climate change" --limit 5
```

# Getting Help

You can get help for any subcommand in the `scite-cli` tool by using the `--help` option.
This will display a help message that describes how to use the subcommand and what options are available.

For example, to get help for the `search` subcommand, you can run:

```bash
scite-cli search --help
```

You can also enable terminal completion. This feature provides you with command and option suggestions as you type in your terminal.

You can enable it by adding the following line to your `.bashrc` or `.bash_profile`:

```bash
eval "$(scite-cli completion)"
```

Or, for a one-time setup, you can directly use:

```bash
source <(scite-cli completion)
```

Now, when you type scite-cli followed by a space and press the Tab key, you will see a list of available commands. You can also get suggestions for options by typing a command followed by a space and --, then pressing Tab.

# Getting Started

### Prerequisites

- [nodejs](https://nodejs.org)
- [npm](https://www.npmjs.com/)

### Installation

1) Clone the repository, and navigate to the project directory:

```bash
git clone git@github.com:OpenDevEd/scite-cli.git
cd scite-cli
```

2) Run the setup script, this will install the dependencies and link the CLI tool to your system:

```bash
npm run setup
```

3) Verify the installation by running the help command:

```bash
scite-cli --help
```

### Configuration

The CLI tool requires an API key to access the scite API. You can set this key using the `config` subcommand:

```bash
scite-cli config set access-token
```

### Development

To run the CLI tool in watch mode, you can use the following command:

```bash
npm run watch
```

This will watch for changes in the source files and automatically rebuild the CLI tool.

# Contributing

We welcome contributions to the `scite-cli` project! To contribute, please follow these guidelines:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contribution.
3. Make your changes and commit them with descriptive commit messages.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

Please ensure that your code follows the project's coding style and conventions.

Thank you for your contributions!
