import { cn } from "@/lib/utils/cn";
import { ThemeBase } from "../utils";
import { drawerLayout, DrawerLayout } from "./drawer-panel-mapping";

export enum Section {
  Hero = "theme1_hero",
  CoupleInfo = "theme1_couple_info",
  ReverseTimer = "theme1_reverse_timer",
  OurStory = "theme1_our_story",
  WeddingDate = "theme1_wedding_date",
  WeddingTimeline = "theme1_wedding_timeline",
  Gallery = "theme1_gallery",
  QandA = "theme1_q_and_a",
  FoodMenu = "theme1_food_menu",
  RsvpForm = "theme1_rsvp_form",
  MarqueeDemo = "theme1_marquee_demo",
  Footer = "theme1_footer",
}
export interface Theme1Mapping extends ThemeBase {
  sections: {
    name: Section;
    enabled: boolean;
    children: {
      [key: string]: any;
    };
  }[];
}

const Theme1MappingValue: Theme1Mapping = {
  sections: [
    {
      name: Section.Hero,
      enabled: true,
      children: {
        title: {
          type: "text",
          text: "Welcome to Our Wedding",
          className: "text-7xl text-white mb-4 ",
        },
        description: {
          type: "text",
          text: "15 December, 2023 – New York, Brooklyn",
          className: "mb-4 uppercase text-white",
        },
        icon: "Heart",
        bgImageUrl: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/hero-bg.png",
      },
    },
    {
      name: Section.CoupleInfo,
      enabled: true,
      children: {
        couple: [
          {
            name: {
              type: "text",
              className: "text-3xl font-medium ",
              text: "Olivia Martin",
            },
            role: "The Bride",
            description: {
              type: "text",
              className: "text-gray-500 leading-relaxed text-base font-nunito",
              text: "Olivia, a passionate artist and nature lover, brings creativity and warmth to every aspect of life. Her infectious laughter and kind heart have captivated Enrico from the moment they.",
            },
            socialMedia: [
              { type: "Facebook", url: "#" },
              { type: "Twitter", url: "#" },
              { type: "Instagram", url: "#" },
            ],
            imageUrl:
              "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/person-photo.webp",
          },
          {
            name: {
              type: "text",
              className: "text-3xl font-medium ",
              text: "Enrico Thompson",
            },
            role: "The Groom",
            description: {
              type: "text",
              className: "text-gray-500 leading-relaxed text-base font-nunito",
              text: "Enrico, a dedicated engineer and outdoor enthusiast, balances logic with adventure. His unwavering support and sense of humor have been the perfect complement.",
            },
            socialMedia: [
              { type: "Facebook", url: "#" },
              { type: "Twitter", url: "#" },
              { type: "Instagram", url: "#" },
            ],
            imageUrl:
              "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/person-photo.webp",
          },
        ],
        bottomTitle: {
          className: "text-3xl font-medium ",
          text: "Are getting married!",
        },
        bottomSubtitle: {
          type: "text",
          className: "text-gray-500 leading-relaxed text-base font-nunito",
          text: "15 December, 2023 New York, Brooklyn",
        },
      },
    },
    {
      name: Section.ReverseTimer,
      enabled: true,
      children: {
        targetTime: 1765612800000,
        title: {
          text: "We will become a family in",
          className: "text-3xl font-medium  text-white",
        },
        time: {
          className: "text-3xl font-medium ",
        },
        bgImageUrl: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/reverse-timer-bg.png",
      },
    },
    {
      name: Section.OurStory,
      enabled: true,
      children: {
        image: {
          src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/couple-image.png",
          alt: "Wedding photo",
        },
        circularText: "Olivia & Enrico • 15.11.2021 •",
        title: {
          type: "text",
          text: "Our Story",
          className:
            "block  text-2xl md:text-3xl text-[#BD945A] mb-1",
        },
        subtitle: {
          text: "How We Met",
          className: "block text-xl md:text-2xl tracking-wide uppercase",
        },
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    },
    {
      name: Section.WeddingDate,
      enabled: true,
      children: {
        bgImage: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/reverse-timer-bg.png",
        title: {
          text: "Looking forward to see you!",
          className: "text-5xl  italic text-white",
        },
        date: {
          text: "December 15, 2023",
          className:
            "flex justify-center space-x-8 text-5xl font-bold font-nunito text-white",
        },
      },
    },
    {
      name: Section.WeddingTimeline,
      enabled: true,
      children: {
        title: {
          text: "Wedding",
          className:
            "block  font-dancing-script text-4xl mb-2",
        },
        subtitle: {
          text: "ORGANIZATION",
          className: "block text-3xl tracking-wider",
        },
        bgImageUrl: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/reverse-timer-bg.png",
        events: [
          {
            number: "01",
            title: "CEREMONY",
            description:
              "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
          },
          {
            number: "02",
            title: "LUNCH TIME",
            description:
              "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
          },
          {
            number: "03",
            title: "PARTY",
            description:
              "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
          },
          {
            number: "04",
            title: "CAKE CUTTING",
            description:
              "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
          },
        ],
      },
    },
    {
      name: Section.Gallery,
      enabled: true,
      children: {
        title: {
          text: "Gallery",
          className:
            "block  font-dancing-script text-3xl text-[#BD945A]",
        },
        subtitle: {
          text: "Our Memories",
          className: "block text-2xl uppercase",
        },
        tabs: [
          { value: "all", label: "All" },
          { value: "ceremony", label: "Ceremony" },
          { value: "party", label: "Party" },
        ],
        images: [
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Wedding couple portrait with sunlight",
            category: "ceremony",
          },
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Wedding details flatlay with shoes and stationery",
            category: "ceremony",
          },
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Wedding couple portrait by brick wall",
            category: "ceremony",
          },
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Wedding cake with candles",
            category: "party",
          },
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Reception table setting",
            category: "party",
          },
          {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
            alt: "Wedding stationery details",
            category: "ceremony",
          },
        ],
      },
    },
    {
      name: Section.QandA,
      enabled: true,
      children: {
        title: {
          text: "Questions",
          className: "block  text-xl text-[#BD945A] mb-1",
        },
        subtitle: {
          text: "When and where",
          className: "block text-2xl tracking-wide uppercase",
        },
        content: Array(3).fill({
          image: {
            src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/couple-image.png",
            alt: "Wedding ceremony location",
          },
          title: "WEDDING CEREMONY",
          text1: {
            text: "175 Broadway, Brooklyn, New York 11244, USA",
            icon: 1,
          },
          text2: {
            text: "12:00am – 13:00pm",
            icon: 2,
          },
        }),
      },
    },
    {
      name: Section.FoodMenu,
      enabled: true,
      children: {
        title: {
          text: "Cuisine",
          className: cn(["block  text-3xl mb-1"]),
        },
        subtitle: {
          text: "Food Menu",
          className: "block text-2xl tracking-wide uppercase",
        },
        menuImage: {
          src: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/food-bg.png",
          alt: "Food Menu Background",
        },
        downloadText: "Click to download food menu",
        downloadButtonText: "Download Now",
        menuPdf: {
          src: "",
          alt: "Food Menu PDF",
        },
      },
    },
    {
      name: Section.RsvpForm,
      enabled: true,
      children: {
        title: {
          text: "Will you attend?",
          className: "block  mb-2 text-3xl",
        },
        subtitle: {
          text: "R.S.V.P",
          className: "text-2xl",
        },
        bgImage: "https://akituassets.blob.core.windows.net/custom-wedding-website-assets/default-images/theme1/rsvp-bg.png",
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "guests", label: "Guests", type: "number" },
        ],
        submitButton: {
          text: "SEND",
          className:
            "w-min text-white py-2.5 px-5 rounded-sm transition-colors duration-200",
        },
      },
    },
    {
      name: Section.MarqueeDemo,
      enabled: true,
      children: {
      },
    },
    {
      name: Section.Footer,
      enabled: true,
      children: {
        text: {
          text: "Olivia & Enrico",
          className: " text-2xl md:text-3xl text-gray-800 font-medium"
        },
        date: {
          text: "December 15, 2023 — New York, Brooklyn",
          className: "font-serif text-base text-gray-500 italic"
        }
      }
    },
  ],
  themeName: "Theme1",
  title: "Shashank1 & Shashank2",
  drawerLayout: {
    type: "drawer",
    info: drawerLayout,
  },
  primaryFont: {
    name: "Alex Brush",
    url: "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
    cssStyleName: "Alex Brush, cursive"
  },
  secondaryFont: {
    name: "nunito",
    url: "https://fonts.googleapis.com/css2?family=Nunito:wght@300..700&display=swap",
    cssStyleName: "Nunito, sans-serif"

  },
  primaryColor: "#BD945A",
  secondaryColor: "#F6F1F0",
  custom_utils: {
    tertiaryColor: "#E5D4BD",
    quaternaryColor: "#FAF8F7",
    tertiaryFont: {
      name: "Alex Brush",
      url: "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
      cssStyleName: "Alex Brush, cursive"
    }
  }
};

export default Theme1MappingValue;
