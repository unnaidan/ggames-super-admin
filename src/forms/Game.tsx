import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, Textarea } from '@nextui-org/react';
import { DropZone } from '@src/components/common/DropZone';
import { getValidationErrorMessage } from '@src/lib/utils';
import { ValidationError } from '@src/types';
import { Formik } from 'formik';

type Screenshot = {
    src: string;
    order: number;
};

type Values = {
    icon: string | null;
    code: string;
    name: string;
    version: string;
    subtitle: string;
    description: string;
    cover: string;
    ageRating: string;
    size: number | null;
    summaryRating: number | null;
    featured: boolean;
    screenshots: Screenshot[];
};

type GameFormProps = {
    open: boolean;
    errors: ValidationError[];
    initialValues: Values;
    onClose: () => void;
    onSubmit: (values: Values) => Promise<void> | void;
    loading?: boolean;
};

export const GameForm = (props: GameFormProps) => {
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
                                Game
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-2">
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
                                    </div>
                                    <Input
                                        label="Код"
                                        name="code"
                                        type="text"
                                        value={values.code}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'code')}
                                        errorMessage={getValidationErrorMessage(errors, 'code')}
                                        isRequired
                                    />
                                    <Input
                                        label="Хувилбар"
                                        name="version"
                                        type="text"
                                        value={values.version}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'version')}
                                        errorMessage={getValidationErrorMessage(errors, 'version')}
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
                                        label="Насны ангилал"
                                        name="ageRating"
                                        type="text"
                                        value={values.ageRating}
                                        onChange={handleChange}
                                        isInvalid={errors.some(({ property }) => property === 'ageRating')}
                                        errorMessage={getValidationErrorMessage(errors, 'ageRating')}
                                        isRequired
                                    />
                                    <Input
                                        label="Хэмжээ"
                                        name="size"
                                        type="number"
                                        inputMode="numeric"
                                        pattern="[0-9]*[.]*"
                                        value={values.size?.toString() ?? ''}
                                        onValueChange={value => setFieldValue('size', value ? parseFloat(value) : null)}
                                        isInvalid={errors.some(({ property }) => property === 'size')}
                                        errorMessage={getValidationErrorMessage(errors, 'size')}
                                        isRequired
                                    />
                                    <Input
                                        label="Үнэлгээ"
                                        name="summaryRating"
                                        type="number"
                                        inputMode="numeric"
                                        pattern="[0-9]*[.]*"
                                        value={values.summaryRating?.toString() ?? ''}
                                        onValueChange={value => setFieldValue('summaryRating', value ? parseFloat(value) : null)}
                                        isInvalid={errors.some(({ property }) => property === 'summaryRating')}
                                        errorMessage={getValidationErrorMessage(errors, 'summaryRating')}
                                        isRequired
                                    />
                                    <div className="col-span-2">
                                        <Textarea
                                            label="Дэлгэрэнгүй"
                                            name="description"
                                            type="text"
                                            value={values.description}
                                            onChange={handleChange}
                                            isInvalid={errors.some(({ property }) => property === 'description')}
                                            errorMessage={getValidationErrorMessage(errors, 'description')}
                                            isRequired
                                        />
                                    </div>
                                    <DropZone
                                        title="Айкон"
                                        description="1:1 харьцаатай зураг хуулна уу"
                                        url="/files/upload-image"
                                        error={errors.some(({ property }) => property === 'icon')}
                                        value={values.icon}
                                        onChange={value => setFieldValue('icon', value)}
                                    />
                                    <DropZone
                                        title="Ковер"
                                        description="16:9 харьцаатай зураг хуулна уу"
                                        url="/files/upload-image"
                                        error={errors.some(({ property }) => property === 'cover')}
                                        value={values.cover}
                                        onChange={value => setFieldValue('cover', value)}
                                    />
                                    <div className="col-span-2">
                                        <DropZone
                                            title="Скрийншот"
                                            description="9:19.5 харьцаатай зураг хуулна уу"
                                            url="/files/upload-image"
                                            value={null}
                                            onChange={src => {
                                                setFieldValue('screenshots', [...values.screenshots, {
                                                    src,
                                                    order: values.screenshots.length
                                                }]);
                                            }}
                                        />
                                        {/* {values.screenshots.length > 0 && (
                                            <Grid
                                                spacing={1}
                                                container
                                                sx={{
                                                    marginBottom: 1
                                                }}
                                            >
                                                {values.screenshots.map(value => (
                                                    <Grid
                                                        key={value}
                                                        xs={4}
                                                        item
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: 'relative',
                                                                width: '100%',
                                                                paddingTop: '100%',
                                                                borderRadius: 1,
                                                                backgroundSize: 'cover',
                                                                backgroundImage: `url(${process.env.REACT_APP_CDN_URL}/300x300/${value}})`
                                                            }}
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => {
                                                                    getFieldHelpers('screenshots').setValue(values.screenshots.filter(({ src }) => src !== value));
                                                                }}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    inset: '-7px -7px auto auto',
                                                                    bgcolor: theme => `${theme.palette.error.main} !important`,
                                                                    color: theme => theme.palette.error.contrastText
                                                                }}
                                                            >
                                                                <SvgIcon fontSize="small">
                                                                    <IconX />
                                                                </SvgIcon>
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )} */}
                                    </div>
                                    <div className="h-14 flex items-center">
                                        <Switch
                                            isSelected={values.featured}
                                            onValueChange={value => setFieldValue('featured', value)}
                                        >
                                            <span className="text-sm text-foreground-500">
                                                Онцлох эсэх
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
