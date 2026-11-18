import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PhotoShell = styled.main`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 0 110px;
  color: ${({ theme }) => theme.colors.text};
  button, a { -webkit-tap-highlight-color: transparent; }
  button:focus, a:focus { outline: none; }
  button:focus-visible, a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.current};
    outline-offset: 6px;
  }
  @media (max-width: 600px) { padding-top: 26px; }
`;
export const Eyebrow = styled.p`
  margin: 0 0 18px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .19em;
  text-transform: uppercase;
  color: #777;
`;
export const PageHeading = styled.h1`
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1.08;
  letter-spacing: -.03em;
  font-weight: 400;
  margin: 0 0 18px;
`;
export const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #777;
  margin: 0;
  max-width: 480px;
`;
export const BackLink = styled(Link)`
  display: inline-block;
  color: #777;
  text-decoration: none;
  font-size: 13px;
  margin-bottom: 30px;
  &:hover { color: ${({ theme }) => theme.colors.current}; }
`;
export const ImageFrame = styled.div`
  background: #f0f0ed;
  position: relative;
  img { width: 100%; height: auto; aspect-ratio: auto 3 / 2; display: block; }
`;
