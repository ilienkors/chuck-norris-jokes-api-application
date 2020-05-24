import React, { useContext } from 'react'
import { Context } from './context'

export default function CategoryButton({ categoryName, isActive }) {
    const { categoriesState, setCategoriesState } = useContext(Context)

    const activate = () => {
        let tempState = Object.assign({}, categoriesState)
        for (let singleCategoryName in tempState)
            tempState[singleCategoryName] = singleCategoryName === categoryName ? true : false
        setCategoriesState(tempState)
    }

    return (
        <button className={"categories__category " + (isActive ? "categories__category_active" : "")} onClick={() => activate()}>{categoryName}</button>
    )
}
