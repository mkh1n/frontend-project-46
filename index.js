import fs from 'fs'
import _ from 'lodash'
import { cwd } from 'node:process'
import * as path from 'path'

function normalizePath(filepath){
    if (filepath.includes(cwd())){
        return filepath;
    } else{
        return path.resolve(cwd(), filepath)
    }
}

function gendiff(file1path, file2path){
    const ext = file1path.split('.').at(-1)

    switch(ext){
        case 'json': 
            var file1 =  JSON.parse(fs.readFileSync(normalizePath(file1path), {encoding: 'utf-8'}));
            var file2 =  JSON.parse(fs.readFileSync(normalizePath(file2path), {encoding: 'utf-8'}));
            break;
    }
    const keys = _.sortBy(Array.from(new Set(Object.keys(file1).concat(Object.keys(file2)))))

    function makeStrdiff(file1, file2, key){
        if (!_.has(file1, key) && _.has(file2, key)){
            return '  + ' + key + ': ' + file2[key] + '\n';
        }
        else if(_.has(file1, key) && !_.has(file2, key)){
            return '  - ' + key + ': ' + file1[key] + '\n';
        }
        else if(file1[key] !== file2[key]){
            return '  - ' + key + ': ' + file1[key] + '\n'+
            '  + ' + key + ': ' + file2[key] + '\n';
        }
        else if(file2[key] === file1[key]){
            return '    ' + key + ': ' + file1[key] + '\n';
        }
    }
    return '{\n' + keys.reduce((acc, key)=>acc + makeStrdiff(file1, file2, key), '') + '}'
}
export default gendiff