import { FaRegComment } from 'react-icons/Fa';
import { styled } from 'styled-components';

const CommentButton = () => {
  return (
    <Wrapper>
      <Button>
        <FaRegComment size={45} />
      </Button>
    </Wrapper>
  );
};

export default CommentButton;

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;
