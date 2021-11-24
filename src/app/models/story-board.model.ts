export class StoryBoardDto {
    id!: string;
    key!: string;
    issuetypename!: string;
    startdate!: Date;
    duedate!: Date;
    timeestimate!: number;
    labels!: string[];
    summary!: string;
    description!: string;
}

export class ChartDto {
    x!: string;
    y!: Date[];
    fillColor!: string;
}

/* export class StoryBoardDto {
    expand!: string;
    startAt!: number;
    maxResults!: number;
    total!: number;
    issues!: IssuesDto[];
} */

/* export class IssuesDto {
    expand!: string;
    id!: string;
    self!: string;
    key!: string;
    fields!: FieldsDto;
} */

/* export class FieldsDto {
    duedate!: string;
    timeestimate: number | undefined;
    timeoriginalestimate: number | undefined;
    aggregatetimeoriginalestimate: number | undefined;
    labels!: string[];
    summary!: string;
    description!: string;
} */