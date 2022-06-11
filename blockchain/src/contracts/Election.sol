pragma solidity >=0.4.20;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        string details;
        string election_id;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint256 public candidatesCount;

    string public candidate;

    constructor() public {}

    event votedEvent(uint256 indexed _candidateId);

    function addCandidate(
        string memory _name,
        string memory _details,
        string memory _election_id
    ) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(
            candidatesCount,
            _name,
            0,
            _details,
            _election_id
        );
    }

    function vote(uint256 _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}
