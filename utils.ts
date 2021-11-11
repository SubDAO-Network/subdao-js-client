import * as fs from 'fs';

/**
 * 
 * @param csvfile {string} csv file path
 * @returns data {Aarray}
 */
export function readCsvLine(csvfile: string): string[] {
    let csvstr: string = fs.readFileSync(csvfile, 'utf8');
    let arr: string[] = csvstr.split('\n');
    let array: any = [];
    arr.every(line => {
        console.log(line);
        // remove null line
        if (line == '') {
            return true;
        }
        array.push(line.split(','));
        return true;
    });
    return array
}
