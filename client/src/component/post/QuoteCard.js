import styled from 'styled-components';
import trash from '../../constant/img/trash.svg';
const _CardHeader = styled.div`
    position: relative;
    background-color: ${(props) => props.color};
    height: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const _CardBody = styled.div`
    padding-top: 8px;
    display: flex;
    justify-content: space-around;
`;

const DelDiv = styled.div`
    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
`;

export default function QuoteCard({ card, deleteCard, cardIndex }) {
    return (
        <>
            <_CardHeader color={card.coverColor} />
            <_CardBody>
                {card.title}
                <DelDiv onClick={(e) => deleteCard(e, cardIndex, card)}>
                    <img style={{ margin: '3px' }} src={trash} alt="trashicon" />
                </DelDiv>
            </_CardBody>
        </>
    );
}
