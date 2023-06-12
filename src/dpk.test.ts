import DeterministicPartitionKey from "./dpk";

describe("deterministicPartitionKey", () => {
  const MOCK_KEY =
    "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";

  const createHashMock = jest.fn().mockReturnValue(MOCK_KEY);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = new DeterministicPartitionKey(createHashMock).main();

    expect(createHashMock).toHaveBeenCalledTimes(0);

    expect(trivialKey).toBe(DeterministicPartitionKey.TRIVIAL_PARTITION_KEY);
  });

  it("Returns the candidate id with partition key provided", () => {
    const trivialKey = new DeterministicPartitionKey(createHashMock, {
      partitionKey: MOCK_KEY,
    }).main();

    expect(createHashMock).toHaveBeenCalledTimes(0);

    expect(trivialKey).toBe(MOCK_KEY);
  });

  it("Returns a new generated hash if the provided key is too long", () => {
    const event = {
      partitionKey: "N".repeat(
        DeterministicPartitionKey.MAX_PARTITION_KEY_LENGTH + 1
      ),
    };

    const trivialKey = new DeterministicPartitionKey(
      createHashMock,
      event
    ).main();

    expect(createHashMock).toHaveBeenCalledWith(event.partitionKey);
    expect(createHashMock).toHaveBeenCalledTimes(1);

    expect(trivialKey).toBe(MOCK_KEY);
  });

  it("Returns a JSON string if event is provided, but does not have a partitionKey", () => {
    const event = { anotherProperty: "", partitionKey: undefined };
    const JsonStringfiedEvent = JSON.stringify(event);

    const trivialKey = new DeterministicPartitionKey(
      createHashMock,
      event
    ).main();

    expect(createHashMock).toHaveBeenCalledWith(JsonStringfiedEvent);
    expect(createHashMock).toHaveBeenCalledTimes(1);

    expect(trivialKey).toBe(MOCK_KEY);
  });

  it("Returns a string if createHash returns a non string", () => {
    const event = { anotherProperty: "", partitionKey: undefined };
    const numberValue = 1;

    createHashMock.mockReturnValueOnce(numberValue);

    const trivialKey = new DeterministicPartitionKey(
      createHashMock,
      event
    ).main();

    expect(createHashMock).toHaveBeenCalledTimes(1);
    expect(trivialKey).toBe(String(numberValue));
  });

  it("Returns a new generated hash if the provided key inside limits(256)", () => {
    const event = {
      partitionKey: "N".repeat(
        DeterministicPartitionKey.MAX_PARTITION_KEY_LENGTH + 1
      ),
    };

    const trivialKey = new DeterministicPartitionKey(createHashMock, event);

    jest
      .spyOn(
        DeterministicPartitionKey.prototype as any,
        "isCandidateLengthInsideLimits"
      )
      .mockResolvedValue(true);

    expect(trivialKey.main()).toBe(MOCK_KEY);
    expect(createHashMock).toHaveBeenCalledWith(event.partitionKey);
    expect(createHashMock).toHaveBeenCalledTimes(1);
  });
});
