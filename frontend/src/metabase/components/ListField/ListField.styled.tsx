import styled from "styled-components";
import TextInput from "metabase/components/TextInput";
import { color } from "metabase/lib/colors";

export const EmptyStateContainer = styled.div`
  padding: 2rem 2rem 0 2rem;
`;

interface FilterInputProps {
  isDashboardFilter?: boolean;
}

export const FilterInput = styled<FilterInputProps>(TextInput as any)`
  margin-bottom: ${props => (props.isDashboardFilter ? "0" : "0.5rem")};
  border: ${props =>
    props.isDashboardFilter ? `1px solid ${color("border")}` : "none"};
` as any;

interface OptionListProps {
  isDashboardFilter?: boolean;
}

export const OptionsList = styled.ul<OptionListProps>`
  overflow: auto;
  list-style: none;
  max-height: ${props => (props.isDashboardFilter ? "300px" : "none")};
  padding: ${props => (props.isDashboardFilter ? "0.5rem" : "0")};
`;

export const OptionContainer = styled.li`
  padding: 0.5rem 0.125rem;
`;

export const LabelWrapper = styled.div`
  padding-left: 0.5rem;
`;
