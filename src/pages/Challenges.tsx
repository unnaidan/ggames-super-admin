import { Mutation } from '@apollo/client/react/components';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { Button, Input, Link } from '@nextui-org/react';
import { PopoverConfirm } from '@src/components/common/PopoverConfirm';
import { createCompleteTable, createCompleteTableColumn } from '@src/dynamic-components/createCompleteTable';
import { createUseState } from '@src/dynamic-components/createUseState';
import { ChallengeForm } from '@src/forms/Challenge';
import { ChallengesQuery, CreateChallengeMutation, CreateChallengeMutationVariables, DeleteChallengeMutation, DeleteChallengeMutationVariables, UpdateChallengeMutation, UpdateChallengeMutationVariables } from '@src/graphql-types/graphql';
import { CREATE_CHALLENGE } from '@src/graphql/mutations/create-challenge';
import { DELETE_CHALLENGE } from '@src/graphql/mutations/delete-challenge';
import { UPDATE_CHALLENGE } from '@src/graphql/mutations/update-challenge';
import { CHALLENGES } from '@src/graphql/queries/challenges';
import { parseErrors } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { default as dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { generatePath } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CompleteTable = createCompleteTable<{ search?: string; }, ChallengesQuery['challenges']['nodes'][number]>();
const CompleteTableColumn = createCompleteTableColumn<ChallengesQuery['challenges']['nodes'][number]>();
const UseState = createUseState<string>();
const UseStateBoolean = createUseState<boolean>();
const UseStateValidationErrors = createUseState<ValidationError[]>();

export const Challenges = (): JSX.Element => {
    return (
        <Fragment>
            <Helmet>
                <title>
                    Challenge - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        Challenge
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
                                                                <Mutation<CreateChallengeMutation, CreateChallengeMutationVariables>
                                                                    mutation={CREATE_CHALLENGE}
                                                                    onError={err => {
                                                                        if (err.message === 'Bad Request Exception') {
                                                                            setErrors(parseErrors(err));
                                                                        }
                                                                    }}
                                                                    onCompleted={({ createChallenge }) => {
                                                                        setOpen(false);
                                                                        setUuid(uuidv4());
                                                                    }}
                                                                >
                                                                    {(mutate, { loading }) => (
                                                                        <ChallengeForm
                                                                            open={open}
                                                                            errors={errors}
                                                                            loading={loading}
                                                                            onClose={() => {
                                                                                setOpen(false);
                                                                            }}
                                                                            initialValues={{
                                                                                name: '',
                                                                                subtitle: '',
                                                                                energy: null,
                                                                                from: '',
                                                                                to: '',
                                                                                promoImage: null,
                                                                                gameId: null,
                                                                                prizes: [{
                                                                                    order: 0,
                                                                                    name: ''
                                                                                }]
                                                                            }}
                                                                            onSubmit={({
                                                                                prizes: create,
                                                                                ...other
                                                                            }) => {
                                                                                const prizes = {
                                                                                    create: create.filter(({ name }) => !!name)
                                                                                };
                                                                                setErrors([]);
                                                                                mutate({
                                                                                    variables: Object.assign({}, other, {
                                                                                        prizes
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
                                                query={CHALLENGES}
                                                nodesPath="challenges"
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
                                                        subtitle,
                                                        energy,
                                                        from,
                                                        to,
                                                        promoImage,
                                                        gameId,
                                                        prizes
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
                                                                                <Mutation<UpdateChallengeMutation, UpdateChallengeMutationVariables>
                                                                                    mutation={UPDATE_CHALLENGE}
                                                                                    onError={err => {
                                                                                        if (err.message === 'Bad Request Exception') {
                                                                                            setErrors(parseErrors(err));
                                                                                        }
                                                                                    }}
                                                                                    onCompleted={({ updateChallenge }) => {
                                                                                        setOpen(false);
                                                                                        setUuid(uuidv4());
                                                                                    }}
                                                                                >
                                                                                    {(mutate, { loading }) => (
                                                                                        <ChallengeForm
                                                                                            open={open}
                                                                                            errors={errors}
                                                                                            loading={loading}
                                                                                            updateForm
                                                                                            onClose={() => {
                                                                                                setOpen(false);
                                                                                            }}
                                                                                            initialValues={{
                                                                                                name,
                                                                                                subtitle,
                                                                                                energy,
                                                                                                promoImage,
                                                                                                gameId,
                                                                                                from: dayjs(from).format('YYYY-MM-DD HH:mm'),
                                                                                                to: dayjs(to).format('YYYY-MM-DD HH:mm'),
                                                                                                prizes: prizes.nodes
                                                                                            }}
                                                                                            onSubmit={({
                                                                                                prizes: create,
                                                                                                ...other
                                                                                            }) => {
                                                                                                const prizes = {
                                                                                                    create: create.filter(({ name }) => !!name)
                                                                                                };
                                                                                                setErrors([]);
                                                                                                mutate({
                                                                                                    variables: Object.assign({}, other, {
                                                                                                        id,
                                                                                                        prizes
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
                                                                    <Mutation<DeleteChallengeMutation, DeleteChallengeMutationVariables>
                                                                        mutation={DELETE_CHALLENGE}
                                                                        onError={err => {
                                                                            //
                                                                        }}
                                                                        onCompleted={({ deleteChallenge }) => {
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
                                                            <Button
                                                                as={Link}
                                                                href={generatePath('/challenges/:id/scoreboard', { id })}
                                                                size="sm"
                                                                color="default"
                                                                isIconOnly
                                                            >
                                                                <UserGroupIcon className="w-4 h-4 text-foreground-500" />
                                                            </Button>
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
