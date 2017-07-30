import { StepFull } from './SpetFull';
import { ContentFull } from './ContentFull';
import { CommentFull } from './CommentFull';
import { Instruction } from '../Instruction'

export class InstructionFull {
    public tags: string[];
    public steps: StepFull[];
    public comments: CommentFull;
    public instruction: Instruction;
}