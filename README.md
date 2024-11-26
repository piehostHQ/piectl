pie-cli
=================

Pie.host CLI


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pie-cli.svg)](https://npmjs.org/package/pie-cli)
[![Downloads/week](https://img.shields.io/npm/dw/pie-cli.svg)](https://npmjs.org/package/pie-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g piecli
$ pie COMMAND
running command...
$ pie (--version)
piecli/0.0.1 darwin-x64 node-v18.17.1
$ pie --help [COMMAND]
USAGE
  $ pie COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pie deploy [FILE]`](#pie-deploy-file)
* [`pie hello PERSON`](#pie-hello-person)
* [`pie hello world`](#pie-hello-world)
* [`pie help [COMMAND]`](#pie-help-command)
* [`pie plugins`](#pie-plugins)
* [`pie plugins add PLUGIN`](#pie-plugins-add-plugin)
* [`pie plugins:inspect PLUGIN...`](#pie-pluginsinspect-plugin)
* [`pie plugins install PLUGIN`](#pie-plugins-install-plugin)
* [`pie plugins link PATH`](#pie-plugins-link-path)
* [`pie plugins remove [PLUGIN]`](#pie-plugins-remove-plugin)
* [`pie plugins reset`](#pie-plugins-reset)
* [`pie plugins uninstall [PLUGIN]`](#pie-plugins-uninstall-plugin)
* [`pie plugins unlink [PLUGIN]`](#pie-plugins-unlink-plugin)
* [`pie plugins update`](#pie-plugins-update)

## `pie deploy [FILE]`

describe the command here

```
USAGE
  $ pie deploy [FILE] [-f] [-n <value>]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ pie deploy
```

_See code: [src/commands/deploy.ts](https://github.com/piehostHQ/pie-cli/blob/v0.0.1/src/commands/deploy.ts)_

## `pie hello PERSON`

Say hello

```
USAGE
  $ pie hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ pie hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/piehostHQ/pie-cli/blob/v0.0.1/src/commands/hello/index.ts)_

## `pie hello world`

Say hello world

```
USAGE
  $ pie hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ pie hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/piehostHQ/pie-cli/blob/v0.0.1/src/commands/hello/world.ts)_

## `pie help [COMMAND]`

Display help for pie.

```
USAGE
  $ pie help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pie.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.3/src/commands/help.ts)_

## `pie plugins`

List installed plugins.

```
USAGE
  $ pie plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pie plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/index.ts)_

## `pie plugins add PLUGIN`

Installs a plugin into pie.

```
USAGE
  $ pie plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into pie.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PIE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PIE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ pie plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ pie plugins add myplugin

  Install a plugin from a github url.

    $ pie plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ pie plugins add someuser/someplugin
```

## `pie plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pie plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pie plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/inspect.ts)_

## `pie plugins install PLUGIN`

Installs a plugin into pie.

```
USAGE
  $ pie plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into pie.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PIE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PIE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ pie plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ pie plugins install myplugin

  Install a plugin from a github url.

    $ pie plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ pie plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/install.ts)_

## `pie plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ pie plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pie plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/link.ts)_

## `pie plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pie plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pie plugins unlink
  $ pie plugins remove

EXAMPLES
  $ pie plugins remove myplugin
```

## `pie plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ pie plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/reset.ts)_

## `pie plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pie plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pie plugins unlink
  $ pie plugins remove

EXAMPLES
  $ pie plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/uninstall.ts)_

## `pie plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ pie plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pie plugins unlink
  $ pie plugins remove

EXAMPLES
  $ pie plugins unlink myplugin
```

## `pie plugins update`

Update installed plugins.

```
USAGE
  $ pie plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->
