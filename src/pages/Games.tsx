import { Mutation } from '@apollo/client/react/components';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button, Input } from '@nextui-org/react';
import { PopoverConfirm } from '@src/components/common/PopoverConfirm';
import { createCompleteTable, createCompleteTableColumn } from '@src/dynamic-components/createCompleteTable';
import { createUseState } from '@src/dynamic-components/createUseState';
import { GameForm } from '@src/forms/Game';
import { CreateGameMutation, CreateGameMutationVariables, DeleteGameMutation, DeleteGameMutationVariables, GamesQuery, UpdateGameMutation, UpdateGameMutationVariables } from '@src/graphql-types/graphql';
import { CREATE_GAME } from '@src/graphql/mutations/create-game';
import { DELETE_GAME } from '@src/graphql/mutations/delete-game';
import { UPDATE_GAME } from '@src/graphql/mutations/update-game';
import { GAMES } from '@src/graphql/queries/games';
import { parseErrors } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { default as dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { v4 as uuidv4 } from 'uuid';

const CompleteTable = createCompleteTable<{ search?: string; }, GamesQuery['games']['nodes'][number]>();
const CompleteTableColumn = createCompleteTableColumn<GamesQuery['games']['nodes'][number]>();
const UseState = createUseState<string>();
const UseStateBoolean = createUseState<boolean>();
const UseStateValidationErrors = createUseState<ValidationError[]>();

export const Games = (): JSX.Element => {
    return (
        <Fragment>
            <Helmet>
                <title>
                    Game - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        Game
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
                                                                <Mutation<CreateGameMutation, CreateGameMutationVariables>
                                                                    mutation={CREATE_GAME}
                                                                    onError={err => {
                                                                        if (err.message === 'Bad Request Exception') {
                                                                            setErrors(parseErrors(err));
                                                                        }
                                                                    }}
                                                                    onCompleted={({ createGame }) => {
                                                                        setOpen(false);
                                                                        setUuid(uuidv4());
                                                                    }}
                                                                >
                                                                    {(mutate, { loading }) => (
                                                                        <GameForm
                                                                            open={open}
                                                                            errors={errors}
                                                                            loading={loading}
                                                                            onClose={() => {
                                                                                setOpen(false);
                                                                            }}
                                                                            initialValues={{
                                                                                icon: null,
                                                                                code: '',
                                                                                name: '',
                                                                                version: '',
                                                                                subtitle: '',
                                                                                description: '',
                                                                                cover: '',
                                                                                ageRating: '',
                                                                                size: null,
                                                                                summaryRating: null,
                                                                                featured: false,
                                                                                screenshots: []
                                                                            }}
                                                                            onSubmit={({
                                                                                screenshots: create,
                                                                                ...other
                                                                            }) => {
                                                                                const screenshots = {
                                                                                    create: create.filter(({ src }) => !!src)
                                                                                };
                                                                                setErrors([]);
                                                                                mutate({
                                                                                    variables: Object.assign({}, other, {
                                                                                        screenshots
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
                                        </div>
                                        <div className="mt-4">
                                            <CompleteTable
                                                uuid={uuid}
                                                query={GAMES}
                                                nodesPath="games"
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
                                                    dataIndex="version"
                                                    label="Хувилбар"
                                                    sorter
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
                                                        icon,
                                                        code,
                                                        name,
                                                        version,
                                                        subtitle,
                                                        description,
                                                        cover,
                                                        ageRating,
                                                        size,
                                                        summaryRating,
                                                        featured,
                                                        screenshots
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
                                                                                <Mutation<UpdateGameMutation, UpdateGameMutationVariables>
                                                                                    mutation={UPDATE_GAME}
                                                                                    onError={err => {
                                                                                        if (err.message === 'Bad Request Exception') {
                                                                                            setErrors(parseErrors(err));
                                                                                        }
                                                                                    }}
                                                                                    onCompleted={({ updateGame }) => {
                                                                                        setOpen(false);
                                                                                        setUuid(uuidv4());
                                                                                    }}
                                                                                >
                                                                                    {(mutate, { loading }) => (
                                                                                        <GameForm
                                                                                            open={open}
                                                                                            errors={errors}
                                                                                            loading={loading}
                                                                                            onClose={() => {
                                                                                                setOpen(false);
                                                                                            }}
                                                                                            initialValues={{
                                                                                                icon,
                                                                                                code,
                                                                                                name,
                                                                                                version,
                                                                                                subtitle,
                                                                                                description,
                                                                                                cover,
                                                                                                ageRating,
                                                                                                size,
                                                                                                summaryRating,
                                                                                                featured,
                                                                                                screenshots: screenshots.nodes
                                                                                            }}
                                                                                            onSubmit={({
                                                                                                screenshots: create,
                                                                                                ...other
                                                                                            }) => {
                                                                                                const screenshots = {
                                                                                                    create: create.filter(({ src }) => !!src)
                                                                                                };
                                                                                                setErrors([]);
                                                                                                mutate({
                                                                                                    variables: Object.assign({}, other, {
                                                                                                        id,
                                                                                                        screenshots
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
                                                                    <Mutation<DeleteGameMutation, DeleteGameMutationVariables>
                                                                        mutation={DELETE_GAME}
                                                                        onError={err => {
                                                                            //
                                                                        }}
                                                                        onCompleted={({ deleteGame }) => {
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
