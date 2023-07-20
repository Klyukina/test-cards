import React, { useEffect, useState } from "react";
import Button from "../../components/button/button";
import ModalLogin from "../../components/modal-login/modal-login";
import Card from "../../components/card/card";
import Spinner from "../../components/spinner/spinner";
import styles from "./container.module.scss";

export default function Container() {
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const handleClickModal = (event) => {
    if (event.target === event.currentTarget) {
        setModalLoginOpen(false)
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=${start}&_end=${end}`);
      const data = await response.json();
      setIsLoading(false);
      setStart(prevState => prevState + 3)
      setEnd(prevState => prevState + 3)
      return data;
    } catch (error) {
      console.error('Error fetching cards:', error);
      setIsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialCards = async () => {
      const data = await fetchData();
      const dataWithRating = data.map(item => ({
        ...item,
        rating: getRandomNumber(1, 5),
      }));
      setCards(dataWithRating);
    };

    loadInitialCards();
  }, []);

  const handleLoadMore = async () => {
    const data = await fetchData();
    const dataWithRating = data.map(item => ({
      ...item,
      rating: getRandomNumber(1, 5),
    }));

    setCards(prevCards => [...prevCards, ...dataWithRating]);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles['wrapper_header']}>
          <Button onClick={() => setModalLoginOpen(true)} text={'Sign In'}/>
        </header>
        <main className={styles['wrapper_block']}>
           <article className={styles['wrapper_row']}>
            {cards.map(card => (
              <Card rating={card.rating} item={card} key={card.id}/>
            ))}
          </article>
          <div className={styles['wrapper_btn']}>
            {isLoading ? <Spinner/> : <Button onClick={handleLoadMore} text={'More'}/>}
          </div>
        </main>
      </div>
      {modalLoginOpen && <ModalLogin
        isModalOpen={modalLoginOpen}
        onClose={() => setModalLoginOpen(false)}
        onClick={handleClickModal}/>}
    </>
  );
}
