import { execSync } from 'child_process';

let input = '';
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
    try {
        const payload = JSON.parse(input);
        const filePath = payload.tool_input?.file_path || '';

        if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
            execSync('npm run check', { stdio: 'inherit' });
        }
    } catch (error) {
        process.exit(2);
    }
});





