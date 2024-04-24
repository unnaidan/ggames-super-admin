import { Mutation } from '@apollo/client/react/components';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button, Chip, Input, User } from '@nextui-org/react';
import { PopoverConfirm } from '@src/components/common/PopoverConfirm';
import { createCompleteTable, createCompleteTableColumn } from '@src/dynamic-components/createCompleteTable';
import { createUseState } from '@src/dynamic-components/createUseState';
import { UserForm } from '@src/forms/User';
import { CreateUserMutation, CreateUserMutationVariables, DeleteUserMutation, DeleteUserMutationVariables, UpdateUserMutation, UpdateUserMutationVariables, UsersQuery } from '@src/graphql-types/graphql';
import { CREATE_USER } from '@src/graphql/mutations/create-user';
import { DELETE_USER } from '@src/graphql/mutations/delete-user';
import { UPDATE_USER } from '@src/graphql/mutations/update-user';
import { USERS } from '@src/graphql/queries/users';
import { absolutePath, parseErrors } from '@src/lib/utils';
import { RootState } from '@src/redux/configureStore';
import { ValidationError } from '@src/types';
import { default as dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const CompleteTable = createCompleteTable<{ search?: string; }, UsersQuery['users']['nodes'][number]>();
const CompleteTableColumn = createCompleteTableColumn<UsersQuery['users']['nodes'][number]>();
const UseState = createUseState<string>();
const UseStateBoolean = createUseState<boolean>();
const UseStateValidationErrors = createUseState<ValidationError[]>();

export const Users = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <Fragment>
            <Helmet>
                <title>
                    Хэрэглэгч - GGames.mn
                </title>
            </Helmet>
            <div className="py-5">
                <div className="container mx-auto px-5">
                    <h1 className="text-xl font-bold">
                        Хэрэглэгч
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
                                            <div className="flex gap-x-2">
                                                <Button
                                                    color="default"
                                                    startContent={
                                                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                                                    }
                                                >
                                                    Шүүх
                                                </Button>
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
                                                                    <Mutation<CreateUserMutation, CreateUserMutationVariables>
                                                                        mutation={CREATE_USER}
                                                                        onError={err => {
                                                                            if (err.message === 'Bad Request Exception') {
                                                                                setErrors(parseErrors(err));
                                                                            }
                                                                        }}
                                                                        onCompleted={({ createUser }) => {
                                                                            setOpen(false);
                                                                            setUuid(uuidv4());
                                                                        }}
                                                                    >
                                                                        {(mutate, { loading }) => (
                                                                            <UserForm
                                                                                open={open}
                                                                                errors={errors}
                                                                                loading={loading}
                                                                                onClose={() => {
                                                                                    setOpen(false);
                                                                                }}
                                                                                initialValues={{
                                                                                    name: '',
                                                                                    surname: '',
                                                                                    profileImage: null,
                                                                                    phone: '',
                                                                                    role: '',
                                                                                    password: '',
                                                                                    passwordConfirmation: ''
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
                                        </div>
                                        <div className="mt-4">
                                            <CompleteTable
                                                uuid={uuid}
                                                query={USERS}
                                                nodesPath="users"
                                                variables={{
                                                    search
                                                }}
                                            >
                                                <CompleteTableColumn
                                                    dataIndex="id"
                                                    label="Нэр"
                                                    sorter
                                                    render={({
                                                        name,
                                                        surname,
                                                        profileImage,
                                                        phone
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
                                                    dataIndex="role"
                                                    label="Эрх"
                                                    sorter
                                                    render={({ role }) => (
                                                        <Chip
                                                            variant="flat"
                                                            radius="sm"
                                                            size="sm"
                                                            color={role === 'superAdmin'
                                                                ? 'primary'
                                                                : 'default'
                                                            }
                                                        >
                                                            {role === 'superAdmin'
                                                                ? 'Супер админ'
                                                                : 'Хэрэглэгч'
                                                            }
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
                                                <CompleteTableColumn
                                                    dataIndex="actions"
                                                    label=""
                                                    render={({
                                                        id,
                                                        name,
                                                        surname,
                                                        profileImage,
                                                        phone,
                                                        role
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
                                                                                <Mutation<UpdateUserMutation, UpdateUserMutationVariables>
                                                                                    mutation={UPDATE_USER}
                                                                                    onError={err => {
                                                                                        if (err.message === 'Bad Request Exception') {
                                                                                            setErrors(parseErrors(err));
                                                                                        }
                                                                                    }}
                                                                                    onCompleted={({ updateUser }) => {
                                                                                        setOpen(false);
                                                                                        setUuid(uuidv4());
                                                                                    }}
                                                                                >
                                                                                    {(mutate, { loading }) => (
                                                                                        <UserForm
                                                                                            open={open}
                                                                                            errors={errors}
                                                                                            loading={loading}
                                                                                            updateForm
                                                                                            onClose={() => {
                                                                                                setOpen(false);
                                                                                            }}
                                                                                            initialValues={{
                                                                                                name,
                                                                                                surname,
                                                                                                profileImage,
                                                                                                phone,
                                                                                                role
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
                                                                    <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
                                                                        mutation={DELETE_USER}
                                                                        onError={err => {
                                                                            //
                                                                        }}
                                                                        onCompleted={({ deleteUser }) => {
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
                                                                                    isDisabled={id === user.id}
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
