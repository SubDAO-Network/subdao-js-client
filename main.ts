import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { Keyring } from '@polkadot/keyring';
import { Command } from 'commander';
import * as fs from 'fs';

import { readCsvLine } from "./utils";

// termainl command value
const program = new Command();

let nodeAddr: string;
let contractAddr: string;
let abiPath: string;
let airDropList: Array<any>;

async function main() {
    // TODO: terminal command
    program
        .description('A tool for airdrop to subdao project.')
            .requiredOption('-ws, --websocketAddress <type>', 'The address of the blockchain node that needs to be interacted.')
            .requiredOption('-c, --contractAddress <type>', 'The address of contract that needs to be interacted.')
            .requiredOption('-a, --abiPath <type>', 'The abi file path of the contradt that needs to be interacted.')
            .requiredOption('-l, --listPath <type>', 'The list path of addresses to airdrop.');
    program.parse();    

    const options = program.opts();
    if (options.websocketAddress && options.contractAddress && options.abiPath && options.listPath) {
        nodeAddr = options.websocketAddress;
        contractAddr = options.contractAddress;
        abiPath = options.abiPath;
        let filePath = options.listPath

        //TODO: read csv file
        airDropList = readCsvLine(filePath).slice(1);
        console.log(airDropList);
    }

    //TODO: init polkadot api client
    const provider = new WsProvider('ws://' + nodeAddr);
    const api = await ApiPromise.create({ provider });

    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');
    const bob = keyring.addFromUri('//Bob');

    // system node info
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    
    // 调用合约方法的默认值
    const value = 0;
    const gasLimit = -1;

    const airDropRawData = fs.readFileSync(abiPath).toString();
    const airDropABI = JSON.parse(airDropRawData);
    const contract = new ContractPromise(api, airDropABI, contractAddr); 
    
    // await contract.tx.registerTokenStandardIns({value, gasLimit}, "5CiNowLBUcdw5GQmjE7vwntgGSCqe6S5jXRoRYo4gbr1W3my").signAndSend(alice);
    let callback = await contract.tx.actionAll({value, gasLimit}, airDropList).signAndSend(alice);
    console.log(callback);

}
main().catch(console.error).finally(() => process.exit());