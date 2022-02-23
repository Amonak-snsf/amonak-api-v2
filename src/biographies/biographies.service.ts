import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { update_biography_body } from 'src/utils/helpers';
import { one, put } from 'src/utils/query';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { Biography, BiographyDocument } from './entities/biography.entity';

@Injectable()
export class BiographiesService {
  
  constructor(
  @InjectModel(Biography.name) private biographyModel: Model<BiographyDocument>
  ) {}
  
  async findOne(user_id: string, res) {

    const biography = await one(this.biographyModel, { user_id: user_id });

    return res.status(HttpStatus.OK).json(biography);
  }

  async update(user_id: string, upDto: UpdateBiographyDto, res) {

    const body = update_biography_body(upDto);

    const biography = await put(this.biographyModel, body, { user_id: user_id });

    return res.status(HttpStatus.OK).json(biography);
  }

  

}

