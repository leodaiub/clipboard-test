const crypto = require("crypto");

export const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

export const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  const { partitionKey } = event || {};
  let candidate = partitionKey || TRIVIAL_PARTITION_KEY;

  if (!!event && !partitionKey) {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};