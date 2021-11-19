# Overview
The project is a client that loads the subdao network through the command line and configuration files, and provides a client for calling contract methods.

## Environmental installation
1. strat the local test node

    https://github.com/SubDAO-Network/subdao-node/tree/3.0_dev

2. install erc20, air_drop contract

    https://github.com/SubDAO-Network/subDAO-contracts


3. Download and install nodejs, yarn, ts-node

    ```
    # nodejs
    https://nodejs.org/zh-cn/download/

    # yarn
    npm install -g yarn
    yarn --version

    # ts-node
    npm install -g ts-node
    ts-node --version           
    ```

## Project use
1. Download project dependencies
    ```
    # root path of the project
    yarn
    ```    
2. Excuting extrinsics
   
    ```ts-node ./main.ts --listPath <airdrop address list file path>```

example:

```
ts-node main.ts -l ./test/test_air_drop_list.csv
```
output:
```
You are connected to chain Development using Europa Dev Node v0.3.2-f6da65d-aarch64-macos

airdrop address list:  [
  [ '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', '40' ],
  [ '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y', '30' ],
  [ '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy', '20' ],
  [ '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw', '10' ]
]
The Hash of call: xxxxx
```

## Help
command：```ts-node ./main.ts --help```

output:
```
Usage: main [options]

A tool for airdrop to subdao project.

Options:
  -l, --listPath <type>           The list path of addresses to airdrop.
  -h, --help                      display help for command
```