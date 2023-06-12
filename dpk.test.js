import { createHash, deterministicPartitionKey } from "./dpk";

describe("deterministicPartitionKey", () => {
  const MOCK_KEY =
    "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the candidate id with partition key provided", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: MOCK_KEY,
    });

    expect(trivialKey).toBe(MOCK_KEY);
  });

  it("Returns a new generated hash if the provided key is too long", () => {
    const event = {
      partitionKey: "N".repeat(256 + 1),
    };

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(createHash(event.partitionKey));
  });

  it("Returns a hash with the event as a string if event is provided, but does not have a partitionKey", () => {
    const event = {
      partitionKey: undefined,
      anotherProperty: true,
    };

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(createHash(JSON.stringify(event)));
  });

  it("Returns the partitionKey as a string if its type is not a string", () => {
    const event = {
      partitionKey: 1,
    };

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe("1");
  });
});
