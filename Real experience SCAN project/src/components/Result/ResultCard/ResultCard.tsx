import React from 'react';
import type { myDocument } from '../../../reducers/searchReducer'
import '../../../styles/ResultCard.css'
import he from 'he';

const decodeHtmlEntities = (str: string) => {
    return he.decode(str);
};

const stripHtmlTags = (str: string) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const limitTextLength = (text: string, limit = 500) => {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
};
interface ResultCardProps {
  data?: myDocument[] | null;
  title?: string;
  content: string;
  date: string;
  url: string;
  source: string;
  tag: {
    isAnnouncement: boolean;
    isDigest: boolean;
    isTechNews: boolean;
    [key: string]: any;
  };
  wordCount: number;


}
const ResultCard: React.FC<ResultCardProps> = ({ title , content, date, url, source, tag, wordCount}) => {
    const formatDate = (inputDate: string) => {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    const formattedDate = formatDate(date);
    const cleanContent = limitTextLength(stripHtmlTags(decodeHtmlEntities(content)));
    const limitedContent = limitTextLength(cleanContent, 550);

     const getTagText = () => {
        if (tag.isAnnouncement) return 'Announcement';
        if (tag.isDigest) return 'Digest';
        if (tag.isTechNews) return 'Tech News';
        return 'Tech News';
    };



    return (
        <div className="result-card">
            <div className="result-card_header">
                <label className="result-card_date">{formattedDate}</label>
                <label className="result-card_source">
                    <a href={url} id="res">{source}</a> </label>
            </div>
            <div className="result-card_title">{title ?? "No title found"}</div>
            <div className="result-card_news-type">{getTagText()}</div>
            <div className="result-card_pic">
                <img src="/sf.png"/>
            </div>
            <div className="result-card_text">{limitedContent}</div>
            <button className="result-card_btn">
                <a href={url}><p id="res-btn">Source link</p></a></button>
            <div className="result-words">{wordCount} words</div>
        </div>
    );
}

export default ResultCard;
