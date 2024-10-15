import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

export const createSidebarMenus = (
  menus: MenuProps["items"]
): MenuProps["items"] => {
  if (!menus) return menus;

  return menus.map((menu) => {
    if (!menu || !("label" in menu)) return menu;

    if ("children" in menu) {
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
      key: "/",
      label: `대쉬보드 관리`,
    },
    {
      key: "/asd",
      label: `관리 목록 추가`,
    },
  ]);

  return (
    <Menu
      mode="inline"
      items={sidebarMenus}
      selectedKeys={[router.pathname]}
      defaultOpenKeys={router.pathname.split("/").slice(1, -1)}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
};

export default SideBar;
