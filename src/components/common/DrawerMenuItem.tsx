import { Link } from '@nextui-org/react';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

type DrawerMenuItemProps = {
    Icon: React.ElementType;
    label: string;
    to: string;
};

export const DrawerMenuItem = (props: DrawerMenuItemProps): JSX.Element => {
    const { pathname } = useLocation();
    const {
        Icon,
        label,
        to
    } = props;

    return (
        <Link
            href={to}
            className={clsx('px-5 py-2 rounded-lg flex gap-x-3 items-center text-sm font-light hover:text-white', pathname === to ? 'text-white bg-[#2a2a3c]' : 'text-foreground-400')}
        >
            <Icon className="w-5 h-5" />
            <span>
                {label}
            </span>
        </Link>
    );
};
