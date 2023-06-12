import crypto from "crypto";

export type Event = {
  partitionKey?: crypto.BinaryLike;
};

type CreateHash = (data: crypto.BinaryLike) => string;

export default class DeterministicPartitionKey {
  static readonly TRIVIAL_PARTITION_KEY = "0";
  static readonly MAX_PARTITION_KEY_LENGTH = 256;
  candidate: crypto.BinaryLike | string;

  constructor(
    private readonly createHash: CreateHash,
    private readonly event?: Event
  ) {
    this.event = event;
    this.createHash = createHash;
    this.candidate =
      event?.partitionKey || DeterministicPartitionKey.TRIVIAL_PARTITION_KEY;
  }

  main() {
    this.resolveCandidateValue();

    return this.candidateToJson();
  }

  private candidateToJson() {
    return String(this.candidate);
  }

  private resolveCandidateValue() {
    if (this.event && !this.event.partitionKey) {
      const data = JSON.stringify(this.event);
      this.candidate = this.createHash(data);
    }

    if (this.isCandidateLengthInsideLimits()) {
      this.candidate = this.createHash(this.candidate);
    }
  }

  private isCandidateLengthInsideLimits() {
    return (
      String(this.candidate).length >
      DeterministicPartitionKey.MAX_PARTITION_KEY_LENGTH
    );
  }
}
