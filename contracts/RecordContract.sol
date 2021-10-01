// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RecordContract {
    uint256 public recordsCounter = 0;

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

    function createTask(string memory _title, string memory _description)
        public
    {
        records[recordsCounter] = Record(
            recordsCounter,
            _title,
            _description,
            false,
            block.timestamp
        );
        recordsCounter++;
    }
}