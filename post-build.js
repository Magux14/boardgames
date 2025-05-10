import { execSync } from 'child_process';
import os from 'os';

try {
    if (os.platform() === 'win32') {
        execSync('rmdir /S /Q docs');
        execSync('copy src\\404.html dist\\404.html');
        execSync('node replace-git-paths');
        execSync('rename dist docs');
    } else {
        execSync('rm -rf docs');
        execSync('cp src/404.html dist/404.html');
        execSync('node replace-git-paths');
        execSync('mv dist docs');
    }

    console.log('Post-build completed successfully.');
} catch (error) {
    console.error('Error during post-build:', error.message);
    process.exit(1);
}
