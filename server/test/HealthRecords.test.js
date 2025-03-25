const HealthRecords = artifacts.require("HealthRecords");

contract("HealthRecords", accounts => {
    it("should create a health record", async () => {
        const instance = await HealthRecords.deployed();
        const result = await instance.createRecord("John Doe", 30, "Flu", { from: accounts[0] });
        assert.equal(result.logs[0].event, "RecordCreated");
    });

    it("should retrieve a health record", async () => {
        const instance = await HealthRecords.deployed();
        const record = await instance.getRecord(1);
        assert.equal(record.name, "John Doe");
        assert.equal(record.age.toNumber(), 30);
        assert.equal(record.condition, "Flu");
    });
});