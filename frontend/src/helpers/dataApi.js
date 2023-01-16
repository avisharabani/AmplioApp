class DataApi {
    constructor(rawData) {
        this.rawData = rawData;
    }

    mapIntoObject = (arr) => {
        return arr.reduce((acc, current) => {
            acc[current.id] = current;
            return acc;
        }, {})
    }

    getQuestions() {
        return this.mapIntoObject(this.rawData.questions)
    }

    getChoices() {

    }
}

export default DataApi;