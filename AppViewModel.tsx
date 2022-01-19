import { action, makeAutoObservable, observable } from "mobx"

class AppViewModel {
    constructor() {
        makeAutoObservable(this)
    }
    
}

export default AppViewModel