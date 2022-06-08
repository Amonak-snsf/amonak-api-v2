import { Controller, Post, Body, Res } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('friends')
@ApiHeader({
  name: 'lang',
  description: 'language',
})
@Controller('api/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('send')
  send(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.send(createFriendDto, res);
  }

  @Post('reject')
  reject(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.reject(createFriendDto, res);
  }

  @Post('accept')
  accept(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.accept(createFriendDto, res);
  }

  @Post('block')
  block(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.block(createFriendDto, res);
  }

}
