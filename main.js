const { ApiPromise, WsProvider } = require('@polkadot/api');
const { ContractPromise } = require('@polkadot/api-contract') ;
const { Keyring } = require('@polkadot/keyring') ;
const fs = require('fs');
const { Command } = require('commander');

// const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

// the address where the contract is deployed to the chain
const redpacketContractAddress = '5DCuFFAkL7fGF8iFH4yc2BcWL74K1Xh7fuXtUyK7gPhavV4y';
const voteContractAddress = '5GM3QtCBS6CQ1GFTw4AyyRzSDjKW8NMyAeRs6d7Jtq7eMEbb';
const daoManagerContractAddress = '5HgCDu2WoS5WQghW4rx7y9xha7WRQppG4q5Fe39zCMmQ53cc';
const erc20ContractAddress = '5C8yPcZoDvMrAtcRqa1na4KDC6WMeUx5ZZWrC3tYUct89icn';
//const airDropContractAddr = '5D9Vn4iKGQqLR9JLPk2jHAjL4NZF4xcUbs3Nj4BjHuLuSkQ3';

const aliceAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const bobAddress = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const charlieAdrr = '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y';
const daveAddr = '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy';
const eveAddr = '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw';

// abi raw data
const redPctRawData = fs.readFileSync('/Users/subdao/Workspace/subdao.com/subDAO-contracts/release/redpacket_v0.1.json')
const erc20RawData = fs.readFileSync('/Users/subdao/Workspace/subdao.com/subDAO-contracts/release/erc20_v0.1.json') 
//const airDropRawData = fs.readFileSync('/Users/subdao/Workspace/subdao.com/subDAO-contracts/release/air_drop_v0.1.json')



// termainl command value
const program = new Command();

let nodeAddr 
let contractAddress
let abiPath 
let addrList = [];

async function main () {
    // TODO: terminal commandi
    program
        .description('A tool for airdrop to subdao project.')
            .requiredOption('-ws, --websocketAddress <type>', 'The address of the blockchain node that needs to be interacted.')
            .requiredOption('-c, --contractAddress <type>', 'The address of the blockchain node that needs to be interacted.')
            .requiredOption('-a, --abiPath <type>', 'The file path of the blockchain node that needs to be interacted.')
            .requiredOption('-l, --listPath <type>', 'The list path of addresses to airdrop.');
    program.parse();    

    const options = program.opts();
    if (options.websocketAddress && options.contractAddress && options.abiPath && options.listPath) {
        nodeAddr = options.websocketAddress;
        contractAddress = options.contractAddress;
        abiPath = options.abiPath;
        let filePath = options.listPath
        // target address list
        let rawdata = fs.readFileSync(filePath);
        addrList = JSON.parse(rawdata);
    }

/*
    console.log('ws:', nodeAddr)
    console.log('contractAddress:', contractAddress);
    console.log('abiPath:', abiPath)
    console.log('addrList', addrList);
*/

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
    
/* 
    redpacket 
*/
/*
    const redPctABI = JSON.parse(redPctRawData);
    // console.log(`${redPctABI}`);

    let contract = initContractProvider(api, redPctABI, redpacketContractAddress);

    // TODO: 查询当前红包数(需由合约方法支持)
    // 此处通过遍历，获取红包id
    // print claim list
    var redpacketId = 1;
    while (true) {
        const callValue = await contract.query.checkRedPacket(aliceAddress, { value, gasLimit }, redpacketId); 

        if (!callValue.result['isOk']) {
            console.log(`the redpacket id has been traversed, there are num ${redpacketId - 1} in total.`);
            break
        } else {
            const claimList = callValue.output['claim_list'].toJSON()
            console.log(`the redpacket id is ${redpacketId}, its claim list is ${claimList}.`, );
        }
        redpacketId += 1;
    };
*/
/*
    erc20
*/
/*
    const erc20ABI = JSON.parse(erc20RawData);
    // console.log(`${redPctABI}`);

    contract = initContractProvider(api, erc20ABI, erc20ContractAddress);
    callValue = await contract.query.balanceOf(aliceAddress, { value, gasLimit }, aliceAddress);
    console.log(`${callValue.output.toJSON()}`)
*/
/*
    air_drop
*/  
    // TODO: read air_drop address list
    //let airDropAddr = new Array([bobAddress, 40], [charlieAdrr, 30], [daveAddr, 20], [eveAddr, 10])
    // let airDropAddr = new Array([bobAddress, 40000]);
    //let airDropAddr = new Array([aliceAddress, 100000]);
    const airDropRawData = fs.readFileSync(abiPath);
    const airDropABI = JSON.parse(airDropRawData);
    contract = initContractProvider(api, airDropABI, contractAddress);

    let addrListArr = objectValueArrToArr(addrList);

    //callValue = await contract.tx.invokeList({value, gasLimit}, "erc20", addrListArr).signAndSend(alice);
    await contract.tx.invokeList({value, gasLimit}, "erc20", addrListArr).signAndSend(alice, (result) => {
        console.log(result.status)
    });

}

main().catch(console.error).finally(() => process.exit());

function initContractProvider(api, abi, address) {
    const contract = new ContractPromise(api, abi, address); 
    return contract
}

function Uint8ArrayToString(fileData){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
   
    return dataString
  
  }


function objectValueArrToArr(object) {
    let arr = [];
    let i = 0;
    object.forEach(v => {
        let value = objOfValueToArr(v)
        arr[i] = value
        i++
    });
    console.log('airdrop address list: ', arr);
    return arr;
}
  // 将Object的属性值输出成Array
function objOfValueToArr(object) {
    var arr = [];
    var i = 0;
    for (var item in object) {
        arr[i] = object[item];
        i++;
    }
    return arr;
}