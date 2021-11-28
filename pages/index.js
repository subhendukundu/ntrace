import React, { lazy } from "react";
import styled, { x, useColorMode } from "@xstyled/styled-components";
import Link from "next/link";

import Blob from "../components/icon/Blob";
import Privacy from "../components/icon/Privacy";
import OpenSource from "../components/icon/OpenSource";
import PayAsYouGo from "../components/icon/PayAsYouGo";
import Api from "../components/icon/Api";

import MetaData from "../components/MetaData";
import Navbar from "../components/Navbar";
import LottieAnimations from "../components/LottieAnimations";
import Footer from "../components/Footer";

/* const Pricing = lazy(() => import("../components/Pricing")); */

const ourServices = {
  key: "services",
  description: "Why us?",
  label: "Leave Analytics on us and focus on your products",
  copy: "Featured Service that We Provide",
  options: [
    {
      icon: <Privacy height={50} width={50} />,
      title: "Privacy Friendy",
      key: "privacy",
      color: "redLight",
      fontColor: "red",
    },
    {
      icon: <PayAsYouGo height={50} width={50} />,
      title: "Pay As You Go",
      key: "payAsYouGo",
      color: "blueLight",
      fontColor: "blue",
    },
    {
      icon: <OpenSource height={50} width={50} />,
      title: "Open Source",
      key: "openSource",
      color: "greenLight",
      fontColor: "green",
    },
    {
      icon: <Api height={50} width={50} />,
      title: "Graphql Api",
      key: "api",
      color: "grayLight",
      fontColor: "gray",
    },
  ],
};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;

  @media (max-width: md) {
    width: 100%;
  }
`;

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const Button = styled.a`
  appearance: none;
  background-color: dropdown;
  background-position-x: calc(100% - 0.4rem);
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 0.6rem;
  border: 2px solid;
  border-color: dropdownBorder;
  border-radius: 4px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  padding: 1rem;
  padding-right: 1.4rem;
  width: 150px;
  text-align: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`;

export default function Landing({ products }) {
  const [mode] = useColorMode(false);

  return (
    <>
      <MetaData title="Analytics | Ntrace" />
      <Navbar />
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", sm: 0 }}
        mr={{ md: "3rem", sm: 0 }}
        pt={{ md: "5rem", xs: "3rem" }}
      >
        <HomeLeft>
          {/* <a
            href="https://www.producthunt.com/posts/daku?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-daku"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=289502&theme=${
                mode === "dark" ? "dark" : "light"
              }`}
              alt="Daku - It's like Tinder for Product Hunt | Product Hunt"
            />
          </a> */}
          <x.div my={{ md: 8, _: 8 }}>
            <x.h1
              color="blue"
              fontSize={{ md: "5xl", xs: "2xl" }}
              fontWeight={700}
            >
              Ultimate Platform to monitor your Analytics.
            </x.h1>
          </x.div>
          <x.p
            mb={{ md: 8, _: 8 }}
            color="gray"
            lineHeight={1.5}
            fontSize="16px"
          >
            We help to create SaaS product that are innovative, differentiated
            with a superb User Experience, fully accessible through mobile
            devices. SaaS products are changing the world.
          </x.p>
          <Link href="/login" passHref>
            <Button>Try now</Button>
          </Link>
        </HomeLeft>
        <HomeRight>
          <x.div position="relative">
            <Blob fill="redLight" />
            <x.img
              src={`/cool-bio-analytics-demo-${
                mode === "dark" ? "dark" : "light"
              }.png`}
              position="absolute"
              width="100%"
              top="50%"
              display="block"
              transform="translateY(-50%)"
              borderRadius={10}
            />
          </x.div>
        </HomeRight>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", sm: 0 }}
        mr={{ md: "3rem", sm: 0 }}
        pt={{ md: 28, xs: "3rem" }}
      >
        <x.div
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flexDirection="column"
          py={5}
        >
          <x.span color="pink" fontSize={{ md: "xl", xs: "lg" }} py={4}>
            {ourServices.description}
          </x.span>
          <x.h2
            color="silver"
            py={4}
            fontSize={{ md: "4xl", xs: "xl" }}
            fontWeight="700"
          >
            {ourServices.label}
          </x.h2>
          <x.p color="gray">{ourServices.copy}</x.p>
          <x.div display="flex" pt={20} flexWrap="wrap">
            {ourServices.options.map(
              ({ title, color, icon, fontColor, key }) => (
                <x.div
                  px={4}
                  py={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  key={key}
                >
                  <x.div
                    w={24}
                    h={24}
                    borderRadius="35px"
                    backgroundColor={color}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={5}
                  >
                    {icon}
                  </x.div>
                  <x.span color={fontColor} fontSize={{ md: "16px", sm: "sm" }}>
                    {title}
                  </x.span>
                </x.div>
              )
            )}
          </x.div>
        </x.div>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", sm: 0 }}
        mr={{ md: "3rem", sm: 0 }}
        pt={{ md: 28, xs: "3rem" }}
      >
        <x.div
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flexDirection="column"
          py={5}
        >
          <x.span color="pink" fontSize={{ md: "xl", xs: "lg" }} py={4}>
            Speed?
          </x.span>
          <x.h2
            color="silver"
            py={4}
            fontSize={{ md: "4xl", xs: "xl" }}
            fontWeight="700"
          >
            It’s fast, very fast
          </x.h2>
          <x.p color="gray">
            Our Cloudflare® powered servers are built for speed. Spans over 200
            cities in more than 100 countries.
          </x.p>
          <x.div pt={20} maxWidth={800}>
            <LottieAnimations animationName="world-ping" />
          </x.div>
        </x.div>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", sm: 0 }}
        mr={{ md: "3rem", sm: 0 }}
        pt={{ md: 28, xs: "3rem" }}
      >
        <HomeLeft>
          <x.span color="pink" fontSize={{ md: "xl", xs: "lg" }} py={4}>
            Hate cookies popups?
          </x.span>
          <x.h2
            color="silver"
            py={4}
            fontSize={{ md: "4xl", xs: "xl" }}
            fontWeight="700"
          >
            We too. We don't have cookies and fully compliant with GDPR
          </x.h2>
          <x.p color="gray" pb={{ md: 24, xs: 16 }}>
            All the site measurement is carried out absolutely anonymously.
            Cookies are not used and no personal data is collected. There are no
            persistent identifiers. No cross-site or cross-device tracking
            either. Your site data is not used for any other purposes.
          </x.p>
        </HomeLeft>
        <HomeRight>
          <img src="/assets/gdpr.svg" alt="Gdpr logo" />
        </HomeRight>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", xs: 0 }}
        mr={{ md: "3rem", xs: 0 }}
        pt={{ md: 28, xs: "3rem" }}
      >
        <x.div
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flexDirection="column"
          py={8}
        >
          {/* <Pricing products={products} /> */}
        </x.div>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        ml={{ md: "9rem", xs: 0 }}
        mr={{ md: "3rem", xs: 0 }}
        pt={{ md: 28, xs: "3rem" }}
      >
        <x.div
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          flexDirection="column"
          py={8}
        >
          <x.h2
            color="silver"
            pb={12}
            fontSize={{ md: "4xl", xs: "xl" }}
            fontWeight="700"
          >
            Build in a weekend, track to millions
          </x.h2>
          <Link href="/login" passHref>
            <Button>Start now</Button>
          </Link>
        </x.div>
      </x.div>
      <Footer />
    </>
  );
}
