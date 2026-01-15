import { useState } from 'react';
import Link from 'next/link';
import {
  ChecklistOutlined,
  DashboardOutlined,
  ExpandLess,
  ExpandMore,
  SchoolOutlined,
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
      Icon: SchoolOutlined,
      href: null,
      subMenu: [
        {
          label: 'Laporan Per hari',
          href: '/dashboard/laporan-hari',
        },
      ],
    },
    {
      label: 'Master Gerbang',
      Icon: ChecklistOutlined,
      href: '/dashboard/master-gerbang',
      subMenu: null,
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-71.25 flex-col gap-10 bg-white p-6 border-r-[0.3px] border-gray-500">
      <div className="flex flex-col gap-3">
        {menu.map((value, index) => (
          <>
            <Link
              key={index}
              href={value.href ? value.href : ''}
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
              value.subMenu.map((subValue) => (
                <Link
                  href={subValue.href}
                  className={`flex flex-row gap-3 rounded-[10px] p-3 pl-12 text-[#8E92BC] hover:bg-[#F5F5F7] ${
                    path === subValue.href ? 'bg-[#F5F5F7] text-black' : ''
                  }`}
                  key={index}
                >
                  <p className="font-semibold">{subValue.label}</p>
                </Link>
              ))}
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
