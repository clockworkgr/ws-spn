/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "";

export interface MsgData {
  msgType: string;
  data: Chain | undefined;
}

export interface Chain {
  chainID: string;
  creator: string;
  peers: string[];
  sourceURL: string;
  sourceHash: string;
  createdAt: number;
  genesis: Uint8Array;
}

const baseMsgData: object = { msgType: "" };

export const MsgData = {
  encode(message: MsgData, writer: Writer = Writer.create()): Writer {
    if (message.msgType !== "") {
      writer.uint32(10).string(message.msgType);
    }
    if (message.data !== undefined) {
      Chain.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgData } as MsgData;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msgType = reader.string();
          break;
        case 2:
          message.data = Chain.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgData {
    const message = { ...baseMsgData } as MsgData;
    if (object.msgType !== undefined && object.msgType !== null) {
      message.msgType = String(object.msgType);
    } else {
      message.msgType = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Chain.fromJSON(object.data);
    } else {
      message.data = undefined;
    }
    return message;
  },

  toJSON(message: MsgData): unknown {
    const obj: any = {};
    message.msgType !== undefined && (obj.msgType = message.msgType);
    message.data !== undefined &&
      (obj.data = message.data ? Chain.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgData>): MsgData {
    const message = { ...baseMsgData } as MsgData;
    if (object.msgType !== undefined && object.msgType !== null) {
      message.msgType = object.msgType;
    } else {
      message.msgType = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Chain.fromPartial(object.data);
    } else {
      message.data = undefined;
    }
    return message;
  },
};

const baseChain: object = {
  chainID: "",
  creator: "",
  peers: "",
  sourceURL: "",
  sourceHash: "",
  createdAt: 0,
};

export const Chain = {
  encode(message: Chain, writer: Writer = Writer.create()): Writer {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    for (const v of message.peers) {
      writer.uint32(26).string(v!);
    }
    if (message.sourceURL !== "") {
      writer.uint32(34).string(message.sourceURL);
    }
    if (message.sourceHash !== "") {
      writer.uint32(42).string(message.sourceHash);
    }
    if (message.createdAt !== 0) {
      writer.uint32(48).int64(message.createdAt);
    }
    if (message.genesis.length !== 0) {
      writer.uint32(58).bytes(message.genesis);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Chain {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChain } as Chain;
    message.peers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.peers.push(reader.string());
          break;
        case 4:
          message.sourceURL = reader.string();
          break;
        case 5:
          message.sourceHash = reader.string();
          break;
        case 6:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.genesis = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Chain {
    const message = { ...baseChain } as Chain;
    message.peers = [];
    if (object.chainID !== undefined && object.chainID !== null) {
      message.chainID = String(object.chainID);
    } else {
      message.chainID = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.peers !== undefined && object.peers !== null) {
      for (const e of object.peers) {
        message.peers.push(String(e));
      }
    }
    if (object.sourceURL !== undefined && object.sourceURL !== null) {
      message.sourceURL = String(object.sourceURL);
    } else {
      message.sourceURL = "";
    }
    if (object.sourceHash !== undefined && object.sourceHash !== null) {
      message.sourceHash = String(object.sourceHash);
    } else {
      message.sourceHash = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    if (object.genesis !== undefined && object.genesis !== null) {
      message.genesis = bytesFromBase64(object.genesis);
    }
    return message;
  },

  toJSON(message: Chain): unknown {
    const obj: any = {};
    message.chainID !== undefined && (obj.chainID = message.chainID);
    message.creator !== undefined && (obj.creator = message.creator);
    if (message.peers) {
      obj.peers = message.peers.map((e) => e);
    } else {
      obj.peers = [];
    }
    message.sourceURL !== undefined && (obj.sourceURL = message.sourceURL);
    message.sourceHash !== undefined && (obj.sourceHash = message.sourceHash);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.genesis !== undefined &&
      (obj.genesis = base64FromBytes(
        message.genesis !== undefined ? message.genesis : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<Chain>): Chain {
    const message = { ...baseChain } as Chain;
    message.peers = [];
    if (object.chainID !== undefined && object.chainID !== null) {
      message.chainID = object.chainID;
    } else {
      message.chainID = "";
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.peers !== undefined && object.peers !== null) {
      for (const e of object.peers) {
        message.peers.push(e);
      }
    }
    if (object.sourceURL !== undefined && object.sourceURL !== null) {
      message.sourceURL = object.sourceURL;
    } else {
      message.sourceURL = "";
    }
    if (object.sourceHash !== undefined && object.sourceHash !== null) {
      message.sourceHash = object.sourceHash;
    } else {
      message.sourceHash = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = 0;
    }
    if (object.genesis !== undefined && object.genesis !== null) {
      message.genesis = object.genesis;
    } else {
      message.genesis = new Uint8Array();
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
