import { action, makeAutoObservable, observable } from "mobx"

class HomeViewModel {

    constructor() {
        makeAutoObservable(this)
    }
    @observable public posts: Array<any> = []

    @action addToPosts = (arr: any[]): void => {
        this.posts.push(arr)
    }
}

export default HomeViewModel