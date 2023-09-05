export interface PageAction{
    type:'ADD' | 'SUBTRACT';
}
export function pageNumberReducer(state:number , action:PageAction) : number{
    if(action.type === 'ADD') return state + 1
    if(action.type === 'SUBTRACT') return state - 1
    return state
}