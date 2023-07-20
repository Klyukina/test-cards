import React, { useEffect, useState } from "react";
import Button from "../../components/button/button";
import ModalLogin from "../../components/modal-login/modal-login";
import Card from "../../components/card/card";
import Spinner from "../../components/spinner/spinner";
import styles from "./container.module.scss";

export default function Container() {
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loadedCards, setLoadedCards] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickModal = (event) => {
    if (event.target === event.currentTarget) {
        setModalLoginOpen(false)
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setIsLoading(false);
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
      setCards(dataWithRating.slice(0, loadedCards));
    };

    loadInitialCards();
  }, []);


  const handleLoadMore = async () => {
    setLoadedCards(prevLoadedCards => prevLoadedCards + 3);
    const data = await fetchData();
    const dataWithRating = data.map(item => ({
      ...item,
      rating: getRandomNumber(1, 5),
    }));
    setCards(prevCards => [...prevCards, ...dataWithRating.slice(loadedCards, loadedCards + 3)]);
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
