import { Mutation } from '@apollo/client/react/components';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button, Input } from '@nextui-org/react';
import { PopoverConfirm } from '@src/components/common/PopoverConfirm';
import { createCompleteTable, createCompleteTableColumn } from '@src/dynamic-components/createCompleteTable';
import { createUseState } from '@src/dynamic-components/createUseState';
import { PackForm } from '@src/forms/Pack';
import { CreatePackMutation, CreatePackMutationVariables, DeletePackMutation, DeletePackMutationVariables, PacksQuery, UpdatePackMutation, UpdatePackMutationVariables } from '@src/graphql-types/graphql';
import { CREATE_PACK } from '@src/graphql/mutations/create-pack';
import { DELETE_PACK } from '@src/graphql/mutations/delete-pack';
import { UPDATE_PACK } from '@src/graphql/mutations/update-pack';
import { PACKS } from '@src/graphql/queries/packs';
import { parseErrors } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { default as dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';

const CompleteTable = createCompleteTable<{ search?: string; }, PacksQuery['packs']['nodes'][number]>();
const CompleteTableColumn = createCompleteTableColumn<PacksQuery['packs']['nodes'][number]>();
const UseState = createUseState<string>();
const UseStateBoolean = createUseState<boolean>();
const UseStateValidationErrors = createUseState<ValidationError[]>();

export const Packs = (): JSX.Element => {
    return (
        <Fragment>
            <Helmet>
                <title>
                    Energy pack - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        Energy pack
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
                                            <UseStateBoolean defaultValue={false}>
                                                {(open, setOpen) => (
                                                    <UseStateValidationErrors defaultValue={[]}>
                                                        {(errors, setErrors) => (
                                                            <Fragment>
                                                                <Button
                                                                    color="primary"
                                                                    onPress={() => {
                                                                        setErrors([]);
                                                                        setOpen(true);
                                                                    }}
                                                                >
                                                                    Шинээр нэмэх
                                                                </Button>
                                                                <Mutation<CreatePackMutation, CreatePackMutationVariables>
                                                                    mutation={CREATE_PACK}
                                                                    onError={err => {
                                                                        if (err.message === 'Bad Request Exception') {
                                                                            setErrors(parseErrors(err));
                                                                        }
                                                                    }}
                                                                    onCompleted={({ createPack }) => {
                                                                        setOpen(false);
                                                                        setUuid(uuidv4());
                                                                    }}
                                                                >
                                                                    {(mutate, { loading }) => (
                                                                        <PackForm
                                                                            open={open}
                                                                            errors={errors}
                                                                            loading={loading}
                                                                            onClose={() => {
                                                                                setOpen(false);
                                                                            }}
                                                                            initialValues={{
                                                                                name: '',
                                                                                order: null,
                                                                                price: null,
                                                                                energy: null,
                                                                                active: true
                                                                            }}
                                                                            onSubmit={variables => {
                                                                                setErrors([]);
                                                                                mutate({
                                                                                    variables
                                                                                });
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Mutation>
                                                            </Fragment>
                                                        )}
                                                    </UseStateValidationErrors>
                                                )}
                                            </UseStateBoolean>
                                        </div>
                                        <div className="mt-4">
                                            <CompleteTable
                                                uuid={uuid}
                                                query={PACKS}
                                                nodesPath="packs"
                                                variables={{
                                                    search
                                                }}
                                            >
                                                <CompleteTableColumn
                                                    dataIndex="name"
                                                    label="Нэр"
                                                    sorter
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="price"
                                                    label="Үнэ"
                                                    sorter
                                                    render={({ price }) => (
                                                        <NumericFormat
                                                            value={price}
                                                            suffix="₮"
                                                            displayType="text"
                                                            thousandSeparator=","
                                                        />
                                                    )}
                                                />
                                                <CompleteTableColumn
                                                    dataIndex="energy"
                                                    label="Энержи"
                                                    sorter
                                                    render={({ energy }) => (
                                                        <NumericFormat
                                                            value={energy}
                                                            displayType="text"
                                                            thousandSeparator=","
                                                        />
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
                                                <CompleteTableColumn
                                                    dataIndex="actions"
                                                    label=""
                                                    render={({
                                                        id,
                                                        name,
                                                        order,
                                                        price,
                                                        energy,
                                                        active
                                                    }) => (
                                                        <div className="flex items-center justify-end gap-x-1">
                                                            <UseStateBoolean defaultValue={false}>
                                                                {(open, setOpen) => (
                                                                    <UseStateValidationErrors defaultValue={[]}>
                                                                        {(errors, setErrors) => (
                                                                            <Fragment>
                                                                                <Button
                                                                                    size="sm"
                                                                                    color="default"
                                                                                    isIconOnly
                                                                                    onPress={() => {
                                                                                        setErrors([]);
                                                                                        setOpen(true);
                                                                                    }}
                                                                                >
                                                                                    <PencilIcon className="w-4 h-4 text-foreground-500" />
                                                                                </Button>
                                                                                <Mutation<UpdatePackMutation, UpdatePackMutationVariables>
                                                                                    mutation={UPDATE_PACK}
                                                                                    onError={err => {
                                                                                        if (err.message === 'Bad Request Exception') {
                                                                                            setErrors(parseErrors(err));
                                                                                        }
                                                                                    }}
                                                                                    onCompleted={({ updatePack }) => {
                                                                                        setOpen(false);
                                                                                        setUuid(uuidv4());
                                                                                    }}
                                                                                >
                                                                                    {(mutate, { loading }) => (
                                                                                        <PackForm
                                                                                            open={open}
                                                                                            errors={errors}
                                                                                            loading={loading}
                                                                                            onClose={() => {
                                                                                                setOpen(false);
                                                                                            }}
                                                                                            initialValues={{
                                                                                                name,
                                                                                                order,
                                                                                                price,
                                                                                                energy,
                                                                                                active
                                                                                            }}
                                                                                            onSubmit={values => {
                                                                                                setErrors([]);
                                                                                                mutate({
                                                                                                    variables: Object.assign({}, values, {
                                                                                                        id
                                                                                                    })
                                                                                                });
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </Mutation>
                                                                            </Fragment>
                                                                        )}
                                                                    </UseStateValidationErrors>
                                                                )}
                                                            </UseStateBoolean>
                                                            <UseStateBoolean defaultValue={false}>
                                                                {(open, setOpen) => (
                                                                    <Mutation<DeletePackMutation, DeletePackMutationVariables>
                                                                        mutation={DELETE_PACK}
                                                                        onError={err => {
                                                                            //
                                                                        }}
                                                                        onCompleted={({ deletePack }) => {
                                                                            setOpen(false);
                                                                            setUuid(uuidv4());
                                                                        }}
                                                                    >
                                                                        {(mutate, { loading }) => (
                                                                            <PopoverConfirm
                                                                                placement="left"
                                                                                title="Устгах"
                                                                                description="Та үүнийг устгахыг зөвшөөрч байна уу?"
                                                                                open={open}
                                                                                onOpenChange={setOpen}
                                                                                okButtonProps={{
                                                                                    isLoading: loading
                                                                                }}
                                                                                onOk={() => {
                                                                                    const variables = {
                                                                                        id
                                                                                    };
                                                                                    mutate({
                                                                                        variables
                                                                                    });
                                                                                }}
                                                                                onCancel={() => {
                                                                                    setOpen(false);
                                                                                }}
                                                                            >
                                                                                <Button
                                                                                    size="sm"
                                                                                    color="default"
                                                                                    isIconOnly
                                                                                >
                                                                                    <TrashIcon className="w-4 h-4 text-foreground-500" />
                                                                                </Button>
                                                                            </PopoverConfirm>
                                                                        )}
                                                                    </Mutation>
                                                                )}
                                                            </UseStateBoolean>
                                                        </div>
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
