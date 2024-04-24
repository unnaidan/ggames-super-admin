import { Query } from '@apollo/client/react/components';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { DropZone } from '@src/components/common/DropZone';
import { SelectGamesQuery, SelectGamesQueryVariables } from '@src/graphql-types/graphql';
import { SELECT_GAMES } from '@src/graphql/queries/select-games';
import { getValidationErrorMessage } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { Formik } from 'formik';

type Prize = {
    name: string;
    order: number;
};

type Values = {
    name: string;
    subtitle: string;
    energy: number | null;
    from: string;
    to: string;
    promoImage?: string | null;
    gameId: string | null;
    prizes: Prize[];
};

type ChallengeFormProps = {
    open: boolean;
    errors: ValidationError[];
    initialValues: Values;
    onClose: () => void;
    onSubmit: (values: Values) => Promise<void> | void;
    loading?: boolean;
    updateForm?: boolean;
};

export const ChallengeForm = (props: ChallengeFormProps) => {
    const {
        updateForm = false,
        loading = false,
        open,
        errors,
        onClose,
        ...otherProps
    } = props;

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            size="4xl"
            backdrop="blur"
            hideCloseButton
        >
            <Formik {...otherProps}>
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        noValidate
                    >
                        <ModalContent>
                            <ModalHeader className="text-xl font-bold">
                                Challenge
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Нэр"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'name')}
                                        errorMessage={getValidationErrorMessage(errors, 'name')}
                                        isRequired
                                    />
                                    <Input
                                        label="Дэд гарчиг"
                                        name="subtitle"
                                        type="text"
                                        value={values.subtitle}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'subtitle')}
                                        errorMessage={getValidationErrorMessage(errors, 'subtitle')}
                                        isRequired
                                    />
                                    <Input
                                        label="Энерги"
                                        name="energy"
                                        type="number"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={values.energy?.toString() ?? ''}
                                        onValueChange={value => setFieldValue('energy', value ? parseInt(value) : null)}
                                        isInvalid={errors.some(({ property }) => property === 'energy')}
                                        errorMessage={getValidationErrorMessage(errors, 'energy')}
                                        isRequired
                                    />
                                    <Query<SelectGamesQuery, SelectGamesQueryVariables>
                                        fetchPolicy="no-cache"
                                        query={SELECT_GAMES}
                                        onError={err => {
                                            //
                                        }}
                                    >
                                        {({ data, loading }) => (
                                            <Select
                                                label="Тоглоом"
                                                name="gameId"
                                                selectionMode="single"
                                                items={data?.games.nodes ?? []}
                                                selectedKeys={values.gameId ? [values.gameId] : []}
                                                onChange={e => setFieldValue('gameId', e.target.value ? e.target.value : null)}
                                                isLoading={loading}
                                                isInvalid={errors.some(({ property }) => property === 'gameId')}
                                                errorMessage={getValidationErrorMessage(errors, 'gameId')}
                                                isRequired
                                            >
                                                {({ id, name }) => (
                                                    <SelectItem key={id} value={id}>
                                                        {name}
                                                    </SelectItem>
                                                )}
                                            </Select>
                                        )}
                                    </Query>
                                    <Input
                                        label="Эхлэх огноо"
                                        placeholder="YYYY-MM-DD HH:mm"
                                        name="from"
                                        type="text"
                                        value={values.from}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'from')}
                                        errorMessage={getValidationErrorMessage(errors, 'from')}
                                        isRequired
                                    />
                                    <Input
                                        label="Дуусах огноо"
                                        placeholder="YYYY-MM-DD HH:mm"
                                        name="to"
                                        type="text"
                                        value={values.to}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'to')}
                                        errorMessage={getValidationErrorMessage(errors, 'to')}
                                        isRequired
                                    />
                                    <div className="col-span-2">
                                        <DropZone
                                            title="Промо зураг"
                                            description="16:9 харьцаатай зураг хуулна уу"
                                            url="/files/upload-image"
                                            error={errors.some(({ property }) => property === 'promoImage')}
                                            value={values.promoImage}
                                            onChange={value => setFieldValue('promoImage', value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex flex-col gap-y-2">
                                            {values.prizes.map(({ name }, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-x-2"
                                                >
                                                    <Input
                                                        label="Шагнал"
                                                        name={`prizes[${index}].name`}
                                                        type="text"
                                                        value={name}
                                                        onChange={handleChange}
                                                    />
                                                    <Button
                                                        variant="light"
                                                        radius="full"
                                                        color="default"
                                                        isIconOnly
                                                        onPress={() => {
                                                            const value = [...values.prizes];
                                                            value.splice(index, 1);
                                                            setFieldValue('prizes', value.map(({ name }, order) => ({ name, order })));
                                                        }}
                                                    >
                                                        <XMarkIcon className="w-6 h-6" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                className="px-3 h-14 justify-start text-foreground-500"
                                                color="default"
                                                variant="flat"
                                                fullWidth
                                                onPress={() => {
                                                    setFieldValue('prizes', [...values.prizes, {
                                                        name: '',
                                                        order: values.prizes.length
                                                    }]);
                                                }}
                                            >
                                                Шагнал нэмэх
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isLoading={loading}
                                    variant="solid"
                                    color="primary"
                                    type="submit"
                                >
                                    Хадгалах
                                </Button>
                                <Button
                                    variant="light"
                                    color="secondary"
                                    onPress={() => {
                                        onClose();
                                    }}
                                >
                                    Хаах
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};
