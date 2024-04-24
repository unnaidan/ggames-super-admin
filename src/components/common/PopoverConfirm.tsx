import { OverlayPlacement } from '@nextui-org/aria-utils';
import { Button, ButtonProps, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';

type PopoverConfirmProps = {
    placement?: OverlayPlacement;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    okButtonProps?: Omit<ButtonProps, 'children' | 'size' | 'color' | 'onPress'>;
    okText?: string;
    cancelButtonProps?: Omit<ButtonProps, 'children' | 'size' | 'color' | 'onPress'>;
    cancelText?: string;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
};

export const PopoverConfirm = (props: PopoverConfirmProps): JSX.Element => {
    const {
        placement = 'top',
        okText = 'Тийм',
        cancelText = 'Үгүй',
        open,
        onOpenChange,
        title,
        description,
        okButtonProps,
        cancelButtonProps,
        onOk,
        onCancel,
        children
    } = props;

    return (
        <Popover
            isOpen={open}
            placement={placement}
            onOpenChange={onOpenChange}
            backdrop="opaque"
            showArrow
        >
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="pr-16">
                        <div className="text-base font-bold">
                            {title}
                        </div>
                        <div className="mt-1">
                            <div className="text-foreground-500">
                                {description}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex justify-end gap-x-1">
                            <Button
                                {...okButtonProps}
                                size="sm"
                                color="primary"
                                variant="solid"
                                onPress={() => {
                                    onOk();
                                }}
                            >
                                {okText}
                            </Button>
                            <Button
                                {...cancelButtonProps}
                                size="sm"
                                color="default"
                                variant="solid"
                                onPress={() => {
                                    onCancel();
                                }}
                            >
                                {cancelText}
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
