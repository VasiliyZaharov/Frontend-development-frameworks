import React from 'react';
import MainPageLogo from './MainPageLogo';
import '../../styles/MainPage.css';
import './Slider/Slider';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import Carousel from './Slider/Slider';
import MainPageCenterLogoLogo from './MainPageCenterLogo';
import CardList from './Card/CardList';
import {RootState} from "../Header/Header";

interface CardData {
  id: number;
  color: string;
  border_color: string;
  title: string;
  under_text: string;
  img: string;
  price: string;
  price_before: string;
  info: string;
  label: string;
  li: string;
  li1: string;
  li2: string;
}

interface Props {}
const MainPage: React.FC<Props> = (props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const cardData: CardData[] = [
    {
      id: 1,
      color: 'yellow',
      border_color: '#FFB64F',
      title: 'Beginner',
      under_text: 'For a small research',
      img: '/pirn.png',
      price: '18 €',
      price_before: ' 22 €/year',
      info: 'or 2 €/month with installment plan for 24 months.',
      label: 'Tariff includes:',
      li: 'Unlimited query history',
      li1: 'Secure transaction',
      li2: 'Support 24/7',
    },
    {
      id: 2,
      title: 'Pro',
      color: 'blue',
      border_color: '#7CE3E1',
      under_text: ' For HR and freelancers',
      img: 'target.png',
      price: '40 €',
      price_before: ' 45 €/year',
      info: 'or 3,75 €/month with installment plan for 24 months.',
      label: 'Tariff includes:',
      li: 'All items of the Beginner tariff',
      li1: 'History export',
      li2: 'Priority recommendations',
    },
    {
      id: 3,
      title: 'Business',
      color: 'black',
      border_color: '#000000',
      under_text: ' For corporate clients',
      img: '/copmuter.png',
      price: '50 €',
      price_before: ' 58 €/year',
      info: 'Unfortunately, does not have installment plan',
      label: 'Tariff includes:',
      li: 'All Pro tariff items',
      li1: 'Unlimited number of requests',
      li2: 'Proirity support',
    },
  ];

  return (
    <div className="main_page">
      <div className="upper-page-content">
        <div className="info-box">
          <div className="main-text">
            <h1>Service for searching publications about a company by its tax identification number</h1>
          </div>
          <div className="under-text">
            <span>Comprehensive analysis of publications, receiving data in PDF format by email.</span>
          </div>
          {isAuthenticated ?
               <div className="btn_main-page">
            <Link to="/search" className="btn">
              <button className="btn">Request data</button>
            </Link>
          </div>  : null}
        </div>
        <div className="picture">
          <MainPageLogo alt="Main page logo" />
        </div>
      </div>
      <div className="middle-page-content">
        <div className="title">
          <h1> Why us</h1>
          <div className="slider">
            <Carousel />
          </div>
        </div>
        <div className="middle-page_center-pic">
          <MainPageCenterLogoLogo alt="Main page center logo" />
        </div>
      </div>
      <div className="down-page-content">
        <div className="down-title">
          <h1>Our Offers</h1>
        </div>
        <div className="tariff-cards">
          <CardList cardData={cardData} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
