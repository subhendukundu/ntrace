import React from "react";
import styled, { x } from "@xstyled/styled-components";

import Brand from "./Brand";
import Fb from "./icon/Fb";
import Github from "./icon/Github";
import Instagram from "./icon/Instagram";
import Linkedin from "./icon/Linkedin";
import Twitter from "./icon/Twitter";

import { footerData } from "../config/constants";

const socialLinks = [
  {
    icon: <Github width={30} height={30} fill="#F87E0F" />,
    link: "https://github.com/subhendukundu",
    key: "github",
  },
  {
    icon: <Linkedin />,
    link: "https://www.linkedin.com/in/subhendukundu",
    key: "Linkedin",
  },
  {
    icon: <Twitter />,
    link: "https://twitter.com/ThisIsSubhendu",
    key: "Twitter",
  },
];

const Wrapper = styled.footer`
  font-style: normal;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 7 24;
  padding-bottom: 0;
  ul {
    list-style: none;
    padding: 0;
    color: #aeafb3;
    font-weight: normal;
  }

  @media (max-width: 767px) {
    padding: 50px 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto;
  }
`;

const CopyRight = styled.div`
  background-color: pinkLight;
  color: pink;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.8rem;

  @media (min-width: md) {
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <x.div mt={32} borderTop="1px solid" borderColor="dropdownBorder">
      <Wrapper>
        <x.div
          display="flex"
          h="150px"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          fontStyle="normal"
          fontWeight="normal"
          fontSize="14px"
          lineHeight="21px"
        >
          <Brand showRow />
          <x.div>
            <x.div
              display="flex"
              fontStyle="normal"
              fontWeight="normal"
              fontSize="14px"
              lineHeight="21px"
              color="#F87E0F"
              pb={4}
            >
              The new cookie free Analytics tool
            </x.div>
            <CopyRight>
              ©2021 ntrace Analytics. All rights reserved.
            </CopyRight>
          </x.div>
        </x.div>
        {footerData.map((item) => (
          <x.div display="flex" flexDirection="column" key={item.key}>
            <x.h3
              fontSize={{ xs: "xl", md: "2xl" }}
              fontWeight="500"
              marginBottom="1.2rem"
              color="gray"
            >
              {item.label}
            </x.h3>
            <ul>
              {item.categories.map((category, index) => (
                <x.li pt={index !== 0 ? 2 : 0} key={category.key}>
                  <x.a
                    aria-label={category.label}
                    href={category.href}
                    color="rgb(174, 175, 179)"
                    fontSize={{ xs: "sm", md: "base" }}
                  >
                    {category.label}
                  </x.a>
                </x.li>
              ))}
            </ul>
          </x.div>
        ))}
      </Wrapper>
      <x.div
        display="flex"
        pl={{ xs: 4, md: 24 }}
        pt={{ xs: 4, md: 7 }}
        paddingBottom="50px"
      >
        {socialLinks.map(({ link, icon, key }) => {
          return (
            <x.div
              key={key}
              p={{ xs: 2, md: 3 }}
              as="a"
              href={link}
              aria-label={key}
            >
              {icon}
            </x.div>
          );
        })}
      </x.div>
      <x.hr
        style={{
          margin: "0",
          height: "15px",
        }}
        backgroundColor="brick"
      />
    </x.div>
  );
};

export default Footer;
