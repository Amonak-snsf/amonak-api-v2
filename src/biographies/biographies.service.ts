import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateBiographyBody } from 'src/utils/helpers';
import { one, put } from 'src/utils/query';
import { UpdateBiographyDto } from './dto/update-biography.dto';
import { Biography, BiographyDocument } from './entities/biography.entity';

@Injectable()
export class BiographiesService {
  
  constructor(
  @InjectModel(Biography.name) private biographyModel: Model<BiographyDocument>
  ) {}
  
  async findOne(user: string, res) {

    const biography = await one(this.biographyModel, { user: user });

    return res.status(HttpStatus.OK).json(biography);
  }

  async update(user: string, upDto: UpdateBiographyDto, res) {

    const body = updateBiographyBody(upDto);

    const biography = await put(this.biographyModel, body, { user: user });

    return res.status(HttpStatus.OK).json(biography);
  }

  

}

