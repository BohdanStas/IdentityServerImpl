import * as React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import Store from "../store/store";
import Loading from "./Loading";
import {Button, Message} from "semantic-ui-react";

const Home = () => {
    const store = useContext(Store);

    useEffect(() => {
        console.log(store.appLoaded)
    }, [store])
    if (!store.appLoaded) {
        return (<Loading content={"Loading..."}/>)
    } else {
        return (
            <div>
                <h1>Home page</h1>
                <Button primary onClick={store.getSecretString}>Get string from api</Button>
                {store.secretString && <p>{store.secretString}</p>}
                {store.unauthorizedError &&
                <Message negative>
                    <Message.Header>{store.unauthorizedError}</Message.Header>
                </Message>
                }
            </div>
        )
    }
}


export default observer(Home);
