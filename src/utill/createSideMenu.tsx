import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const createSidebarMenus = (menus: MenuProps['items']): MenuProps['items'] => {
  if (!menus) return menus;

  return menus.map((menu) => {
    if (!menu || !('label' in menu)) return menu;

    if ('children' in menu) {
      return {
        ...menu,
        children: createSidebarMenus(menu.children) || [],
      };
    }

    return {
      ...menu,
      label: <Link href={menu.key as string}>{menu.label}</Link>,
    };
  });
};

const SideBar = () => {
  const router = useRouter();

  const sidebarMenus = createSidebarMenus([
    {
      key: '/',
      label: '대쉬보드',
    },
    {
      key: '/user',
      label: '회원 관리',
      children: [
        {
          key: '/user/userlist',
          label: '회원 조회',
        },
      ],
    },
    {
      key: '/space',
      label: '공간 관리',
      children: [
        {
          key: '/space/spacelist',
          label: '공간 조회',
        },
      ],
    },
    {
      key: '/review',
      label: '리뷰 관리',
      children: [
        {
          key: '/review/reviewlist',
          label: '리뷰 조회',
        },
      ],
    },
    {
      key: '/sales',
      label: '매출 관리',
      children: [
        {
          key: '/sales/month',
          label: '연도별 월 매출 조회',
        },
        {
          key: '/sales/day',
          label: '월별 일 매출 조회',
        },
      ],
    },
    {
      key: '/coupon',
      label: '쿠폰 관리',
      children: [
        {
          key: '/coupon/couponlist',
          label: '쿠폰 조회',
        },
      ],
    },
    {
      key: '/booking',
      label: '예약 관리',
      children: [
        {
          key: '/booking/bookinglist',
          label: '예약 조회',
        },
      ],
    },
    {
      key: '/website',
      label: '사이트 관리',
      children: [
        {
          key: '/website/spacecategory',
          label: '공간 카테고리',
        },
      ],
    },
    {
      key: '/inquiry',
      label: '문의 관리',
      children: [
        {
          key: '/inquiry/hostreq',
          label: '호스트 신청',
        },
      ],
    },
  ]);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={sidebarMenus}
      selectedKeys={[router.pathname]}
      defaultOpenKeys={router.pathname.split('/').slice(1, -1)}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default SideBar;
