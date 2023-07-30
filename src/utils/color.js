import Color from "color";

export const isDark = (color) => {
    const c = Color(color);
    return c.isDark();
};
