import React, { useState, useCallback, useRef } from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import { useSpring, useTransition, animated } from "react-spring";
import { useLockBodyScroll, useWindowSize } from "react-use";
import styled, { x, useUp } from "@xstyled/styled-components";
import { useNhostAuth } from "@nhost/react-auth";

import Brand from "./Brand";
import SunMoon from "./SunMoon";

import { nhost } from "../utils/nhost";

import {
  SLIDE_IN,
  SLIDE_OUT,
  SLIDE_IN_MOBILE,
  SLIDE_OUT_MOBILE,
} from "../utils/animations";

import { pages } from "../config/constants";

const NavWrapper = styled(animated.div)`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 4rem;
  justify-content: space-between;

  @media (min-width: md) {
    flex-direction: column;
    background-color: nav;
    height: 100%;
    justify-content: flex-start;
    min-width: 5rem;
    position: fixed;
    z-index: 999;
  }
`;

const NavbarRight = styled.div`
  color: gray;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 1.5rem;
  text-align: center;
  background-color: nav;

  @media (min-width: md) {
    align-items: center;
    display: flex;
    flex-direction: column;
    order: 2;
    padding-bottom: 0;
    padding-top: 0;

    span {
      display: flex;
      flex-direction: row;
      height: 1.5rem;
      justify-content: center;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;

      &:hover {
        color: pblueMid;
      }
    }
  }
`;

const ExpandWrapper = styled.div`
  background-color: nav;
  color: gray;
  display: flex;
  flex-direction: column;
  width: 100vw;
  z-index: 9999;

  & > * {
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: grayLight;
    padding: 1.5rem;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: pblueHover;
    }

    span {
      &.focused {
        background-color: pblueLight;
        color: pblue;
        padding: 0.25rem;
      }
    }
  }

  @media (min-width: md) {
    flex-direction: column;
    height: calc(100% - 5.5rem);
    padding-left: 0;
    padding-top: 6.65rem;
    top: 0;
    width: 15rem;

    & > * {
      border: 0;
      color: gray;
      font-weight: 600;
      height: 1.5rem;
      width: 12rem;
    }
  }
`;

const ExpandBottom = styled.div`
  align-self: flex-start;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h5 {
    margin: 0;
  }

  &:hover {
    background: none;
  }
`;

const WrapperRouterLink = styled.a`
  pointer-events: ${({ disable }) => (disable ? "none" : "auto")};

  &.active {
    span {
      background-color: pblueLight;
      color: pblue;
      padding: 0.25rem;
    }
  }
`;

const WrapperRouterIconLink = styled.a`
  pointer-events: ${({ disable }) => (disable ? "none" : "auto")};

  &.active {
    svg {
      stroke: pblue;
    }
  }
`;

function Navbar({ darkMode }) {
  const [expand, setExpand] = useState(false);
  const { isAuthenticated } = useNhostAuth();
  useLockBodyScroll(expand);
  const windowSize = useWindowSize();
  const [spring, set, stop] = useSpring(() => ({ opacity: 0 }));
  set({ opacity: 1 });
  stop();

  const transitions = useTransition(expand, null, {
    from: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    enter: windowSize.width < 769 ? SLIDE_OUT_MOBILE : SLIDE_OUT,
    leave: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    config: { mass: 1, tension: 210, friction: 26 },
  });

  const handleMouseEnter = useCallback(() => {
    if (windowSize.width > 769) {
      setExpand(true);
    }
  }, [windowSize.width]);

  const logout = async () => {
    await nhost.auth.signOut();
  };

  return (
    <NavWrapper style={spring}>
      {windowSize.width > 769 &&
        (isAuthenticated ? (
          <x.button
            order={3}
            textAlign="center"
            mb={8}
            mt="auto"
            color="gray"
            fontSize="sm"
            backgroundColor="transparent"
            onClick={logout}
            border="none"
          >
            Logout
          </x.button>
        ) : (
          <x.a
            order={3}
            textAlign="center"
            mb={8}
            mt="auto"
            color="gray"
            fontSize="sm"
            backgroundColor="transparent"
            href="/login"
          >
            Login
          </x.a>
        ))}
      <Brand />
      <NavbarRight
        onMouseEnter={handleMouseEnter}
        {...(windowSize.width < 769 && {
          onClick: setExpand.bind(this, !expand),
        })}
      >
        {windowSize.width < 769 && <span>{expand ? "Close" : "Menu"}</span>}

        {windowSize.width > 769 && (
          <>
            <Link href="/" passHref>
              <WrapperRouterIconLink>
                <span>
                  <Icon.Home />
                </span>
              </WrapperRouterIconLink>
            </Link>
            <Link href="/projects" passHref>
              <WrapperRouterIconLink>
                <span>
                  <Icon.Book />
                </span>
              </WrapperRouterIconLink>
            </Link>
            <Link href="/docs" passHref>
              <WrapperRouterIconLink>
                <span>
                  <Icon.BookOpen />
                </span>
              </WrapperRouterIconLink>
            </Link>
            <Link href="/ about" passHref>
              <WrapperRouterIconLink>
                <span>
                  <Icon.HelpCircle />
                </span>
              </WrapperRouterIconLink>
            </Link>
            <span>
              <SunMoon {...{ darkMode }} />
            </span>
          </>
        )}
      </NavbarRight>

      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div key={key} style={props}>
            <Expand
              {...{
                pages,
                setExpand,
                darkMode,
                windowSize,
                isAuthenticated,
                logout,
              }}
            />
          </animated.div>
        ) : (
          <animated.div key={key} style={props}></animated.div>
        )
      )}
    </NavWrapper>
  );
}

function Expand({
  pages,
  setExpand,
  darkMode,
  windowSize,
  logout,
  isAuthenticated,
}) {
  const expandElement = useRef(null);
  const upMd = useUp("md");

  const handleMouseLeave = useCallback(() => {
    windowSize.width > 768 && setExpand(false);
  }, [setExpand, windowSize.width]);

  return (
    <ExpandWrapper ref={expandElement} onMouseLeave={handleMouseLeave}>
      {pages.map((page, i) => {
        if (page.showInNavbar === true) {
          return (
            <Link href={page.pageLink} key={i} passHref>
              <WrapperRouterLink
                {...(windowSize.width < 769 && {
                  onClick: setExpand.bind(this, false),
                })}
              >
                <span>{page.displayName}</span>
              </WrapperRouterLink>
            </Link>
          );
        }
        return null;
      })}

      {isAuthenticated ? (
        <x.button
          textAlign="left"
          mb={8}
          mt="auto"
          color="gray"
          fontSize="sm"
          backgroundColor="transparent"
          display={{ md: "none", xs: "block" }}
          onClick={logout}
        >
          Logout
        </x.button>
      ) : (
        <WrapperRouterLink
          href="/login"
          exact
          style={{
            display: upMd ? "none" : "block",
          }}
        >
          <span>Login</span>
        </WrapperRouterLink>
      )}

      {windowSize?.width < 768 && <SunMoon {...{ darkMode }} />}

      <ExpandBottom>
        <h5>A crowdsourced initiative.</h5>
      </ExpandBottom>
    </ExpandWrapper>
  );
}

export default Navbar;
