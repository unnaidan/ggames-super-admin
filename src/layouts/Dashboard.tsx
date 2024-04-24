import { NextUIProvider } from '@nextui-org/react';
import { AppBar } from '@src/components/app/AppBar';
import { Drawer } from '@src/components/app/Drawer';
import { withUser } from '@src/hoc/withUser';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Dashboard = withUser((): JSX.Element => {
    const navigate = useNavigate();

    const [
        open,
        setOpen
    ] = useState(false);

    return (
        <NextUIProvider navigate={navigate}>
            <div className="xl:pl-72">
                <AppBar
                    onClickMenuButton={() => {
                        setOpen(true);
                    }}
                />
                <Drawer
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                />
                <Outlet />
            </div>
        </NextUIProvider>
    );
});
