import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Chip, Input, User } from '@nextui-org/react';
import { createCompleteTable, createCompleteTableColumn } from '@src/dynamic-components/createCompleteTable';
import { createUseState } from '@src/dynamic-components/createUseState';
import { OrdersQuery } from '@src/graphql-types/graphql';
import { ORDERS } from '@src/graphql/queries/orders';
import { absolutePath } from '@src/lib/utils';
import { default as dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';

const CompleteTable = createCompleteTable<{ search?: string; }, OrdersQuery['orders']['nodes'][number]>();
const CompleteTableColumn = createCompleteTableColumn<OrdersQuery['orders']['nodes'][number]>();
const UseState = createUseState<string>();

export const Orders = (): JSX.Element => {
    return (
        <Fragment>
            <Helmet>
                <title>
                    Борлуулалтын захиалга - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        Борлуулалтын захиалга
                    </h1>
                    <UseState defaultValue={uuidv4()}>
                        {(uuid, setUuid) => (
                            <UseState defaultValue="">
                                {(search, setSearch) => (
                                    <div className="p-4 mt-5 rounded-xl bg-white">
                                        <div className="flex items-center justify-between gap-x-2">
                                            <div className="flex-1">
                                                <Input
                                                    labelPlacement="outside"
                                                    className="max-w-sm"
                                                    variant="bordered"
                                                    type="text"
                                                    isClearable
                                                    classNames={{
                                                        inputWrapper: 'border'
                                                    }}
                                                    onValueChange={debounce(value => {
                                                        setSearch(value);
                                                    }, 500)}
                                                    startContent={
                                                        <MagnifyingGlassIcon className="h-6 w-6 text-foreground-300 pointer-events-none flex-shrink-0" />
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <CompleteTable
                                                uuid={uuid}
                                                query={ORDERS}
                                                nodesPath="orders"
                                                variables={{
                                                    search
                                                }}
                                            >
                                                <CompleteTableColumn
                                                    dataIndex="user.name"
                                                    label="Хэрэглэгч"
                                                    sorter
                                                    render={({
                                                        user: {
                                                            name,
                                                            surname,
                                                            profileImage,
                                                            phone
                                                        }
                                                    }) => (
                                                        <div className="flex">
                                                            <User
                                                                name={`${surname.charAt(0)}.${name}`}
                                                                description={phone}
                                                                avatarProps={{
                                                                    className: 'text-foreground-500',
                                                                    radius: 'md',
                                                                    src: profileImage ? absolutePath(profileImage, '100x100') : undefined,
                                                                    name: name.charAt(0)
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="pack.name"
                                                    label="Energy pack"
                                                    sorter
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="amount"
                                                    label="Нийт дүн"
                                                    sorter
                                                    render={({ amount }) => (
                                                        <NumericFormat
                                                            value={amount}
                                                            suffix="₮"
                                                            displayType="text"
                                                            thousandSeparator=","
                                                        />
                                                    )}
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="status"
                                                    label="Төлөв"
                                                    sorter
                                                    render={({ status }) => (
                                                        <Chip color={status === 'confirmed' ? 'success' : 'danger'}>
                                                            {status === 'confirmed' ? 'Төлсөн' : 'Төлөөгүй'}
                                                        </Chip>
                                                    )}
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="createdAt"
                                                    label="Огноо"
                                                    sorter
                                                    render={({ createdAt }) => (
                                                        <span>
                                                            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </span>
                                                    )}
                                                />
                                            </CompleteTable>
                                        </div>
                                    </div>
                                )}
                            </UseState>
                        )}
                    </UseState>
                </div>
            </div>
        </Fragment>
    );
};
