const { resolve: resolvePath } = require('path');
const { pick } = require('@ntks/toolbox');

const ksUtils = require('./knosys');

function resolveSiteSrcDir(site) {
  return ksUtils.getConfig(`site.${site}.source`) || `./.knosys/sites/${site}`;
}

function resolveSiteSrcPath(site) {
  return resolvePath(ksUtils.resolveRootPath(), resolveSiteSrcDir(site));
}

function copySitePkgInfo(site) {
  const pkg = ksUtils.readData(`${ksUtils.resolveRootPath()}/package.json`);

  ksUtils.saveData(`${resolveSiteSrcPath(site)}/package.json`, { name: `${pkg.name}-site-${site}`, ...pick(pkg, ['version', 'private', 'hexo', 'dependencies']) });
}

module.exports = { ...ksUtils, resolveSiteSrcDir, resolveSiteSrcPath, copySitePkgInfo };
