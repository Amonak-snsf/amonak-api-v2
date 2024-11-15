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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const query_1 = require("../utils/query");
const notification_entity_1 = require("./entities/notification.entity");
const notification_type_dto_1 = require("./dto/notification-type.dto");
let NotificationsService = class NotificationsService {
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async create(createNotificationDto) {
        const data = await (0, query_1.create)(this.notificationModel, createNotificationDto, 'from', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async findAll(params) {
        let filter = {};
        if (params) {
            filter = { from: { '$ne': params.user },
                '$or': [{ to: params.user }, { type: notification_type_dto_1.NotificationType.all }] };
            if (params.status) {
                filter['status'] = params.status;
            }
            if (params.readAt && params.readAt === 'false') {
                filter = Object.assign(Object.assign({}, filter), { readAt: { '$exists': false } });
            }
            delete filter['user'];
            delete filter['type'];
        }
        const data = await (0, query_1.all)(this.notificationModel, filter, null, { _id: -1 }, params.limit, 'from', (0, helpers_1.userDataPopulateWithTopten)());
        return data;
    }
    async findOne(from, params) {
        let query = { $or: [{ from: from }, { to: from }], params };
        const data = await (0, query_1.all)(this.notificationModel, query, null, { _id: -1 }, params.limit);
        return data;
    }
    async update(_id, updateNotificationDto) {
        let data;
        if (updateNotificationDto.readAt && updateNotificationDto.to && !updateNotificationDto._id) {
            data = await (0, query_1.all)(this.notificationModel, { to: updateNotificationDto.to });
            if (data) {
                for (let value of data) {
                    data = await (0, query_1.put)(this.notificationModel, { readAt: new Date() }, { _id: value._id });
                }
            }
        }
        else {
            data = await (0, query_1.put)(this.notificationModel, updateNotificationDto, { _id: _id }, 'from', (0, helpers_1.userDataPopulateWithComment)());
        }
        return data;
    }
    async remove(_id) {
        const data = await (0, query_1.destroy)(this.notificationModel, { _id: _id });
        return data;
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map