import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { customFiles, userDataPopulateWithTopten } from 'src/utils/helpers';
import { all, create, destroy, one, put } from 'src/utils/query';
import { CreateToptenDto } from './dto/create-topten.dto';
import { UpdateToptenDto } from './dto/update-topten.dto';
import { Topten, ToptenDocument } from './entities/topten.entity';

@Injectable()
export class ToptensService {
  private data;

  constructor(@InjectModel(Topten.name) private toptenModel: Model<ToptenDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
  private configService: ConfigService, private mailService: MailService,
  ) {}

  async create(cTdo: CreateToptenDto, files, res) {
    this.data = cTdo;

    const custom_files = customFiles(files);
    if(custom_files){
      this.data.files = custom_files;
    }

    let d = new Date();
    this.data.end_at = d.setDate(d.getDate() + (parseInt(cTdo.duration, 10) * 7));

    const data = await create(this.toptenModel, this.data, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);

  }

  async findAll(body, res) {

    const data = await all(this.toptenModel, body, null, { createdAt: -1 }, body.limit, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async findOne(_id: string, res) {

    const data = await one(this.toptenModel, {_id: _id}, null, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async update(_id: string, updateToptenDto: UpdateToptenDto, res) {

    const data = await put(this.toptenModel, updateToptenDto, {_id: _id}, 'user', userDataPopulateWithTopten());

    return res.status(HttpStatus.OK).json(data);
  }

  async remove(_id: string, res) {
    
    const data = await destroy(this.toptenModel, {_id: _id});

    return res.status(HttpStatus.OK).json(data);
  }
}
