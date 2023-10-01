import {  useState,useRef, useEffect } from 'react'
import './App.css'
import MusicAnime from './components/MusicAnime'
import {HiMenuAlt1} from 'react-icons/hi';
import {FaChevronLeft,FaArrowsRotate} from 'react-icons/fa6';
import {BsSearch,BsPlayCircle,BsPauseCircle} from 'react-icons/bs';
import {GrRotateRight} from 'react-icons/gr';
import {PiShuffleAngularFill} from 'react-icons/pi'
import {MdShuffleOn} from 'react-icons/md';
import {IoPlayBackSharp,IoPlayForwardSharp} from 'react-icons/io5'



 const musiclist=[
  {
    name:'Sahara - Bgm',
    artist:'Unknown',
    img:'joker.jpg',
    src:'Sahara - Bgm'
  },
  {
    name:'IDFC - Blackbear',
    artist:'Unknown',
    img:'ronaldo.jpeg',
    src:'IDFC - Blackbear'
  },
  {
    name:'Zara Zara Behekta Hai',
    artist:'Omkar ft.Aditya Bhardwaj',
    img:'lovers.jpg',
    src:'Zara Zara Behekta Hai'
  },
  {
    name:'White Town - Your Woman',
    artist:'White Panda ft. Dorrough',
    img:'joker.jpg',
    src:'White Town - Your Woman'
  },
  {
    name:'Tujh Mein Rab Dikhta',
    artist:'Shahrukh Khan',
    img:'lovers.jpg',
    src:'Tujh Mein Rab Dikhta'
  },
  {
    name:'Gangsta Paradise - Bgm',
    artist:'Coolio',
    img:'alone.jpg',
    src:'Gangsta Paradise - Bgm'
  }
 ]

function App() {
  const [menubool,setmenubool]=useState(true);
  const [playbool,setplaybool]=useState(true);
  const [loadmusic,setloadmusic]=useState(Math.floor(Math.random()*(musiclist.length)));
  const [currenttime, setcurrenttime] = useState('00:00');
  const [durationtime, setdurationtime] = useState('00:00');
  const [barwidth, setbarwidth] = useState(0)
  const [repeatbool,setrepeatbool]=useState(true)
  const [shufflebool,setshufflebool]=useState(true)
 

  useEffect(()=>{
  document.documentElement.style.setProperty('--s',`url('./assets/${musiclist[loadmusic].img}')`)
  },[loadmusic])

  const audio = useRef()

  const playclick=()=>{
    if(audio.current.paused){
      audio.current.play()
      setplaybool(false)
    }else{
      audio.current.pause()
      setplaybool(true)
    }
  }

  const durationupdate=()=>{
    let minutes=parseInt(audio.current.duration / 60);
    let seconds=parseInt(audio.current.duration % 60);
    setdurationtime(`${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds}`)
    
  }
 

  const playback=()=>{
    setloadmusic(loadmusic > 0 ? loadmusic-1:musiclist.length-1);
    setTimeout(()=>playbool ?audio.current.pause() : audio.current.play())
  }

  const playforward=()=>{
    if(shufflebool){
      setloadmusic(loadmusic >=musiclist.length-1 ? 0 : loadmusic+1);
    }else{
      let shuffleload=Math.floor(Math.random()*(musiclist.length))
      do {
        shuffleload=Math.floor(Math.random()*(musiclist.length))
      } while (shuffleload===loadmusic);
      setloadmusic(shuffleload)
    }
    setTimeout(()=>playbool ?audio.current.pause() : audio.current.play())
  }

  const audiotime=()=>{
    durationupdate()
    let mins=Math.floor(audio.current.currentTime/60);
    let secs=Math.floor(audio.current.currentTime%60);
    setcurrenttime(`${mins<10 ? `0${mins}`:mins}:${secs<10 ? `0${secs}`:secs}`)
    let barwid=parseInt(audio.current.currentTime/audio.current.duration *100)
    setbarwidth(barwid);
  }

  const progressbar=(e)=>{
    setbarwidth(e.target.value);
    audio.current.currentTime=e.target.value * audio.current.duration / 100;
  }

  // const sliderbar=(e)=>{
  //   let tot=e.target.clientWidth;
  //   let offset=e.nativeEvent.offsetX;
  //   audio.current.currentTime=(offset/tot) * audio.current.duration;
  // }

  const afterend =()=>{
    if(repeatbool){
      playforward()
    }
    else{
      audio.current.currentTime=0
      audio.current.play()
    }
  }

  const shuffle=()=>{
    setshufflebool(!shufflebool)
  }

  const menuload=(i)=>{
    setloadmusic(i)
    setplaybool(false)
    setTimeout(()=>audio.current.play())
  }

  
  
  return ( 
  <div className='box flex flex-col relative rounded-3xl overflow-hidden'>

    <div className='flex bg-gray-700 pb-3 pt-5 px-2 text-white items-center justify-between'>
    { menubool ? <HiMenuAlt1 onClick={()=>setmenubool(!menubool)} className='text-2xl cursor-pointer' />:<FaChevronLeft onClick={()=>setmenubool(!menubool)} className='text-xl cursor-pointer' />}
      <h6 className='text-[#ffffffdc] font-medium bol text-[17px]'>{menubool ?'Now Playing':'Songs List'}</h6>
      <BsSearch />
    </div>
     
    <div className='flex image w-[290px] bg-slate-950  pb-9 px-3 items-center flex-col'>
     <img  className={`rounded-full ${!playbool && 'animate-pulse border-gray-300'} z-10 mt-16 w-[170px] object-cover border-gray-400 h-[170px] border-4`} src={`./assets/${musiclist[loadmusic].img}`} alt="image" />

     <div className=' flex flex-col mt-2 bg- items-center'>
      <p className='text-white text-lg '>{musiclist[loadmusic].name}</p>
      <span className='text-gray-400 text-sm '>{musiclist[loadmusic].artist}</span>
     </div>
     
     <div className=' flex z-10 justify-between text-gray-400 text-[11px] font-bold  mt-8 w-full'>
      <p className=' border-[1px] rounded-full px-1 py-[1px] border-white '>{currenttime}</p>
      <span className='border-[1px] rounded-full px-1 py-[1px] border-white '>{durationtime}</span>
     </div>
    
    {/* <div className='w-full z-20 h-[5px] mt-3 cursor-pointer rounded-full bg-white' onClick={sliderbar}>
    <div style={{width:`${barwidth}%`}} className=' z-10 relative h-full slider bg-blue-400' ></div>
    </div> */}
     <input type="range" className='w-full z-10 h-1 mt-3 outline-none rounded-full bg-blue-400' onChange={progressbar} value={barwidth}  />
     <div className='text-white w-full z-10 flex mt-8 text-2xl items-center justify-between'> 
  

        { repeatbool ? <GrRotateRight onClick={()=>setrepeatbool(!repeatbool)} />:<FaArrowsRotate className='text-2xl' onClick={()=>setrepeatbool(!repeatbool)} />}          
                
        <div className='text-white flex items-center gap-5'>
          <IoPlayBackSharp onClick={playback} className='text-[26px]' />

          <audio ref={audio} onTimeUpdate={audiotime} onEnded={afterend} src={`./assets/${musiclist[loadmusic].src}.mp3`}></audio>

          { playbool ? <BsPlayCircle onClick={playclick} className='play text-[45px]' />:<BsPauseCircle onClick={playclick} className='text-[45px]' />}          
          <IoPlayForwardSharp onClick={playforward} className='text-[26px]' />
        </div>
       { shufflebool ? <PiShuffleAngularFill onClick={shuffle} />:<MdShuffleOn onClick={shuffle}  />}          

      </div>

    </div>
      <ul className={`absolute unorder z-10 ${menubool ?'hidden' :"block"} w-full h-[45%] overflow-y-auto scrolling-touch p-3 pb-1 bg-gray-500 bottom-0`}>
      
      {musiclist.map((item,i)=>(
        <li onClick={()=>menuload(i)} className={`flex mb-2 ${loadmusic ===i ? 'bg-gray-400' : 'bg-gray-300'} cursor-pointer text-black p-2 pb-1 rounded-xl justify-between items-center`} key={item.name}>
          <div className='flex gap-2'>
           <img className='w-10 rounded-full h-10 object-cover' src={`src/assets/${item.img}`} />
            <div>
             <p className='text-sm font-medium'>{item.name.length<=23 ? item.name :item.name.slice(0,23)+'...' }</p>
             <span className='text-xs'>{item.artist}</span>
            </div>
          </div>
          {loadmusic ===i &&<small><MusicAnime /></small>}
          </li>
        ))
         }
      </ul>
  </div>
   
  )
}

export default App

