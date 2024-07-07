/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Delete, Res, Query, UseGuards, Patch, Put, Post, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@ApiTags('users') // Étiquette le contrôleur pour la documentation Swagger
@ApiHeaders([
  { name: 'lang', description: 'language' } // Spécifie les en-têtes pour l'API
])

@Controller('api/') // Spécifie la route de base pour le contrôleur
export class UsersController {

  constructor(private readonly usersService: UsersService) { } // Injecte UsersService

  @Post('first-times') // Route pour créer un utilisateur pour la première fois
  async firstTimeCreate(@Body() body: any, @Res() res) {

    const data = await this.usersService.firstTimeCreate(body); // Appelle la méthode du service pour créer un utilisateur

    return res.status(HttpStatus.OK).json(data); // Retourne la réponse avec le statut 200 (OK)
  }

  @Get('first-display') // Route pour obtenir le premier modèle d'affichage
  async firstDisplayModel(@Res() res) {

    const data = await this.usersService.findAllFirstDispaly(); // Appelle la méthode du service pour obtenir toutes les données de premier affichage

    return res.status(HttpStatus.OK).json(data); // Retourne la réponse avec le statut 200 (OK)
  }

  @Get('first-times/:user') // Route pour obtenir un utilisateur spécifique pour la première fois par nom d'utilisateur
  async findOneFirstTime(@Param('user') user: string, @Res() res)  {

    const data = await this.usersService.findAllFirstTime(user); // Appelle la méthode du service pour obtenir les données de l'utilisateur
    return res.status(HttpStatus.OK).json(data); // Retourne la réponse avec le statut 200 (OK)
  }
  
  @UseGuards(JwtAuthGuard) // Utilise JwtAuthGuard pour protéger la route
  @ApiBearerAuth('accessToken') // Spécifie que cette route nécessite un jeton bearer pour l'authentification
  @Get('users') // Route pour obtenir tous les utilisateurs avec des filtres optionnels
  findAll(@Query() body: FilterUserDto, @Res() res) {

    return this.usersService.findAll(body, res); // Appelle la méthode du service pour obtenir tous les utilisateurs
  }

  @UseGuards(JwtAuthGuard) // Utilise JwtAuthGuard pour protéger la route
  @ApiBearerAuth('accessToken') // Spécifie que cette route nécessite un jeton bearer pour l'authentification
  @Get('users/:_id') // Route pour obtenir un utilisateur spécifique par ID
  findOne(@Param('_id') _id: string, @Res() res) {

    return this.usersService.findOne(_id, res); // Appelle la méthode du service pour obtenir les données de l'utilisateur
  }

  @UseGuards(JwtAuthGuard) // Utilise JwtAuthGuard pour protéger la route
  @ApiBearerAuth('accessToken') // Spécifie que cette route nécessite un jeton bearer pour l'authentification
  @Put('users/:_id') // Route pour mettre à jour un utilisateur spécifique par ID
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return this.usersService.update(_id, updateUserDto, res); // Appelle la méthode du service pour mettre à jour les données de l'utilisateur
  }

  @UseGuards(JwtAuthGuard) // Utilise JwtAuthGuard pour protéger la route
  @ApiBearerAuth('accessToken') // Spécifie que cette route nécessite un jeton bearer pour l'authentification
  @Delete('users/:_id') // Route pour supprimer un utilisateur spécifique par ID
  remove(@Param('_id') _id: string, @Res() res) {
    return this.usersService.remove(_id, res); // Appelle la méthode du service pour supprimer les données de l'utilisateur
  }
}