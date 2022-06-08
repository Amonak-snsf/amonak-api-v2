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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const status_friend_dto_1 = require("../dto/status-friend.dto");
const user_entity_1 = require("../../users/entities/user.entity");
const default_model_1 = require("../../utils/default-model");
let Friend = class Friend extends default_model_1.DefaultModel {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Friend.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_entity_1.User)
], Friend.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: status_friend_dto_1.Status }),
    __metadata("design:type", Number)
], Friend.prototype, "status", void 0);
Friend = __decorate([
    (0, mongoose_1.Schema)()
], Friend);
exports.Friend = Friend;
exports.FriendSchema = mongoose_1.SchemaFactory.createForClass(Friend);
//# sourceMappingURL=friend.entity.js.map