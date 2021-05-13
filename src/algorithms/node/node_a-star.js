import Node from './node'

export default class NodeAStar extends Node {
    constructor(_x, _y, _isWalkable) {
        super(_x, _y, _isWalkable)
    }

    data = {
        gCost: 0,
        hCost: 0,
        parent: null
    }

    fCost = () => this.data.gCost + this.data.hCost
}