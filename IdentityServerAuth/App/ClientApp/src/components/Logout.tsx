import React, {useContext, useEffect} from "react";
import Store from "../store/store"
import {observer} from "mobx-react-lite";


const Logout = ()=>{

    const store = useContext(Store)

    useEffect(()=>{
        store.completeLogout()
    })

    return(
        <div>
            <h1>Bye-bye, see you later :)</h1>
        </div>
    )
}

export default observer(Logout)