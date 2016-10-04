import { User } from './user.model';
import { Invitation } from './invitation.model';
import { Project } from './project.model';

export class Team {
    _id: string;
    title: string;
    isOwner: boolean;
    users: User[] = [];
    invitations: Invitation[] = [];
    projects: Project[] = [];
}