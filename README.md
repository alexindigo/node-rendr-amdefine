# rendr-amdefine

[AMDefine](https://npmjs.org/package/amdefine) adapter for [Rendr](https://npmjs.org/package/rendr) apps.

Allows to use relative to project's root paths to match require paths on the client when you're using Rendr+RequireJS.

## Example

```javascript

if (typeof define !== 'function') {
  var define = require('rendr-amdefine')(module);
}

define(function(require)
{
  // works both in node and on the client
  var deps = [
    'app/models/property',
    'app/collections/property_search'
  ];

  require(deps, function()
  {
    // ...
  });

});

```

To use within test frameworks (like jasmin) add following line to your test suite:

```javascript

require('rendr-amdefine').withAutoBasePath();

```

It will set `basePath` as parent folder of the node_modules directory that contains `rendr-amdefine`.

For the case where it's not applicable you can directly manipulate `basePath` by using:

```javascript

require('rendr-amdefine').basePath('/custom/path');

```
