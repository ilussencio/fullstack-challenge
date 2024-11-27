import Location from './location'
class Step {
    startLocation: Location
    endLocation: Location
    instructions: string

    constructor(startLocation: Location, endLocation: Location, instructions: string) {
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.instructions = instructions
    }
}

export default Step