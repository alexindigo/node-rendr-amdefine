var amdefine   = require('amdefine')
  , path       = require('path')
  , basePath   = path.dirname(require.main.filename)
  , extraPaths = []
  ;

// public api
module.exports                  = rendrAMDefine;
module.exports.buildRequire     = pretendRequire;
module.exports.basePath         = basePathGetterSetter;
module.exports.withAutoBasePath = basePathHelper;
module.exports.withExtras       = setExtraPaths;

// catch and augment system require method called by amdefine
// and inject Rendr+RequireJs specific logic
// to understand relative (to project's root) paths
function rendrAMDefine(module)
{
  return amdefine(module, pretendRequire(module));
}

// check for requested path, if it has "/"" in the path
// and doesn't start with "." or "/"
// treat it as path relative to the project's root
// and replace it with absolute path
function pretendRequire(module)
{
  return function pretendRequire_require(moduleId)
  {
    var i, stub;

    if (moduleId && moduleId.substr(0, 4) == 'app/')
    {
      moduleId = path.join(basePath, moduleId);
    }
    // check for extras
    else if (moduleId)
    {
      for (i=0; i<extraPaths.length; i++)
      {
        stub = extraPaths[i]+'/';
        if (moduleId.substr(0, stub.length) == stub)
        {
          moduleId = path.join(basePath, moduleId);
          break;
        }
      }
    }

    return module.require(moduleId);
  }
}

// setter/getter for basePath
// useful when you run your app
// from other than base location
function basePathGetterSetter(newPath)
{
  if (arguments.length > 0)
  {
    basePath = newPath;
  }

  return basePath;
}

// basePath setter helper
// calculate path to the root of the project
// that contains current module
// (parent of the node_module/rendr-amdefine)
// not always does what you want, use with caution
function basePathHelper()
{
  var filename = require.resolve('rendr-amdefine');

  basePath = filename.split('/node_modules/', 2)[0];

  // allow piping
  return module.exports;
}

// adds extra paths tokens to handle with magic
function setExtraPaths(paths)
{
  // allows to reset extras
  if (!paths) paths = '';

  if (typeof paths == 'string')
  {
    paths = [paths];
  }

  extraPaths = paths;

  return module.exports;
}
