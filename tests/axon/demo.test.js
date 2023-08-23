const { execSync } = require('child_process');
const path = require('path');

describe("deploy ibc solidity contract on axon", () => {
    const shellScriptPath = path.join(__dirname, '../../', 'deployment.sh');

    beforeAll(async () => {
        const command = 'chmod +x deployment.sh';
        try {const result = execSync(`${command}`, { encoding: 'utf-8', stdio: 'inherit' });
        if (result !== null) {
            console.log(result.trim());
        }
        } catch (error) {
            console.error('Error executing shell script:', error.message);
        }
    }, 1000000);


    test('start axon dev node', async () => {
        const command = 'start_axon_dev_node';
        try {const result = execSync(`${shellScriptPath} ${command}`, { encoding: 'utf-8', stdio: 'inherit' });
        if (result !== null) {
            console.log(result.trim());
        }
        } catch (error) {
            console.error('Error executing shell script:', error.message);
        }
    }, 1000000);


    test('deploy_ibc_solidity_contractt', async () => {
        const command = 'deploy_ibc_solidity_contract';
        try {const result = execSync(`${shellScriptPath} ${command}`, { encoding: 'utf-8', stdio: 'inherit' });
        if (result !== null) {
            console.log(result.trim());
        }
        } catch (error) {
            console.error('Error executing shell script:', error.message);
        }
    }, 1000000);

    //  afterAll(async () => {
    //      const command = 'clean';
    //      try {const result = execSync(`${shellScriptPath} ${command}`, { encoding: 'utf-8', stdio: 'inherit' });
    //      if (result !== null) {
    //      console.log(result.trim());
    // }
    //      } catch (error) {
    //          console.error('Error executing shell script:', error.message);
    //      }
    //  }, 1000000);
});
