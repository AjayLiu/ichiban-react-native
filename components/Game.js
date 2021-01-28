import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AnimeDiv from './AnimeDiv'
import shuffle from 'shuffle-array';

export default function Game() {
  
    const pagesToGet = 4;
    const [page, setPage] = useState(()=>{return 1});
    const [loading, setLoading] = useState(()=>{return true});
    const [pool, setPool] = useState(()=>{return []});
    const [randList, setRandList] = useState(()=>{return []});
    const [score, setScore] = useState(()=>{return 0});
    const [champIndex, setChampIndex] = useState(()=>{return 0});
    const [champ, setChamp] = useState({reveal: false});
    const [challenger, setChallenger] = useState({reveal: false});
    const [gameover, setGameover] = useState(()=>{return false});
    const [resetGame, setResetGame] = useState(()=>{return false});

    // const { height, width } = useWindowDimensions()

    var url = `https://api.jikan.moe/v3/top/anime/${page}/bypopularity`;
    
  
    useEffect(()=>{
      //reset game
      if(resetGame){
        shuffleRandList();
        setScore(0);        
        setChampIndex(0);
        setGameover(false);
        setResetGame(false);
      }
    },[resetGame])
    
    function shuffleRandList() {
      //make an array filled from 0 to pagesToGet * 50
      var tempArr = Array.from(Array(pagesToGet*50).keys());           
      setRandList(shuffle(tempArr));
      setLoading(false);
    }

    //fill up pool with anime
    useEffect(()=>{
      async function fetchData(){
        const request = await axios.get(url);
        console.log(request)
        setPool(prevPool=>prevPool.concat(request.data.top));
        //recursively call again to get more pages
        if(page < pagesToGet)
          setPage(prevPage => prevPage+1);
        else {
          shuffleRandList();
        }
        return request;
      }
      fetchData();

    }, [page]);
    
  
  
    // every time the player advances or loses, run this
    useEffect(()=>{
      
    }, [score, loading]);
    
    

    
    useEffect(()=>{
      if(!loading){
        setChamp(prevChamp => {
          return {
            ...pool[randList[champIndex]],
            reveal:true,
            higher: prevChamp.higher
          }
        });
        setChallenger(pool[randList[score+1]]);
      }
    }, [champIndex, score, loading, randList])
  
    function onAnimeClick(isChamp){
      if(!gameover){
        var champHigher = champ.members > challenger.members;
        setChamp(prevChamp=>{        
          return {
            ...prevChamp,
            reveal: true, 
            higher: champHigher
          }
        });
        setChallenger(prevChallenger=>{        
          return {
            ...prevChallenger,
            higher: !champHigher
          }
        });
        //guessed correctly
        if(isChamp == champHigher){
          setChampIndex(prevChamp => prevChamp+1);      
          setScore(prevScore=>prevScore+1);
        } else {
          setChallenger(prevChallenger=>{
            return {
              ...prevChallenger,
              reveal: true
            }
          });
          setGameover(true);
        }
      }
    }

    return (
      <View>
        {
        loading?
          <Text>Loading</Text>
        :
         <>
          <Text>Which Anime Has More Fans (according to MyAnimeList.net)?</Text>
          <Text>Score: {score}</Text>
          <View>
            <AnimeDiv clickCallback={()=>onAnimeClick(true)} obj = {champ} gameover={gameover}/>
            <Text>or</Text>
            {/* <AnimeDiv clickCallback={()=>onAnimeClick(false)} obj = {challenger} gameover={gameover}/> */}
          </View>
         </> 
        }
      </View>
    )

    // const gameoverElem = (
    //   <div className={styles.gameoverElem} onClick={()=>{setResetGame(true)}}>
    //     <div className={styles.gameoverLabel}>
    //       Game Over
    //     </div>
    //     <div className={styles.gameoverBtn}>Press to play again</div>
    //   </div>
    // )

    // return (
    //     <main>
    //         { 
    //         loading ? 
    //         <div>
    //             Loading...
    //         </div>
    //         :
    //         <>
    //         <h1 className={styles.prompt}>Which Anime Has More Fans (according to MyAnimeList.net)?</h1>
    //         <h2 className={styles.score}>
    //           Score: {score}              
    //         </h2>

    //         <div>
    //           {
    //             width <= mobileThreshold && gameover && gameoverElem            
    //           }
    //         </div>

    //         <div className = {styles.battlefield}>
    //             {
    //             <>            
    //             <AnimeDiv clickCallback={()=>onAnimeClick(true)} obj = {champ} gameover={gameover}/>
    //             <div style={{  marginTop: "75px"}}>
    //               {
    //                 //Desktop gameover button
    //                 width <= mobileThreshold || (gameover ? 
    //                 gameoverElem
    //                 :
    //                 <div id={styles.orLabel}>{"OR"}</div>
    //               )}
    //             </div>
    //             <AnimeDiv clickCallback={()=>onAnimeClick(false)} obj = {challenger} gameover={gameover}/>                        
    //             </>
    //             }              
    //         </div> 
    //         </>
    //         }

    //     </main>

    // );

}
