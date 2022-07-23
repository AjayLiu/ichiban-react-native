import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import AnimeDiv from './AnimeDiv';
import shuffle from 'shuffle-array';

export default function Game() {
  const pagesToGet = 3;
  const [page, setPage] = useState(() => {
    return 1;
  });
  const [loading, setLoading] = useState(() => {
    return true;
  });
  const [pool, setPool] = useState(() => {
    return [];
  });
  const [randList, setRandList] = useState(() => {
    return [];
  });
  const [score, setScore] = useState(() => {
    return 0;
  });
  const [champIndex, setChampIndex] = useState(() => {
    return 0;
  });
  const [champ, setChamp] = useState({reveal: false});
  const [challenger, setChallenger] = useState({reveal: false});
  const [gameover, setGameover] = useState(() => {
    return false;
  });
  const [resetGame, setResetGame] = useState(() => {
    return false;
  });

  // const { height, width } = useWindowDimensions()

  const url = `https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&page=${page}`;

  useEffect(() => {
    //reset game
    if (resetGame) {
      shuffleRandList();
      setScore(0);
      setChampIndex(0);
      setGameover(false);
      setResetGame(false);
    }
  }, [resetGame]);

  function shuffleRandList() {
    //make an array filled from 0 to pagesToGet * 25
    var tempArr = Array.from(Array(pagesToGet * 25).keys());
    setRandList(shuffle(tempArr));
    setLoading(false);
  }

  //fill up pool with anime
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      console.log(request);
      setPool((prevPool) => prevPool.concat(request.data.data));
      //recursively call again to get more pages
      if (page < pagesToGet) setPage((prevPage) => prevPage + 1);
      else {
        shuffleRandList();
      }
      return request;
    }
    fetchData();
  }, [page]);

  // every time the player advances or loses, run this
  useEffect(() => {}, [score, loading]);

  useEffect(() => {
    if (!loading) {
      setChamp((prevChamp) => {
        return {
          ...pool[randList[champIndex]],
          reveal: true,
          higher: prevChamp.higher,
        };
      });
      setChallenger(pool[randList[score + 1]]);
    }
  }, [champIndex, score, loading, randList]);

  function onAnimeClick(isChamp) {
    if (!gameover) {
      var champHigher = champ.members > challenger.members;
      setChamp((prevChamp) => {
        return {
          ...prevChamp,
          reveal: true,
          higher: champHigher,
        };
      });
      setChallenger((prevChallenger) => {
        return {
          ...prevChallenger,
          higher: !champHigher,
        };
      });
      //guessed correctly
      if (isChamp == champHigher) {
        setChampIndex((prevChamp) => prevChamp + 1);
        setScore((prevScore) => prevScore + 1);
      } else {
        setChallenger((prevChallenger) => {
          return {
            ...prevChallenger,
            reveal: true,
          };
        });
        setGameover(true);
      }
    }
  }

  const gameoverElem = (
    <Button title="Game Over" onPress={() => setResetGame(true)}></Button>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading</Text>
      ) : (
        <View>
          <Text style={styles.text}>
            Which Anime Has More Fans (according to MyAnimeList.net)?
          </Text>
          <Text style={styles.text}>Score: {score}</Text>
          {gameover && gameoverElem}
          <View style={styles.battlefield}>
            <AnimeDiv
              clickCallback={() => onAnimeClick(true)}
              obj={champ}
              gameover={gameover}
            />
            <AnimeDiv
              clickCallback={() => onAnimeClick(false)}
              obj={challenger}
              gameover={gameover}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    margin: 2,
  },
  battlefield: {
    marginTop: 20,
    height: Dimensions.get('window').height,
  },
});
