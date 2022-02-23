import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FilterComment } from './dto/filter-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, files: any, res: any): Promise<any>;
    findAll(params: FilterComment, res: any): Promise<any>;
    findOne(id: string, res: any): Promise<any>;
    update(id: string, updateCommentDto: UpdateCommentDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
