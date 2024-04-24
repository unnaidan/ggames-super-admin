import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { getValidationErrorMessage } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { Formik } from 'formik';
import { Fragment } from 'react';

type Values = {
    name: string;
    surname: string;
    profileImage?: string | null;
    phone: string;
    role: string;
    password?: string;
    passwordConfirmation?: string;
};

type UserFormProps = {
    open: boolean;
    errors: ValidationError[];
    initialValues: Values;
    onClose: () => void;
    onSubmit: (values: Values) => Promise<void> | void;
    loading?: boolean;
    updateForm?: boolean;
};

export const UserForm = (props: UserFormProps) => {
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
                                Админ
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        label="Овог"
                                        name="surname"
                                        type="text"
                                        value={values.surname}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'surname')}
                                        errorMessage={getValidationErrorMessage(errors, 'surname')}
                                        isRequired
                                    />
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
                                        label="Утасны дугаар"
                                        name="phone"
                                        type="text"
                                        value={values.phone}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'phone')}
                                        errorMessage={getValidationErrorMessage(errors, 'phone')}
                                        isRequired
                                    />
                                    <Select
                                        label="Эрх"
                                        name="role"
                                        selectionMode="single"
                                        selectedKeys={values.role ? [values.role] : []}
                                        onChange={e => setFieldValue('role', e.target.value ? e.target.value : null)}
                                        isLoading={loading}
                                        isInvalid={errors.some(({ property }) => property === 'role')}
                                        errorMessage={getValidationErrorMessage(errors, 'role')}
                                        isRequired
                                    >
                                        <SelectItem key="superAdmin" value="superAdmin">
                                            Супер админ
                                        </SelectItem>
                                        <SelectItem key="user" value="user">
                                            Хэрэглэгч
                                        </SelectItem>
                                    </Select>
                                    {updateForm === false && (
                                        <Fragment>
                                            <Input
                                                name="password"
                                                type="password"
                                                label="Нууц үг"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={errors.some(({ property }) => property === 'password')}
                                                errorMessage={getValidationErrorMessage(errors, 'password')}
                                                isRequired
                                            />
                                            <Input
                                                name="passwordConfirmation"
                                                type="password"
                                                label="Нууц үг давтах"
                                                value={values.passwordConfirmation}
                                                onChange={handleChange}
                                                isInvalid={errors.some(({ property }) => property === 'passwordConfirmation')}
                                                errorMessage={getValidationErrorMessage(errors, 'passwordConfirmation')}
                                                isRequired
                                            />
                                        </Fragment>
                                    )}
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
