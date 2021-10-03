const RecordsContract = artifacts.require("RecordContract");

contract("RecordsContract", (accounts) => {
    before(async () => {
        this.recordsContract = await RecordsContract.deployed(); //'this' allows the variable 'recordContract' to be accessible
    });

    it("migrate deployed successfully", async () => {
        const address = await this.recordsContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it("get Records List", async () => {
        const recordsCounter = await this.recordsContract.recordsCounter();
        const record = await this.recordsContract.records(recordsCounter);

        assert.equal(record.id.toNumber(), recordsCounter.toNumber());
        assert.equal(record.title, "my first record");
        assert.equal(record.description, "my first description");
        assert.equal(record.done, false);
        assert.equal(recordsCounter, 1);
    });

    it("record created successfully", async () => {
        const result = await this.recordsContract.createRecord("some record two", "description two");
        const recordEvent = result.logs[0].args;
        const recordsCounter = await this.recordsContract.recordsCounter();

        assert.equal(recordsCounter, 2);
        assert.equal(recordEvent.id.toNumber(), 2);
        assert.equal(recordEvent.title, "some record two");
        assert.equal(recordEvent.description, "description two");
        assert.equal(recordEvent.done, false);
    });

    it("record toggled done", async () => {
        const result = await this.recordsContract.toggleDone(1);
        const recordEvent = result.logs[0].args;
        const record = await this.recordsContract.records(1);

        assert.equal(record.done, true);
        assert.equal(recordEvent.id.toNumber(), 1);
        assert.equal(recordEvent.done, true);
    });
});