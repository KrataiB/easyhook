#!/usr/bin/env node

/**
 * Sync @easyhook/core version across all adapter packages
 * Runs automatically before nx release via preVersionCommand
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = join(__dirname, '..', 'packages');

// Read @easyhook/core version
const corePackageJson = JSON.parse(
  readFileSync(join(packagesDir, 'core', 'package.json'), 'utf-8')
);
const coreVersion = corePackageJson.version;

console.log(`📦 @easyhook/core version: ${coreVersion}`);

// Find all adapter packages
const packages = readdirSync(packagesDir).filter((name) => {
  const pkgPath = join(packagesDir, name, 'package.json');
  if (!existsSync(pkgPath)) return false;

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return pkg.dependencies?.['@easyhook/core'] !== undefined;
});

console.log(
  `🔍 Found ${packages.length} packages with @easyhook/core dependency`
);

// Update each package
let updated = 0;
for (const name of packages) {
  const pkgPath = join(packagesDir, name, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  const currentDepVersion = pkg.dependencies['@easyhook/core'];
  const newDepVersion = `^${coreVersion}`;
  const currentPkgVersion = pkg.version;

  let hasChanges = false;

  if (currentDepVersion !== newDepVersion) {
    pkg.dependencies['@easyhook/core'] = newDepVersion;
    console.log(
      `✅ Updated ${pkg.name} dependency: ${currentDepVersion} → ${newDepVersion}`
    );
    hasChanges = true;
  }

  if (currentPkgVersion !== coreVersion) {
    pkg.version = coreVersion;
    console.log(
      `✅ Updated ${pkg.name} version: ${currentPkgVersion} → ${coreVersion}`
    );
    hasChanges = true;
  }

  if (hasChanges) {
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    updated++;
  } else {
    console.log(`⏭️  ${pkg.name}: already up to date`);
  }
}

console.log(`\n✨ Done! Updated ${updated} package(s)`);
