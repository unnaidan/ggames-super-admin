import { Bars3Icon } from '@heroicons/react/24/outline';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { setAccessToken, setUser } from '@src/redux/auth/reducer';
import { default as dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';

type AppBarProps = {
    onClickMenuButton: () => void;
};

export const AppBar = ({ onClickMenuButton }: AppBarProps): JSX.Element => {
    const dispatch = useDispatch();

    return (
        <Navbar
            className="bg-white"
            maxWidth="full"
            classNames={{
                wrapper: 'px-5'
            }}
        >
            <NavbarContent>
                <NavbarItem className="flex xl:hidden">
                    <Button
                        variant="light"
                        color="default"
                        isIconOnly
                        onPress={() => {
                            onClickMenuButton();
                        }}
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <div className="text-sm text-foreground-500">
                        {dayjs().format('YYYY оны MM сарын DD, dddd')}
                    </div>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <Dropdown>
                    <DropdownTrigger>
                        <Avatar
                            className="transition-transform"
                            color="default"
                            radius="md"
                            src="https://i.pravatar.cc/150?img=12"
                            as="button"
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        onAction={key => {
                            if (key === 'logout') {
                                dispatch(setAccessToken(null));
                                dispatch(setUser(null));
                            }
                        }}
                    >
                        <DropdownItem
                            key="logout"
                            color="danger"
                            className="text-danger"
                        >
                            Системээс гарах
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
};
