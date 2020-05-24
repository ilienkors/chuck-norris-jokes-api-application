import React, {useContext} from 'react'
import { Context } from './context'

export default function Aside() {
    const { favorites } = useContext(Context)

    return (
        <aside className="aside" id="aside">{favorites}</aside>
    )
}
