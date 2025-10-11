import { defineconfig } from "vite";

export default defineconfig(({ mode }) => ({
  base: mode === "production" ? "/clock-clock/" : "/", // base becomes .com/my-site/ during prod
  build: {                        // ^^ the .com/xyz/ wala part during production
    rollupoptions: {
      input: { // all the html input files.
      // vv names given won't matter, only used for internal referencing
        main: "index.html",
      },
    },
  },
}));

