import {createSlice} from '@reduxjs/toolkit'

export const articleSlice = createSlice({
    name: 'articleSlice',
    initialState: {
        title: '',
        description:'',
        image:'',
    },
    reducers: {
        addArticle: (state, action) => {
            return{
                ...state,
                id: action.payload._id,
                userId: action.payload.userId,
                title: action.payload.name,
                description: action.payload.description,
                image: action.payload.image,
            }
        },
    },
})

export const {addArticle} = articleSliceSlice.actions

export default addArticleSlice.reducer