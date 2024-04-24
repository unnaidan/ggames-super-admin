export type ValidationError = {
    children: ValidationError[];
    constraints?: any;
    property: string;
    target: any;
    value?: any;
};

export type Pagination<T> = {
    nodes: T[];
};
