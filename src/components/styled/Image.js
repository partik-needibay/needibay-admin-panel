import styled from "styled-components";
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

const Image = styled.img`
  ${space}
  ${border}
  ${layout}
`;

export default Image;