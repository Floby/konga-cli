[![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]

Konga
==================

> Command-line client for the [Kong][kong-url] admin

Installation
------------

    npm install -g konga-cli

Complete Reference
------------------

The role of this command-line utility is to hit the [Kong][kong-url] admin API.
Most bindings are obvious and `konga` strives to have idempotent commands (that's why you have `set` instead of `add`).
The complete guide to the Kong api lies on [their website](https://getkong.org/docs/0.5.x/admin-api/)


Usage
-----

### APIs

##### List

    $ konga api list

List all configured APIs

##### Set

```
$ konga api set <api-name> <api-upstream> \
  [--request-host <host>] \
  [--request-path <path>] \
  [--preserve-host] \
  [--strip-request-path]
```

Ensure the api with that given name is either created or updated with the given settings

##### Remove

    $ konga api remove <api-name>

Ensure the api of that name does not exist

### Plugins

##### List

    $ konga plugin list [--on <api-name>]

* List all available plugins
* List configured plugins on a given API

##### Set

    $ konga plugin set <plugin-name> --on <api-name> [field=value ...]

Ensure the plugin is enabled with the given settings on a given API.
The `field=value` pair are the settings for the given plugin

##### Read config

    $ konga plugin read-config <plugin-name> --on <api-name> [fields...]

Read the config for a given configured plugin on a given API, optionally select fields to display

For example:

```
$ konga plugin read-config <oauth> --on my-api provision_key,scopes
a006d52004f7e7f028e0e62486f217ced1a6a0d5
identity,messages
```

##### Remove

    $ konga plugin remove <plugin-name> --on <api-name>

Ensure a given plugin is disabled for a given API

### Consumers

##### List

    $ konga consumer list

##### Set

    $ konga consumer set <username> [--custom-id <custom-id>]

Ensure the consumer by that name is created

##### Remove

    $ konga consumer remove <username>

Ensure the consumer by that name does not exist

##### Configure plugin

    $ konga consumer plugin <username> <plugin-name> [field=value...]

Configure a given plugin for that consumer
The `field=value` pair are the settings for the given plugin


##### Read plugin config

    $ konga consumer plugin-read <username> <plugin-name> [fields...]

Test
----

You can run the tests with `npm test`. You will need to know [mocha][mocha-url]

Contributing
------------

Anyone is welcome to submit issues and pull requests


License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: http://img.shields.io/travis/Floby/konga-cli/master.svg?style=flat
[travis-url]: https://travis-ci.org/Floby/konga-cli
[coveralls-image]: http://img.shields.io/coveralls/Floby/konga-cli/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Floby/konga-cli
[mocha-url]: https://github.com/visionmedia/mocha
[kong-url]: http://getkong.org

