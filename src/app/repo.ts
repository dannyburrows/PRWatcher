import { PullRequest } from './pull-request';

export interface Repo {
    URL: string;
    Html: string;
    Name: string;
    PRs: PullRequest[];
}
