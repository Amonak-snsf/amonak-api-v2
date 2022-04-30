"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.Message = void 0;
const mongoose = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const notification_entity = require("../../notifications/entities/notification.entity");
let Message = class Message extends notification_entity.Notification {
};
__decorate([
    (0, mongoose.Prop)((0, mongoose.raw)({
        url: { required: false, trim: true, type: String, select: true },
        type: { required: false, trim: true, type: String, select: true }
    })),
    __metadata("design:type", Array)
], Message.prototype, "files", void 0);
__decorate([
    (0, mongoose.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Message.prototype, "deleters", void 0);
Message = __decorate([
    (0, mongoose.Schema)()
], Message);
exports.Message = Message;
exports.MessageSchema = mongoose.SchemaFactory.createForClass(Message);
//# sourceMappingURL=message.entity.js.map