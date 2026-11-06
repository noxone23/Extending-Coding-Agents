import fs from 'fs';

let input = '';
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
    try {
        const payload = JSON.parse(input);
        // Prüft beide möglichen Felder, die Claude mitsenden könnte
        const filePath = payload.tool_input?.path || payload.tool_input?.file_path || '';

        // Erkennt Test-Dateien (z.B. books.test.ts oder im tests/ Ordner)
        const isTestFile = filePath.includes('.test.') || filePath.includes('.spec.') || filePath.startsWith('tests/');

        if (isTestFile && fs.existsSync(filePath)) {
            console.error(`Blocked: Modifying existing test files is not allowed.`);
            process.exit(2);
        }
    } catch (error) {
        process.exit(0);
    }
});
;

