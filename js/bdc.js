class BdC {
    constructor() {
        this.data = []
    }

    async fetch(filename) {
        return fetch(filename)
            .then(response => response.text())
            .catch(error => {
                throw `BdC loading error: ${error}`
            })
            .then(response => {
                let BdC
                try {
                    BdC = jsyaml.safeLoad(response)
                } catch (error) {
                    throw `yaml to json error: ${error}`
                }
                this.data = BdC
            })
    }
}

export default BdC