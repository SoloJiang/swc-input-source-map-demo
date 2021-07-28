const path = require('path');
const fs = require('fs');
const { transformFileSync, transformSync } = require('@swc/core');


function transform() {
  const srcPath = path.join(process.cwd(), 'src/index.tsx');
  const { code, map } = transformFileSync(srcPath, {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      target: 'es2021'
    },
    sourceMaps: true,
  });

  const output = transformSync(code, {
    sourceMaps: true,
    inputSourceMap: map,
    jsc: {
      parser: {
        syntax: 'ecmascript',
      },
      target: 'es5'
    }
  });

  const libPath = path.join(process.cwd(), 'lib');
  if (!fs.existsSync(libPath)) {
    fs.mkdirSync(libPath);
  }
  fs.writeFileSync(path.join(libPath, 'index.js'), `${output.code}\n//# sourceMappingURL=index.map.js`);
  fs.writeFileSync(path.join(libPath, 'index.map.js'), output.map);
}

transform();
