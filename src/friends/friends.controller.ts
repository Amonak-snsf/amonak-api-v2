import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
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

  // Route pour envoyer une demande d'ami
  @Post('send')
  send(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.send(createFriendDto, res);
  }
 // Route pour rejeter une demande d'ami
  @Post('reject')
  reject(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.reject(createFriendDto, res);
  }
  // Route pour accepter une demande d'ami
  @Post('accept')
  accept(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.accept(createFriendDto, res);
  }
  // Route pour bloquer un utilisateur
  @Post('block')
  block(@Body() createFriendDto: CreateFriendDto, @Res() res) {
    return this.friendsService.block(createFriendDto, res);
  }
}
