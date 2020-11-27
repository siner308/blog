import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.618,
  googleFonts: [
    {
      name: "Noto Sans KR",
      styles: ["400", "700"],
    },
  ],
  headerFontFamily: ["Noto Sans KR"],
  bodyFontFamily: ["Noto Sans KR"],
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
});

export default typography;

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export const options = typography.options;
