import styled from "styled-components";
import { TextStyledProps } from "../../../data/@types/TextStyled/TextStyled.type";

export const HeadingTitleStyled = styled.h1<TextStyledProps>`
  color: ${(props) => props.theme.colors[props.customColor || "text"]};
  font-size: 5rem;
  line-height: 116%;

  &::after {
    content: "";
    display: block;
    width: 50%;
    margin-top: 10px;
    margin-left: 25%;
    height: 7px;
    background: ${(props) => props.theme.colors[props.customColor || "text"]};
    opacity: ${(props) => (props.hasUnderline ? 1 : 0)};
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    line-height: 1.1;
  }
`;

export const HeadingSubtitleStyled = styled.h2<TextStyledProps>`
  color: ${(props) => props.theme.colors[props.customColor || "text"]};
  font-size: 4rem;
  line-height: 88px;

  &::after {
    content: "";
    display: block;
    width: 50%;
    margin-top: 10px;
    margin-left: 25%;
    height: 7px;
    background: ${(props) => props.theme.colors[props.customColor || "text"]};
    opacity: ${(props) => (props.hasUnderline ? 1 : 0)};
  }

  @media (max-width: 998px) {
    font-size: 3.5rem;
    line-height: 56px;
  }
`;

export const HeadingInterTitleStyled = styled.h3<TextStyledProps>`
  color: ${(props) => props.theme.colors[props.customColor || "text"]};
  font-size: 3rem;
  line-height: 96px;

  @media (max-width: 1024px) {
    line-height: 75px;
  }

  &::after {
    content: "";
    display: block;
    width: 50%;
    margin-left: 0;
    height: 7px;
    background: ${(props) => props.theme.colors[props.customColor || "text"]};
    opacity: ${(props) => (props.hasUnderline ? 1 : 0)};
  }
`;

export const HeadingSubInterTitleStyled = styled.h4<TextStyledProps>`
  color: ${(props) => props.theme.colors[props.customColor || "text"]};
  font-size: 2rem;
  line-height: 32px;

  &::after {
    content: "";
    display: block;
    width: 50%;
    margin-left: 0;
    height: 7px;
    background: ${(props) => props.theme.colors[props.customColor || "text"]};
    opacity: ${(props) => (props.hasUnderline ? 1 : 0)};
  }

  @media (max-width: 575px) {
    font-size: 1.8rem;
  }
`;

export const ParagraphStyled = styled.p<TextStyledProps>`
  display: ${(props) => (props.IsInline ? "inline" : "block")};
  color: ${(props) => props.theme.colors[props.customColor || "text"]};
  font-size: 1rem;
  line-height: 24px;
  text-align: justify;

  @media (max-width: 768px) {
    line-height: 1.5;
    font-size: 1rem;
  }
`;

export const spanStyled = styled.span<TextStyledProps>`
  display: ${(props) => (props.IsInline ? "inline" : "block")};
  color: ${(props) => props.theme.colors[props.customColor || "span"]};
`;
