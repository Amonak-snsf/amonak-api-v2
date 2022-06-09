import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterComment } from './dto/filter-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, res: any): Promise<any>;
    findAll(params: FilterComment, res: any): Promise<any>;
    findOne(_id: string, res: any): Promise<any>;
    update(_id: string, updateCommentDto: UpdateCommentDto, res: any): Promise<any>;
    remove(_id: string, res: any): Promise<any>;
}
