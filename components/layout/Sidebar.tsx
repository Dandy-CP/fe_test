import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart,
  DashboardOutlined,
  ExpandLess,
  ExpandMore,
  Settings,
} from '@mui/icons-material';

interface Props {
  path: string;
}

function Sidebar({ path }: Props) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const menu = [
    {
      label: 'Dashboard',
      Icon: DashboardOutlined,
      href: '/dashboard',
      subMenu: null,
    },
    {
      label: 'Laporan Lalin',
      Icon: BarChart,
      href: '#',
      subMenu: [
        {
          label: 'Laporan Per hari',
          href: '/dashboard/laporanLalin/perHari',
        },
      ],
    },
    {
      label: 'Master Gerbang',
      Icon: Settings,
      href: '/dashboard/masterGerbang',
      subMenu: null,
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-87.5 flex-col gap-10 bg-white p-6 border-r-[0.3px] border-gray-500">
      <div className="flex flex-col gap-3">
        {menu.map((value, index) => (
          <React.Fragment key={index}>
            <Link
              href={value.href}
              className={`flex flex-row items-center gap-3 rounded-[10px] p-3 text-[#8E92BC] hover:bg-[#F5F5F7] ${
                path === value.href ? 'bg-[#F5F5F7] text-black' : ''
              }`}
              onClick={() => {
                value.subMenu && setShowSubMenu((prev) => !prev);
              }}
            >
              <value.Icon />
              <p className="font-semibold">{value.label}</p>

              {value.subMenu && (
                <div className="ml-auto">
                  {showSubMenu && <ExpandLess />}
                  {!showSubMenu && <ExpandMore />}
                </div>
              )}
            </Link>

            {showSubMenu &&
              value.subMenu &&
              value.subMenu.map((subValue, subIndex) => (
                <Link
                  key={subIndex}
                  href={subValue.href}
                  className={`flex flex-row gap-3 rounded-[10px] p-3 pl-12 text-[#8E92BC] hover:bg-[#F5F5F7] ${
                    path === subValue.href ? 'bg-[#F5F5F7] text-black' : ''
                  }`}
                >
                  <p className="font-semibold">{subValue.label}</p>
                </Link>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
