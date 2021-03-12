"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Chain = exports.MsgData = exports.protobufPackage = void 0;
/* eslint-disable */
var Long = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "";
var baseMsgData = { msgType: "" };
exports.MsgData = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.msgType !== "") {
            writer.uint32(10).string(message.msgType);
        }
        if (message.data !== undefined) {
            exports.Chain.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMsgData);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgType = reader.string();
                    break;
                case 2:
                    message.data = exports.Chain.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMsgData);
        if (object.msgType !== undefined && object.msgType !== null) {
            message.msgType = String(object.msgType);
        }
        else {
            message.msgType = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = exports.Chain.fromJSON(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.msgType !== undefined && (obj.msgType = message.msgType);
        message.data !== undefined &&
            (obj.data = message.data ? exports.Chain.toJSON(message.data) : undefined);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMsgData);
        if (object.msgType !== undefined && object.msgType !== null) {
            message.msgType = object.msgType;
        }
        else {
            message.msgType = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = exports.Chain.fromPartial(object.data);
        }
        else {
            message.data = undefined;
        }
        return message;
    }
};
var baseChain = {
    chainID: "",
    creator: "",
    peers: "",
    sourceURL: "",
    sourceHash: "",
    createdAt: 0
};
exports.Chain = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.chainID !== "") {
            writer.uint32(10).string(message.chainID);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        for (var _i = 0, _a = message.peers; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(26).string(v);
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
    decode: function (input, length) {
        var reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseChain);
        message.peers = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
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
                    message.createdAt = longToNumber(reader.int64());
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
    fromJSON: function (object) {
        var message = __assign({}, baseChain);
        message.peers = [];
        if (object.chainID !== undefined && object.chainID !== null) {
            message.chainID = String(object.chainID);
        }
        else {
            message.chainID = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.peers !== undefined && object.peers !== null) {
            for (var _i = 0, _a = object.peers; _i < _a.length; _i++) {
                var e = _a[_i];
                message.peers.push(String(e));
            }
        }
        if (object.sourceURL !== undefined && object.sourceURL !== null) {
            message.sourceURL = String(object.sourceURL);
        }
        else {
            message.sourceURL = "";
        }
        if (object.sourceHash !== undefined && object.sourceHash !== null) {
            message.sourceHash = String(object.sourceHash);
        }
        else {
            message.sourceHash = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = Number(object.createdAt);
        }
        else {
            message.createdAt = 0;
        }
        if (object.genesis !== undefined && object.genesis !== null) {
            message.genesis = bytesFromBase64(object.genesis);
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.chainID !== undefined && (obj.chainID = message.chainID);
        message.creator !== undefined && (obj.creator = message.creator);
        if (message.peers) {
            obj.peers = message.peers.map(function (e) { return e; });
        }
        else {
            obj.peers = [];
        }
        message.sourceURL !== undefined && (obj.sourceURL = message.sourceURL);
        message.sourceHash !== undefined && (obj.sourceHash = message.sourceHash);
        message.createdAt !== undefined && (obj.createdAt = message.createdAt);
        message.genesis !== undefined &&
            (obj.genesis = base64FromBytes(message.genesis !== undefined ? message.genesis : new Uint8Array()));
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseChain);
        message.peers = [];
        if (object.chainID !== undefined && object.chainID !== null) {
            message.chainID = object.chainID;
        }
        else {
            message.chainID = "";
        }
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.peers !== undefined && object.peers !== null) {
            for (var _i = 0, _a = object.peers; _i < _a.length; _i++) {
                var e = _a[_i];
                message.peers.push(e);
            }
        }
        if (object.sourceURL !== undefined && object.sourceURL !== null) {
            message.sourceURL = object.sourceURL;
        }
        else {
            message.sourceURL = "";
        }
        if (object.sourceHash !== undefined && object.sourceHash !== null) {
            message.sourceHash = object.sourceHash;
        }
        else {
            message.sourceHash = "";
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = object.createdAt;
        }
        else {
            message.createdAt = 0;
        }
        if (object.genesis !== undefined && object.genesis !== null) {
            message.genesis = object.genesis;
        }
        else {
            message.genesis = new Uint8Array();
        }
        return message;
    }
};
var globalThis = (function () {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
var atob = globalThis.atob ||
    (function (b64) { return globalThis.Buffer.from(b64, "base64").toString("binary"); });
function bytesFromBase64(b64) {
    var bin = atob(b64);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
var btoa = globalThis.btoa ||
    (function (bin) { return globalThis.Buffer.from(bin, "binary").toString("base64"); });
function base64FromBytes(arr) {
    var bin = [];
    for (var i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    minimal_1.configure();
}
