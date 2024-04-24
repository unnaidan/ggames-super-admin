import { DrawerContent } from '@src/components/app/DrawerContent';
import { Fragment } from 'react';
import { default as RMDrawer } from 'react-modern-drawer';

type DrawerProps = {
    open: boolean;
    onClose: () => void;
};

export const Drawer = (props: DrawerProps): JSX.Element => {
    const {
        open,
        onClose
    } = props;

    return (
        <Fragment>
            <div className="fixed top-0 left-0 bottom-0 hidden xl:block w-72 bg-neutral">
                <DrawerContent />
            </div>
            <RMDrawer
                open={open}
                onClose={onClose}
                size={288}
                duration={300}
                direction="left"
                overlayOpacity={0.5}
            >
                <div className="w-full h-full bg-neutral">
                    <DrawerContent />
                </div>
            </RMDrawer>
        </Fragment>
    );
};
