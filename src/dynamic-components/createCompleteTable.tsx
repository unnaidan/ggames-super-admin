import { useQuery } from '@apollo/client';
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { SortOrder } from '@src/graphql-types/graphql';
import { flatten, get, isArray, mergeWith } from 'lodash';
import React, { Children, isValidElement, useEffect, useState } from 'react';

export type CompleteTableColumnProps<Row> = {
    label: string | React.ReactNode;
    dataIndex: string;
    align?: 'center' | 'start' | 'end';
    sorter?: boolean;
    render?: (row: Row) => React.ReactNode;
};

export type CompleteTableProps<Variables, Row> = {
    query: any;
    children: React.ReactElement<CompleteTableColumnProps<Row>> | Array<React.ReactElement<CompleteTableColumnProps<Row>> | React.ReactElement<CompleteTableColumnProps<Row>>[]>;
    nodesPath: string;
    uuid?: string;
    variables?: Variables;
    defaultSortBy?: string;
    defaultSortDirection?: SortOrder;
};

export function createCompleteTableColumn<Row>(): (props: CompleteTableColumnProps<Row>) => null {
    return (_: CompleteTableColumnProps<Row>) => {
        return null;
    };
}

export function createCompleteTable<Variables, Row>(): (props: CompleteTableProps<Variables, Row>) => JSX.Element | null {
    return (props: CompleteTableProps<Variables, Row>) => {
        const {
            defaultSortBy = 'createdAt',
            defaultSortDirection = SortOrder.Desc,
            uuid,
            query,
            children,
            nodesPath,
            variables
        } = props;

        const [
            perPage
        ] = useState(50);
        const [
            page,
            setPage
        ] = useState(1);
        const [
            sortBy,
            setSortBy
        ] = useState(defaultSortBy);
        const [
            sortDirection,
            setSortDirection
        ] = useState<SortOrder>(defaultSortDirection);
        const [
            columns,
            setColumns
        ] = useState<CompleteTableColumnProps<Row>[]>([]);

        useEffect(() => {
            setPage(1);
        }, [variables]);

        useEffect(() => {
            setColumns(convertChildrenToColumns());
        }, [children]);

        const orderBy = [{
            [sortBy]: sortDirection
        }];

        const customizer = (value: any, srcValue: any) => isArray(value) ? value.concat(srcValue) : undefined;

        const {
            data,
            refetch,
            loading
        } = useQuery(query, {
            notifyOnNetworkStatusChange: true,
            fetchPolicy: 'no-cache',
            variables: mergeWith({}, variables, {
                skip: perPage * page - perPage,
                take: perPage,
                orderBy
            }, customizer)
        });

        useEffect(() => {
            refetch();
        }, [uuid]);

        const convertChildrenToColumns = (): CompleteTableColumnProps<Row>[] => {
            return isValidElement(children) ? [children.props] : Children.map(flatten(children), element => element.props);
        };

        if (columns.length === 0) {
            return null;
        }

        const {
            nodes,
            count
        } = get(data, nodesPath, {
            nodes: [],
            count: 0
        });

        return (
            <div className="flex flex-col gap-y-4">
                <div className="overflow-x-auto">
                    <Table
                        aria-label="Data table"
                        classNames={{
                            td: 'whitespace-nowrap'
                        }}
                        sortDescriptor={{
                            column: sortBy,
                            direction: sortDirection === SortOrder.Asc
                                ? 'ascending'
                                : 'descending'
                        }}
                        onSortChange={({
                            column,
                            direction
                        }) => {
                            setSortBy(column as string);
                            setSortDirection(direction === 'ascending' ? SortOrder.Asc : SortOrder.Desc);
                        }}
                        removeWrapper
                    >
                        <TableHeader columns={columns}>
                            {({
                                dataIndex,
                                align,
                                sorter,
                                label
                            }) => (
                                <TableColumn
                                    key={dataIndex}
                                    align={align}
                                    allowsSorting={sorter}
                                    className="font-bold uppercase"
                                >
                                    {label}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            items={loading ? [] : nodes}
                            emptyContent={loading ? 'Ачааллаж байна...' : 'Илэрц олдсонгүй'}
                        >
                            {(row: any) => (
                                <TableRow key={row.id}>
                                    {columnKey => {
                                        const column = columns.find(({ dataIndex }) => dataIndex === columnKey);
                                        return (
                                            <TableCell>
                                                {column?.render ? column.render(row) : get(row, columnKey.toString())}
                                            </TableCell>
                                        );
                                    }}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex w-full justify-center">
                    {loading === false && count > 0 && (
                        <Pagination
                            color="secondary"
                            page={page}
                            total={Math.ceil(count / perPage)}
                            onChange={setPage}
                            showControls
                            showShadow
                            isCompact
                        />
                    )}
                </div>
            </div>
        );
    };
}
