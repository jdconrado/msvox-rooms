"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSessionEventsCd = void 0;
var RoomSessionEventsCd;
(function (RoomSessionEventsCd) {
    RoomSessionEventsCd["SESSION_CLOSED"] = "room-session.closed";
    RoomSessionEventsCd["ROOM_CLOSED"] = "room-session.room.closed";
    RoomSessionEventsCd["PARTICIPANT_STATUS_CHANGED"] = "room-session.participant.status.changed";
    RoomSessionEventsCd["PRODUCER_ACTION"] = "room-session.producer.action.executed";
    RoomSessionEventsCd["CONSUMER_ACTION"] = "room-session.consumer.action.executed";
    RoomSessionEventsCd["TRANSPORT_ACTION"] = "room-session.transport.action.executed";
})(RoomSessionEventsCd || (exports.RoomSessionEventsCd = RoomSessionEventsCd = {}));
