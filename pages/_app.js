import styled, {
  defaultTheme,
  ThemeProvider,
  Preflight,
  ColorModeProvider,
  createGlobalStyle,
} from "@xstyled/styled-components";
import { th } from "@xstyled/system";
import { Provider } from "jotai";
import { NhostAuthProvider } from "@nhost/react-auth";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { nhost } from "../utils/nhost";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: background;
    color: text;
    transition: background-color 0.3s ease;
  }
  * {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
  
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: #6c757d;
  }

  h1 {
    font-size: 24px;
    font-weight: 900;
  }

  h2 {
    font-size: 18px;
    font-weight: 400;
  }
  
  h3 {
    font-size: 14px;
    font-weight: 400;
  }
  
  h4 {
    font-size: 13px;
    font-weight: 900;
  }
  
  h5 {
    font-size: 12px;
    font-weight: 900;
  }
  
  h6 {
    font-size: 11px;
    font-weight: 600;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const theme = {
  ...defaultTheme,
  defaultColorModeName: "dark",
  animations: {
    spin: "x-spin 1s linear infinite",
    ping: "x-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "x-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "x-bounce 1s infinite",
    fadeInUp: "fadeInUp 0.45s both",
  },
  colors: {
    white: "#fff",
    light: "#f8f9fa",
    dark: "#343a40",
    black: "#000",
    brand: "#F87E0F",

    blue: "#007bff",
    blueLight: "#007bff10",
    blueHover: "#007bff30",
    blueLightOpaque: "#eff7ff",
    blueMid: "#007bff99",
    pblue: "#4c75f2",
    pblueLight: "#4c75f210",
    pblueHover: "#4c75f230",
    pblueLightOpaque: "#eff7ff",
    pblueMid: "#4c75f299",
    cherry: "#ff073a",
    cherryMid: "#ff073a99",
    cherryLight: "#ff073a20",
    cherryHover: "#ff073a30",
    cherryLightOpaque: "#ffe0e6",
    red: "#dc3545",
    redLight: "#dc354520",
    redMid: "#dc354599",
    redHover: "#dc354530",
    orange: "#fd7e14",
    orangeMid: "#fd7e1499",
    orangeLight: "#fd7e1420",
    orangeHover: "#fd7e1430",
    orangeLightOpaque: "#ffefe2",
    yellow: "#ffc107",
    yellowLight: "#ffc10720",
    yellowHover: "#ffc10730",
    yellowMid: "#ffc10799",
    yellowLightOpaque: "#fff7e0",
    green: "#28a745",
    greenLight: "#28a74520",
    greenHover: "#28a74530",
    greenMid: "#28a74599",
    gray: "#6c757d",
    grayLight: "#6c757d10",
    grayLightOpaque: "#f6f6f7",
    grayHover: "#6c757d20",
    grayMid: "#6c757d99",
    grayMiddark: "#6c757d30",
    grayDark: "#343a40",
    grayOpaque: "#f1f1f1",
    grayHoverOpaque: "#edeeef",
    grayHoverDarkerOpaque: "#f6f6f7",
    grayGallery: "#eeeeee",
    purple: "#201aa2dd",
    purpleLight: "#201aa220",
    purpleHover: "#201aa230",
    purpleMid: "#201aa299",
    purpleLightOpaque: "#e3e2f3",
    pink: "#db5581",
    pinkLight: "#db558120",
    pinkHover: "#db558160",
    pinkMid: "#db558199",
    brown: "#b6854d",
    brownLight: "#b6854d10",
    brownHover: "#b6854d30",
    brownMid: "#b6854d99",
    brick: "#e23028",
    brickLight: "#e2302810",

    darkMGray: "#161625",
    darkMidSubtext: "#bdb8ae",
    darkMWhite: "#e1e1e1",
    darkMBlue: "#3391ff",
    darkMPurple: "#9673b9",
    darkMPurpleMid: "#9673b9bb",
    darkMPurpleLight: "#40008050",
    darkNav: "#1e1e30",

    background: th.color("white"),
    text: "#000",
    primary: "#07c",
    nav: th.color("grayLightOpaque"),
    dropdown: th.color("grayGallery"),
    dorpdownHover: th.color("grayHover"),
    dropdownBorder: "#e8e8e9",
    tableCell: th.color("grayLightOpaque"),
    tableBodyCell: "transparent",
    modes: {
      dark: {
        background: th.color("darkMGray"),
        text: "#fff",
        primary: "#0cf",
        nav: th.color("darkNav"),
        dropdown: th.color("darkNav"),
        dorpdownHover: th.color("grayHover"),
        dropdownBorder: "#9494941a",
        tableCell: th.color("darkNav"),
        tableBodyCell: th.color("grayLight"),
      },
    },
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Provider>
          <GlobalStyle />
          <NhostAuthProvider nhost={nhost}>
            <NhostApolloProvider nhost={nhost}>
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            </NhostApolloProvider>
          </NhostAuthProvider>
        </Provider>
      </ColorModeProvider>
    </ThemeProvider>
  );
}
