function reducer(state = {number:1},action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'add':
            newState.number = newState.number+1;
            return newState;
        default: 
        return state;
    }
}
export default reducer;