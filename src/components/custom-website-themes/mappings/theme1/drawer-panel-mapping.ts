import { FontStyle } from "../utils";

export interface DrawerItem {
  label: string;
  link: string;
  fontStyle: FontStyle;
  primaryColor: string;
  hoverColor: string;
}

export interface DrawerLayout {
  header: {
    logo: string;
    coupleNames: {
      text: string;
      fontStyle: FontStyle;
      primaryColor: string;
    };
    date: {
      text: string;
      fontStyle: FontStyle;
      primaryColor: string;
    };
  };
  menuItems: DrawerItem[];
  footer: {
    eventDescription: {
      text: string;
      fontStyle: FontStyle;
      primaryColor: string;
    };
    eventDate: {
      text: string;
      fontStyle: FontStyle;
      primaryColor: string;
    };
    location: {
      text: string;
      fontStyle: FontStyle;
      primaryColor: string;
    };
  };
}

export const drawerLayout: DrawerLayout = {
  header: {
    logo: "/path/to/logo.svg",
    coupleNames: {
      text: "Olivia & Enrico",
      fontStyle: FontStyle.SECONDARY,
      primaryColor: "#C89B5E",
    },
    date: {
      text: "15.11.2023",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
    },
  },
  menuItems: [
    {
      label: "Home",
      link: "/home",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Couple",
      link: "/couple",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Our Story",
      link: "/our-story",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Friends",
      link: "/friends",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Organization",
      link: "/organization",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Gallery",
      link: "/gallery",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "When & Where",
      link: "/when-where",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "R.S.V.P",
      link: "/rsvp",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Gift Registry",
      link: "/gift-registry",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
    {
      label: "Blog",
      link: "/blog",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
      hoverColor: "#C89B5E",
    },
  ],
  footer: {
    eventDescription: {
      text: "Olivia & Enrico wedding",
      fontStyle: FontStyle.SECONDARY,
      primaryColor: "#C89B5E",
    },
    eventDate: {
      text: "15 December 2023",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#000000",
    },
    location: {
      text: "New York",
      fontStyle: FontStyle.PRIMARY,
      primaryColor: "#0000FF",
    },
  },
};
