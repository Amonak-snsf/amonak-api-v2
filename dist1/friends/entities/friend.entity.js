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
exports.FriendSchema = exports.Friend = void 0;
const mongoose = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const status_friend_dto = require("../dto/status-friend.dto");
const user_entity = require("../../users/entities/user.entity");
const default_model = require("../../utils/default-model");
let Friend = class Friend extends default_model.DefaultModel {
};
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Friend.prototype, "from", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity.User)
], Friend.prototype, "to", void 0);
__decorate([
    (0, mongoose.Prop)({ required: true, enum: status_friend_dto.Status }),
    __metadata("design:type", Number)
], Friend.prototype, "status", void 0);
Friend = __decorate([
    (0, mongoose.Schema)()
], Friend);
exports.Friend = Friend;
exports.FriendSchema = mongoose.SchemaFactory.createForClass(Friend);
//# sourceMappingURL=friend.entity.js.map