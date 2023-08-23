axon:
	git clone -b forcerelay-test https://github.com/axonweb3/axon.git
	cd axon
	cargo run --release -- run -c devtools/chain/config.toml -g devtools/chain/genesis_single_node.json

ibc-solidity-contract:
	git clone https://github.com/synapseweb3/ibc-solidity-contract.git
	cd ibc-solidity-contract
	export AXON_HTTP_RPC_URL=http://localhost:8000
	yarn install
	yarn cpmpile
	yarn migrate

clean:
	rm -rf axon/