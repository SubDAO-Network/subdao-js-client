import * as toml from 'toml';
import * as fs from 'fs';

export class Config {
    public websocketAddress: string;
    public contractAddress: string;
    public abiPath: string;
    constructor(data: any) {
        this.websocketAddress = data.websocket_address;
        this.contractAddress = data.contract_address;
        this.abiPath = data.abi_path;
    }
}

export function loadConfig(path: string): Config {
    const data = toml.parse(fs.readFileSync(path, 'utf8'));
    // console.log(data);
    return new Config(data.network);
}
