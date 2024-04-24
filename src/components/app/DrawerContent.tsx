import { BoltIcon, PresentationChartBarIcon, RocketLaunchIcon, ShoppingBagIcon, StarIcon, SwatchIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { DrawerMenuItem } from '@src/components/common/DrawerMenuItem';
import { useState } from 'react';

export const DrawerContent = (): JSX.Element => {
    const [
        menus
    ] = useState([
        {
            name: 'Үндсэн',
            menuItems: [
                {
                    Icon: SwatchIcon,
                    label: 'Нүүр',
                    to: '/'
                },
                {
                    Icon: UserCircleIcon,
                    label: 'Хэрэглэгч',
                    to: '/users'
                },
                {
                    Icon: PresentationChartBarIcon,
                    label: 'Санхүү, тайлан',
                    to: '/reports'
                },
                {
                    Icon: ShoppingBagIcon,
                    label: 'Борлуулалтын захиалга',
                    to: '/orders'
                }
            ]
        },
        {
            name: 'Агуулга',
            menuItems: [
                {
                    Icon: BoltIcon,
                    label: 'Energy pack',
                    to: '/packs'
                },
                {
                    Icon: RocketLaunchIcon,
                    label: 'Game',
                    to: '/games'
                },
                {
                    Icon: StarIcon,
                    label: 'Challenge',
                    to: '/challenges'
                }
            ]
        }
    ]);

    return (
        <div>
            <div className="flex items-center justify-center h-16 px-4 border-b border-dashed border-gray-700">
                <img
                    src="/static/images/logo-white.png"
                    style={{
                        height: 24,
                        width: 'auto'
                    }}
                />
            </div>
            {menus.map(({ name, menuItems }, key) => (
                <div
                    key={key}
                    className="px-3 my-5"
                >
                    <div className="text-[10px] text-foreground-400 uppercase">
                        {name}
                    </div>
                    <div className="flex flex-col gap-y-1 mt-3">
                        {menuItems.map((props, key) => (
                            <DrawerMenuItem {...props} key={key} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
