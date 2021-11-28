import React from "react";
import styled, { useColorMode } from "@xstyled/styled-components";
import { useNhostAuth } from "@nhost/react-auth";
import { useRouter } from "next/router";

import Brand from "../components/Brand";
import SunMoon from "../components/SunMoon";
import Github from "../components/icon/Github";
import Google from "../components/icon/Google";
import MetaData from "../components/MetaData";
import { nhost } from "../utils/nhost";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;
  align-items: flex-start;
  justify-content: space-around;
  flex: 1;

  @media (max-width: md) {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  flex: 1;
`;

const BrandWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const H1 = styled.h1`
  color: gray;
`;

const LoginLogo = styled.button`
  margin-right: 40px;
  cursor: pointer;
  border: none;
  background: none;
`;

const LogionLogoWrapper = styled.div`
  display: flex;
  margin-top: 30px;

  @media (min-width: md) {
    margin-top: 50px;
  }
`;

const CopyRight = styled.div`
  background-color: pinkLight;
  color: pink;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.7rem;

  @media (min-width: md) {
    font-size: 1rem;
  }
`;

export default function Login(props) {
  const [mode] = useColorMode(false);
  const router = useRouter();
  const { isLoading, isAuthenticated } = useNhostAuth();

  function onGoogleLogin() {
    nhost.auth.signIn({
      provider: "google",
    });
  }

  function onGithubLogin() {
    nhost.auth.signIn({
      provider: "github",
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <>
      <MetaData title="Login | Cool Analytics" />
      <LoginContainer>
        <LoginWrapper>
          <BrandWrapper>
            <Brand showRow />
            <SunMoon />
          </BrandWrapper>
          <div>
            <H1>
              <div>Welcome,</div>
              Signup or Login
            </H1>
            <LogionLogoWrapper>
              <LoginLogo onClick={onGoogleLogin}>
                <Google />
              </LoginLogo>
              <LoginLogo onClick={onGithubLogin}>
                <Github fill={mode === "dark" ? "#fff" : "#000"} />
              </LoginLogo>
            </LogionLogoWrapper>
          </div>
          <CopyRight>©2021 cool.bio Analytics. All rights reserved.</CopyRight>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
}
