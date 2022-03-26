import React, { useEffect, useState } from 'react';
import './App.css';
import {useLocation} from "react-router-dom";
import { FetchNFTClient } from '@audius/fetch-nft'

// Initialize fetch client
const fetchClient = new FetchNFTClient()

const App = () => {
  const search = useLocation().search;
  const [collectibles, setCollectibles] = useState(null);
  const [loader, setLoader] = useState(true)

  console.log(search);

  useEffect(() => {
    var data = [];
    const ethWallets = new URLSearchParams(search).get('ethWallets');
    if(ethWallets){
      data['ethWallets'] = [ethWallets];
    }

    const solWallets = new URLSearchParams(search).get('solWallets');
    if(solWallets){
      data['solWallets'] = [solWallets];
    }
    
    fetchClient.getCollectibles(data).then(res => {      
      setCollectibles(res)
      setLoader(false)
    })
  }, [search])

  return (
    
    <div className="App">  
      {!loader ?   
        <>
          { collectibles.ethCollectibles ? 
            <>
              <div className="Header">Eth Collectibles</div>
              <div className="MainWrap">
              {
                collectibles.ethCollectibles[new URLSearchParams(search).get('ethWallets')]
                  .map(collectible => (
                    <div className="Collectibles">
                      <div className="Name">{collectible.name}</div>
                      <img className="Image" src={collectible.frameUrl || collectible.gifUrl} alt={collectible.name} />
                    </div>
                  )) 
              }
              </div>
            </>
          : <lable>No Records Found</lable> }

          { collectibles.solCollectibles ? 
            <>
              <div className="Header">Solana Collectibles</div>
              <div className="MainWrap">
              {
                collectibles.solCollectibles[new URLSearchParams(search).get('solWallets')]
                  .map(collectible => (
                    <div className="Collectibles">
                      <div className="Name">{collectible.name}</div>
                      <img className="Image" src={collectible.frameUrl || collectible.gifUrl} alt={collectible.name} />
                    </div>
                  )) 
              }
              </div>
            </>
          : <lable>No Records Found</lable> }
        </>
        : <label>Loading...</label> }
    </div>
  );
}

export default App;
