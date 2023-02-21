Gendiff
========================
[![Actions Status](https://github.com/mkh1n/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/mkh1n/frontend-project-46/actions)
[![Node CI](https://github.com/mkh1n/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/mkh1n/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bf7daa4ed2ce39ec5983/maintainability)](https://codeclimate.com/github/mkh1n/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bf7daa4ed2ce39ec5983/test_coverage)](https://codeclimate.com/github/mkh1n/frontend-project-46/test_coverage)
<br>
## About
Gendiff - CLI utility compares two configuration files and shows a difference.
## Installation
Clone repository to a local pc and run these commands in the root of the foder.

	$ make install
    $ sudo npm link

## Usage
Use gendiff --help to show help page

    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.

    Options:
      -V, --version         output the version number
      -f, --format, <type>  output format (default: "stylish")
      -h, --help            output usage information

### Options

Gendiff supports different output formats:

* `stylish (default)` 
* `plain`
* `json`

Use -f flag to set required output format. `-f, --format <type> output format`
### Examples

* Stylish<br><br>
[![asciicast](https://asciinema.org/a/ffzpXf3G0noO2TgKutSzm2w10.svg)](https://asciinema.org/a/ffzpXf3G0noO2TgKutSzm2w10)

* Plain
<br><br>
[![asciicast](https://asciinema.org/a/sgqfWknD3zO41XJwMqMPidMwW.svg)](https://asciinema.org/a/sgqfWknD3zO41XJwMqMPidMwW)

* Json
<br><br>
[![asciicast](https://asciinema.org/a/arshHWargO1VxTUlrQMJVFlj1.svg)](https://asciinema.org/a/arshHWargO1VxTUlrQMJVFlj1)