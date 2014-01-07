# rendr-amdefine

[AMDefine](https://npmjs.org/package/amdefine) adapter for [Rendr](https://npmjs.org/package/rendr) apps.

Allows to use relative to project's root paths to match require paths on the client when you're using Rendr+RequireJS.

## Example

```javascript

// works both in node and on the client
var deps = [
  'app/models/property',
  'app/collections/property_search'
];

require(deps, function()
{
  // ...
});

```
