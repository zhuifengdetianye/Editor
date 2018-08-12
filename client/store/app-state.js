import {
  observable,
  computed,
  action,
} from 'mobx'

export default class AppState {
  constructor({ count, name } = { count: 0, name: 'Jokcy' }) {
    this.count = count
    this.name = name
  }

  @observable count

  @observable name

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    this.name = name
  }

  // 我们在服务端渲染的时候，拿到异步的数据，并存放在一个对象当中，当客户端init的时候去把这个对象取出来
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}
