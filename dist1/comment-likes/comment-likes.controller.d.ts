import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
export declare class CommentLikesController {
    private readonly commentLikesService;
    constructor(commentLikesService: CommentLikesService);
    create(createCommentLikeDto: CreateCommentLikeDto, res: any): Promise<any>;
    findAll(params: UpdateCommentLikeDto, res: any): Promise<any>;
    findOne(comment: string, res: any): Promise<any>;
    update(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res: any): Promise<any>;
    remove(comment: string, updateCommentLikeDto: UpdateCommentLikeDto, res: any): Promise<any>;
}
