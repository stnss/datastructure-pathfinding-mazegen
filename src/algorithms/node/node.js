export default class Node {
    constructor(_x, _y, _isWalkable) {
        this.x = _x
        this.y = _y
        this.isWalkable = _isWalkable
        this.isWall = !_isWalkable
        this.isPath = false
        this.isVisited = false
        this.isDiscovered = false
    }


}