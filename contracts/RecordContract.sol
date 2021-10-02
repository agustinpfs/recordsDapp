// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract RecordContract {
    uint256 public recordsCounter = 0;

    constructor() {
        createRecord("my first task", "my first description");
    }

    struct Record {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    // event RecordCreated(
    //     uint256 id,
    //     string title,
    //     string description,
    //     bool done,
    //     uint256 createdAt
    // );
    // event RecordToggledDone(uint256 id, bool done);

    mapping(uint256 => Record) public records;

    function createRecord(string memory _title, string memory _description)
        public
    {
        recordsCounter++;
        records[recordsCounter] = Record(
            recordsCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
    }

    function toggleDone(uint256 _id) public {
        Record memory _record = records[_id];
        _record.done = !_record.done;
        records[_id] = _record;
    }
}
