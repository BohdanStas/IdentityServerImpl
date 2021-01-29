import {createContext} from "react";
import {action, computed, makeObservable, observable} from "mobx";
import {User, UserManager} from "oidc-client";
import agent, {userManager} from "../api/agent";



class Store {

    user: User | null = null;

    secretString: null | string = null;

    isOpen: boolean = true;

    appLoaded: boolean = true;

    unauthorizedError:string|null = null;

    constructor() {
        makeObservable(this, {
            unauthorizedError: observable,
            appLoaded: observable,
            user: observable,
            isOpen: observable,
            secretString: observable,
            login: action,
            completeLogin: action,
            getSecretString: action,
            loadUser: action,
            logout: action,
            completeLogout: action,
            isLoggedIn: computed,
            toggle: action
        })
    }

    toggle = () => {
        this.isOpen = !this.isOpen
    }

    get isLoggedIn() {
        return this.user != null && this.user.access_token && !this.user.expired;
    }

    loadUser = async () => {
        try {
            this.user = await userManager.getUser()
        } catch (error) {
            console.log(error);
        }
    }

    login = async () => {
        this.appLoaded = false;
        await userManager.signinRedirect()
            .catch((error) => {
                console.log(error)
            });
        this.appLoaded = true
    }

    completeLogin = async () => {
        try {
            this.user = await userManager.signinCallback()
        } catch (error) {
            console.log(error)
        }
    }

    getSecretString = async () => {
        this.appLoaded = false;
        try {
            this.secretString = await agent.authRequest.getSecret();
        } catch (error) {
            this.unauthorizedError='Unauthorized, try to log in';
        }
        this.appLoaded = true;
    }

    logout = async () => {
        this.appLoaded = false;
        console.log(this.appLoaded);
        await userManager.signoutRedirect().catch((error) => {
            console.log(error)
        })
        this.appLoaded = true;
        console.log(this.appLoaded);
    }

    completeLogout = async () => {
        try {
            await userManager.signinCallback();
            await userManager.removeUser();
            this.user = null;
        } catch (error) {
            console.log(error);
        }
    }

}

export default createContext(new Store())