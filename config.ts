import * as toml from 'toml';
import * as fs from 'fs';

export class Config {
    public userIdentityAsStr: string;
    public unlockPassword: string;
    public websocketAddress: string;
    public contractAddress: string;
    public abiPath: string;
    constructor(data: any) {
        const userIdentity = fs.readFileSync(data.user.user_identity_json_file_path).toString()
        this.userIdentityAsStr = userIdentity;
        this.unlockPassword = data.user.unlock_password;
        this.websocketAddress = data.network.websocket_address;
        this.contractAddress = data.network.contract_address;
        this.abiPath = data.network.abi_path;
    }
}

export function loadConfig(path: string): Config {
    const data = toml.parse(fs.readFileSync(path, 'utf8'));
    // console.log(data);
    return new Config(data);
}
