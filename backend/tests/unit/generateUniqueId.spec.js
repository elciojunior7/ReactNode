const generateUniqueId = require("../../src/util/generateUniqueId");

describe("Generate Unique ID", () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8); //testar se tamanho do id gerado é 8
    })
})