import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch } from '@nextui-org/react';
import { getValidationErrorMessage } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { Formik } from 'formik';

type Values = {
    name: string;
    order: number | null;
    price: number | null;
    energy: number | null;
    active: boolean;
};

type PackFormProps = {
    open: boolean;
    errors: ValidationError[];
    initialValues: Values;
    onClose: () => void;
    onSubmit: (values: Values) => Promise<void> | void;
    loading?: boolean;
};

export const PackForm = (props: PackFormProps) => {
    const {
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
                                Energy pack
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
                                        label="Эрэмбэ"
                                        name="order"
                                        type="number"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={values.order?.toString() ?? ''}
                                        onValueChange={value => setFieldValue('order', value ? parseInt(value) : null)}
                                        isInvalid={errors.some(({ property }) => property === 'order')}
                                        errorMessage={getValidationErrorMessage(errors, 'order')}
                                        isRequired
                                    />
                                    <Input
                                        label="Үнэ"
                                        name="price"
                                        type="number"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={values.price?.toString() ?? ''}
                                        onValueChange={value => setFieldValue('price', value ? parseInt(value) : null)}
                                        isInvalid={errors.some(({ property }) => property === 'price')}
                                        errorMessage={getValidationErrorMessage(errors, 'price')}
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
                                    <div className="h-14 flex items-center">
                                        <Switch
                                            isSelected={values.active}
                                            onValueChange={value => setFieldValue('active', value)}
                                        >
                                            <span className="text-sm text-foreground-500">
                                                Идэвхтэй эсэх
                                            </span>
                                        </Switch>
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
