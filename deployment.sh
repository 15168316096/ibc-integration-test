#!/bin/bash

# Start Axon Dev Node
start_axon_dev_node() {
    git clone -b forcerelay-test https://github.com/axonweb3/axon.git
    cd axon && cargo run --release -- run -c devtools/chain/config.toml -g devtools/chain/genesis_single_node.json > axon.log 2>&1 &
    
    # Wait for a short period for the node to start and sync
    sleep 5m
    
    # Initialize variables
    max_retries=50  # Maximum number of retries
    current_retry=1
    block_height=0
    
    # Loop to wait for node to start
    while [ "$current_retry" -le "$max_retries" ]; do
        # Check Ethereum block height using curl
        block_height=$(curl -s -X POST \
            -H "Content-Type: application/json" \
            --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
            "http://localhost:8000" | jq -r ".result")
        
        if [ -n "$block_height" ] && [ "$block_height" -gt 0 ]; then
            echo "Axon Dev Node started successfully"
            break  # Break the loop if successful
        else
            echo "Retrying... (Attempt $current_retry/$max_retries)"
            sleep 5  # Wait before the next retry
        fi
        
        current_retry=$((current_retry + 1))
    done
    
    # Check if the maximum number of retries was reached
    if [ "$current_retry" -gt "$max_retries" ]; then
        echo "Axon Dev Node failed to start"
    fi
}

# Deploy IBC Solidity Contract to Axon Dev Node
deploy_ibc_solidity_contract() {
    git clone https://github.com/synapseweb3/ibc-solidity-contract.git
    cd ibc-solidity-contract
    # export AXON_HTTP_RPC_URL=https://8000-15168316096-ibcintegrat-3wje4lbizsl.ws-us104.gitpod.io
    export AXON_HTTP_RPC_URL=http://localhost:8000
    yarn install
    yarn compile
    yarn migrate
    echo "Deployed IBC Solidity Contract to Axon Dev Node successfully"
}

# Clean
clean() {
    rm -rf axon/
    rm -rf ibc-solidity-contract/
    echo "Cleanup completed successfully"
}

# Check the command passed from JavaScript and call the corresponding function
if [ "$1" = "start_axon_dev_node" ]; then
    start_axon_dev_node
elif [ "$1" = "deploy_ibc_solidity_contract" ]; then
    deploy_ibc_solidity_contract
elif [ "$1" = "clean" ]; then
    clean
else
    echo "Invalid command"
fi
