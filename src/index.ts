import DeterministicPartitionKey from "./dpk.js";
import crypto from "crypto";

export const createHash = (data: crypto.BinaryLike) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

console.info(new DeterministicPartitionKey(createHash).main());
