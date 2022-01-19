import { makeAutoObservable } from "mobx"

class ProfileViewModel {

    constructor() {
        makeAutoObservable(this)
    }

    

}

export default ProfileViewModel