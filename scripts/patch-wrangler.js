const fs = require('fs');
const path = require('path');

const cliPath = path.join(__dirname, '..', 'node_modules', 'wrangler', 'wrangler-dist', 'cli.js');
const binPath = path.join(__dirname, '..', 'node_modules', 'wrangler', 'bin', 'wrangler.js');

try {
  if (fs.existsSync(binPath)) {
    let content = fs.readFileSync(binPath, 'utf8');
    if (!content.includes('// PixelCraft patch')) {
      content = content.replace(
        '...process.argv.slice(2),',
        '// PixelCraft patch\n\t\t\t...(process.argv.includes("deploy") && !process.argv.some(a => a.includes("autoconfig")) ? [...process.argv.slice(2), "--no-autoconfig"] : process.argv.slice(2)),'
      );
      fs.writeFileSync(binPath, content, 'utf8');
      console.log('✓ Patched wrangler/bin/wrangler.js to disable unwanted autoconfig');
    }
  }

  if (fs.existsSync(cliPath)) {
    let cliContent = fs.readFileSync(cliPath, 'utf8');
    if (cliContent.includes('autoconfig: {\n          describe: "Enables framework detection and automatic configuration when deploying",\n          type: "boolean",\n          default: true')) {
      cliContent = cliContent.replace(
        'default: true\n        }',
        'default: false\n        }'
      );
      fs.writeFileSync(cliPath, cliContent, 'utf8');
      console.log('✓ Patched wrangler-dist/cli.js default autoconfig to false');
    }
  }
} catch (err) {
  console.warn('Wrangler patch notice:', err.message);
}
