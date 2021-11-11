# 工具使用说明

## 环境安装（未来优化为二进制可执行程序）
1. 启动本地测试节点

    https://github.com/SubDAO-Network/subdao-node/tree/3.0_dev

2. 安装erc20、air_drop合约

    https://github.com/SubDAO-Network/subDAO-contracts


3. 下载，安装nodejs

    https://nodejs.org/zh-cn/download/


## 项目执行
项目根目录下，执行

```node ./main.js --websocketAddress <node address> --contractAddress <contract address> --abiPath <contract abi file path> --listPath <airdrop address list file path>```

示例如下:

```
node ./main.js 
-ws 127.0.0.1:9944 
-c 5D9Vn4iKGQqLR9JLPk2jHAjL4NZF4xcUbs3Nj4BjHuLuSkQ3 
-a /Users/xxx/subdao.com/subDAO-contracts/release/air_drop_v0.1.json 
-l ./demo.json
```

```
ts-node main.ts 
-ws 127.0.0.1:9944 
-c 5Cj8xYu9GrXckNaXbAeH56CVje2AB47YgDVNMa4AhXio4bEe
-a /Users/subdao/Workspace/subdao.com/tests/contract/deploy_air_drop/artifacts/air_drop.json 
-l ./test_airDropList.csv
```
输出:
```
You are connected to chain Development using Europa Dev Node v0.3.2-f6da65d-aarch64-macos

airdrop address list:  [
  [ '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', '4' ],
  [ '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y', '3' ],
  [ '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', '2' ],
  [ '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', '1' ]
]
```
⚠️ 暂时没有对event进行捕获，所以执行完命令后，需在polkadot-app里调用air_drop合约的get方法，对转账的账户余额进行查看。

## airdrop 工具帮助
命令：```node ./main.js --help```

输出:
```
Usage: main [options]

A tool for airdrop to subdao project.

Options:
  -ws, --websocketAddress <type>  The address of the blockchain node that needs to be interacted.
  -c, --contractAddress <type>    The address of the blockchain node that needs to be interacted.
  -a, --abiPath <type>            The file path of the blockchain node that needs to be interacted.
  -l, --listPath <type>           The list path of addresses to airdrop.
  -h, --help                      display help for command
```