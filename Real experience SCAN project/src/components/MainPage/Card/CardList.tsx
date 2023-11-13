import React, { useState } from "react";
import Card from "./Card";
import {useSelector} from "react-redux";
import {RootState} from "../../Header/Header";

interface CardData {
  id: number;
  title: string;
  under_text: string;
  price: string;
  price_before: string;
  info: string;
  label: string;
  li: string;
  li1: string;
  li2: string;
  color: string;
  border_color: string;
  img: string;
}

interface CardListProps {
  cardData: CardData[];
}

const CardList: React.FC<CardListProps> = ({ cardData }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  //TODO probably need a better function for this
  const handleCardClick = (cardId: number) => {
    if (isAuthenticated) {
       setSelectedCardId(cardId);
    } else {
      return
    }

  };

  return (
    <div className="card-list-wrapper">
      {cardData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          under_text={card.under_text}
          price={card.price}
          price_before={card.price_before}
          info={card.info}
          label={card.label}
          li={card.li}
          li1={card.li1}
          li2={card.li2}
          color={card.color}
          border_color={card.border_color}
          logo={card.img}
          selected={selectedCardId === card.id}
          handleCardClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardList;
