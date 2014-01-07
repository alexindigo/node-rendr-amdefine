var amdefine = require('amdefine')
  , path     = require('path')
  , basePath = path.dirname(require.main.filename)
  ;

// catch and augment system require method called by amdefine
// and inject Rendr+RequireJs specific logic
// to understand relative (to project's root) paths
module.exports = function rendrAmdefine(module)
{
  return amdefine(module, pretendRequire);
}

// check for requested path, if it has "/"" in the path
// and doesn't start with "." or "/"
// treat it as path relative to the project's root
// and replace it with absolute path
function pretendRequire(moduleId)
{
  if (moduleId && moduleId.substr(0, 4) == 'app/')
  {
    moduleId = path.join(basePath, moduleId);
  }

  return module.parent.require(moduleId);
}
