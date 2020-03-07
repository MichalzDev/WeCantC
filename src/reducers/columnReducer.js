const initialState = [
    {
        id: 0,
        title: "test title",
        tasks: [
            {
                id: 0,
                content: "content Test 1"
            },
            {
                id: 1,
                content: "content Test 2"
            }
        ]
    },
    {
        id: 1,
        title: "test title",
        tasks: [
            {
                id: 0,
                content: "content Test 1"
            },
            {
                id: 1,
                content: "content Test 2"
            }
        ]
    }
]

const columnReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default columnReducer;