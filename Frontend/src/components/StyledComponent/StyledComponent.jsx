import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#063970'};
  color:${props => props.clr || 'white'};
  font-size: 20px;
  padding: ${props => props.padding || '14px 60px'};
  border-radius: 2px;
  margin: ${props => props.margin || '10px 0px'};
  cursor: pointer;
  border:none;
`;

const Input = styled.input`
  background-color: ${props => props.backgroundColor || 'white'};
  font-size:15px;
  padding:6px;
  border-radius:3px;
  outline:none;
  width:${props => props.width}
`
const Textarea = styled.textarea`
  background-color: ${props => props.backgroundColor || 'white'};
  font-size:15px;
  width:438px;
  border-radius:3px;
  outline:none;
`

export { Button, Input, Textarea }