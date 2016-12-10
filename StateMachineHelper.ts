///<reference path="StateMachineTypes.ts"/>
declare var global;

module StateMachineHelpers{
    export function isBalanced(line: Line){
        return !line.openCharSequence|| line.openCharSequence.length === 0;

    export function popBrace(line: Line){
        if(!line.openCharSequence){
            console.error("Error in line " + line.lineNumber);
        }
        const lastChar = line.openCharSequence.pop();
        if(lastChar != '{'){
            console.error("Error in line " + line.lineNumber);
        }
    }
}

global.StateMachineHelpers = StateMachineHelpers;
