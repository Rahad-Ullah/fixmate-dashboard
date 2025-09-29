import {
  BadgeCheck,
  Blocks,
  ChartBarStacked,
  FileText,
  MessageSquareMore,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "",
      url: "",
    },
    {
      title: "Overview",
      url: "/",
      icon: Blocks,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/users",
      icon: UsersRound,
    },
    {
      title: "Category Management",
      url: "/categories",
      icon: ChartBarStacked,
    },
    {
      title: "Verification",
      url: "/verification",
      icon: BadgeCheck,
    },
    {
      title: "Terms & Condition",
      url: "/terms-and-conditions",
      icon: FileText,
    },
    {
      title: "Privacy Policy",
      url: "/privacy-policy",
      icon: ShieldCheck,
    },
    {
      title: "My Profile",
      url: "/profile",
      icon: UserRound,
    },
    {
      title: "Help & Support",
      url: "/support",
      icon: MessageSquareMore,
    },
    {
      title: "",
      url: "",
    },
  ],
};

export const profileData = {
  name: "Rahad Ullah",
  email: "rahadullah10@gmail.com",
  role: "Admin",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};
