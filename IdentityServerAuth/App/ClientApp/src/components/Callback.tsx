import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import Store from "../store/store";

const Callback = () => {

    const store = useContext(Store);
    useEffect(()=>{
        store.completeLogin();
    },[store])

    return (
        <div>
            <h1>Login callback page</h1>
            {store.user && <p>You are logged in</p>}
            <pre>{JSON.stringify(store.user,null,2)}</pre>
        </div>
    )
}

export default observer(Callback);