export enum FontStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface ThemeComponentBase<T> {
  component: T;
}

export interface ThemeBase {
  themeName:string;
  title:string;
  drawerLayout: {
    type: "drawer" | "header";
    info: any;
  };
  primaryFont:any;
  secondaryFont:any;
  primaryColor:string;
  secondaryColor:string;
  custom_utils:any;
}
