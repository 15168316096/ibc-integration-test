const { exec } = require('child_process');
const path = require('path');

describe("deploy ibc solidity contract on axon", () => {
    const directory = path.join(__dirname, '../../');
    console.log(`dir:${directory}`)
    test('start axon dev node', async () => {
        const command = 'make axon';
        try {
            const { stdout } = await executeShellCommand(command, { cwd: directory });
            console.log('Deploy success:', stdout);
        } catch (error) {
            console.error(`Deploy failed: ${error.message}`);
            throw error;
        }
    }, 1000000);

    test.skip('deploy ibc-solidity-contract', async () => {
        const command = 'make ibc-solidity-contract';
        try {
            const { stdout } = await executeShellCommand(command, { cwd: directory });
            console.log('Deploy success:', stdout);
        } catch (error) {
            console.error(`Deploy failed: ${error.message}`);
            throw error;
        }
    }, 1000000);
});

function executeShellCommand(command, options) {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}
